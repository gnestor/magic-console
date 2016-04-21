'use babel'

import React, {Component, PropTypes} from 'react'
import RedBox from 'redbox-react'

const style = {
  position: 'relative !important',
  zIndex: '1'
}

class StackTrace extends Component {

  render() {
    let {data} = this.props
    if (data instanceof Error) {
      return <RedBox error={data} style={style} />
    }
    if (typeof data === 'string') {
      let error = new Error(data)
      return <RedBox error={error} style={style} />
    }
    let error = new Error(data.message)
    error.stack = Array.isArray(data.stack) ? data.stack.join('\n    at ') : data.stack
    return <RedBox error={error} style={style} />
  }

}

StackTrace.propTypes = {
  data: PropTypes.oneOfType([
    (props, propName, componentName) => {
      if (!(props[propName] instanceof Error)) return new Error('Validation failed!')
      return null
    },
    (props, propName, componentName) => {
      if (!/Error/.test(props[propName])) return new Error('Validation failed!')
      return null
    },
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      stack: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired
    })
  ]).isRequired
}

export default StackTrace
