"use strict";

console.render = function () {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  args.forEach(function (arg) {
    return console.log(JSON.stringify(arg, function(key, value) {
      if (typeof value === "function") return value.toString();
      return value;
    }));
  });
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnNvbGUuZXM2Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsUUFBUSxNQUFSLEdBQWlCLFlBQWE7b0NBQVQ7O0dBQVM7O0FBQzVCLE9BQUssT0FBTCxDQUFhO1dBQU8sUUFBUSxHQUFSLENBQVksS0FBSyxTQUFMLENBQWUsR0FBZixDQUFaO0dBQVAsQ0FBYixDQUQ0QjtDQUFiIiwiZmlsZSI6ImNvbnNvbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zb2xlLnJlbmRlciA9ICguLi5hcmdzKSA9PiB7XG4gIGFyZ3MuZm9yRWFjaChhcmcgPT4gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoYXJnKSkpXG59XG4iXX0=
