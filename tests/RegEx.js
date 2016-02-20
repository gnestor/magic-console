import './console'

console.render('# Regex', /.*/)

console.render('### /.*/', /.*/)

console.render('### /[A-z]+/', /[A-z]+/)

console.render('### Payload', {
  type: 'RegEx',
  data: /[A-z]+/
})
