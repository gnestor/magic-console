// Use Atom's built-in Babel
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
  // Using React's provided PropTypes
  data: PropTypes.any.isRequired
  // Using a custom validation function
  // data: (props, propName, componentName) => {
  //   if (!/^(sequenceDiagram|graph|gantt)/.test(props[propName])) return new Error('Validation failed!')
  //   return null
  // }
}

// Export the plugin
export default New
