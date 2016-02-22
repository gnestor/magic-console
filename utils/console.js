'use strict';

console.render = function () {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var key = args.find(function (arg) {
    return typeof arg === 'string';
  });
  args.forEach(function (arg, index) {
    var payload = {
      key: arg.key && arg.data ? arg.key : key ? '' + key + index : null,
      type: arg instanceof Error || typeof arg === 'boolean' || arg === undefined ? 'Test' : arg.type && arg.data ? arg.type : null,
      data: arg === null || arg === undefined || arg === false ? '' + arg : arg.data ? arg.data : arg
    };
    console.log(JSON.stringify(payload, function (key, value) {
      if (typeof value === 'function' || value instanceof RegExp || value instanceof Date) return value.toString();
      if (value instanceof Error) return Object.assign({}, value, {
        message: value.message,
        stack: value.stack
      });
      return value;
    }));
  });
};
