'use babel'

import React, {Component} from 'react'
import fs from 'fs'
import path from 'path'
import deepForceUpdate from 'react-deep-force-update'
import FlipMove from 'react-flip-move'
import Output from './Output'

export default class OutputList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      outputs: [],
      plugins: [],
      historyIndex: 0,
      started: Date.now(),
      stopped: Date.now()
    }
    this.history = []
    this.watch = null
    this.openOutputs = this.openOutputs.bind(this)
    this.copyOutputs = this.copyOutputs.bind(this)
    this.copyOutput = this.copyOutput.bind(this)
    this.clearOutputs = this.clearOutputs.bind(this)
    this.editPlugin = this.editPlugin.bind(this)
    this.selectPlugin = this.selectPlugin.bind(this)
    this.createPlugin = this.createPlugin.bind(this)
    this.setHistory = this.setHistory.bind(this)
    this.selectHistory = this.selectHistory.bind(this)
    this.stepForward = this.stepForward.bind(this)
    this.stepBackward = this.stepBackward.bind(this)
    this.parseProps = this.parseProps.bind(this)
    this.parseOutput = this.parseOutput.bind(this)
    this.indexPlugins = this.indexPlugins.bind(this)
    this.watchPlugins = this.watchPlugins.bind(this)
  }

  componentWillMount() {
    this.parseProps(this.props)
  }

  async componentDidMount() {
    let plugins = await this.indexPlugins()
    this.setState({plugins}, () => deepForceUpdate(this))
    this.watch = this.watchPlugins()
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
    let options, toggle
    if (this.history.length > 0) {
      options = this.history.map((snapshot, index) => {
        let time = new Date(snapshot.time).toLocaleString()
        return <option key={index} value={index}>{time}</option>
      })
      toggle = (
        <select
          className="toggle"
          value={this.state.historyIndex}
          onChange={this.selectHistory}
        >
          {options}
        </select>
      )
    }
    let buttons = (
      <div className="buttons">
        {toggle}
        {/*<button
          className="copy btn btn-default icon icon-clippy"
          title="Copy outputs"
          data-toggle="tooltip"
          onClick={this.copyOutputs}
        />*/}
        <button
          className="edit btn btn-default icon icon-file-code"
          title="Edit outputs"
          data-toggle="tooltip"
          onClick={this.openOutputs}
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
    let outputs
    if (this.state.plugins.length > 0) {
      outputs = this.state.outputs.filter(output => output.updated >= this.state.stopped)
      .map(output => {
        return <Output
          key={output.key}
          output={output}
          plugins={this.state.plugins}
          loading={output.updated < this.state.started ? true : false}
          selectPlugin={this.selectPlugin}
          copyOutput={this.copyOutput}
          editPlugin={this.editPlugin}
        />
      })
    }
    return (
      <div className="output-list">
        <FlipMove
          enterAnimation="fade"
          leaveAnimation="fade"
          staggerDurationBy={20}
        >
          {outputs}
        </FlipMove>
        {buttons}
      </div>
    )
  }

  copyOutputs(event) {
    atom.clipboard.write(JSON.stringify(this.state.outputs.map(output => output.data)))
  }

  openOutputs(event) {
    atom.workspace.open(this.props.filepath, {searchAllPanes: true})
  }

  copyOutput(output) {
    atom.clipboard.write(JSON.stringify(output))
  }

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
    if (this.history[this.state.historyIndex]) this.history[this.state.historyIndex].outputs = this.state.outputs
  }

  setHistory(historyIndex) {
    let {time, outputs} = this.history[historyIndex]
    this.setState({
      outputs,
      historyIndex,
      started: time,
      stopped: time
    })
  }

  selectHistory(event) {
    this.setHistory(parseInt(event.target.value))
  }

  stepForward() {
    if (this.state.historyIndex < this.history.length - 1) {
      this.setHistory(this.state.historyIndex + 1)
    }
  }

  stepBackward() {
    if (this.state.historyIndex > 0) {
      this.setHistory(this.state.historyIndex - 1)
    }
  }

  createPlugin(event) {
    let source = path.join(__dirname, '..', 'utils', 'plugin-template.js')
    let target = path.join(__dirname, '..', 'plugins', 'New.js')
    // fs.createReadStream(source).pipe(target)
    fs.writeFileSync(target, fs.readFileSync(source))
    atom.workspace.open(target, {
      split: 'down'
    })
  }

  parseProps({state, time, status, output}) {
    if (state) {
      let {outputs, started} = state
      this.history = [...this.history, {
        time: started,
        outputs: [...outputs]
      }]
      return this.setState({
        outputs,
        started,
        stopped: started
      })
    }
    if (status) {
      switch (status) {
        case 'started':
          this.setState({
            started: Date.now()
          })
          return console.group('OutputList.render')
        case 'exited':
        case 'stopped':
          this.history = [...this.history, {
            time: this.state.started,
            outputs: [...this.state.outputs]
          }]
          this.setState({
            historyIndex: this.history.length - 1,
            stopped: this.state.started
          })
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
          outputs[_index] = {
            ...outputs[_index],
            data,
            updated: Date.now()
          }
        } else {
          outputs.push({
            key,
            data,
            plugin,
            updated: Date.now()
          })
        }
        console.log(data)
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
      console.log('%cwatchPlugins', 'font-weight: bold', file)
      if (file && /.+\.jsx?$/.test(file)) {
        let filepath = path.join(__dirname, '..', 'plugins', file)
        let plugins = this.state.plugins.filter(plugin => plugin.filepath !== filepath)
        delete require.cache[require.resolve(filepath)]
        try {
          let component = require(filepath)
          let name =  component.name || component.displayName
          plugins = [...this.state.plugins.filter(plugin => plugin.name !== name), {name, component, filepath}]
        } catch (error) {
          console.error('%cwatchPlugins', 'font-weight: bold', error)
        }
        this.setState({plugins}, () => deepForceUpdate(this))
      }
    })
  }

  indexPlugins() {
    return new Promise((resolve, reject) => {
      fs.readdir(path.join(__dirname, '..', 'plugins'), (err, files) => {
        if (err) reject(err)
        let plugins = files.reduce((plugins, file) => {
          if (/.+\.jsx?$/.test(file)) {
            let filepath = path.join(__dirname, '..', 'plugins', file)
            try {
              let component = require(filepath)
              let name =  component.name || component.displayName
              return [...plugins, {name, component, filepath}]
            } catch(error) {
              console.error('%cindexPlugins', 'font-weight: bold', error)
            }
          }
          return plugins
        }, [])
        resolve(plugins)
      })
    })
  }

}
