import './console'

console.render('# LaTeX')

console.render('### Square root', {
  type: 'LaTeX',
  data: `$$c = \\sqrt{a^2 + b^2}$$`
})

console.render('### Function', {
  type: 'LaTeX',
  data: `$$F(k) = \\int_{-\\infty}^{\\infty} f(x) e^{2\pi i k} dx$$`
})
