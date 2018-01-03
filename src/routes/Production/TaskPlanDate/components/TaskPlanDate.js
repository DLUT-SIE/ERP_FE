import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import moment from 'moment'
import util from 'utils'
import fetchAPI from 'api'
import { apis } from 'api/config'
import { Button, message } from 'antd'

import FilterBar from './FilterBar'
import TaskPlanDateModal from './TaskPlanDateModal'
import CustomTable from 'components/CustomTable'
import { PROCESS_DETAIL_STATUS } from 'const'

const columns = [
  'material_index', 'work_order_uid', 'process_id', 'process_name', 'work_hour', 'estimated_start_dt', 'estimated_finish_dt', 'action'
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
          if (_.isNull(record.estimated_start_dt)) {
            return (
              <Button
                type='primary'
                size='small'
                data-fields-value={JSON.stringify(record)}
                data-index={index}
                onClick={this.handleOpenEditModal}
              >
                添加时间
              </Button>
            )
          } else {
            return (
              <Button
                type='primary'
                size='small'
                data-fields-value={JSON.stringify(record)}
                data-index={index}
                onClick={this.handleOpenEditModal}
              >
                修改时间
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
  handleOpenEditModal = (e) => {
    const { fieldsValue, index } = e.target.dataset
    this.props.changeModalAction({
      visible: true,
      index: +index,
      fieldsValue: JSON.parse(fieldsValue)
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

  updatelist (query = this.props.location.query) {
    this.props.getListDataAction({
      params: query
    })
  }
  handleSave = (fieldsValue) => {
    let { url, method } = apis.ProductionAPI.updateProcessDetails
    url = url(fieldsValue.id)
    fieldsValue.status = PROCESS_DETAIL_STATUS.PLANED
    // todo: 这里需要手动更新plan_status状态吗
    fieldsValue.plan_status = true
    const api = {
      url,
      method
    }
    console.log(fieldsValue)
    fetchAPI(api, fieldsValue).then((repos) => {
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
    console.log('list', list)
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
          <TaskPlanDateModal
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
