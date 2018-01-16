import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import util from 'utils'
import fetchAPI from 'api'
import { apis } from 'api/config'
import { Button, message, Divider, Popconfirm } from 'antd'

import FilterBar from './FilterBar'
import ProductionUserModal from './ProductionUserModal'
import CustomTable from 'components/CustomTable'

const columns = [
  'first_name', 'work_group_name', 'action'
]

class ProductionUsers extends React.Component {
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
      first_name: {
        render: (text, record, index) => {
          return record.user.first_name
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
                编辑
              </Button>
              <Divider type='vertical' />
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

  handleSearch = (searchValue) => {
    this.updateQuery({
      page: 1,
      ...searchValue
    })
  }
  fetchGroupInfo = (processName, cb) => {
    let { url, method } = apis.ProductionAPI.getProductionWorkGroup
    const api = {
      url,
      method
    }
    fetchAPI(api).then((repos) => {
      cb(repos.results)
    })
  }
  handleOpenEditModal = (e) => {
    const { fieldsValue, index, name } = e.target.dataset
    this.fetchGroupInfo(name, (repos) => {
      this.props.changeModalAction({
        visible: true,
        index: +index,
        fieldsValue: JSON.parse(fieldsValue),
        groups: repos
      })
    })
  }
  handleDelete = (id) => {
    return (e) => {
      fetchAPI(apis.ProductionAPI.deleteProductionUser, null, { id: id }).then(() => {
        message.success('删除成功！')
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
    fetchAPI(apis.ProductionAPI.updateProductionUserGroup, fieldsValue, { id: fieldsValue.id }).then(() => {
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
          <ProductionUserModal
            onOk={this.handleSave}
            onCancel={this.handleCloseModal}
            {...modal}
          />
        }
      </div>
    )
  }
}

ProductionUsers.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getListDataAction: PropTypes.func.isRequired,
  changeModalAction: PropTypes.func.isRequired
}

export default ProductionUsers
