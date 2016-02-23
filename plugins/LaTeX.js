'use babel'

import React, {Component, PropTypes} from 'react'
import Latex from 'react-latex'

class LaTeX extends Component {

  render() {
    return <Latex>{this.props.data}</Latex>
  }

}

LaTeX.propTypes = {
  data: (props, propName, componentName) => {
    if (!/\$\$[\s\S]+?\$\$|\$[\s\S]+?\$/g.test(props[propName])) return new Error('Validation failed!')
    return null
  }
}

export default LaTeX
