import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import util from 'utils'
import moment from 'moment'
import { Button, message } from 'antd'
import { apis } from 'api/config'
import fetchAPI from 'api'

import SteelInventoryAccountModal from './InventoryAccountModal'
import FilterBar from './FilterBar'
import CustomTable from 'components/CustomTable'

const columns = [
  'work_order_uid', 'standard_number', 'specification', 'material', 'entry_dt', 'material_number', 'entry_uid', 'category', 'action'
]

class SteelEntryAccount extends React.Component {
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
      entry_dt:{
        render: (text, record, index) => {
          return moment(record.create_dt).format('YYYY-MM-DD')
        }
      },
      action: {
        render: (text, record, index) => {
          return (
            <Button
              type='primary'
              size='small'
              data-fields-value={JSON.stringify(record)}
              data-index={index}
              data-id={record.id}
              onClick={this.handleOpenEditModal}
            >
              查看详情
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
  // update
  handleOpenEditModal = (e) => {
    const { id } = e.target.dataset
    let { url, method } = apis.InventoryAPI.getSteelInventoryAccountDetail
    url = url(id)
    const api = {
      url,
      method
    }
    fetchAPI(api, id).then((resp) => {
      this.props.changeModalAction({
        visible: true,
        fieldsValue: resp
      })
    }
    )
  }
  // need update
  handleSave = (fieldsValue) => {
    if (fieldsValue.id) {
      let { url, method } = apis.InventoryAPI.updateSteelInventoryAccount
      url = url(fieldsValue.id)
      const api = {
        url,
        method
      }
      fetchAPI(api, fieldsValue).then((repos) => {
        this.handleCloseModal()
        message.success('修改成功！')
        this.props.getListDataAction({
          params: this._query()
        })
      })
    }
  }
  handleCloseModal = (e) => {
    this.props.changeModalAction({
      visible: false
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
      if (item === '' || _.isUndefined(item) || _.isNull(item) || key === 'status') {
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

  updatelist (query = this.props.location.query) {
    this.props.getListDataAction({
      params: query
    })
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
        <SteelInventoryAccountModal
          onOk={this.handleSave}
          onCancel={this.handleCloseModal}
          requireTemp={this.require_temp}
          requireHumid={this.require_humid}
          {...modal}
        />
        }
      </div>
    )
  }
}

SteelEntryAccount.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getListDataAction: PropTypes.func.isRequired,
  changeModalAction: PropTypes.func.isRequired
}

export default SteelEntryAccount
