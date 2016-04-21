console.render = (...args) => {
  let key = args.find(arg => typeof(arg) === 'string')
  args.forEach((arg, index) => {
    let payload = {
      key: arg ? (arg.key && arg.data ? arg.key : (key ? `${key}${index}` : null) : null) : null,
      type: arg ? (arg instanceof Error || typeof arg === 'boolean' || arg === undefined ? 'Test': (arg.type && arg.data ? arg.type : null) : null) : null,
      data: arg === null || arg === undefined || arg === false ? `${arg}` : (arg.data ? arg.data : arg)
    }
    console.log(JSON.stringify(payload, (key, value) => {
      if (typeof value === 'function' || value instanceof RegExp || value instanceof Date) return value.toString()
      if (value instanceof Error) return Object.assign({}, value, {
        message: value.message,
        stack: value.stack
      })
      return value
    }))
  })
}
