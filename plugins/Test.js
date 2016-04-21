'use babel'

import React, {Component, PropTypes} from 'react'
import RedBox from 'redbox-react'
import StackTrace from './StackTrace'

class Test extends Component {

  constructor(props) {
    super(props)
    this.styles = {
      container: {
        color: 'white',
        fontFamily: 'sans-serif',
        fontSize: 16,
        fontWeight: 'bold',
        padding: '5px 15px'
      },
      message: {
        fontSize: 13
      },
      pass: {
        backgroundColor: '#7BC700'
      },
      fail: {
        backgroundColor: '#CC0000'
      }
    }
  }

  render() {
    let {data} = this.props
    let result = (
      <div className="icon icon-x" style={Object.assign({}, this.styles.container, this.styles.fail)}>
        <span>{`${data}`}</span>
      </div>
    )
    if (data instanceof Error) result = <StackTrace data={data} />
    if (PropTypes.shape({
      message: PropTypes.string.isRequired,
      stack: PropTypes.string.isRequired
    })(this.props, 'data') === null) result = <StackTrace data={data} />
    if (/Error/.test(data)) result = <StackTrace data={data} />
    if (typeof data === 'undefined' || data === 'undefined' || data === true || data === 'true') result = (
      <div className="icon icon-check" style={Object.assign({}, this.styles.container, this.styles.pass)}>
        <span>{`${data}`}</span>
      </div>
    )
    return result
  }

}

Test.propTypes = {
  data: PropTypes.oneOfType([
    // Error type
    (props, propName, componentName) => {
      if (!(props[propName] instanceof Error)) return new Error('Validation failed!')
      return null
    },
    // Error string
    (props, propName, componentName) => {
      if (!/Error/.test(props[propName])) return new Error('Validation failed!')
      return null
    },
    PropTypes.bool,
    // Boolean string
    (props, propName, componentName) => {
      if (!/true|false/i.test(props[propName])) return new Error('Validation failed!')
      return null
    },
    // Undefined type/string
    (props, propName, componentName) => {
      if (typeof props[propName] !== 'undefined' && props[propName] !== 'undefined') return new Error('Validation failed!')
      return null
    },
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      stack: PropTypes.string.isRequired
    })
  ]).isRequired
}

export default Test
