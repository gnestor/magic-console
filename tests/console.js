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
      if (typeof value === 'function' || value instanceof RegExp) return value.toString()
      return value
    }))
  })
}
