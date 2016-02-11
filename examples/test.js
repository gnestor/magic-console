require('../utils/console')

console.render('## Hello, World!')

console.render(Math.sqrt(4))

console.render({
  data: {
    key: {
      key: 'value'
    }
  }
})

console.render('## React component', {
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
