import './console'

console.render('# Table')

console.render('### Simple table', {
  type: 'Table',
  data: [
    {
      key: 1,
      value: 'one'
    },
    {
      key: 2,
      value: 'two'
    },
    {
      key: 3,
      value: 'three'
    }
  ]
})

console.render('### Large table', {
  type: 'Table',
  data: createRows(500)
})

console.render('### Inconsistent fields', {
  type: 'Table',
  data: [
    {
      name: 'Grant',
      gender: 'Male',
      age: 30
    },
    {
      name: 'Sarah',
      gender: 'Female'
    }
  ]
})

function createRows(numberOfRows){
  let rows = []
  for (let i = 1; i < numberOfRows; i++) {
    rows.push({
      id: i,
      task: 'Task ' + i,
      complete: Math.min(100, Math.round(Math.random() * 110)),
      priority : randomItem(['Critical', 'High', 'Medium', 'Low']),
      issueType : randomItem(['Bug', 'Improvement', 'Epic', 'Story']),
      startDate: randomDate(new Date(2015, 3, 1), new Date()),
      completeDate: randomDate(new Date(), new Date(2016, 0, 1))
    })
  }
  return rows
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString()
}
