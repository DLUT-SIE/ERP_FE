import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import util from 'utils'
import fetchAPI from 'api'
import { apis } from 'api/config'
import { MATERIAL_CATEGORY_LIST } from 'const'
import { Button, Popconfirm, message } from 'antd'

import FilterBar from './FilterBar'
import CustomSelect from 'components/CustomSelect'
import CustomTable from 'components/CustomTable'
import './PendingOrder.less'

const columns = [
  'sub_work_order_uid', 'detail', 'action'
]

class PendingOrder extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      typeList: []
    }
  }

  componentDidMount () {
    this.fetchData(this._query(), (repos) => {
      const typeList = _.map(repos.results, (item) => {
        return -1
      })
      this.setState({
        typeList
      }, () => {
        const columns = this.buildColumns()
        this.props.addListDataAction({ data: repos, columns })
      })
    })
  }

  fetchData (query, callback) {
    this.props.getListDataAction({
      params: {
        finished: false,
        ...query
      },
      callback
    })
  }

  buildColumns () {
    const { typeList } = this.state
    return util.buildColumns(columns, {
      detail: {
        render: (text, record, index) => {
          return (
            <div>
              <CustomSelect
                list={MATERIAL_CATEGORY_LIST}
                placeholder='请选择要查看的明细表'
                value={typeList[index]}
                onChange={this.handleChange(index)}
              />
              <Button
                className='check-btn'
                type='primary'
                size='small'
                data-uid={record.uid}
                data-index={index}
                onClick={this.handleCheck}
              >
                查看
              </Button>
            </div>
          )
        }
      },
      action: {
        render: (text, record, index) => {
          return (
            <Popconfirm
              title='确定完成吗？'
              onConfirm={this.handleFinished(record.id)}
              okText='确定'
              cancelText='取消'
            >
              <Button
                type='success'
                size='small'
              >
                完成
              </Button>
            </Popconfirm>
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
    this.fetchData(query)
  }

  handleChangeTable = (pagination, filters, sorter) => {
    this.updateQuery({
      page: pagination.current > 1 ? pagination.current : ''
    })
  }

  handleFinished = (id) => {
    return (e) => {
      fetchAPI(apis.PurchaseAPI.updateSubWorkOrder, { finished: true }, { id }).then((repos) => {
        message.success('操作成功！')
        this.updatelist()
      })
    }
  }

  handleChange = (index) => {
    return (value, item) => {
      const { typeList } = this.state
      typeList[index] = +value
      this.setState({
        typeList
      })
    }
  }

  handleCheck = (e) => {
    const { uid, index } = e.target.dataset
    const { typeList } = this.state
    const type = typeList[index]
    if (type === -1) {
      message.warning('请先选择要查看的明细表类别！')
      return
    }
    this.props.history.push({
      pathname: '/purchase/pending_order/detail_table/',
      search: `?sub_work_order_uid=${uid}&inventory_type=${type}`
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
      <div className='pending-order'>
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

PendingOrder.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getListDataAction: PropTypes.func.isRequired,
  addListDataAction: PropTypes.func.isRequired
}

export default PendingOrder
