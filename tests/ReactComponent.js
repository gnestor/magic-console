import React, {Component} from 'react'
import ReactDOM from 'react-dom/server'
import './console'

console.render('# ReactComponent')

class ReactComponent extends React.Component {
  render() {
    return <span>{this.props.text}</span>
  }
}

// const ReactComponent = React.createClass({
//   render() {
//     return <span>{this.props.name}</span>
//   }
// })
//
// const ReactComponent = (props) => ({
//   type: 'span',
//   props: {
//     children: props.name
//   },
//   $$typeof: Symbol.for('react.element')
// })

console.render('### renderToString class component', ReactDOM.renderToString(<ReactComponent text="This is a class component" />))

console.render('### Stringified composite component', {
  type: 'ReactComponent',
  data: {
    type: `React.createClass({
      render: function() {
        return React.createElement('span', {children: this.props.text})
      }
    })`,
    props: {
      text: 'This is a composite component'
    }
  }
})

console.render('### Stringified stateless component', {
  type: 'ReactComponent',
  data: {
    type: `(props) => <span>{props.text}</span>`,
    props: {
      text: 'This is a stateless component'
    },
    $$typeof: Symbol.for('react.element')
  }
})

console.render('### Stringified input element', <input placeholder="Type something..."></input>)
