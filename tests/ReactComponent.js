import path from 'path'
import './console'

console.render('# ReactComponent')

console.render('## EditableTable', {
  type: 'ReactComponent',
  data: {
    path: path.join(__dirname, 'ReactComponent', 'EditableTable.js'),
    props: {
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
      ],
      handleSelect: '(rows) => console.log(rows)'
    }
  }
})
