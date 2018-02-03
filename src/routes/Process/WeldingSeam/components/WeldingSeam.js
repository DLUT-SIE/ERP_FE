import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import util from 'utils'
import fetchAPI from 'api'
import { apis } from 'api/config'
import { DETAILED_TABLE_CATEGORY_MAP } from 'const'
import { Button, Checkbox, message } from 'antd'

import FilterBar from 'components/WorkOrderFilterBar'
import CustomTable from 'components/CustomTable'
import TableInfo from 'components/TableInfo'
import WeldingSeamModal from 'components/WeldingSeamModal'
import WeldingJointModal from './WeldingJointModal'
import './WeldingSeam.less'

const columns = [
  'add', 'part_drawing_number', 'uid', 'ticket_number', 'seam_type', 'weld_position_name', 'weld_method_1_name',
  'weld_method_2_name', 'length', 'bm_1', 'bm_thick_1', 'wm_1_name', 'ws_1', 'wt_1', 'weight_1', 'wf_1_name', 'wf_weight_1',
  'bm_2', 'bm_thick_2', 'wm_2_name', 'ws_2', 'wt_2', 'weight_2', 'wf_2_name',
  'wf_weight_2', 'remark', 'action'
]

class WeldingSeam extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      checkedList: []
    }
    this._columns = this.buildColumns()
    this._category = DETAILED_TABLE_CATEGORY_MAP['焊缝明细表']
  }

  componentDidMount () {
    this.props.getMaterialsAction({
      params: {}
    })
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
    }
  }

  componentWillUnmount () {
    this.props.resetDataAction()
  }

  buildColumns () {
    return util.buildColumns(columns, {
      add: {
        fixed: 'left',
        width: 100,
        render: (text, record, index) => {
          return record.added_welding_joint ? '已添加' : (
            <Checkbox
              onChange={this.handleChangeCheckbox(record)}
            />
          )
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
                data-id={record.id}
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

  fetchWeldingSeam (id, cb) {
    fetchAPI(apis.ProcessAPI.getWeldingSeam, {}, { id }).then((repos) => {
      cb(repos)
    })
  }

  handleOpenWeldingSeamModal = (e) => {
    const { id, index } = e.target.dataset
    this.fetchWeldingSeam(id, (repos) => {
      this.props.changeWeldingSeamModalAction({
        visible: true,
        index: +index,
        fieldsValue: repos
      })
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
    const weldingSeamModal = _.get(mydata, 'weldingSeamModal', [])
    const list = _.get(mydata, 'list', [])
    let { index } = weldingSeamModal
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
    this.fetchWeldingSeam(list[index].id, (repos) => {
      changeWeldingSeamModalAction({
        visible: true,
        index,
        fieldsValue: repos
      })
    })
  }

  handleSaveWeldingSeam = (id, fieldsValue) => {
    fetchAPI(apis.ProcessAPI.updateWeldingSeam, fieldsValue, { id }).then((repos) => {
      message.success('修改成功！')
      this.handleCloseWeldingSeamModal()
      this.props.getListDataAction({
        params: this._query()
      })
    })
  }

  handleChangeCheckbox = (record) => {
    return (e) => {
      const { checked } = e.target
      let { checkedList } = this.state
      if (checked) {
        checkedList.push(record)
      } else {
        checkedList = _.filter(checkedList, (item) => {
          return item.id !== record.id
        })
      }
      this.setState({
        checkedList
      })
    }
  }

  equalFieldsAddToWeldingJoint (weldingSeam) {
    return {
      weld_position_name: weldingSeam.weld_position_name,
      weld_method_1_name: weldingSeam.weld_method_1_name,
      weld_method_2_name: weldingSeam.weld_method_2_name,
      bm_1: weldingSeam.bm_1,
      bm_2: weldingSeam.bm_2,
      bm_thick_1: weldingSeam.bm_thick_1,
      bm_thick_2: weldingSeam.bm_thick_2
    }
  }

  canAddToWeldingJoint (checkedList) {
    if (!checkedList.length) {
      message.warning('请先选择需要添加的焊缝！')
      return false
    }
    const firstWeldingSeam = checkedList[0]
    const allEqual = _.every(checkedList, this.equalFieldsAddToWeldingJoint(firstWeldingSeam))
    if (!allEqual) {
      message.error('所选焊缝不能合并！')
      return false
    }
    return true
  }

  handleOpenWeldingJointModal = () => {
    const { checkedList } = this.state
    if (this.canAddToWeldingJoint(checkedList)) {
      const firstWeldingSeam = checkedList[0]
      const equalFields = this.equalFieldsAddToWeldingJoint(firstWeldingSeam)
      const jointIndex = _.map(checkedList, (item) => (item.uid)).join(',')
      this.props.changeWeldingJointModalAction({
        visible: true,
        fieldsValue: {
          ...equalFields,
          remark: firstWeldingSeam.remark,
          joint_index: jointIndex
        }
      })
    }
  }

  handleCloseWeldingJointModal = () => {
    this.props.changeWeldingJointModalAction({
      visible: false
    })
  }

  handleAddWeldingJoint = (fieldsValue) => {
    const { checkedList } = this.state
    const mydata = this.props.status.toJS()
    const weldProSpeci = _.get(mydata, 'weldProSpeci', [])
    const weldingSeams = _.map(checkedList, (item) => {
      return item.id
    })
    fetchAPI(apis.ProcessAPI.addWeldingJointProcessAnalyses, {
      welding_seams: weldingSeams,
      spec: weldProSpeci.id,
      ...fieldsValue
    }).then((repos) => {
      message.success('添加成功！')
      this.handleCloseWeldingJointModal()
      this.updatelist()
    })
  }

  handleCheckWeldingProcessSpecification = () => {
  }

  render () {
    const { status, location } = this.props
    const query = QueryString.parse(location.search)
    const mydata = status.toJS()
    const list = _.get(mydata, 'list', [])
    const loading = _.get(mydata, 'loading')
    const pagination = _.get(mydata, 'pagination', {})
    const workOrderInfo = _.get(mydata, 'workOrderInfo', {})
    const weldingSeamModal = _.get(mydata, 'weldingSeamModal', {})
    const weldingJointModal = _.get(mydata, 'weldingJointModal', {})
    const weldingMaterials = _.get(mydata, 'weldingMaterials', {})
    const fluxMaterials = _.get(mydata, 'fluxMaterials', {})
    const weldCertifiList = _.get(mydata, 'weldCertifiList', {})
    return (
      <div className='welding-seam'>
        <FilterBar
          className='filterbar'
          fieldsValue={query}
          onSearch={this.handleSearch}
        />
        { workOrderInfo.id &&
          <div className='add-btn'>
            <Button
              className='check-btn'
              type='primary'
              onClick={this.handleCheckWeldingProcessSpecification}
            >
              查看焊接工艺规程
            </Button>
            <Button
              type='success'
              onClick={this.handleOpenWeldingJointModal}
            >
              添加至焊接接头
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
          scroll={{ x: 2500 }}
          onChange={this.handleChangeTable}
        />
        { weldingSeamModal.visible &&
          <WeldingSeamModal
            {...weldingSeamModal}
            weldingMaterials={weldingMaterials}
            fluxMaterials={fluxMaterials}
            onOk={this.handleSaveWeldingSeam}
            onCancel={this.handleCloseWeldingSeamModal}
            onChange={this.handleChangeWeldingSeam}
          />
        }
        { weldingJointModal.visible &&
          <WeldingJointModal
            {...weldingJointModal}
            weldCertifiList={weldCertifiList}
            onOk={this.handleAddWeldingJoint}
            onCancel={this.handleCloseWeldingJointModal}
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
  getLibraryDataAction: PropTypes.func.isRequired,
  getMaterialsAction: PropTypes.func.isRequired,
  resetDataAction: PropTypes.func.isRequired,
  getListDataAction: PropTypes.func.isRequired,
  changeWeldingSeamModalAction: PropTypes.func.isRequired,
  changeWeldingJointModalAction: PropTypes.func.isRequired
}

export default WeldingSeam
