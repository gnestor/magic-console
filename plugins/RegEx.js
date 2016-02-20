'use babel'

import React, {Component, PropTypes} from 'react'
import Highlight from 'react-highlighter'

class RegEx extends Component {

  constructor(props) {
    super(props)
    this.state = {
      input: '',
      regex: {}
    }
    this.handleChange = this.handleChange.bind(this)
  }

  render() {
    let regex = new RegExp(this.props.data.replace(/^\/(.*)\/$/, '$1'))
    // let matches = this.state.input.match(regex)
    // if (matches) matches = matches.map(match => (
    //   <span>{match}</span>
    // ))
    return (
      <div>
        <input
          value={this.state.input}
          onChange={this.handleChange}
          placeholder="Test regex here"
          style={{
            width: 'calc(100% - 142px)',
            color: this.state.input.length > 0 ? 'transparent' : 'black',
            paddingLeft: 5
          }}
        />
        <div style={{
          marginTop: -24,
          marginLeft: 4
        }}>
          <Highlight
            search={regex}
            matchStyle={{
              backgroundColor: 'yellow'
            }}
          >
            {this.state.input}
          </Highlight>
        </div>
      </div>
    )
  }

  handleChange(event) {
    this.setState({input: event.target.value})
  }

}

RegEx.propTypes = {
  data: (props, propName, componentName) => {
    if (!/^\/.*\/[gimy]?$/.test(props[propName])) return new Error('Validation failed!')
    return null
  }
}

export default RegEx
