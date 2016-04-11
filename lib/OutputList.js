'use babel'

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
      plugins: [],
      historyIndex: 0
    }
    this.history = []
    this.watch = null
    this.copyOutputs = this.copyOutputs.bind(this)
    // this.copyOutput = this.copyOutput.bind(this)
    this.clearOutputs = this.clearOutputs.bind(this)
    this.editPlugin = this.editPlugin.bind(this)
    this.selectPlugin = this.selectPlugin.bind(this)
    // this.createPlugin = this.createPlugin.bind(this)
    this.selectHistory = this.selectHistory.bind(this)
    this.parseProps = this.parseProps.bind(this)
    this.parseOutput = this.parseOutput.bind(this)
    this.indexPlugins = this.indexPlugins.bind(this)
    this.watchPlugins = this.watchPlugins.bind(this)
  }

  componentWillMount() {
    let plugins = this.indexPlugins()
    this.setState({plugins})
    this.watch = this.watchPlugins()
  }

  componentDidMount() {
    this.parseProps(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.parseProps(nextProps)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state
  }

  componentWillUnmount() {
    this.watch.close()
  }

  render() {
    let options = this.history.map((snapshot, index) => {
      let time = snapshot.time.toLocaleString()
      return <option key={index} value={index}>{time}</option>
    })
    let toggle;
    if (this.history.length > 0) toggle = (
      <select
        className="toggle"
        value={this.state.historyIndex}
        onChange={this.selectHistory}
      >
        {options}
      </select>
    )
    let buttons = (
      <div className="buttons">
        {toggle}
        <button
          className="copy btn btn-default icon icon-clippy"
          title="Copy"
          data-toggle="tooltip"
          onClick={this.copyOutputs}
        />
        <button
          className="clear btn btn-default icon icon-trashcan"
          title="Clear outputs"
          data-toggle="tooltip"
          onClick={this.clearOutputs}
        />
        {/*<button
          className="new btn btn-default icon icon-plus"
          title="Create new plugin"
          data-toggle="tooltip"
          onClick={this.createPlugin}
        />*/}
      </div>
    )
    let outputs = this.state.outputs.map(output => {
      return <Output
        key={output.key}
        output={output}
        plugins={this.state.plugins}
        selectPlugin={this.selectPlugin}
        copyOutput={this.copyOutput}
        editPlugin={this.editPlugin}
      />
    })
    return (
      <div className="output-list native-key-bindings" tabIndex={-1}>
        {buttons}
        {outputs}
      </div>
    )
  }

  copyOutputs(event) {
    atom.clipboard.write(JSON.stringify(this.state.outputs.map(output => output.data)))
  }

  // copyOutput(output) {
  //   atom.clipboard.write(JSON.stringify(output))
  // }

  clearOutputs(event) {
    this.setState({outputs: []})
  }

  editPlugin(output) {
    atom.workspace.open(this.state.plugins.find(plugin => plugin.name === output.plugin).filepath, {
      split: 'down',
      searchAllPanes: true
    })
  }

  selectPlugin(target, plugin) {
    let outputs = this.state.outputs.map(output => {
      if (output.key === target.key) return {...output, plugin}
      return output
    })
    this.setState({outputs})
    this.history[this.state.historyIndex].outputs = this.state.outputs.map(output => {outputs})
  }

  selectHistory(event) {
    let historyIndex = event.target.value
    let outputs = this.history[historyIndex].outputs.map(output => {output})
    this.setState({outputs, historyIndex})
  }

  // createPlugin(event) {
  //   let source = path.join(__dirname, '..', 'utils', 'plugin-template.js')
  //   let target = path.join(__dirname, '..', 'plugins', 'New.js')
  //   // fs.createReadStream(source).pipe(target)
  //   fs.writeFileSync(target, fs.readFileSync(source))
  //   atom.workspace.open(target, {
  //     split: 'down'
  //   })
  // }

  parseProps({state, status, output}) {
    if (state) {
      let {outputs} = state
      return this.setState({outputs})
    }
    if (status) {
      switch (status) {
        case 'started':
          return console.group('OutputList.render')
        case 'exited':
        case 'stopped':
          this.history = this.history.concat({
            time: new Date(),
            outputs: this.state.outputs.map(output => {output})
          })
          this.setState({historyIndex: this.history.length - 1})
          // this.state.outputs.forEach(output => console.log(output))
          return console.groupEnd()
        }
    }
    if (output) {
      let outputs = this.parseOutput(output).reduce((outputs, output, index) => {
        if (output === '' || output === null) return outputs
        let _index = -1
        if (output.key) {
          _index = outputs.findIndex(query => query.key === output.key)
        } else {
          _index = outputs.findIndex(query => query.data === output)
        }
        let key = output.key || outputs.length + index
        let data = output.data || output
        let plugin = this.detectType(data, output.type)
        if (_index > -1) {
          outputs[_index] = {...outputs[_index], data}
        } else {
          outputs.push({
            key,
            data,
            plugin
          })
        }
        return outputs
      }, this.state.outputs)
      this.setState({outputs})
    }
  }

  parseOutput(message) {
    return message.split(/\n/).map(output => {
      try {
        return JSON.parse(output)
      } catch(error) {
        return output
      }
    })
  }

  detectType(data, type) {
    if (type) {
      let component = this.state.plugins.find(component => component.name === type)
      if (component) return type
    }
    let compatiblePlugin = this.state.plugins.find(plugin => plugin.component.propTypes.data({data}, 'data') === null)
    if (compatiblePlugin) return compatiblePlugin.name
    return 'Raw'
  }

  watchPlugins() {
    return fs.watch(path.join(__dirname, '..', 'plugins'), (event, file) => {
      console.log('%cOutputList.watchPlugins', 'font-weight: bold', file)
      if (file && /.+\.jsx?$/.test(file)) {
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
          console.error('%cOutput.watchPlugins', 'font-weight: bold', error)
          plugins = this.state.plugins.filter(plugin => plugin.filepath !== filepath)
        }
        this.setState({plugins}, () => {
          deepForceUpdate(this)
        })
        // window.localStorage['magic-console:plugins'] = JSON.stringify(plugins)
      }
    })
  }

  indexPlugins() {
    return fs.readdirSync(path.join(__dirname, '..', 'plugins')).reduce((plugins, file) => {
      try {
        if (/.+\.jsx?$/.test(file)) {
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
