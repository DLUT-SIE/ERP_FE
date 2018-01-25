import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import util from 'utils'
import fetchAPI from 'api'
import { apis } from 'api/config'
import { Button, Popconfirm, message } from 'antd'

import CustomTable from 'components/CustomTable'
import './DetailTable.less'

const columns0 = [
  'spec_order', 'count_order', 'weight_order', 'total_weight', 'material_order', 'remark_order', 'action'
]
const columns1 = [
  'spec_order', 'count_order', 'weight_order', 'total_weight', 'material_order', 'remark_order', 'action'
]
const columns2 = [
  'name_order', 'drawing_number_order', 'ticket_number_order', 'count_order', 'material_order', 'weight_order',
  'total_weight', 'remark_order', 'action'
]
const columns3 = [
  'name_order', 'drawing_number_order', 'count_order', 'material_order', 'weight_order', 'total_weight',
  'remark_order', 'action'
]
const columns4 = [
  'name_order', 'spec_order', 'material_order', 'weight_order', 'total_weight', 'quota', 'remark_order', 'action'
]
const columns5 = [
  'drawing_number_order', 'ticket_number_order', 'name_order', 'material_order', 'count_order', 'weight_order',
  'total_weight', 'cooperation_content_order', 'action'
]
const typeMap = {
  0: {
    title: '主材定额',
    columns: columns0
  },
  1: {
    title: '辅材定额',
    columns: columns1
  },
  2: {
    title: '先投件明细',
    columns: columns2
  },
  3: {
    title: '外购件明细',
    columns: columns3
  },
  4: {
    title: '焊材定额',
    columns: columns4
  },
  5: {
    title: '工序性外协明细',
    columns: columns5
  }
}

class DetailTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    const query = QueryString.parse(this.props.location.search)
    this._uid = query.sub_work_order_uid
    this._type = query.inventory_type
    this._columns = this.buildColumns()
  }

  componentDidMount () {
    this.fetchData(this._query(), (data) => {
      const columns = this.buildColumns(typeMap[this._type].columns)
      this.props.addListDataAction({ data, columns })
    })
  }

  fetchData (query, callback) {
    this.props.getListDataAction({
      params: {
        inventory_type: +this._type,
        sub_work_order_uid: this._uid,
        ...query
      },
      callback
    })
  }

  buildColumns (columns) {
    return util.buildColumns(columns, {
      action: {
        render: (text, record, index) => {
          return record.status === 0 ? (
            <Popconfirm
              title='确定加入物料汇总吗？'
              onConfirm={this.handleAdd(record.id)}
              okText='确定'
              cancelText='取消'
            >
              <Button
                type='primary'
                size='small'
              >
                加入物料汇总
              </Button>
            </Popconfirm>
          ) : record.pretty_status
        }
      }
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
    this.fetchData(query)
  }

  handleChangeTable = (pagination, filters, sorter) => {
    this.updateQuery({
      page: pagination.current > 1 ? pagination.current : ''
    })
  }

  handleAdd = (id) => {
    return (e) => {
      fetchAPI(apis.PurchaseAPI.updateProcurementMaterial, { status: 1 }, { id }).then((repos) => {
        message.success('添加成功！')
        this.updatelist()
      })
    }
  }

  handleAddAll = () => {
    const mydata = this.props.status.toJS()
    let list = _.get(mydata, 'list', [])
    list = _.filter(list, (item) => {
      return item.status === 0
    })
    Promise.all(_.map(list, (item) => {
      fetchAPI(apis.PurchaseAPI.updateProcurementMaterial, { status: 1 }, { id: item.id })
    })).then(() => {
      console.log('success')
      message.success('全部添加成功！')
      this.updatelist()
    })
  }

  render () {
    const { status } = this.props
    const mydata = status.toJS()
    const list = _.get(mydata, 'list', [])
    const loading = _.get(mydata, 'loading')
    const pagination = _.get(mydata, 'pagination', {})
    const columns = _.get(mydata, 'columns', [])
    return (
      <div className='detail-table'>
        <h1>{typeMap[this._type].title}</h1>
        <h2 className='uid'>子工作令编号：{this._uid}</h2>
        <Popconfirm
          title='确定全部加入物料汇总吗？'
          onConfirm={this.handleAddAll}
          okText='确定'
          cancelText='取消'
        >
          <Button
            className='add-all-btn'
            type='success'
            size='small'
            disabled={list.length === 0}
          >
            全部加入物料汇总
          </Button>
        </Popconfirm>
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

DetailTable.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getListDataAction: PropTypes.func.isRequired,
  addListDataAction: PropTypes.func.isRequired
}

export default DetailTable
