'use babel'

import React, {Component, PropTypes} from 'react'
import mermaid, {mermaidAPI} from 'mermaid'

class Mermaid extends Component {

  render() {
    return <div className="mermaid" dangerouslySetInnerHTML={{__html: mermaidAPI.render(this.props.data)}}></div>
  }

}

Mermaid.propTypes = {
  data: PropTypes.string.isRequired
}

export default Mermaid
