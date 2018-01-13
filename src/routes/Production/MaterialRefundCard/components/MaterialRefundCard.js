import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import util from 'utils'
import fetchAPI from 'api'
import { apis } from 'api/config'
import { Button, message } from 'antd'
import moment from 'moment'
import { MATERIAL_REFUND_CARD_TYPE } from 'const'

import FilterBar from './FilterBar'
import MaterialRefundCardModal from './MaterialRefundCardModal'
import CustomTable from 'components/CustomTable'

const columns = [
  'refund_uid', 'sub_order_uid', 'apply_uid', 'create_dt', 'pretty_status', 'action'
]
const mapRequest = {
  welding_material_refund_cards: apis.ProductionAPI.getWeldingMaterialRefundCardDetails,
  steel_material_refund_cards: apis.ProductionAPI.getSteelMaterialRefundCardDetails,
  bought_in_component_refund_cards: apis.ProductionAPI.getBroughtInMaterialRefundCardDetails,
  auxiliary_material_refund_cards: apis.ProductionAPI.getAuxiliaryMaterialRefundCardDetails
}
class MaterialApplyCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this._columns = this.buildColumns()
  }

  componentDidMount () {
    console.log(this._query())
    let params = this._query()
    if (_.isUndefined(params.category)) {
      this.setState({ category: MATERIAL_REFUND_CARD_TYPE.WELD })
    }
    this.props.getListDataAction({
      params: this._query()
    })
  }
  buildColumns () {
    return util.buildColumns(columns, {
      create_dt:{
        render: (text, record, index) => {
          return moment(record.create_dt).format('YYYY-MM-DD')
        }
      },
      action: {
        render: (text, record, index) => {
          return (
            <span>
              <Button
                type='primary'
                size='small'
                data-id={record.id}
                data-index={index}
                data-category={this.state.category}
                onClick={this.handleOpenEditModal}
              >
                查看
              </Button>
            </span>
          )
        }
      }
    })
  }

  handleSearch = (searchValue) => {
    let _searchValue = { ...searchValue }
    let { category } = _searchValue
    this.setState({ category: category })
    this.updateQuery({
      page: 1,
      ...searchValue
    })
  }
  fetchDetails = (category, id, cb) => {
    let { url, method } = mapRequest[category]
    url = url(id)
    const api = {
      url,
      method
    }
    fetchAPI(api).then((repos) => {
      cb(repos)
    })
  }
  handleOpenEditModal = (e) => {
    const { index, category, id } = e.target.dataset
    this.fetchDetails(category, id, (repos) => {
      let values = repos
      values.create_dt = moment(repos.create_dt).format('YYYY-MM-DD')
      this.props.changeModalAction({
        visible: true,
        index: +index,
        details: values,
        category: category
      })
    })
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

  updatelist (query = this.props.location.query) {
    this.props.getListDataAction({
      params: query
    })
  }
  handleSave = (fieldsValue) => {
    let { url, method } = apis.ProductionAPI.updateProductionUserGroup
    url = url(fieldsValue.id)
    const api = {
      url,
      method
    }
    fetchAPI(api, fieldsValue).then(() => {
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
          <MaterialRefundCardModal
            onOk={this.handleSave}
            onCancel={this.handleCloseModal}
            {...modal}
          />
        }
      </div>
    )
  }
}

MaterialApplyCard.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getListDataAction: PropTypes.func.isRequired,
  changeModalAction: PropTypes.func.isRequired
}

export default MaterialApplyCard
