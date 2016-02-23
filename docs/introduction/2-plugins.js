import '../../utils/console'

console.render(`# 2. Plugins`)

console.render(`Plugins are React components written in Javascript that render output data to DOM. React provides an elegant way to declare DOM as a function of state (or *props*). Plugins have 2 required methods: \`render\` and \`propTypes\`. The render method is used to declare how the DOM should render given the component's state/props and propTypes is used to declare what type of data the component can accept. Magic Console will try to infer the type of an un-typed payload and render the output using the appripriate plugin, but a payload can explicitly declare its type and in turn the default plugin to be used.`)

console.render(`## Core plugins`)

console.render(`### Color

![](/docs/introduction/Color.png)

### Usage
\`\`\`
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
\`\`\`

#### Prop types
\`\`\`
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
\`\`\`
`)
