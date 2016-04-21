'use babel'

import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import StackTrace from '../plugins/StackTrace'

export default class PluginContainer extends Component {

  constructor(props) {
    super(props)
    this.reRender = this.reRender.bind(this)
  }

  componentDidMount() {
    this.node = ReactDOM.findDOMNode(this)
    this.reRender()
  }

  componentDidUpdate() {
    this.reRender()
  }

  componentWillUnmount() {
    try {
      ReactDOM.unmountComponentAtNode(node)
    } catch (error) {}
  }

  render() {
    return <div />
  }

  reRender() {
    let {plugin, data, props} = this.props
    try {
      this.node.className = `plugin-container ${this.props.plugin.name}`
      ReactDOM.render(React.createElement(plugin.component, {data, props}), this.node)
    } catch (error) {
      console.error('%cPluginContainer.render', 'font-weight: bold', error)
      this.node.className = 'plugin-container StackTrace'
      ReactDOM.render(<StackTrace data={error} />, this.node)
    }
  }

}
