require 'json'

puts "# This is a playground"

puts Math.sqrt(16)

puts JSON.dump({
  type: 'LineChart',
  key: 'lc1',
  data: [
    {
      data: [
        {x: 0, y: rand(1..10)},
        {x: 1, y: rand(1..10)},
        {x: 2, y: rand(1..10)},
        {x: 3, y: rand(1..10)},
        {x: 4, y: rand(1..10)},
        {x: 5, y: rand(1..10)}
      ],
      style: {
        data: {
          stroke: 'blue'
        }
      }
    }
  ]
})

puts JSON.dump({
  type: 'ReactComponent',
  key: 'rc1',
  data: {
    type: "React.createClass({\
      render: function() {\
        return React.createElement('span', {children: this.props.text})\
      }\
    })",
    props: {
      text: 'This is a React component'
    }
  }
})
