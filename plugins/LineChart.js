'use babel'

import React, {Component, PropTypes} from 'react'
import {VictoryChart, VictoryLine} from 'victory'
import vm from 'vm'

class LineChart extends Component {

  render() {
    return (
      <VictoryChart>
        {this.props.data.map((item, index) => {
          let {
            data,
            y,
            style
          } = item
          if (y) y = vm.runInNewContext(y)
          return (
            <VictoryLine
              key={index}
              style={style}
              data={data}
              interpolation="basis"
              animate={{velocity: 0.02}}
              y={y}
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
      y: PropTypes.string.isRequired,
      style: PropTypes.object
    }),
    PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.number)).isRequired,
      style: PropTypes.object
    })
  ])).isRequired
}

export default LineChart
