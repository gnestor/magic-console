require('./console')

console.render('# Title')

console.render({
  key: 1,
  data: '**Key 1**'
})

console.render({
  key: 2,
  data: Math.sqrt(4)
})

console.render({
  key: 3,
  data: {
    key: {
      key: '3'
    }
  }
})

console.render('## 4', 'Inferred key \'4\'')
