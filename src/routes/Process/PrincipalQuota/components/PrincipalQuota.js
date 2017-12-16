import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import util from 'utils'
import fetchAPI from 'api'
import { apis } from 'api/config'
import { Button, Popconfirm, message } from 'antd'

import FilterBar from 'components/WorkOrderFilterBar'
import CustomTable from 'components/CustomTable'
import TableInfo from './TableInfo'
import PrincipalQuotaModal from './PrincipalQuotaModal'
import './PrincipalQuota.less'

const columns = [
  'order', 'size', 'count', 'weight', 'total_weight', 'material', 'operative_norm', 'status', 'remark', 'action'
]

class PrincipalQuota extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this._columns = this.buildColumns()
  }

  componentDidMount () {
    this.props.getListDataAction({
      params: this._query()
    })
    this.props.getMaterialsAction({
      params: {}
    })
  }

  buildColumns () {
    return util.buildColumns(columns, {
      order: {
        render: (text, record, index) => {
          return index + 1
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
      fetchAPI(apis.ProcessAPI.deletePrincipalQuota, { id: id }).then((repos) => {
        message.success('删除成功！')
        this.updatelist()
      })
    }
  }

  handleOpenEditModal = (e) => {
    const { fieldsValue, index } = e.target.dataset
    this.props.changeModalAction({
      visible: true,
      index: +index,
      fieldsValue: JSON.parse(fieldsValue)
    })
  }

  handleOpenAddModal = () => {
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

  handleChangePrincipalQuota = (e) => {
    const { type } = e.target.dataset
    const { status, changeModalAction } = this.props
    const mydata = status.toJS()
    const modal = _.get(mydata, 'modal', [])
    const list = _.get(mydata, 'list', [])
    let { index } = modal
    if (type === 'previous') {
      if (index === 0) {
        message.warning('本条已为当前页第一条！')
        return
      }
      index -= 1
    } else {
      if (index === list.length - 1) {
        message.warning('本条已为当前页的最后一条！')
        return
      }
      index += 1
    }
    changeModalAction({
      visible: true,
      index,
      fieldsValue: list[index]
    })
  }

  handleSave = (fieldsValue) => {
    if (fieldsValue.id) {
      fetchAPI(apis.ProcessAPI.updatePincipalQuota, fieldsValue).then((repos) => {
        message.success('修改成功！')
        this.updatelist()
      })
      return
    }
    fetchAPI(apis.ProcessAPI.addPincipalQuota, fieldsValue).then((repos) => {
      message.success('添加成功！')
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
    const workOrder = _.get(mydata, 'workOrder', '')
    const productionName = _.get(mydata, 'productionName', '')
    const unit = _.get(mydata, 'unit', '')
    const writer = _.get(mydata, 'writer', '')
    const proofreader = _.get(mydata, 'proofreader', '')
    const materials = _.get(mydata, 'materials', {})
    const modal = _.get(mydata, 'modal', {})
    return (
      <div className='principal-quota'>
        <FilterBar
          className='filterbar'
          fieldsValue={query}
          onSearch={this.handleSearch}
        />
        <Button
          className='add-btn'
          type='primary'
          size='large'
          onClick={this.handleOpenAddModal}
        >
          添加
        </Button>
        <TableInfo
          workOrder={workOrder}
          productionName={productionName}
          unit={unit}
          writer={writer}
          proofreader={proofreader}
        />
        <CustomTable
          style={{ marginTop: 0 }}
          dataSource={list}
          columns={this._columns}
          loading={loading}
          pagination={pagination}
          size='middle'
          onChange={this.handleChangeTable}
        />
        { modal.visible &&
          <PrincipalQuotaModal
            onOk={this.handleSave}
            onCancel={this.handleCloseModal}
            onChange={this.handleChangePrincipalQuota}
            materials={materials}
            {...modal}
          />
        }
      </div>
    )
  }
}

PrincipalQuota.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getListDataAction: PropTypes.func.isRequired,
  getMaterialsAction: PropTypes.func.isRequired,
  changeModalAction: PropTypes.func.isRequired
}

export default PrincipalQuota
