console.log "## Hello, World!"

console.log Math.sqrt 2

console.log JSON.stringify({
  type: """
    React.createClass({
      render: function() {
        return React.createElement('span', {children: this.props.text})
      }
    })
  """,
  props: {
    text: 'This is a React component'
  }
})
