'use strict';

console.render = function () {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var key = args.find(function (arg) {
    return typeof arg === 'string';
  });
  args.forEach(function (arg, index) {
    var payload = undefined;
    if (arg) {
      payload = {
        key: arg.key && arg.data ? arg.key : key ? '' + key + index : null,
        type: arg.type && arg.data ? arg.type : null,
        data: arg.data || arg
      };
    } else {
      payload = arg;
    }
    console.log(JSON.stringify(payload, function (key, value) {
      if (typeof value === 'function' || value instanceof RegExp) return value.toString();
      return value;
    }));
  });
};
