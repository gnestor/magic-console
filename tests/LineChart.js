import React from 'react'
import ReactDOM from 'react-dom/server'
import LineChart from '../plugins/LineChart'
import './console'

// console.render(ReactDOM.renderToString(<LineChart data={[
//   {
//     data: [
//       {x: 0, y: Math.floor(Math.random() * 10)},
//       {x: 1, y: Math.floor(Math.random() * 10)},
//       {x: 2, y: Math.floor(Math.random() * 10)},
//       {x: 3, y: Math.floor(Math.random() * 10)},
//       {x: 4, y: Math.floor(Math.random() * 10)},
//       {x: 5, y: Math.floor(Math.random() * 10)}
//     ]
//   }
// ]} />))

// console.render(ReactDOM.renderToString(<LineChart data={[
//   {
//     y: (x) => Math.sin(2 * Math.PI * x)
//   }
// ]} />))

// // Static random line chart
// console.render('### Plot some results', {
//   type: 'LineChart',
//   data: [
//     {
//       data: [
//         {x: 0, y: Math.floor(Math.random() * 10)},
//         {x: 1, y: Math.floor(Math.random() * 10)},
//         {x: 2, y: Math.floor(Math.random() * 10)},
//         {x: 3, y: Math.floor(Math.random() * 10)},
//         {x: 4, y: Math.floor(Math.random() * 10)},
//         {x: 5, y: Math.floor(Math.random() * 10)}
//       ],
//       style: {
//         data: {
//           stroke: 'red'
//         }
//       }
//     }
//   ],
//   key: 'LineChartComponent'
// })

// Dynamic random line chart
let i = 1
let run = setInterval(() => {
  console.render('### Plot some results', {
    type: 'LineChart',
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
            stroke: 'red'
          }
        }
      }
    ],
    key: 'LineChartComponent'
  })
  i++
  if (i === 10) stop()
}, 1500)
function stop() {
  clearInterval(run)
}

// // Static sine wave line chart
// console.render('### Plot some results', {
//   type: 'LineChart',
//   data: [
//     {
//       y: '(data) => Math.sin(2 * Math.PI * data.x)',
//       style: {
//         data: {
//           stroke: 'red'
//         }
//       }
//     }
//   ],
//   key: 'LineChartComponent'
// })

// // Dynamic sine wave line chart
// let i = 1
// let run = setInterval(() => {
//   console.render('### Plot some results', {
//     type: 'LineChart',
//     data: [
//       {
//         y: `(data) => Math.exp(${-i} * data.x) *
//       Math.sin(2 * ${i} * Math.PI * data.x)`,
//         style: {
//           data: {
//             stroke: 'red'
//           }
//         }
//       }
//     ]
//   })
//   i++
//   if (i === 6) stop()
// }, 900)
// function stop() {
//   clearInterval(run)
// }
