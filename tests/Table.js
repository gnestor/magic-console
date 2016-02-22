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

function createRows(numberOfRows){
  let rows = []
  for (let i = 1; i < numberOfRows; i++) {
    rows.push({
      id: i,
      task: 'Task ' + i,
      complete: Math.min(100, Math.round(Math.random() * 110)),
      priority : ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
      issueType : ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)],
      startDate: randomDate(new Date(2015, 3, 1), new Date()),
      completeDate: randomDate(new Date(), new Date(2016, 0, 1))
    })
  }
  return rows
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString()
}
