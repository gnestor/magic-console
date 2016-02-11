require 'json'

puts "## Hello, world!"

puts Math.sqrt(2)

puts JSON.dump({
  type: "React.createClass({\
    render: function() {\
      return React.createElement('span', {children: this.props.text})\
    }\
    })",
  props: {
    text: 'This is a React component'
  }
})
