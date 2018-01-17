import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import util from 'utils'
import fetchAPI from 'api'
import { apis } from 'api/config'
import { Link } from 'react-router-dom'
import { Button, message } from 'antd'

import FilterBar from './FilterBar.js'
import CustomTable from 'components/CustomTable'
import StatusModal from './StatusModal'

const columns = [
  'bidding_sheet_uid', 'bidding_sheet_status', 'history', 'change_status'
]

class StatusBackTrack extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this._columns = this.buildColumns()
  }

  componentDidMount () {
    this.props.getListDataAction({
      params: this._query()
    })
  }

  buildColumns () {
    return util.buildColumns(columns, {
      history: {
        render: (text, record, index) => {
          return (
            <Button
              type='primary'
              size='small'
            >
              <Link to={`/purchase/status_back_track/status_history/?uid=${record.uid}&id=${record.id}`}>
                查看
              </Link>
            </Button>
          )
        }
      },
      change_status: {
        render: (text, record, index) => {
          return (
            <Button
              type='success'
              size='small'
              data-fields-value={JSON.stringify(record)}
              onClick={this.handleOpenStatusModal}
            >
              更改状态
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
    this.props.getListDataAction({
      params: query
    })
  }

  handleChangeTable = (pagination, filters, sorter) => {
    this.updateQuery({
      page: pagination.current > 1 ? pagination.current : ''
    })
  }

  handleOpenStatusModal = (e) => {
    let { fieldsValue } = e.target.dataset
    fieldsValue = JSON.parse(fieldsValue)
    this.props.changeStatusModalAction({
      visible: true,
      fieldsValue: {
        bidding_sheet_id: fieldsValue.id,
        bidding_sheet: fieldsValue.uid,
        original_status_id: fieldsValue.status,
        original_status: fieldsValue.status_name
      }
    })
  }

  handleCloseStatusModal = () => {
    this.props.changeStatusModalAction({
      visible: false
    })
  }

  handleSaveStatusChange = (fieldsValue) => {
    fetchAPI(apis.PurchaseAPI.addStatusChanges, fieldsValue).then((repos) => {
      message.success('更改成功！')
      this.handleCloseStatusModal()
      this.updatelist()
    })
  }

  render () {
    const { status, location } = this.props
    const query = QueryString.parse(location.search)
    const mydata = status.toJS()
    const list = _.get(mydata, 'list', [])
    const loading = _.get(mydata, 'loading')
    const pagination = _.get(mydata, 'pagination', {})
    const modal = _.get(mydata, 'modal', {})
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
        { modal.visible &&
          <StatusModal
            {...modal}
            onOk={this.handleSaveStatusChange}
            onCancel={this.handleCloseStatusModal}
          />
        }
      </div>
    )
  }
}

StatusBackTrack.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getListDataAction: PropTypes.func.isRequired,
  changeStatusModalAction: PropTypes.func.isRequired
}

export default StatusBackTrack
