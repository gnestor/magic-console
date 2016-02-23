'use babel'

import React, {Component, PropTypes} from 'react'
import ColorPicker from 'react-color'

class Color extends Component {

  render() {
    return <ColorPicker color={this.props.data} type="chrome" />
  }

}

Color.propTypes = {
  data: PropTypes.oneOfType([
    (props, propName, componentName) => {
      if (typeof props[propName] !== 'string' || !/#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(props[propName])) return new Error('Validation failed!')
      return null
    },
    PropTypes.shape({
      r: PropTypes.number.isRequired,
      g: PropTypes.number.isRequired,
      b: PropTypes.number.isRequired,
      a: PropTypes.number
    }),
    PropTypes.shape({
      h: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      s: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      l: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      a: PropTypes.number
    })
  ]).isRequired
}

export default Color
