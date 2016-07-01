'use babel'

import React, {Component, PropTypes} from 'react'
import createFragment from 'react-addons-create-fragment'
const parser = new DOMParser()
import StackTrace from './StackTrace'

class HTML extends Component {

  render() {
    // let node = parser.parseFromString(this.props.data, 'text/xml')
    // console.log(createFragment(node.querySelector('body').children.item(0)))
    // return createFragment(node.querySelector('body').children.item(0))
    return (
      <div dangerouslySetInnerHTML={{__html: this.props.data}} />
    )
  }

}

HTML.propTypes = {
  data: (props, propName, componentName) => {
    if (!/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/.test(props[propName])) return new Error('Validation failed!')
    return null
  }
}

export default HTML
