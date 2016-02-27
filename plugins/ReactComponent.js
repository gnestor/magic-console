'use babel'

import React, {Component, PropTypes} from 'react'
import vm from 'vm'
import path from 'path'
const babel = require('babel-core')

class ReactComponent extends Component {

  render() {
    let {type, props = {}} = this.props.data
    if (type) {
      if (React.DOM[type]) return React.createElement(type, props)
      let transpiled = babel.transform(type).code
      let evaluated = vm.runInNewContext(transpiled, {React})
      // return React.createElement(vm.runInNewContext(type, {React}), props)
      return React.createElement(evaluated, props)
    }
  }

}

ReactComponent.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.string.isRequired,
    props: PropTypes.object.isRequired
  }).isRequired
}

export default ReactComponent
