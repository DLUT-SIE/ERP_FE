import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import util from 'utils'
import fetchAPI from 'api'
import { apis } from 'api/config'
import { Button, Checkbox, message } from 'antd'

import FilterBar from 'components/WorkOrderFilterBar'
import CustomTable from 'components/CustomTable'
import TableInfo from 'components/TableInfo'
import WeldingSeamModal from 'components/WeldingSeamModal'
import './WeldingSeam.less'

const columns = [
  'add', 'part_drawing_number', 'uid', 'ticket_number', 'seam_type', 'weld_method', 'length', 'bm_1', 'wm_1',
  'ws_1', 'wt_1', 'weight_1', 'wf_1', 'wf_weight_1', 'bm_2', 'wm_2', 'ws_2', 'wt_2', 'weight_2', 'wf_2',
  'wf_weight_2', 'remark', 'action'
]

class WeldingSeam extends React.Component {
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
      add: {
        fixed: 'left',
        width: 100,
        render: (text, record, index) => {
          return record.status ? '已添加' : (
            <Checkbox
              onChange={this.handleChangeCheckbox(record.id)}
            />
          )
        }
      },
      weld_method: {
        render: (text, record, index) => {
          return `${record.weld_method_1} + ${record.weld_method_2}`
        }
      },
      remark: {
        fixed: 'right',
        width: 120
      },
      action: {
        fixed: 'right',
        width: 120,
        render: (text, record, index) => {
          return (
            <span>
              <Button
                type='primary'
                size='small'
                data-fields-value={JSON.stringify(record)}
                data-index={index}
                onClick={this.handleOpenWeldingSeamModal}
              >
                编辑
              </Button>
            </span>
          )
        }
      }
    })
  }

  handleChangeCheckbox = (id) => {
    return (e) => {
      console.log('handleChangeCheckbox', e.target)
      const { checked } = e.target
      console.log('checked', checked)
    }
  }

  handleOpenWeldingSeamModal = (e) => {
    const { fieldsValue, index } = e.target.dataset
    this.props.changeWeldingSeamModalAction({
      visible: true,
      index: +index,
      fieldsValue: JSON.parse(fieldsValue)
    })
  }

  handleCloseWeldingSeamModal = (e) => {
    this.props.changeWeldingSeamModalAction({
      visible: false
    })
  }

  handleChangeWeldingSeam = (e) => {
    const { type } = e.target.dataset
    const { status, changeWeldingSeamModalAction } = this.props
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
    changeWeldingSeamModalAction({
      visible: true,
      index,
      fieldsValue: list[index]
    })
  }

  handleSaveWeldingSeam = (fieldsValue) => {
    fetchAPI(apis.ProcessAPI.updateWeldingQuota, fieldsValue).then((repos) => {
      message.success('修改成功！')
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
    const workOrderInfo = _.get(mydata, 'workOrderInfo', '')
    const weldingSeamModal = _.get(mydata, 'weldingSeamModal', {})
    return (
      <div className='welding-seam'>
        <FilterBar
          className='filterbar'
          fieldsValue={query}
          onSearch={this.handleSearch}
        />
        <div className='add-btn'>
          <Button
            className='check-btn'
            type='primary'
            size='large'
            onClick={this.handleOpenAddModal}
          >
            查看焊接工艺规程
          </Button>
          <Button
            size='large'
            onClick={this.handleQuichAdd}
          >
            添加至焊接接头
          </Button>
        </div>
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
          scroll={{ x: 2000 }}
          onChange={this.handleChangeTable}
        />
        { weldingSeamModal.visible &&
          <WeldingSeamModal
            {...weldingSeamModal}
            onOk={this.handleSaveWeldingSeam}
            onCancel={this.handleCloseWeldingSeamModal}
          />
        }
      </div>
    )
  }
}

WeldingSeam.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getListDataAction: PropTypes.func.isRequired,
  changeWeldingSeamModalAction: PropTypes.func.isRequired
}

export default WeldingSeam
