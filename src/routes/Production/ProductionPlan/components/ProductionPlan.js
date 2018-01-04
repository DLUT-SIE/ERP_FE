import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import moment from 'moment'
import util from 'utils'
import fetchAPI from 'api'
import { apis } from 'api/config'
import { Button, message, Popconfirm } from 'antd'

import FilterBar from './FilterBar'
import ProductionPlanModal from './ProductionPlanModal'
import CustomTable from 'components/CustomTable'

const columns = [
  'work_order', 'client', 'delivery_dt', 'product', 'production_count', 'output_value', 'output',
  'remarks', 'status_description', 'plan_dt', 'action'
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
      plan_dt: {
        render: (text, record, index) => {
          return moment(record.plan_dt).format('YYYY-MM-DD')
        }
      },
      action: {
        render: (text, record, index) => {
          return (
            <span>
              <Button
                type='primary'
                size='small'
                data-fields-value={JSON.stringify(record)}
                data-index={index}
                onClick={this.handleOpenEditModal}
              >
              修改
            </Button>
              <span className='ant-divider' />
              <Popconfirm
                title='确定删除吗？'
                onConfirm={this.handleDelete(record.id)}
                okText='确定'
                cancelText='取消'
              >
                <Button
                  type='primary'
                  size='small'
                >
                  删除
                </Button>
              </Popconfirm>
            </span>
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
    const { fieldsValue, index } = e.target.dataset
    this.props.changeModalAction({
      visible: true,
      index: +index,
      fieldsValue: JSON.parse(fieldsValue)
    })
  }
  handleDelete = (id) => {
    return (e) => {
      fetchAPI(apis.ProductionAPI.deleteProductionPlan, { id: id }).then((repos) => {
        message.success('删除成功！')
        this.updatelist()
      })
    }
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

  updatelist (query = this.props.location.query) {
    this.props.getListDataAction({
      params: query
    })
  }
  handleSave = (fieldsValue) => {
    let { url, method } = apis.ProductionAPI.updateProductionPlan
    console.log(fieldsValue)
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
    // todo: 后台，新建逻辑
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
          <ProductionPlanModal
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
