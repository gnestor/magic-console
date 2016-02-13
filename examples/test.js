require('../utils/console')

console.render('# Hello, World!')

console.render('#### Numbers', Math.sqrt(9))

console.render('#### Data structures', {
  data: {
    key: {
      key: 'value'
    }
  }
})

console.render('#### React components', {
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
