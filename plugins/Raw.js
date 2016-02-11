'use babel'

import React, {Component, PropTypes} from 'react'

class Raw extends Component {

  render() {
    if (PropTypes.node(this.props, 'data') === null) return (
      <div>
        {this.props.data}
      </div>
    )
    return (
      <div>
        {JSON.stringify(this.props.data)}
      </div>
    )
  }

}

Raw.propTypes = {
  data: PropTypes.any.isRequired
}

export default Raw
