# Core plugins

* [Color](#color)
* [Latex](#latex)
* [LineChart](#linechart)
* [Markdown](#markdown)
* [Mermaid](#mermaid)
* [PieChart](#piechart)
* [ReactComponent](#reactcomponent)
* [Regex](#regex)
* [Table](#table)
* [Test](#test)

## Color

![](/docs/plugins/Color.png)

### Usage
```js
console.render('Hex', '#FF5300')
console.render('RGB', {
  r: 255,
  g: 83,
  b: 0
})
console.render('HSL', {
  h: 20,
  s: 1,
  l: 0.5
})
```

#### Prop types
```js
Color.propTypes = {
  data: PropTypes.oneOfType([
    (props, propName, componentName) => {
      if (typeof props[propName] !== 'string' || !/#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(props[propName])) return new Error('Validation failed!')
      return null
    },
    PropTypes.shape({
      r: PropTypes.number.isRequired,
      g: PropTypes.number.isRequired,
      b: PropTypes.number.isRequired,
      a: PropTypes.number
    }),
    PropTypes.shape({
      h: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      s: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      l: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      a: PropTypes.number
    })
  ]).isRequired
}
```

## Latex

![](/docs/plugins/Latex.png)

### Usage
```js
console.render('Square root', `$$c = \\sqrt{a^2 + b^2}$$`)
console.render('Function', `$$F(k) = \\int_{-\\infty}^{\\infty} f(x) e^{2\pi i k} dx$$`)
```

#### Prop types
```js
Latex.propTypes = {
  data: (props, propName, componentName) => {
    if (!/\$\$[\s\S]+?\$\$|\$[\s\S]+?\$/g.test(props[propName])) return new Error('Validation failed!')
    return null
  }
}
```

## LineChart

![](/docs/plugins/LineChart.png)

### Usage
```js
console.render('Sine wave line chart', [
  {
    y: '(data) => Math.sin(2 * Math.PI * data.x)',
    style: {
      data: {
        stroke: 'red'
      }
    }
  }
])
```

#### Prop types
```js
LineChart.propTypes = {
  data: PropTypes.arrayOf(React.PropTypes.oneOfType([
    PropTypes.shape({
      y: PropTypes.string.isRequired
    }),
    PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.number)).isRequired
    })
  ])).isRequired
}
```

## Markdown

![](/docs/plugins/Markdown.png)

### Usage
```js
console.render(`# h1 Heading
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading
`)
```

#### Prop types
```js
Markdown.propTypes = {
  data: PropTypes.string.isRequired
}
```

## Mermaid

![](/docs/plugins/Mermaid.png)

### Usage
```js
console.render('Sequence diagram', `sequenceDiagram
  participant Alice
  participant Bob
  Alice->>John: Hello John, how are you?
  loop Healthcheck
      John->>John: Fight against hypochondria
  end
  Note right of John: Rational thoughts <br/>prevail...
  John-->>Alice: Great!
  John->>Bob: How about you?
  Bob-->>John: Jolly good!`)
```

#### Prop types
```js
Mermaid.propTypes = {
  data: (props, propName, componentName) => {
    if (!/^(sequenceDiagram|graph|gantt)/.test(props[propName])) return new Error('Validation failed!')
    return null
  }
}
```

## PieChart

![](/docs/plugins/PieChart.png)

### Usage
```js
console.render('### Simple animals', {
  type: 'PieChart',
  data: [
    {
      data: [
        {x: 'Cat', y: 62},
        {x: 'Dog', y: 91},
        {x: 'Fish', y: 55},
        {x: 'Bird', y: 55}
      ]
    }
  ]
})
console.render('### Dynamic animals', {
  type: 'PieChart',
  data: [
    {
      data: [
        {animal: 'Cat', pet: 45, wild: 17},
        {animal: 'Dog', pet: 85, wild: 6},
        {animal: 'Fish', pet: 55, wild: 0},
        {animal: 'Bird', pet: 15, wild: 40}
      ],
      x: 'animal',
      y:'data => data.pet + data.wild',
      animate: {velocity: 0.02}
    }
  ]
})
```

#### Prop types
```js
PieChart.propTypes = {
  data: PropTypes.arrayOf(React.PropTypes.oneOfType([
    PropTypes.shape({
      y: PropTypes.string.isRequired
    }),
    PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.object).isRequired
    })
  ])).isRequired
}
```

## ReactComponent

![](/docs/plugins/ReactComponent.png)

### Usage
```js
console.render('## EditableTable', {
  type: 'ReactComponent',
  data: {
    path: path.join(__dirname, 'ReactComponent', 'EditableTable.js'),
    props: {
      data: [
        {
          key: 1,
          value: 'one'
        },
        {
          key: 2,
          value: 'two'
        },
        {
          key: 3,
          value: 'three'
        }
      ],
      handleSelect: '(rows) => console.log(rows)'
    }
  }
})
```

#### Prop types
```js
ReactComponent.propTypes = {
  data: PropTypes.shape({
    path: PropTypes.string.isRequired,
    props: PropTypes.object
  }).isRequired
}
```

## Regex

![](/docs/plugins/Regex.png)

### Usage
```js
console.render('All characters', /.*/)
console.render('All alphanumeric characters', /[A-z]+/)
```

#### Prop types
```js
Regex.propTypes = {
  data: (props, propName, componentName) => {
    if (!/^\/.*\/[gimy]?$/.test(props[propName])) return new Error('Validation failed!')
    return null
  }
}
```

## Table

![](/docs/plugins/Table.png)

### Usage
```js
console.render('Simple table', [
  {
    key: 1,
    value: 'one'
  },
  {
    key: 2,
    value: 'two'
  },
  {
    key: 3,
    value: 'three'
  }
])
```

#### Prop types
```js
Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
}
```

## Test

![](/docs/plugins/Test.png)

### Usage
```js
try {
  console.render('Passed', assert(1 + 2 === 3))
} catch (error) {
  console.render('Failed', error)
}
```

#### Prop types
```js
Test.propTypes = {
  data: PropTypes.oneOfType([
    // Error type
    (props, propName, componentName) => {
      if (!(props[propName] instanceof Error)) return new Error('Validation failed!')
      return null
    },
    // Error string
    (props, propName, componentName) => {
      if (!/Error/.test(props[propName])) return new Error('Validation failed!')
      return null
    },
    PropTypes.bool,
    // Boolean string
    (props, propName, componentName) => {
      if (!/true|false/i.test(props[propName])) return new Error('Validation failed!')
      return null
    },
    // Undefined type/string
    (props, propName, componentName) => {
      if (typeof props[propName] !== 'undefined' && props[propName] !== 'undefined') return new Error('Validation failed!')
      return null
    },
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      stack: PropTypes.string.isRequired
    })
  ]).isRequired
}
```
