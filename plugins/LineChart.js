'use babel'

import React, {Component, PropTypes} from 'react'
import {VictoryChart, VictoryLine} from 'victory'
import vm from 'vm'

class LineChart extends Component {

  render() {
    return (
      <VictoryChart
        animate={{
          duration: 400,
          easing: 'linear'
        }}
      >
        {this.props.data.map((item, index) => {
          if (item.y) item.y = vm.runInNewContext(item.y)
          return (
            <VictoryLine
              key={index}
              interpolation="basis"
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
