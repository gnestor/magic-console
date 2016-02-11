'use babel'

import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import RedBox from 'redbox-react'

export default class PluginContainer extends Component {

  constructor(props) {
    super(props)
    this.reRender = this.reRender.bind(this)
  }

  componentDidMount() {
    this.reRender()
  }

  componentDidUpdate() {
    this.reRender()
  }

  componentWillUnmount() {
    try {
      let node = ReactDOM.findDOMNode(this)
      ReactDOM.unmountComponentAtNode(node)
    } catch (error) {}
  }

  render() {
    return <div className={`plugin-container ${this.props.plugin.name}`} />
  }

  reRender() {
    let node = ReactDOM.findDOMNode(this)
    let {plugin, data} = this.props
    try {
      // ReactDOM.render(<plugin data={data} />, node)
      ReactDOM.render(React.createElement(plugin.component, {data}), node)
    } catch (error) {
      console.error('%cPluginContainer.render', 'font-weight: bold', error)
      ReactDOM.render(<RedBox error={error} />, node)
    }
  }

}
