'use babel'

import React, {Component, PropTypes} from 'react'
import {VictoryChart, VictoryPie} from 'victory'
import vm from 'vm'

class PieChart extends Component {

  render() {
    return (
      <div>
        {this.props.data.map((item, index) => {
          let data = parseFunctions(item)
          return <VictoryPie
            key={index}
            animate={{velocity: 0.02}}
            {...data}
          />
        })}
      </div>
    )
  }

}

PieChart.propTypes = {
  data: PropTypes.arrayOf(React.PropTypes.oneOfType([
    PropTypes.shape({
      y: PropTypes.string.isRequired
    }),
    PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.object).isRequired
    })
  ])).isRequired
}

function parseFunctions(data) {
	return Object.keys(data).reduce((data, index) => {
		if (data[index] instanceof Array) return {
      ...data,
      [index]: data[index].map(index => parseFunctions(index))
    }
		if (typeof data[index] === 'object') return {
      ...data,
      [index]: parseFunctions(data[index])
    }
		return {
      ...data,
      [index]: typeof data[index] === 'string' ? /\=\>/.test(data[index]) ? vm.runInNewContext(data[index]) : data[index] : data[index]
    }
	}, data)
}

export default PieChart
