'use babel'

import React, {Component, PropTypes} from 'react'

// Create a React component
class New extends Component {

  // The only required method for a React component
  render() {
    return (
      <div>
        {JSON.stringify(this.props.data)}
      </div>
    )
  }

}

// Define the type of `this.props.data`
New.propTypes = {
  data: PropTypes.any.isRequired
}

// Export the plugin
export default New
