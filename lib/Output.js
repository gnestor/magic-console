'use babel'

import React, {Component, PropTypes} from 'react'
import PluginContainer from './PluginContainer'

export default class Output extends Component {

  constructor(props) {
    super(props)
    this.onSelect = this.onSelect.bind(this)
    // this.onCopy = this.onCopy.bind(this)
    this.onEdit = this.onEdit.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props
  }

  render() {
    let {output, plugins} = this.props
    let compatiblePlugins = plugins.filter(plugin => plugin.component.propTypes.data(output, 'data') === null)
    let options = compatiblePlugins.map(plugin => (
      <option key={plugin.name} value={plugin.name}>{plugin.name}</option>
    ))
    let plugin = compatiblePlugins.find(plugin => plugin.name === output.plugin)
    let toggle = (
      <select
        className="toggle"
        value={output.plugin}
        onChange={this.onSelect}
      >
        {options}
      </select>
    )
    let buttons = (
      <div className="buttons">
        {/*<button
          className="copy btn btn-default icon icon-clippy"
          title="Copy"
          data-toggle="tooltip"
          onClick={this.onCopy}
        />*/}
        <button
          className="edit btn btn-default icon icon-code"
          title="Edit plugin"
          data-toggle="tooltip"
          onClick={this.onEdit}
        />
        {toggle}
      </div>
    )
    return (
      <div
        className="output"
        style={{
          opacity: this.props.loading ? 0.5 : 1,
          WebkitFilter: this.props.loading ? 'grayscale(1)' : 'grayscale(0)'
        }}
      >
        {buttons}
        <PluginContainer
          plugin={plugin}
          data={output.data}
          props={output.props}
          style={{
            opacity: this.props.loading ? 0.5 : 1
          }}
        />
      </div>
    )
  }

  onSelect(event) {
    this.props.selectPlugin(this.props.output, event.target.value)
  }

  // onCopy(event) {
  //   this.props.copyOutput(this.props.output.data)
  // }

  onEdit(event) {
    this.props.editPlugin(this.props.output)
  }

}
