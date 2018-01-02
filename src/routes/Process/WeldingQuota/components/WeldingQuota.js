import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import util from 'utils'
import fetchAPI from 'api'
import { apis } from 'api/config'
import { DETAILED_TABLE_CATEGORY_MAP } from 'const'
import { Button, Popconfirm, message } from 'antd'

import FilterBar from 'components/WorkOrderFilterBar'
import CustomTable from 'components/CustomTable'
import TableInfo from 'components/TableInfo'
import WeldingQuotaModal from './WeldingQuotaModal'
import './WeldingQuota.less'

const columns = [
  'category', 'material_name_welding', 'size', 'operative_norm', 'quota', 'remark', 'action'
]

class WeldingQuota extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this._columns = this.buildColumns()
    this._category = DETAILED_TABLE_CATEGORY_MAP['焊材明细表']
  }

  componentDidMount () {
    const query = this._query()
    if (query.work_order_uid !== undefined) {
      this.props.getLibraryDataAction({
        params: {
          work_order_uid: query.work_order_uid,
          category: this._category
        }
      })
      this.props.getListDataAction({
        params: query
      })
      this.props.getMaterialsAction()
    }
  }

  buildColumns () {
    return util.buildColumns(columns, {
      action: {
        render: (text, record, index) => {
          return (
            <span>
              <Button
                type='primary'
                size='small'
                data-id={record.id}
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
      const { url, method } = apis.ProcessAPI.deleteWeldingQuota
      const api = {
        url: url(id),
        method
      }
      fetchAPI(api, {}).then((repos) => {
        message.success('删除成功！')
        this.props.getListDataAction({
          params: this._query()
        })
      })
    }
  }

  fetchWeldingQuota (id, cb) {
    const { url, method } = apis.ProcessAPI.getWeldingQuota
    const api = {
      url: url(id),
      method
    }
    fetchAPI(api, {}).then((repos) => {
      cb(repos)
    })
  }

  handleOpenEditModal = (e) => {
    const { id, index } = e.target.dataset
    this.fetchWeldingQuota(id, (repos) => {
      this.props.changeModalAction({
        visible: true,
        index: +index,
        fieldsValue: repos
      })
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

  handleChangeWeldingQuota = (e) => {
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
    this.fetchWeldingQuota(list[index].id, (repos) => {
      changeModalAction({
        visible: true,
        index,
        fieldsValue: repos
      })
    })
  }

  handleQuichAdd = () => {
    console.log('handleQuichAdd')
  }

  handleSave = (id, fieldsValue) => {
    if (id) {
      const { url, method } = apis.ProcessAPI.updateWeldingQuota
      const api = {
        url: url(id),
        method
      }
      fetchAPI(api, fieldsValue).then((repos) => {
        message.success('修改成功！')
        this.handleCloseModal()
        this.props.getListDataAction({
          params: this._query()
        })
      })
      return
    }
    const mydata = this.props.status.toJS()
    const workOrderInfo = _.get(mydata, 'workOrderInfo', {})
    fetchAPI(apis.ProcessAPI.addWeldingQuota, {
      ...fieldsValue,
      quota_list: workOrderInfo.id
    }).then((repos) => {
      message.success('添加成功！')
      this.handleCloseModal()
      this.props.getListDataAction({
        params: this._query()
      })
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
    if (query.work_order_uid !== undefined) {
      this.props.getLibraryDataAction({
        params: {
          work_order_uid: query.work_order_uid,
          category: this._category
        }
      })
      this.props.getListDataAction({
        params: query
      })
    } else {
      this.props.resetDataAction()
    }
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
    const workOrderInfo = _.get(mydata, 'workOrderInfo', '')
    const modal = _.get(mydata, 'modal', {})
    const materials = _.get(mydata, 'materials', [])
    return (
      <div className='welding-quota'>
        <FilterBar
          className='filterbar'
          fieldsValue={query}
          onSearch={this.handleSearch}
        />
        { workOrderInfo.id &&
          <div className='add-btn'>
            <Button
              style={{ marginRight: 15 }}
              type='primary'
              size='large'
              onClick={this.handleOpenAddModal}
            >
              添加
            </Button>
            <Button
              size='large'
              onClick={this.handleQuichAdd}
            >
              快捷生成
            </Button>
          </div>
        }
        <TableInfo
          fieldsValue={workOrderInfo}
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
          <WeldingQuotaModal
            onOk={this.handleSave}
            onCancel={this.handleCloseModal}
            onChange={this.handleChangeWeldingQuota}
            materials={materials}
            {...modal}
          />
        }
      </div>
    )
  }
}

WeldingQuota.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getLibraryDataAction: PropTypes.func.isRequired,
  getListDataAction: PropTypes.func.isRequired,
  getMaterialsAction: PropTypes.func.isRequired,
  resetDataAction: PropTypes.func.isRequired,
  changeModalAction: PropTypes.func.isRequired
}

export default WeldingQuota
