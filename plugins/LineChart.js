'use babel'

import React, {Component, PropTypes} from 'react'
import {VictoryChart, VictoryLine} from 'victory'
import vm from 'vm'

class LineChart extends Component {

  render() {
    return (
      <VictoryChart>
        {this.props.data.map((item, index) => {
          if (item.y) item.y = vm.runInNewContext(item.y)
          return (
            <VictoryLine
              key={index}
              interpolation="basis"
              animate={{velocity: 0.02}}
              {...item}
            />
          )
        })}
      </VictoryChart>
    )
  }

}

LineChart.propTypes = {
  data: PropTypes.arrayOf(React.PropTypes.oneOfType([
    PropTypes.shape({
      y: PropTypes.string.isRequired
    }),
    PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.number)).isRequired
    })
  ])).isRequired
}

export default LineChart
