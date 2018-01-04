import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import util from 'utils'
import fetchAPI from 'api'
import { apis } from 'api/config'
import { Button, message } from 'antd'
import { CICULATION_ROUTE_LIST, PROCESS_ROUTE_LIST } from 'const'

import FilterBar from 'components/WorkOrderFilterBar'
import CustomTable from 'components/CustomTable'
import TableInfo from './TableInfo'
import RouteModal from './RouteModal'
import WeldingSeamModal from 'components/WeldingSeamModal'
import CardModal from './CreateTransferCardModal'
import './Process.less'

const columns = [
  'ticket_number', 'part_number', 'drawing_number', 'lib_name', 'spec', 'material', 'count',
  'piece_weight', 'total_weight', 'remark', 'circulation_route', 'process_route', 'transferCard', 'weldingSeam'
]

class ProcessImport extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectList: []
    }
    this._columns = this.buildColumns()
  }

  componentDidMount () {
    this.props.getMaterialsAction({
      params: {}
    })
    const query = this._query()
    if (query.work_order_uid !== undefined) {
      this.props.getLibraryDataAction({
        params: {
          work_order_uid: query.work_order_uid
        }
      })
      this.props.getListDataAction({
        params: query
      })
    }
  }

  componentWillUnmount () {
    this.props.resetDataAction()
  }

  buildColumns () {
    return util.buildColumns(columns, {
      circulation_route: {
        render: (text, record, index) => {
          return (
            <Button
              type='primary'
              size='small'
              data-process-material={JSON.stringify(record)}
              data-index={index}
              data-route-type='circulation'
              onClick={this.handleOpenRouteModal}
            >
              编辑
            </Button>
          )
        }
      },
      process_route: {
        render: (text, record, index) => {
          return (
            <Button
              type='primary'
              size='small'
              data-process-material={JSON.stringify(record)}
              data-index={index}
              data-route-type='process'
              onClick={this.handleOpenRouteModal}
            >
              编辑
            </Button>
          )
        }
      },
      transferCard: {
        render: (text, record, index) => {
          return record.transfer_card_id ? (
            <Button
              type='primary'
              size='small'
            >
              <Link to={`/process/process/transfer_card/transfer_card_detail/?id=${record.transfer_card_id}&category=${record.transfer_card_name}`}>
                编辑
              </Link>
            </Button>
          ) : (
            <Button
              type='primary'
              size='small'
              data-id={record.id}
              onClick={this.handleOpenCardModal}
            >
              创建
            </Button>
          )
        }
      },
      weldingSeam: {
        render: (text, record, index) => {
          return (
            <Button
              type='primary'
              size='small'
              data-id={record.id}
              onClick={this.handleOpenWeldingSeamModal}
            >
              添加
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
          work_order_uid: query.work_order_uid
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

  handleOpenRouteModal = (e) => {
    let { processMaterial, index, routeType } = e.target.dataset
    processMaterial = JSON.parse(processMaterial)
    if (routeType === 'circulation') {
      fetchAPI(apis.ProcessAPI.getCirculationRoute, {
        process_material: processMaterial.id
      }).then((repos) => {
        this.props.changeRouteModalAction({
          routeType,
          index: +index,
          processMaterial,
          title: '流转路线编辑',
          label: '请输入流转路线并使用分号";"分割（如：DY;J;H）:',
          visible: true,
          number: 10,
          prefix: 'L',
          list: CICULATION_ROUTE_LIST,
          fieldsValue: repos.results[0].circulation_routes,
          routeId: +repos.results[0].id
        })
      })
    } else {
      fetchAPI(apis.ProcessAPI.getProcessRoute, {
        process_material: processMaterial.id
      }).then((repos) => {
        this.props.changeRouteModalAction({
          routeType,
          index: +index,
          processMaterial,
          title: '工序路线编辑',
          label: '请输入工序路线并使用分号";"分割（如：DY;J;H）:',
          visible: true,
          number: 12,
          prefix: '工序',
          list: PROCESS_ROUTE_LIST,
          fieldsValue: repos.results[0].process_steps,
          routeId: +repos.results[0].id
        })
      })
    }
  }

  handleCloseRouteModal = () => {
    this.props.changeRouteModalAction({
      visible: false
    })
  }

  handleChange = (changeType) => {
    const { status } = this.props
    const mydata = status.toJS()
    const list = _.get(mydata, 'list', [])
    const routeModal = _.get(mydata, 'routeModal', {})
    let { routeType, index } = routeModal
    const api = routeType === 'circulation' ? 'getCirculationRoute' : 'getProcessRoute'
    if (changeType === 'previous') {
      if (index === 0) {
        message.warning('当前为本页第一条！')
        return
      }
      index -= 1
    } else {
      if (index === list.length - 1) {
        message.warning('当前为本页最后一条！')
        return
      }
      index += 1
    }
    const processMaterial = list[index]
    fetchAPI(apis.ProcessAPI[api], {
      process_material: processMaterial.id
    }).then((repos) => {
      const routes = routeType === 'circulation'
        ? repos.results[0].circulation_routes
        : repos.results[0].process_steps
      this.props.changeRouteModalAction({
        index,
        processMaterial,
        fieldsValue: routes,
        routeId: +repos.results[0].id
      })
    })
  }

  // 目前判断是否跨路线的方法有点笨，之后再想想优雅的方法
  handleSaveRoute = (fieldsValue) => {
    const mydata = this.props.status.toJS()
    const routeModal = _.get(mydata, 'routeModal', {})
    let { routeType, routeId } = routeModal
    let result = []
    let count = 0
    let flag = true
    _.forEach(fieldsValue, (value, key) => {
      const index = +key.split('-')[1]
      result[index - 1] = value ? +value : undefined
      count += value ? 1 : 0
    })
    _.forEach(result, (value, index) => {
      if (!value && index < count) {
        message.error('不允许跨路线，请重新设置！')
        flag = false
        return
      }
    })
    if (!flag) {
      return
    }
    result = _.filter(result, (value) => {
      return value !== undefined
    })
    const { url, method } = routeType === 'circulation'
      ? apis.ProcessAPI['saveCirculationRoute']
      : apis.ProcessAPI['saveProcessRoute']
    const api = {
      url: url(routeId),
      method
    }
    const params = {}
    if (routeType === 'circulation') {
      params.circulation_routes = result
    } else {
      params.process_steps = result
    }
    fetchAPI(api, params).then((repos) => {
      message.success('保存成功！')
      this.handleCloseRouteModal()
    })
  }

  handleOpenCardModal = (e) => {
    const { id } = e.currentTarget.dataset
    this.props.changeCardModalAction({
      visible: true,
      id: +id
    })
  }

  handleCloseCardModal = () => {
    this.props.changeCardModalAction({
      visible: false
    })
  }

  handleCreateTransferCard = (fieldsValue) => {
    fetchAPI(apis.ProcessAPI.addTransferCard, {
      process_material: fieldsValue.id,
      category: fieldsValue.category
    }).then((repos) => {
      this.handleCloseCardModal()
      this.props.history.push({
        pathname: '/process/process/transfer_card/transfer_card_detail',
        search: `id=${repos.id}&category=${repos.category_name}`
      })
    })
  }

  handleOpenWeldingSeamModal = (e) => {
    const { id } = e.target.dataset
    this.props.changeWeldModalAction({
      id: +id,
      visible: true,
      fieldsValue: {}
    })
  }

  handleCloseWeldingSeamModal = () => {
    this.props.changeWeldModalAction({
      visible: false
    })
  }

  handleSaveWeld = (weldSeamId, fieldsValue) => {
    const mydata = this.props.status.toJS()
    const weldingSeamModal = _.get(mydata, 'weldingSeamModal', {})
    fetchAPI(apis.ProcessAPI.addWeldingSeam, {
      process_material: weldingSeamModal.id,
      ...fieldsValue
    }).then((repos) => {
      message.success('添加成功！')
      this.handleCloseWeldingSeamModal()
    })
  }

  render () {
    const { status, location } = this.props
    const query = QueryString.parse(location.search)
    const mydata = status.toJS()
    const list = _.get(mydata, 'list', [])
    const loading = _.get(mydata, 'loading')
    const workOrderInfo = _.get(mydata, 'workOrderInfo', {})
    const routeModal = _.get(mydata, 'routeModal', {})
    const weldingSeamModal = _.get(mydata, 'weldingSeamModal', {})
    const cardModal = _.get(mydata, 'cardModal', {})
    const weldingMaterials = _.get(mydata, 'weldingMaterials', {})
    const fluxMaterials = _.get(mydata, 'fluxMaterials', {})
    return (
      <div className='process'>
        <FilterBar
          className='filterbar'
          fieldsValue={query}
          onSearch={this.handleSearch}
        />
        { workOrderInfo.work_order_uid &&
          <Button
            className='transfercard-btn'
            type='primary'
          >
            <Link to={`/process/process/transfer_card/?work_order_uid=${workOrderInfo.work_order_uid}&name=${workOrderInfo.name}`}>
              查看流转卡列表
            </Link>
          </Button>
        }
        <TableInfo
          fieldsValue={workOrderInfo}
        />
        <CustomTable
          style={{ marginTop: 0 }}
          dataSource={list}
          columns={this._columns}
          loading={loading}
          pagination={false}
          size='middle'
          rowClassName={(record, index) => record.part_number === 0 ? 'highlight-row' : ''}
          onChange={this.handleChangeTable}
        />
        { routeModal.visible &&
          <RouteModal
            {...routeModal}
            onOk={this.handleSaveRoute}
            onCancel={this.handleCloseRouteModal}
            onChange={this.handleChange}
          />
        }
        { cardModal.visible &&
          <CardModal
            {...cardModal}
            onOk={this.handleCreateTransferCard}
            onCancel={this.handleCloseCardModal}
          />
        }
        { weldingSeamModal.visible &&
          <WeldingSeamModal
            {...weldingSeamModal}
            fieldsValue={{}}
            weldingMaterials={weldingMaterials}
            fluxMaterials={fluxMaterials}
            onOk={this.handleSaveWeld}
            onCancel={this.handleCloseWeldingSeamModal}
          />
        }
      </div>
    )
  }
}

ProcessImport.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getListDataAction: PropTypes.func.isRequired,
  getLibraryDataAction: PropTypes.func.isRequired,
  getMaterialsAction: PropTypes.func.isRequired,
  resetDataAction: PropTypes.func.isRequired,
  changeRouteModalAction: PropTypes.func.isRequired,
  changeWeldModalAction: PropTypes.func.isRequired,
  changeCardModalAction: PropTypes.func.isRequired
}

export default ProcessImport
