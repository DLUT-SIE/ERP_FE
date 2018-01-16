import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import util from 'utils'
import fetchAPI from 'api'
import { apis } from 'api/config'
import { Button, message } from 'antd'
import moment from 'moment'

import FilterBar from './FilterBar'
import HumitureRecordModal from './HumitureRecordModal'
import CustomTable from 'components/CustomTable'

const columns = [
  'create_dt', 'keeper', 'action'
]

class WeldHumitureRecord extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this._columns = this.buildColumns()
  }

  componentDidMount () {
    this.props.getListDataAction({
      params: this._query()
    })
    // todo:这里需要获取要求的温湿度
    this.require_temp = 60
    this.require_humid = 70
  }
  buildColumns () {
    return util.buildColumns(columns, {
      create_dt:{
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
  handleOpenEditModal = (e) => {
    const { id } = e.target.dataset
    fetchAPI(apis.InventoryAPI.getWeldHumitureRecordDetail, null, { id: id }).then((resp) => {
      this.props.changeModalAction({
        visible: true,
        fieldsValue: resp
      })
    }
    )
  }
  handleAddRecords = (e) => {
    this.props.changeModalAction({
      visible: true,
      fieldsValue: {}
    })
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
      if (item === '' || _.isUndefined(item) || _.isNull(item)) {
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
  handleSave = (fieldsValue) => {
    if (fieldsValue.id) {
      fetchAPI(apis.InventoryAPI.updateWeldHumitureRecord, fieldsValue, { id : fieldsValue.id }).then((repos) => {
        this.handleCloseModal()
        message.success('修改成功！')
        this.props.getListDataAction({
          params: this._query()
        })
      })
      return
    }
    fetchAPI(apis.InventoryAPI.createWeldHumitureRecord, fieldsValue).then((repos) => {
      this.handleCloseModal()
      message.success('新建成功！')
      this.props.getListDataAction({
        params: this._query()
      })
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
          onAddClick={this.handleAddRecords}
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
          <HumitureRecordModal
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

WeldHumitureRecord.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getListDataAction: PropTypes.func.isRequired,
  changeModalAction: PropTypes.func.isRequired
}

export default WeldHumitureRecord
