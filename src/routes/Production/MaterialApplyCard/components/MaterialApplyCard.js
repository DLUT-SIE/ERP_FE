import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import util from 'utils'
import fetchAPI from 'api'
import { apis } from 'api/config'
import { Button, message } from 'antd'
import moment from 'moment'

import FilterBar from './FilterBar'
import MaterialApplyCardModal from './MaterialApplyCardModal'
import CustomTable from 'components/CustomTable'

const columns = [
  'common_uid', 'sub_order_uid', 'department', 'create_dt', 'apply_card_pretty_status', 'action'
]
const mapRequest = {
  welding_material_apply_cards: apis.ProductionAPI.getWeldingMaterialApplyCardDetails,
  steel_material_apply_cards: apis.ProductionAPI.getSteelMaterialApplyCardDetails,
  bought_in_component_apply_cards: apis.ProductionAPI.getBroughtInMaterialApplyCardDetails,
  auxiliary_material_apply_cards: apis.ProductionAPI.getAuxiliaryMaterialApplyCardDetails
}
const updateMapRequest = {
  welding_material_apply_cards: apis.ProductionAPI.updateWeldingMaterialApplyCardsStatus,
  steel_material_apply_cards: apis.ProductionAPI.updateSteelMaterialApplyCardsStatus,
  bought_in_component_apply_cards: apis.ProductionAPI.updateBroughtInMaterialApplyCardsStatus,
  auxiliary_material_apply_cards: apis.ProductionAPI.updateAuxiliaryMaterialApplyCardsStatus
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
      this.setState({ category: 'welding_material_apply_cards' })
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
  changeStatus = (type, id, actions) => {
    console.log('actions', actions)
    fetchAPI(updateMapRequest[type], { status: actions }, { id }).then((repos) => {
      console.log('repos', repos)
      message.success('修改成功！')
      this.handleCloseModal()
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
    fetchAPI(mapRequest[category], null, { id: id }).then((repos) => {
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
          <MaterialApplyCardModal
            onCancel={this.handleCloseModal}
            changeStatus={this.changeStatus}
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
