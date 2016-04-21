import './console'

console.render('# PieChart')

console.render('### Randomized pie chart', {
  type: 'PieChart',
  data: [
    {
      data: [
        {x: 0, y: Math.floor(Math.random() * 10)},
        {x: 1, y: Math.floor(Math.random() * 10)},
        {x: 2, y: Math.floor(Math.random() * 10)},
        {x: 3, y: Math.floor(Math.random() * 10)},
        {x: 4, y: Math.floor(Math.random() * 10)},
        {x: 5, y: Math.floor(Math.random() * 10)}
      ],
      style: {
        data: {
          stroke: 'transparent',
          opacity: 0.5
        }
      }
    }
  ]
})

console.render('### Simple animals', {
  type: 'PieChart',
  data: [
    {
      data: [
        {x: 'Cat', y: 62},
        {x: 'Dog', y: 91},
        {x: 'Fish', y: 55},
        {x: 'Bird', y: 55}
      ]
    }
  ]
})


console.render('### Dynamic animals', {
  type: 'PieChart',
  data: [
    {
      data: [
        {animal: 'Cat', pet: 45, wild: 17},
        {animal: 'Dog', pet: 85, wild: 6},
        {animal: 'Fish', pet: 55, wild: 0},
        {animal: 'Bird', pet: 15, wild: 40}
      ],
      x: 'animal',
      y:'data => data.pet + data.wild',
      animate: {velocity: 0.02}
    }
  ]
})

console.render('### Styled animals', {
  type: 'PieChart',
  data: [
    {
      data: [
        {x: 'Cat', y: 62},
        {x: 'Dog', y: 91},
        {x: 'Fish', y: 55},
        {x: 'Bird', y: 55}
      ],
      endAngle: 90,
      innerRadius: 140,
      padAngle: 5,
      startAngle: -90
    }
  ]
})
