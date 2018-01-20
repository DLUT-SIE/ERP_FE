import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import moment from 'moment'
import util from 'utils'
import fetchAPI from 'api'
import { apis } from 'api/config'
import { Button, message } from 'antd'
import { PROCESS_DETAIL_STATUS } from 'const'

import FilterBar from './FilterBar'
import TaskConfirmModal from './TaskConfirmModal'
import CustomTable from 'components/CustomTable'

const columns = [
  'material_index', 'work_order_uid', 'process_id', 'process_name', 'work_hour', 'estimated_start_dt', 'estimated_finish_dt', 'work_group_name', 'action'
]

class ProductionPlan extends React.Component {
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
      estimated_start_dt: {
        render: (text, record, index) => {
          return record.estimated_start_dt && moment(record.estimated_start_dt).format('YYYY-MM-DD')
        }
      },
      estimated_finish_dt: {
        render: (text, record, index) => {
          return record.estimated_finish_dt && moment(record.estimated_finish_dt).format('YYYY-MM-DD')
        }
      },
      action: {
        render: (text, record, index) => {
          if (record.status === PROCESS_DETAIL_STATUS.INSPECTED) {
            return (
              <Button
                type='primary'
                size='small'
                data-id={record.id}
                data-index={index}
                onClick={this.handleOpenEditModal}
              >
                查看
              </Button>
            )
          } else if (record.status === PROCESS_DETAIL_STATUS.CONFIRMED) {
            return (
              <Button
                type='primary'
                size='small'
                data-id={record.id}
                data-index={index}
                onClick={this.handleOpenEditModal}
              >
                检查
              </Button>
            )
          } else {
            return (
              <Button
                type='primary'
                size='small'
                data-index={index}
                data-id={record.id}
                onClick={this.handleConfirm}
              >
                确认
              </Button>
            )
          }
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
  handleConfirm = (e) => {
    const { id } = e.target.dataset
    fetchAPI(apis.ProductionAPI.updateProcessDetails, { status: PROCESS_DETAIL_STATUS.CONFIRMED, confirm_status: true }, { id: id }).then((repos) => {
      message.success('修改成功！')
      this.props.getListDataAction({
        params: this._query()
      })
    })
  }
  fetchProcessDetailItem = (id, cb) => {
    fetchAPI(apis.ProductionAPI.getProcessDetailItem, null, { id: id }).then((repos) => {
      cb(repos)
    })
  }
  handleOpenEditModal = (e) => {
    const { id, index } = e.target.dataset
    this.fetchProcessDetailItem(id, (repos) => {
      this.props.changeModalAction({
        visible: true,
        index: +index,
        fieldsValue: repos
      })
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
    fetchAPI(apis.ProductionAPI.updateProcessDetails, fieldsValue, { id: fieldsValue.id }).then((repos) => {
      this.handleCloseModal()
      message.success('修改成功！')
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
    // list.work_group_list = { work_group: list.work_group, select_work_groups: list.select_work_groups }
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
          <TaskConfirmModal
            onOk={this.handleSave}
            onCancel={this.handleCloseModal}
            {...modal}
          />
        }
      </div>
    )
  }
}

ProductionPlan.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getListDataAction: PropTypes.func.isRequired,
  changeModalAction: PropTypes.func.isRequired
}

export default ProductionPlan
