'use babel'

// import {CompositeDisposable, Disposable} from 'atom'
import React, {Component} from 'react'
import fs from 'fs'
import path from 'path'
import deepForceUpdate from 'react-deep-force-update'
import Output from './Output'

export default class OutputList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      outputs: [],
      plugins: []
    }
    this.watch = null
    // this.subscriptions = new CompositeDisposable()
    this.handleClear = this.handleClear.bind(this)
    this.handleNewPlugin = this.handleNewPlugin.bind(this)
    this.parse = this.parse.bind(this)
    this.indexPlugins = this.indexPlugins.bind(this)
    this.watchPlugins = this.watchPlugins.bind(this)
  }

  componentWillMount() {
    let outputs = this.props.outputs.reduce((outputs, output) => {
      return [...outputs, ...this.parse(output)]
    }, this.state.outputs)
    outputs = outputs.reduce((result, item) => {
      if (item === '') return result
      let index = -1
      if (item.key) {
        index = result.findIndex(query => query.key === item.key)
      } else {
        index = result.findIndex(query => query === item)
      }
      if (index > -1) {
        result[index] = item
      } else {
        result.push(item)
      }
      return result
    }, [])
    let plugins = this.indexPlugins()
    // console.log('OutputList.indexPlugins', plugins)
    this.setState({outputs, plugins})
  }

  componentDidMount() {
    // this.subscriptions.add(this.store.addStateChangeListener(this._onChange))
    this.watchPlugins()
  }

  componentWillUnmount() {
    this.watch.close()
  }

  componentWillReceiveProps(nextProps) {
    let outputs = nextProps.outputs.reduce((outputs, output) => {
      return [...outputs, ...this.parse(output)]
    }, this.state.outputs)
    outputs = outputs.reduce((result, item) => {
      if (item === '') return result
      let index = -1
      if (item.key) {
        index = result.findIndex(query => query.key === item.key)
      } else {
        index = result.findIndex(query => query === item)
      }
      if (index > -1) {
        result[index] = item
      } else {
        result.push(item)
      }
      return result
    }, [])
    this.setState({outputs})
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state
  }

  render() {
    // let buttons
    let buttons = (
      <div className="buttons">
        <button
          className="clear btn btn-default icon icon-trashcan"
          title="Clear outputs"
          data-toggle="tooltip"
          onClick={this.handleClear}
        />
        <button
          className="new btn btn-default icon icon-plus"
          title="Create new plugin"
          data-toggle="tooltip"
          onClick={this.handleNewPlugin}
        />
      </div>
    )
    let elements = this.state.outputs.map((output, index) => {
      let key = output.key || index
      let type = output.type || null
      let data = output.data || output
      return <Output key={key} plugins={this.state.plugins} data={data} type={type} />
    })
    return (
      <div className="output-list native-key-bindings" tabIndex={-1}>
        {buttons}
        {elements}
      </div>
    )
  }

  handleClear(event) {
    this.setState({outputs: []})
  }

  handleNewPlugin(event) {
    // fs.createReadStream(path.join(__dirname, '..', 'utils', 'plugin-template.js')).pipe(fs.createWriteStream(path.join(__dirname, '..', 'plugins', 'New.js')))
    let source = path.join(__dirname, '..', 'utils', 'plugin-template.js')
    let target = path.join(__dirname, '..', 'plugins', 'New.js')
    fs.writeFileSync(target, fs.readFileSync(source))
    atom.workspace.open(target, {
      split: 'down'
    })
  }

  parse(message) {
    return message.split(/\n/).map(output => {
      try {
        return JSON.parse(output)
        // let parsed = JSON.parse(message)
        // let {key, value} = parsed
        // let output = {
        //   key,
        //   value,
        //   timestamp: new Date(),
        //   plugin: ''
        // }
      } catch(error) {
        // console.log(error, message)
        return output
        // output = {
        //   key: Math.random()
        // }
      }
    })
  }

  watchPlugins() {
    this.watch = fs.watch(path.join(__dirname, '..', 'plugins'), (event, file) => {
      console.log('OutputList.watchPlugins', file)
      if (file && /^(?!index).+\.js$/.test(file)) {
        let plugins
        let filepath = path.join(__dirname, '..', 'plugins', file)
        delete require.cache[require.resolve(filepath)]
        try {
          let component = require(filepath)
          let name =  component.name || component.displayName
          if (this.state.plugins.find(plugin => plugin.name === name)) {
            plugins = [...this.state.plugins.filter(plugin => plugin.name !== name), {name, component, filepath}]
          } else {
            plugins = [...this.state.plugins, {name, component, filepath}]
          }
        } catch (error) {
          console.log('Output.watchPlugins', error)
          plugins = this.state.plugins.filter(plugin => plugin.filepath !== filepath)
        }
        this.setState({plugins}, () => {
          deepForceUpdate(this)
        })
      }
    })
  }

  indexPlugins() {
    return fs.readdirSync(path.join(__dirname, '..', 'plugins')).reduce((plugins, file) => {
      try {
        if (/^(?!index).+\.js$/.test(file)) {
          let filepath = path.join(__dirname, '..', 'plugins', file)
          let component = require(filepath)
          let name =  component.name || component.displayName
          plugins.push({name, component, filepath})
        }
      } catch(error) {}
      return plugins
    }, [])
  }

}
