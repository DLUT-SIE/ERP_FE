import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import util from 'utils'
import fetchAPI from 'api'
import { apis } from 'api/config'
import { message } from 'antd'

import FilterBar from './FilterBar'
import CustomTable from 'components/CustomTable'

const columns = [
  'work_order_uid', 'lib_name', 'spec', 'material_brand', 'quota', 'count'
]
const mapRequest = {
  welding_material_apply_cards: apis.ProductionAPI.createWeldingMaterialApplyCards,
  steel_material_apply_cards: apis.ProductionAPI.createSteelMaterialApplyCards,
  bought_in_component_apply_cards: apis.ProductionAPI.createBroughtInMaterialApplyCards,
  auxiliary_material_apply_cards: apis.ProductionAPI.createAuxiliaryMaterialApplyCards
}
class AddApplyCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this._columns = this.buildColumns()
    this.rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({ addLists: selectedRowKeys })
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User' // Column configuration not to be checked
      })
    }
  }

  buildColumns () {
    return util.buildColumns(columns, {
      spec: {
        render: (text, record, index) => {
          return record.spec || record.size
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
  createApplyCard = (category, subOrder, processMaterials) => {
    let api = mapRequest[category]
    let values = {
      sub_order: subOrder,
      process_materials: processMaterials
    }
    fetchAPI(api, values).then((repos) => {
      message.success('添加成功！')
    })
  }
  handleAddRecords = (fieldsValue) => {
    const { apply_card_type } = fieldsValue
    const { status } = this.props
    const mydata = status.toJS()
    const list = _.get(mydata, 'list', [])
    let workOrderId
    if (list.length > 0) {
      workOrderId = list[0].work_order_id
    }
    let lists = this.state.addLists.map((item) => {
      return parseInt(item)
    })
    workOrderId = parseInt(workOrderId)
    this.createApplyCard(apply_card_type, workOrderId, lists)
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
    return (
      <div>
        <FilterBar
          fieldsValue={query}
          onSearch={this.handleSearch}
          onAddClick={this.handleAddRecords}
        />
        <CustomTable
          rowSelection={this.rowSelection}
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
AddApplyCard.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getListDataAction: PropTypes.func.isRequired
}

export default AddApplyCard
