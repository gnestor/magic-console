import path from 'path'
import './console'

console.render('# ReactComponent')

console.render('## EditableTable', {
  type: 'ReactComponent',
  data: {
    path: path.join(__dirname, 'ReactComponent', 'EditableTable.js'),
    props: {
      data: [
        {x: 0, y: Math.floor(Math.random() * 10)},
        {x: 1, y: Math.floor(Math.random() * 10)},
        {x: 2, y: Math.floor(Math.random() * 10)},
        {x: 3, y: Math.floor(Math.random() * 10)},
        {x: 4, y: Math.floor(Math.random() * 10)},
        {x: 5, y: Math.floor(Math.random() * 10)}
      ],
      handleSelect: '(rows) => console.log(rows)'
    }
  }
})
