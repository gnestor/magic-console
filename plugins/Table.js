'use babel'

import React, {Component, PropTypes} from 'react'
import ReactDataGrid from 'react-data-grid/addons'

class Table extends Component {

  constructor(props) {
    super(props)
    this.state = {
      rows: []
    }
    this.handleSort = this.handleSort.bind(this)
  }

  componentDidMount() {
    this.setState({rows: this.props.data})
  }

  componentWillReceiveProps(nextProps) {
    this.setState({rows: nextProps.data})
  }

  render() {
    let columns = this.state.rows.reduce((columns, row) => {
      if (typeof row === 'object') {
        Object.keys(row).forEach(key => {
          if (!columns.find(column => column.key === key)) columns.push({
            key,
            name: key,
            resizable: true,
            sortable: true
          })
        })
      } else {
        columns = {
          key: 'default',
          name: ''
        }
      }
      return columns
    }, [])
    return <ReactDataGrid
      columns={columns}
      rowGetter={index => this.state.rows[index]}
      rowsCount={this.state.rows.length}
      minHeight={(this.state.rows.length + 1) * 35}
      onGridSort={this.handleSort}
    />
  }

  handleSort(column, direction) {
    if (direction !== 'NONE') {
      let rows = this.state.rows.sort((a, b) => {
        if (direction === 'ASC') {
          return (a[column] > b[column]) ? 1 : -1
        } else if (direction === 'DESC') {
          return (a[column] < b[column]) ? 1 : -1
        }
      })
      this.setState({rows})
    }
  }

}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Table
