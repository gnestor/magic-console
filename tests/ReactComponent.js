import React, {Component} from 'react'
import ReactDOM from 'react-dom/server'
import './console'

console.render('# React components')

class ReactComponent extends React.Component {
  render() {
    return <span>{this.props.name}</span>
  }
}

// const ReactComponent = React.createClass({
//   render() {
//     return <span>{this.props.name}</span>
//   }
// })

// const ReactComponent = (props) => ({
//   type: 'span',
//   props: {
//     children: props.name
//   },
//   $$typeof: Symbol.for('react.element')
// })

// console.render('### Class', ReactComponent)
console.render('### renderToString', ReactDOM.renderToString(<ReactComponent name="Grant" />))

// Returns undefined when evaled vs. function
console.render('### Stringified React class component', {
  type: 'ReactComponent',
  data: {
    type: `class ReactComponent extends React.Component {
      render() {
        return <span>{this.props.name}</span>
      }
    }`,
    props: {
      name: 'Grant'
    }
  }
})

console.render('### Stringified React composite component', {
  type: 'ReactComponent',
  data: {
    type: `React.createClass({
      render: function() {
        return React.createElement('span', {children: this.props.text})
      }
    })`,
    props: {
      text: 'This is a React component'
    }
  }
})

console.render('### Stringified stateless React component', {
  type: 'ReactComponent',
  data: {
    type: `(props) => <span>{props.name}</span>`,
    props: {
      name: 'Grant'
    },
    $$typeof: Symbol.for('react.element')
  }
})

console.render('### Input element', <input placeholder="Type something..."></input>)
