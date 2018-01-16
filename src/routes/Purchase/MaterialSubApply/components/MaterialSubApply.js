import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import util from 'utils'
import _ from 'lodash'
import fetchAPI from 'api'
import { apis } from 'api/config'
import { Link } from 'react-router-dom'
import { Button, Divider, Popconfirm, message } from 'antd'

import FilterBar from './FilterBar'
import CustomTable from 'components/CustomTable'
import MaterialSubApplyModal from './MaterialSubApplyModal'
import './MaterialSubApply.less'

const columns = [
  'uid_material_sub_applies', 'work_order', 'production', 'figure_code', 'applicant_material_sub_applies',
  'reason', 'action'
]

class MaterialSubApply extends React.Component {
  constructor (props) {
    super(props)
    this._columns = this.buildColumns()
  }

  componentDidMount () {
    this.props.getListDataAction({
      params: this._query()
    })
  }

  buildColumns () {
    return util.buildColumns(columns, {
      action: {
        render: (text, record, index) => {
          return (
            <div>
              <Button
                type='primary'
                size='small'
              >
                <Link to={`/purchase/material_sub_apply/material_sub_apply_detail/?id=${record.id}`}>
                  查看
                </Link>
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
            </div>
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
    this.props.getListDataAction({
      params: query
    })
  }

  handleChangeTable = (pagination, filters, sorter) => {
    this.updateQuery({
      page: pagination.current > 1 ? pagination.current : ''
    })
  }

  handleDelete = (id) => {
    return (e) => {
      fetchAPI(apis.PurchaseAPI.deleteMaterialSubApplies, {}, { id }).then((repos) => {
        message.success('删除成功！')
        this.props.getListDataAction({
          params: this._query()
        })
      })
    }
  }

  handleOpenModal = (e) => {
    this.props.changeModalAction({
      visible: true
    })
  }

  handleCloseModal = (e) => {
    this.props.changeModalAction({
      visible: false
    })
  }

  handleChangeApply = (apply, list) => {
    this.props.changeModalAction({
      apply: apply,
      itemList: list
    })
  }

  handleSaveMaterialSubApply = (apply, itemList) => {
    fetchAPI(apis.PurchaseAPI.addMaterialSubApply, {
      ...apply,
      sub_apply_items: itemList
    }).then((repos) => {
      message.success('创建成功！')
      this.handleCloseModal()
      this.updatelist
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
      <div className='material-sub'>
        <FilterBar
          fieldsValue={query}
          onSearch={this.handleSearch}
        />
        <Button
          className='add-btn'
          type='success'
          onClick={this.handleOpenModal}
        >
          新建材料代用
        </Button>
        <CustomTable
          dataSource={list}
          columns={this._columns}
          loading={loading}
          pagination={pagination}
          size='middle'
          onChange={this.handleChangeTable}
        />
        { modal.visible &&
          <MaterialSubApplyModal
            {...modal}
            onOk={this.handleSaveMaterialSubApply}
            onCancel={this.handleCloseModal}
            onChange={this.handleChangeApply}
          />
        }
      </div>
    )
  }
}

MaterialSubApply.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getListDataAction: PropTypes.func.isRequired,
  changeModalAction: PropTypes.func.isRequired
}

export default MaterialSubApply
