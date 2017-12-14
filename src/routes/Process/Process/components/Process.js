import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
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

const columns = [
  'ticket_number', 'part_number', 'drawing_number', 'lib_name', 'spec', 'material', 'count',
  'piece_weight', 'total_weight', 'remark', 'circulation_route', 'process_route', 'transferCard', 'weldingSeam'
]

class ProcessImport extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      label: '',
      routeVisible: false,
      number: 0,
      prefix: '',
      selectList: []
    }
    this._columns = this.buildColumns()
  }

  componentDidMount () {
    this.props.getListDataAction({
      params: this._query()
    })
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
          return (
            <Button
              type='primary'
              size='small'
            >
              编辑
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

  handleChange = (changeType) => {
    let { routeType, index } = this.state
    const { status } = this.props
    const mydata = status.toJS()
    const list = _.get(mydata, 'list', [])
    const api = routeType === 'circulation' ? 'getCirculationRoute' : 'getProcessRoute'
    if (changeType === 'previous') {
      if (index === 0) {
        message.warning('当前为第一条！')
        return
      }
      index -= 1
    } else {
      if (index === list.length - 1) {
        message.warning('当前为最后一条！')
        return
      }
      index += 1
    }
    const processMaterialId = list[index].id
    if (routeType === 'circulation') {
      fetchAPI(apis.ProcessAPI[api], { process_material_id: processMaterialId }).then((repos) => {
        this.setState({
          index,
          processMaterialId,
          values: repos.routes
        })
      })
    }
  }

  handleOpenRouteModal = (e) => {
    let { processMaterial, index, routeType } = e.target.dataset
    processMaterial = JSON.parse(processMaterial)
    if (routeType === 'circulation') {
      fetchAPI(apis.ProcessAPI.getCirculationRoute, {
        process_material_id: processMaterial.id
      }).then((repos) => {
        this.setState({
          routeType,
          index: +index,
          processMaterial,
          title: '流转路线编辑',
          label: '请输入流转路线并使用分号";"分割（如：DY;J;H）:',
          routeVisible: true,
          number: 10,
          prefix: 'L',
          selectList: CICULATION_ROUTE_LIST,
          values: repos.routes
        })
      })
    } else {
      fetchAPI(apis.ProcessAPI.getProcessRoute, {
        process_material_id: processMaterial.id
      }).then((repos) => {
        this.setState({
          routeType,
          index: index,
          processMaterial,
          title: '工序路线编辑',
          label: '请输入工序路线并使用分号";"分割（如：DY;J;H）:',
          routeVisible: true,
          number: 12,
          prefix: '工序',
          selectList: PROCESS_ROUTE_LIST,
          values: repos.routes
        })
      })
    }
  }

  handleCloseRouteModal = () => {
    this.setState({
      routeVisible: false
    })
  }

  // 目前判断是否跨路线的方法有点笨，之后再想想优雅的方法
  handleSaveRoute = (fieldsValue) => {
    let result = []
    let count = 0
    let flag = true
    const { routeType, processMaterial } = this.state
    _.forEach(fieldsValue, (value, key) => {
      const index = +key.split('-')[1]
      result[index - 1] = +value
      count += value ? 1 : 0
    })
    _.forEach(result, (value, index) => {
      if (!value && index < count) {
        message.error('不允许跨路线，请重新设置！')
        flag = false
        return
      }
    })
    if (flag) {
      result = _.filter(result, (value) => {
        return value !== undefined
      })
    }
    console.log('reult', result)
    const api = routeType === 'circulation' ? 'saveCirculationRoute' : 'saveProcessRoute'
    fetchAPI(apis.ProcessAPI[api], {
      process_material_id: processMaterial.id,
      routes: result
    }).then((repos) => {
      this.handleCloseRouteModal()
    })
  }

  render () {
    const { status, location } = this.props
    const { processMaterial, title, label, number, prefix, routeVisible, selectList, values } = this.state
    const query = QueryString.parse(location.search)
    const mydata = status.toJS()
    const list = _.get(mydata, 'list', [])
    const loading = _.get(mydata, 'loading')
    const workOrder = _.get(mydata, 'workOrder', '')
    const processName = _.get(mydata, 'processName', '')
    const unit = _.get(mydata, 'unit', '')
    return (
      <div>
        <FilterBar
          fieldsValue={query}
          onSearch={this.handleSearch}
        />
        <TableInfo
          workOrder={workOrder}
          processName={processName}
          unit={unit}
        />
        <CustomTable
          dataSource={list}
          columns={this._columns}
          loading={loading}
          pagination={false}
          size='middle'
          onChange={this.handleChangeTable}
        />
        { routeVisible &&
          <RouteModal
            title={title}
            label={label}
            visible={routeVisible}
            processMaterial={processMaterial}
            number={number}
            prefix={prefix}
            list={selectList}
            fieldsValue={values}
            onOk={this.handleSaveRoute}
            onCancel={this.handleCloseRouteModal}
            onChange={this.handleChange}
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
  getListDataAction: PropTypes.func.isRequired
}

export default ProcessImport
