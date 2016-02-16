import './console'

console.render('# This is a playground')

console.render('### Do some math', Math.sqrt(4))

console.render('### Plot some results', {
  type: 'LineChart',
  data: [
    {
      data: [
        {x: 0, y: Math.floor(Math.random() * 10)},
        {x: 1, y: Math.floor(Math.random() * 10)},
        {x: 2, y: Math.floor(Math.random() * 10)},
        {x: 3, y: Math.floor(Math.random() * 10)},
        {x: 4, y: Math.floor(Math.random() * 10)},
        {x: 5, y: Math.floor(Math.random() * 10)}
      ],
      style: {
        data: {
          stroke: 'blue'
        }
      }
    }
  ]
})

console.render('### Create your own visualization', {
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
