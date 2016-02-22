import './console'

console.render('# Colors')

console.render('#FF5300')

console.render('### RGB', {
  r: 255,
  g: 83,
  b: 0
})

console.render('### RGBA', {
  r: 255,
  g: 83,
  b: 0,
  a: 0.5
})

console.render('### HSL', {
  h: 20,
  s: 1,
  l: 0.5
})

console.render('### HSLA', {
  h: 20,
  s: 1,
  l: 0.5,
  a: 0.5
})
