'use babel'

import React, {Component, PropTypes} from 'react'
import JSONTree from 'react-json-tree'

class ObjectTree extends Component {

  render() {
    return <JSONTree data={this.props.data} />
  }

}

ObjectTree.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
}

export default ObjectTree
