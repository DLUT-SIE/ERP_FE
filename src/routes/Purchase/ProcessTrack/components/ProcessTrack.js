import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import util from 'utils'
import fetchAPI from 'api'
import { apis } from 'api/config'
import { Button, Popconfirm, message } from 'antd'

import OrderForm from 'components/OrderForm'
import CustomTable from 'components/CustomTable'
import TrackModal from './TrackModal'
import './ProcessTrack.less'

const columns = [
  'following_dt', 'following_method', 'following_feedback', 'doc_name', 'executor', 'inform_process'
]

class ProcessTrack extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    const query = QueryString.parse(this.props.location.search)
    this._id = +query.id
    this._columns = this.buildColumns()
  }

  componentDidMount () {
    this.props.getListDataAction({
      params: this._query()
    })
  }

  buildColumns () {
    return util.buildColumns(columns, {
      following_dt: {
        render: (text, record, index) => {
          return record.following_dt && record.following_dt.split('T')[0]
        }
      },
      doc_name: {
        render: (text, record, index) => {
          return record.path
          // return document ? (
          //   <a
          //     className='document-link'
          //     href={document.path}
          //     download={document.name}
          //   >
          //     {document.name}
          //   </a>
          // ) : ''
        }
      },
      inform_process: {
        render: (text, record, index) => {
          return record.inform_process ? '是' : '否'
        }
      }
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

  handleOpenTrackModal = () => {
    this.props.changeTrackModal({
      visible: true
    })
  }

  handleCloseTrackModal = () => {
    this.props.changeTrackModal({
      visible: false
    })
  }

  handleSaveTrack = (fieldsValue) => {
    fetchAPI(apis.PurchaseAPI.addProcessFollowingInfo, {
      ...fieldsValue,
      bidding_sheet: this._id
    }, {}, {}, true).then((repos) => {
      message.success('添加成功！')
      this.updatelist()
    })
  }

  handleReset = () => {
  }

  handleTrackFinished = () => {
    fetchAPI(apis.PurchaseAPI.updateBiddingSheet, { status: 7 }, { id: this._id }).then((repos) => {
      this.props.history.push({
        pathname: '/purchase/purchase_track'
      })
    })
  }

  render () {
    const { status } = this.props
    const mydata = status.toJS()
    const list = _.get(mydata, 'list', [])
    const loading = _.get(mydata, 'loading')
    const pagination = _.get(mydata, 'pagination', {})
    const trackModal = _.get(mydata, 'trackModal', {})
    return (
      <div className='process-track'>
        <OrderForm
          bidId={this._id}
        />
        <CustomTable
          dataSource={list}
          columns={this._columns}
          loading={loading}
          pagination={pagination}
          size='middle'
          onChange={this.handleChangeTable}
        />
        <div className='operation-area'>
          <Button
            type='primary'
            onClick={this.handleOpenTrackModal}
          >
            添加跟踪记录
          </Button>
          <Popconfirm
            title='确定重置吗？'
            onConfirm={this.handleReset}
            okText='确定'
            cancelText='取消'
          >
            <Button
              type='danger'
            >
              重置跟踪记录
            </Button>
          </Popconfirm>
          <Button
            type='success'
            onClick={this.handleTrackFinished}
          >
            跟踪完成
          </Button>
        </div>
        { trackModal.visible &&
          <TrackModal
            {...trackModal}
            onOk={this.handleSaveTrack}
            onCancel={this.handleCloseTrackModal}
          />
        }
      </div>
    )
  }
}

ProcessTrack.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getListDataAction: PropTypes.func.isRequired,
  changeTrackModal: PropTypes.func.isRequired
}

export default ProcessTrack
