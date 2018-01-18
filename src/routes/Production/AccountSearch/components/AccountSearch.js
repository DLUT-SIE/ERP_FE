import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import util from 'utils'
import fetchAPI from 'api'
import { apis } from 'api/config'
import { Button, message } from 'antd'

import FilterBar from './FilterBar'
import AccountSearchModal from './AccountSearchModal'
import EditDateModal from './EditFinishDateModal'
import CustomTable from 'components/CustomTable'

const columns = [
  'ticket_number_order', 'sub_order', 'process_part_number', 'drawing_number_order', 'process_parent_drawing_number', 'name_order',
  'material', 'count_order', 'process_piece_weight', 'process_total_weight', 'circulation_route', 'remark_order', 'action'
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
      action: {
        render: (text, record, index) => {
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
    console.log('id', id)
    fetchAPI(apis.ProductionAPI.updateProcessDetails, null, { id: id }).then((repos) => {
      message.success('修改成功！')
      this.props.getListDataAction({
        params: this._query()
      })
    })
  }
  fetchProcessDetailItem = (id, cb) => {
    fetchAPI(apis.ProductionAPI.getSubMaterialLedgerDetail, null, { id: id }).then((repos) => {
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
  handleCloseEditModal = (e) => {
    this.props.changeModalAction({
      editDateVisible: false,
      visible: true
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
    fetchAPI(apis.ProductionAPI.updateSubMaterialLedger, fieldsValue, { id: fieldsValue.id }).then((repos) => {
      this.props.changeModalAction({
        visible: true,
        editDateVisible: false,
        fieldsValue: repos
      })
      message.success('修改成功！')
    })
  }
  handleEditDateModal = (fieldsValue) => {
    this.props.changeModalAction({
      visible: false,
      editDateVisible: true,
      fieldsValue: fieldsValue
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
          <AccountSearchModal
            onOk={this.handleEditDateModal}
            onCancel={this.handleCloseModal}
            {...modal}
          />
        }
        { modal.editDateVisible &&
        <EditDateModal
          onOk={this.handleSave}
          onCancel={this.handleCloseEditModal}
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
