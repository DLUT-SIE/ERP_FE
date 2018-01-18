import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import util from 'utils'
// import { Link } from 'react-router-dom'
import { Button } from 'antd'

import FilterBar from './FilterBar.js'
import CustomTable from 'components/CustomTable'

const columns = [
  'entry_form_uid', 'create_dt', 'purchaser', 'action'
]
const apiMap = {
  0: 'getWeldEntry',
  1: 'getSteelEntry',
  2: 'getAuxiliaryEntry',
  3: 'getBroughtInEntry'
}

class EntryConfirm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this._columns = this.buildColumns()
  }

  componentDidMount () {
    const query = QueryString.parse(this.props.location.search)
    if (!_.isUndefined(query.type)) {
      this.props.getListDataAction({
        params: this._query(),
        api: apiMap[query.type]
      })
    }
  }

  buildColumns () {
    return util.buildColumns(columns, {
      create_dt: {
        render: (text, record, index) => {
          return record.create_dt && record.create_dt.split('T')[0]
        }
      },
      action: {
        render: (text, record, index) => {
          return (
            <Button
              type='primary'
              size='small'
              data-id={record.id}
            >
              待处理
            </Button>
          )
        }
      }
    })
  }

  handleSearch = (searchValue) => {
    this.updateQuery({
      page: 1,
      ...searchValue
    })
  }

  _query (query = {}) {
    const oldQuery = QueryString.parse(this.props.location.search)
    return Object.assign({
      page: 1
    }, oldQuery, query)
  }

  updateQuery (newQuery = {}) {
    let { pathname } = this.props.location
    let mergeQuery = this._query(newQuery)
    let filterQuery = _.forEach(mergeQuery, (item, key) => {
      if (item === '' || _.isUndefined(item)) {
        delete mergeQuery[key]
      }
    })
    const search = QueryString.stringify(filterQuery)
    this.props.history.push({
      pathname: pathname,
      search
    })
    this.updatelist(filterQuery)
    return filterQuery
  }

  updatelist (query = QueryString.parse(this.props.location.search)) {
    if (!_.isUndefined(query.type)) {
      this.props.getListDataAction({
        params: query,
        api: apiMap[query.type]
      })
    }
  }

  handleChangeTable = (pagination, filters, sorter) => {
    this.updateQuery({
      page: pagination.current > 1 ? pagination.current : ''
    })
  }

  render () {
    const { status, location } = this.props
    const query = QueryString.parse(location.search)
    const mydata = status.toJS()
    const list = _.get(mydata, 'list', [])
    const loading = _.get(mydata, 'loading')
    const pagination = _.get(mydata, 'pagination', {})
    return (
      <div>
        <FilterBar
          fieldsValue={query}
          onSearch={this.handleSearch}
        />
        <CustomTable
          dataSource={list}
          columns={this._columns}
          loading={loading}
          pagination={pagination}
          size='middle'
          onChange={this.handleChangeTable}
        />
      </div>
    )
  }
}

EntryConfirm.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getListDataAction: PropTypes.func.isRequired
}

export default EntryConfirm
