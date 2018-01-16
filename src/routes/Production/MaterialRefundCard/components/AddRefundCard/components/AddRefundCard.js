import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import { Radio, Button } from 'antd'
import util from 'utils'

import FilterBar from './FilterBar'
import CustomTable from 'components/CustomTable'
import fetchAPI from 'api'
import { apis } from 'api/config'

const columns = [
  'radio', 'common_uid', 'common_material_mark', 'specification', 'refund_count', 'action'
]
const mapRequest = {
  welding_material_refund_cards: apis.ProductionAPI.createWeldingMaterialRefundCards,
  steel_material_refund_cards: apis.ProductionAPI.createSteelMaterialRefundCards,
  bought_in_component_refund_cards: apis.ProductionAPI.createBroughtInMaterialRefundCards
}
class AddRefundCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this._columns = this.buildColumns()
  }

  componentDidMount () {
  }
  buildColumns () {
    return util.buildColumns(columns, {
      radio : {
        render: (text, record, index) => {
          return <Radio value={record.id} checked />
        }
      },
      action: {
        render: (text, record, index) => {
          return <Button
            type='primary'
            size='small'
            data-id={record.id}
            data-count={record.actual_count}
            onClick={this.handleAddRefunds}>添加</Button>
        }
      }
    })
  }
  handleAddRefunds = (e) => {
    const { id, count } = e.target.dataset
    let category = this.state.category
    if (_.isUndefined(category)) {
      category = 'welding_material_refund_cards'
    }
    let detailObj = {}
    detailObj[id] = count
    let values = {
      apply_card: id,
      details_dict: detailObj
    }
    fetchAPI(mapRequest[category], values)
  }
  handleSearch = (searchValue) => {
    if (!_.isUndefined(searchValue.category)) {
      this.setState({ category: searchValue.category })
    }
    this.updateQuery({
      page: 1,
      ...searchValue
    })
  }
  handleRefundTypeChange = (value) => {
    this.setState({ category: value })
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
          onRefundTypeChange={this.handleRefundTypeChange}
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
AddRefundCard.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getListDataAction: PropTypes.func.isRequired
}

export default AddRefundCard
