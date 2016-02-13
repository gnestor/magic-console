import json
import math
import random

print '# This is a playground'

print '### Do some math'

print math.sqrt(9)

print '### Plot some results'

print json.dumps({
  'type': 'LineChart',
  'key': 'lc1',
  'data': [
    {
      'data': [
        {'x': 0, 'y': random.randint(1,10)},
        {'x': 1, 'y': random.randint(1,10)},
        {'x': 2, 'y': random.randint(1,10)},
        {'x': 3, 'y': random.randint(1,10)},
        {'x': 4, 'y': random.randint(1,10)},
        {'x': 5, 'y': random.randint(1,10)}
      ],
      'style': {
        'data': {
          'stroke': 'red'
        }
      }
    }
  ]
})

print json.dumps({
  'type': 'ReactComponent',
  'key': 'rc1',
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
