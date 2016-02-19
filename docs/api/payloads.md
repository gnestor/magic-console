# Payloads

Payload refers to the output data that is sent from the source code to the output panel. Payloads can be simple log statements or complex data structures:

## Simple payload example

```js
console.log('This is a string payload')
```

## Complex payload example

```js
console.render('This is a line chart payload', {
  type: 'LineChart',
  data: [
    {
      y: '(data) => Math.sin(2 * Math.PI * data.x)',
      style: {
        data: {
          stroke: 'red'
        }
      }
    }
  ]
})
```

## *Stringification*

Payloads can be native data types such as string, number, and array, but some data types will not survive the trip from source code to output (depending on the runtime), such as error, regex, and date. In such cases, we can stringify the payload and Magic Console will parse the payload and convert it to a Javascript-equivalent type.

### Non-stringified example

```js
console.log({key: 'value'})
```

The above payload will output a string:

`'{ key: ‘value’ }'`

### Stringified example

```js
console.log(JSON.stringify({key: 'value'}))
```

However, when stringified, the same payload will output an object:

```js
{
  key: ‘value’
}
```

## Form

A payload can specify its key or type using the following form:

| Property | Description       | Data type                                     | Required |
| :------- | :---------------- | --------------------------------------------- | -------- |
| key      | Unique identifier | String, number                                | false    |
| type     | Plugin name       | String                                        | false    |
| data     | Output data       | String, number, boolean, array, object, null  | true     |

### Example

```js
console.log(JSON.stringify({
  key: 'object1',
  type: 'ObjectTree',
  data: {
    parent: {
      child: 'value'
    }
  }
}))
```

### Key

Key is a unique identifier that explicitly links a payload to a rendered output. If a payload has a key, it will be rendered once and any future outputs with the same key will replace the existing output with that key. If a payload doesn't have a key, it will be rendered multiple times.

#### Using `console.render`

`console.render` will automatically key a payload if a label is provided.

```js
console.render('This is a label', {
  parent: {
    child: 'value'
  }
})
```

### Type

Type refers to the name of specific plugin that should be used as the output's default plugin.

```js
console.render('This is an object payload', {
  type: 'ObjectTree',
  data: {
    parent: {
      child: 'value'
    }
  }
})
```

## magic-console-js

[magic-console-js](https://github.com/gnestor/magic-console-js) a Javascript library that provides syntactic sugar for payload generation. It provides 2 methods for the native `console` object.

### `console.render`

Using `console.render` in lieu of `console.log` has a few advantages:

* Payloads are [formed](#form)
* Payloads are [stringified](#stringification)
* Payloads are [keyed](#key)

#### Usage

```js
console.render('This is an object payload', {key: 'value'})
```

Notice that there is no need for `JSON.stringify()`. Additionally, providing a label, in this case `'This is an object payload'`, will automatically key any additional payload arguments using that label.

#### Source code

```js
console.render = (...args) => {
  let key = args.find(arg => typeof(arg) === 'string')
  args.forEach((arg, index) => {
    let payload
    if (arg) {
      payload = {
        key: arg.key && arg.data ? arg.key : key ? `${key}${index}` : null,
        type: arg.type && arg.data ? arg.type : null,
        data: arg.data || arg
      }
    } else {
      payload = arg
    }
    console.log(JSON.stringify(payload, (key, value) => {
      if (typeof value === 'function') return value.toString()
      return value
    }))
  })
}
```

### `console.assert`

Using `console.assert` in lieu of Javascript's native `console.assert` or `console.render` has a few advantages:

* Payloads are wrapped in a try/catch statement
* Booleans, `null` values, and `undefined` are preserved
* Payloads are given 'Test' type

#### Usage

```js
console.assert('should equal 4', 2 + 2 === 4)
```

#### Source code

```js
console.assert = (...args) => {
  let key = args.find(arg => typeof(arg) === 'string')
  args.forEach((arg, index) => {
    let payload
    if (arg) {
      try {
        payload = {
          key: arg.key && arg.data ? arg.key : key ? `${key}${index}` : null,
          type: arg.type && arg.data ? arg.type : null,
          data: arg.data || arg
        }
      } catch (error) {
        payload = {
          key: arg.key && arg.data ? arg.key : key ? `${key}${index}` : null,
          type: arg.type && arg.data ? arg.type : null,
          data: error
        }
      }
    } else {
      payload = arg
    }
    console.log(JSON.stringify(payload, (key, value) => {
      if (typeof value === 'function') return value.toString()
      return value
    }))
  })
}
```

### Support for other languages

`magic-console-js` is a Javascript implementation written in 40 lines of code. I encourage others to write implementations for other languages and expand on this implementation.
