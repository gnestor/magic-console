'use babel'

import React, {Component, PropTypes} from 'react'
import vm from 'vm'
// import babel from 'babel-core'
// const babel = require('babel-core')

class ReactComponent extends Component {

  render() {
    let {type, props = {}} = this.props.data
    if (type) {
      if (React.DOM[type]) return React.createElement(type, props)
      // let component = babel.transform(type, {presets: ['es2015', 'react', 'stage-0']}).code
      return React.createElement(vm.runInNewContext(type, {React}), props)
    }
  }

}

ReactComponent.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.string.isRequired,
    props: PropTypes.object
  }).isRequired
}

export default ReactComponent
