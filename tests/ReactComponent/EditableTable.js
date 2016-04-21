'use babel'

import React, {Component, PropTypes} from 'react'
import ReactDataGrid from '../../plugins/node_modules/react-data-grid/addons'

class EditableTable extends Component {

  constructor(props) {
    super(props)
    this.state = {
      rows: [],
      selected: []
    }
    this.handleSort = this.handleSort.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
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
        return Object.keys(row).reduce((columns, key) => ([...columns.filter(column => column.key !== key), {
          key,
          name: key,
          resizable: true,
          sortable: true,
          editable: true
        }]), columns)
      } else {
        return {
          key: 'default',
          name: ''
        }
      }
    }, [])
    let rows = this.state.rows.map(row => (
      columns.reduce((row, column) => {
        let value = row[column.key]
        if (typeof row[column.key] === 'object') value = `${row[column.key]}`
        if (!row[column.key]) value = ''
        return {
          ...row,
          [column.key]: value
        }
      }, row)
    ))
    return <ReactDataGrid
      columns={columns}
      rowGetter={index => rows[index]}
      rowKey="key"
      rowsCount={this.state.rows.length}
      enableRowSelect="multi"
      minHeight={(this.state.rows.length + 1) * 35}
      onGridSort={this.props.handleSort || this.handleSort}
      onRowSelect={this.props.handleSelect || this.handleSelect}
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

  handleSelect(rows) {
    // console.log(rows)
    this.setState({selected: rows})
  }

}

EditableTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default EditableTable
