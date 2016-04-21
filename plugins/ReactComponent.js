'use babel'

import React, {Component, PropTypes} from 'react'
import vm from 'vm'
import fs from 'fs'
const babel = require('babel-core')

class ReactComponent extends Component {

  constructor(props) {
    super(props)
    this.component = null
    this.watch = null
    this.requireComponent = this.requireComponent.bind(this)
    this.watchComponent = this.watchComponent.bind(this)
  }

  componentWillMount() {
    let {path} = this.props.data
    this.requireComponent(path)
    this.watch = this.watchComponent(path)
  }

  componentWillUnmount() {
    this.watch.close()
  }

  componentWillReceiveProps(nextProps) {
    let {path} = nextProps.data
    if (path !== this.props.data.path) {
      this.watch.close()
      this.requireComponent(path)
      this.watch = this.watchComponent(path)
    }
  }

  render() {
    let {props} = this.props.data
    if (props) {
      props = Object.keys(props).reduce((props, key) => {
        let prop = props[key]
        try {
          let {code} = babel.transform(prop)
          let callback = vm.runInThisContext(code)
          return {...props, [key]: callback}
        } catch (error) {
          return props
        }
      }, props)
    }
    return React.createElement(this.component, props)
  }

  requireComponent(path) {
    try {
      this.component = require(path)
    } catch (error) {
      throw error
    }
  }

  watchComponent(path) {
    return fs.watch(path, (event, file) => {
      console.log('%cwatchComponents', 'font-weight: bold', file)
      delete require.cache[require.resolve(path)]
      this.requireComponent(path)
    })
  }

}

ReactComponent.propTypes = {
  data: PropTypes.shape({
    path: PropTypes.string.isRequired,
    props: PropTypes.object
  }).isRequired
}

export default ReactComponent
