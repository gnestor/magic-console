'use babel'

import React, {Component, PropTypes} from 'react'
import {default as ReactLatex} from 'react-latex'

class Latex extends Component {

  render() {
    return <ReactLatex>{this.props.data}</ReactLatex>
  }

}

Latex.propTypes = {
  data: (props, propName, componentName) => {
    if (!/\$\$[\s\S]+?\$\$|\$[\s\S]+?\$/g.test(props[propName])) return new Error('Validation failed!')
    return null
  }
}

export default Latex
