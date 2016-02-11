'use babel'

import React, {Component, PropTypes} from 'react'
import PluginContainer from './PluginContainer'

export default class Output extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selected: ''
    }
    // this.mimeTypes = [
    //   'text/html',
    //   'application/json',
    //   'text/javascript',
    //   'text/babel',
    //   'text/coffeescript',
    //   'text/typescript',
    //   'text/jsx',
    //   'text/markdown'
    // ]
    this.handleSelect = this.handleSelect.bind(this)
    this.handleCopy = this.handleCopy.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.detectType = this.detectType.bind(this)
  }

  componentWillMount() {
    this.setState({
      selected: this.detectType()
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selected: this.detectType()
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.data !== this.props.data || nextState.selected !== this.state.selected
  }

  render() {
    let {plugins} = this.props
    let compatiblePlugins = plugins.filter(plugin => plugin.component.propTypes.data(this.props, 'data') === null)
    let options = compatiblePlugins.map(plugin => (
      <option key={plugin.name} value={plugin.name}>{plugin.name}</option>
    ))
    let plugin = compatiblePlugins.find(plugin => plugin.name === this.state.selected)
    let toggle = (
      <select
        className="toggle"
        value={this.state.selected}
        onChange={this.handleSelect}
      >
        {options}
      </select>
    )
    // if (selected !== 'Markdown') toggle = (
    //   <select
    //     className="toggle"
    //     value={selected}
    //     onChange={this.handleSelect}
    //   >
    //     {options}
    //   </select>
    // )
    let buttons = (
      <div className="buttons">
        <button
          className="copy btn btn-default icon icon-clippy"
          title="Copy"
          data-toggle="tooltip"
          onClick={this.handleCopy}
         />
         <button
           className="edit btn btn-default icon icon-code"
           title="Edit plugin"
           data-toggle="tooltip"
           onClick={this.handleEdit}
          />
        {toggle}
      </div>
    )
    console.log(this.props.data)
    return (
      <div className="output">
        {buttons}
        <PluginContainer plugin={plugin} data={this.props.data} />
      </div>
    )
  }

  handleSelect(event) {
    this.setState({
      selected: event.target.value
    })
  }

  handleCopy(event) {
    atom.clipboard.write(JSON.stringify(this.props.data))
  }

  handleEdit(event) {
    let plugin = this.props.plugins.find(plugin => plugin.name === this.state.selected)
    atom.workspace.open(plugin.filepath, {
      split: 'down',
      searchAllPanes: true
    })
  }

  detectType() {
    let {data, type} = this.props
    if (type) {
      let component = this.props.plugins.find(component => component.name === type)
      if (component) return type
    }
    let compatiblePlugin = this.props.plugins.find(plugin => plugin.component.propTypes.data(this.props, 'data') === null)
    if (compatiblePlugin) return compatiblePlugin.name
    return this.state.selected
  }

}
