import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import util from 'utils'
import fetchAPI from 'api'
import { apis } from 'api/config'
import { Button, Popconfirm, message } from 'antd'

import FilterBar from 'components/WorkOrderFilterBar'
import AddBar from 'components/AddBar'
import CustomTable from 'components/CustomTable'
import TableInfo from 'components/TableInfo'
// import AuxiliaryQuotaModal from './AuxiliaryQuotaModal'
import './DetailedList.less'

const columns1 = [
  'ticket_number', 'drawing_number', 'lib_name', 'count', 'material', 'weight_alias',
  'process_routes', 'remark', 'action'
]
const columns2 = [
  'ticket_number', 'drawing_number', 'lib_name', 'count', 'material', 'weight_alias',
  'process_routes', 'collaborative_content', 'action'
]
const typeMap = {
  'bought_in_items': {
    getApi: 'getBoughtInItems',
    updateApi: 'updateBoughtInItems',
    deleteApi: 'deleteBoughtInItems',
    columns: columns1
  },
  'first_feeding_items': {
    getApi: 'getFirstFeedingItems',
    updateApi: 'updateFirstFeedingItems',
    deleteApi: 'deleteFirstFeedingItems',
    columns: columns1
  },
  'cooperant_items': {
    getApi: 'getCoperantItems',
    updateApi: 'updateCoperantItems',
    deleteApi: 'deleteCoperantItems',
    columns: columns2
  }
}

class DetailedList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this._listType = this.props.location.pathname.split('/')[2]
    this._config = typeMap[this._listType]
    this._columns = this.buildColumns()
  }

  componentDidMount () {
    this.props.getListDataAction({
      api: this._config.getApi,
      params: this._query()
    })
  }

  buildColumns () {
    return util.buildColumns(this._config.columns, {
      weight_alias: {
        children: [{
          title: '单重',
          dataIndex: 'piece_weight',
          key: 'piece_weight',
          render: (text, record, index) => {
            return record.piece_weight
          }
        }, {
          title: '总重',
          dataIndex: 'total_weight',
          key: 'total_weight',
          render: (text, record, index) => {
            return record.total_weight
          }
        }]
      },
      action: {
        render: (text, record, index) => {
          return (
            <span>
              <Button
                type='primary'
                size='small'
                data-id={record.id}
                data-field-value={this._listType === 'cooperant_items' ? record.collaborative_content : record.remark}
                onClick={this.handleOpenModal}
              >
                编辑
              </Button>
              <span className='ant-divider' />
              <Popconfirm
                title='确定删除吗？'
                onConfirm={this.handleDelete(record.id)}
                okText='确定'
                cancelText='取消'
              >
                <Button
                  type='danger'
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

  handleDelete = (id) => {
    return (e) => {
      const { url, method } = apis.ProcessAPI[this._config.deleteApi]
      const api = {
        url: url(id),
        method
      }
      fetchAPI(api, {}).then((repos) => {
        message.success('删除成功！')
        this.updatelist()
      })
    }
  }

  handleOpenModal = (e) => {
    const { id, fieldValue } = e.target.dataset
    this.props.changeModalAction({
      visible: true,
      id,
      fieldValue: fieldValue
    })
  }

  handleCloseModal = (e) => {
    this.props.changeModalAction({
      visible: false
    })
  }

  handleAdd = (fieldsValue) => {
    const mydata = this.props.status.toJS()
    const workOrderInfo = _.get(mydata, 'workOrderInfo', '')
    fetchAPI(apis.ProcessAPI.addAuxiliaryQuota, {
      work_order_uid: workOrderInfo.workOrder,
      ticket_number: +fieldsValue.ticket_number
    }).then((repos) => {
      message.success('添加成功！')
      this.updatelist()
    })
  }

  handleQuichAdd = () => {
    console.log('handleQuichAdd')
  }

  handleSave = (id, fieldsValue) => {
    const { url, method } = apis.ProcessAPI[this._config.updateApi]
    const api = {
      url: url(fieldsValue.id),
      method
    }
    fetchAPI(api, fieldsValue).then((repos) => {
      message.success('修改成功！')
      this.updatelist()
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

  updatelist (query = this.props.location.query) {
    this.props.getListDataAction({
      api: this._config.getApi,
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
    const workOrderInfo = _.get(mydata, 'workOrderInfo', {})
    // const modal = _.get(mydata, 'modal', {})
    return (
      <div className='auxiliary-quota'>
        <FilterBar
          className='filterbar'
          fieldsValue={query}
          onSearch={this.handleSearch}
        />
        <AddBar
          onAdd={this.handleAdd}
          onQuickAdd={this.handleQuichAdd}
        />
        <TableInfo
          fieldsValue={workOrderInfo}
        />
        <CustomTable
          bordered
          style={{ marginTop: 0 }}
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

DetailedList.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getListDataAction: PropTypes.func.isRequired,
  changeModalAction: PropTypes.func.isRequired
}

export default DetailedList