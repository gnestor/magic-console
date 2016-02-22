import assert from 'assert'
import './console'

console.render('# Tests')

console.render('### true', true)

console.render('### false', false)

try {
  console.render('### assert(1 + 2 === 3)', assert(1 + 2 === 3))
} catch (error) {
  console.render('### assert(1 + 2 === 3)', error)
}

try {
  console.render('### assert(1 + 2 !== 3)', assert(1 + 2 !== 3))
} catch (error) {
  console.render('### assert(1 + 2 !== 3)',  error)
}

try {
  console.render('### assert.equal(1 + 2, 3)', assert.equal(1 + 2, 3))
} catch (error) {
  console.render('### assert.equal(1 + 2, 3)', error)
}

try {
  console.render('### assert.equal(1 + 2, 5)', assert.equal(1 + 2, 5))
} catch (error) {
  console.render('### assert.equal(1 + 2, 5)', error)
}
