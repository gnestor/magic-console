require('./console')

console.render('# Title')

console.render('### Do some math', Math.sqrt(4))

console.render('### Make some data', {
  data: {
    key: {
      key: 'value'
    }
  }
})

console.render('### React component', {
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

// console.render({
//   key: 1,
//   data: '## Hello, World!'
// })
//
// console.render({
//   key: 2,
//   data: Math.sqrt(16)
// })
//
// console.render({
//   key: 3,
//   data: {
//     key: {
//       key: 'value2'
//     }
//   }
// })
//
// console.render('## React component', {
//   key: 4,
//   type: 'ReactComponent',
//   data: {
//     type: `React.createClass({
//       render: function() {
//         return React.createElement('span', {children: this.props.text})
//       }
//     })`,
//     props: {
//       text: 'This is a React component'
//     }
//   }
// })
