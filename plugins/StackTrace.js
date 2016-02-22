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
    if (this.props.data instanceof Error) {
      return <RedBox error={data} style={style} />
    }
    if (typeof this.props.data === 'string') {
      let error = new Error(data)
      return <RedBox error={error} style={style} />
    }
    let error = new Error(`${data.name ? data.name : ''} ${data.message}`)
    error.stack = data.stack
    return <RedBox error={error} style={style} />
  }

}

StackTrace.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.error,
    PropTypes.errorString,
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      stack: PropTypes.string.isRequired
    })
  ]).isRequired
}

export default StackTrace

PropTypes.error = (props, propName, componentName) => {
  if (!(props[propName] instanceof Error)) return new Error('Validation failed!')
  return null
}

PropTypes.errorString = (props, propName, componentName) => {
  if (!/Error/.test(props[propName])) return new Error('Validation failed!')
  return null
}
