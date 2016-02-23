import '../../utils/console'

console.render(`# 1. stdio`)

console.render(`*stdio* refers to stdin (standard in), stdout (standard out), and stder (standard error) which allow programs to communicate with each other. stdio is universal meaning that all programming languages support it across all platforms. Magic Console uses stdio to allow source code to communicate with the DOM and visualize the output of the source code in real-time.
In this example, we will explore how to use Javascript's \`console\` method to output data to stdout. We will use the term *payload* to refer to the output data.`)

console.render(`## console.log`)

console.render(`The following will output a simple string to stdout:
\`\`\`
console.log('This is a string payload')
\`\`\``)

console.log('This is a string payload')

console.render(`We can output other data types, such as numbers, objects, arrays, etc.`)

console.render(`\`\`\`
console.log(123)
\`\`\``)

console.log(123)

console.render(`\`\`\`
console.log({
  parent: {
    child: 'value'
  }
})
\`\`\``)

console.log({
  parent: {
    child: 'value'
  }
})

console.render(`\`\`\`
console.log([1,2,3])
\`\`\``)

console.log([1,2,3])

console.render(`Notice that the outputs above are being rendered as strings. This is because stdout is plain text, so native data types are not preserved. Fortunately, we have some data exchange formats that are widely supported. One such format is [JSON](http://www.json.org). We can use Javascript's native \`JSON.stringify\` method to convert native Javsacript data types such as objects and arrays into strings for stdout and parsed back into objects and arrays for rendering:`)

console.log(`\`\`\`
console.log(JSON.stringify({
  parent: {
    child: 'value'
  }
}))
\`\`\``)

console.log(JSON.stringify({
  parent: {
    child: 'value'
  }
}))

console.log(`\`\`\`
console.log(JSON.stringify([1,2,3]))
\`\`\``)

console.log(JSON.stringify([1,2,3]))

console.render('## console.render')

console.render(`\`console.render\` is a method that is provided by the \`magic-console-js\` library. It provides a convenient wrapper around \`console.log\` that will automatically *stringify* and *key* your payload.`)

console.render(`\`\`\`
console.render(\`Array example\`, [1,2,3])
\`\`\``, JSON.stringify([1,2,3]))
