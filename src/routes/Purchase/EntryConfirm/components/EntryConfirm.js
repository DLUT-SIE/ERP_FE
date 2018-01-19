import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import util from 'utils'
import { Link } from 'react-router-dom'
import { Button } from 'antd'

import FilterBar from './FilterBar.js'
import CustomTable from 'components/CustomTable'

const columns = [
  'entry_form_uid', 'create_dt', 'purchaser', 'action'
]
const typeMap = {
  0: {
    api: 'getWeldEntry',
    path: 'weld_entry'
  },
  1: {
    api: 'getSteelEntry',
    path: 'steel_entry'
  },
  2: {
    api: 'getAuxiliaryEntry',
    path: 'auxiliary_entry'
  },
  3: {
    api: 'getBroughtInEntry',
    path: 'brought_in_entry'
  }
}

class EntryConfirm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    const query = QueryString.parse(this.props.location.search)
    if (!_.isUndefined(query.type)) {
      this.props.getListDataAction({
        api: typeMap[query.type].api,
        callback: (data) => {
          const columns = this.buildColumns(query)
          this.props.addListDataAction({ data, columns })
        }
      })
    }
  }

  buildColumns (query) {
    const path = typeMap[query.type].path
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
              <Link to={`/purchase/entry_confirm/${path}/?id=${record.id}`}>
                待处理
              </Link>
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
        api: typeMap[query.type].api,
        callback: (data) => {
          const columns = this.buildColumns(query)
          this.props.addListDataAction({ data, columns })
        }
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
    const columns = _.get(mydata, 'columns', [])
    return (
      <div>
        <FilterBar
          fieldsValue={query}
          onSearch={this.handleSearch}
        />
        <CustomTable
          dataSource={list}
          columns={columns}
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
  getListDataAction: PropTypes.func.isRequired,
  addListDataAction: PropTypes.func.isRequired
}

export default EntryConfirm
