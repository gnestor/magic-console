'use babel'

import React, {Component, PropTypes} from 'react'
import mermaid, {mermaidAPI} from 'mermaid'

class Mermaid extends Component {

  render() {
    return <div className="mermaid" dangerouslySetInnerHTML={{__html: mermaidAPI.render(this.props.data)}}></div>
  }

}

Mermaid.propTypes = {
  data: (props, propName, componentName) => {
    if (!/^(sequenceDiagram|graph|gantt)/.test(props[propName])) return new Error('Validation failed!')
    return null
  }
}

export default Mermaid
