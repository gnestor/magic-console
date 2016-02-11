import json
import math

print '## Hello, World!'

print math.sqrt(2)

print json.dumps({
  'type': 'ReactComponent',
  'data': {
    'type': ("React.createClass({"
      "render: function() {"
      "  return React.createElement('span', {children: this.props.text})"
      "}"
    "})"),
    'props': {
      'text': 'This is a React component'
    }
  }
})
