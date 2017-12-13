import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import util from 'utils'
import { Button, message } from 'antd'
import fetchAPI from 'api'
import { apis } from 'api/config'

import CustomTable from 'components/CustomTable'
import WorkOrderModal from './WorkOrderModal'
import CheckModal from './CheckModal'
import './BidDocument.less'

const productionColumns = [
  'production_name', 'upload_file', 'create_work_order'
]
const workOrderColumns = [
  'uid', 'pretty_sell_type', 'client', 'project', 'count'
]

class BidDocument extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      workOrderVisible: false,
      checkVisible: false
    }
    this._productionColumns = this.buildProductionColumns()
    this._workOrderColumns = this.buildWorkOrderColumns()
  }

  componentDidMount () {
    this.fetchProductionList(this._query({}, 'page1'))
    this.fetchWorkOrderList(this._query({}, 'page2'))
  }

  fetchProductionList (query) {
    this.props.getProductionListDataAction({
      params: {
        page: query.page1 ? +query.page1 : 1
      }
    })
  }

  fetchWorkOrderList (query) {
    this.props.getWorkOrderListDataAction({
      params: {
        page: query.page2 ? +query.page2 : 1
      }
    })
  }

  buildProductionColumns () {
    return util.buildColumns(productionColumns, {
      name: {
        width: 220,
        fixed: 'left'
      },
      upload_file: {
        children: [{
          title: '生产',
          key: 'production',
          colSpan: 2,
          width: 220,
          render: (text, record, index) => {
            const document = record.documents_from_distribution['production']
            return document ? (
              <a
                className='document-link'
                href={document.path}
                download={document.name}
              >
                {document.name}
              </a>
            ) : ''
          }
        }, {
          key: 'production_status',
          colSpan: 0,
          width: 60,
          render : (text, record, index) => {
            const document = record.documents_from_distribution['production']
            if (!document) {
              return '未上传'
            }
            return document.actions.status ? (
              <Button
                type='primary'
                size='small'
                data-id={document.id}
                data-map={JSON.stringify(document.actions.status)}
                onClick={this.handleCheckClick}
              >
                审核
              </Button>
            ) : document.pretty_status
          }
        }, {
          title: '工艺',
          key: 'process',
          colSpan: 2,
          width: 220,
          render: (text, record, index) => {
            const document = record.documents_from_distribution['process']
            return document ? (
              <a
                className='document-link'
                href={document.path}
                download={document.name}
              >
                {document.name}
              </a>
            ) : ''
          }
        }, {
          key: 'process_status',
          colSpan: 0,
          width: 60,
          render : (text, record, index) => {
            const document = record.documents_from_distribution['process']
            if (!document) {
              return '未上传'
            }
            return document.actions.status ? (
              <Button
                type='primary'
                size='small'
                data-id={document.id}
                data-map={JSON.stringify(document.actions.status)}
                onClick={this.handleCheckClick}
              >
                审核
              </Button>
            ) : document.pretty_status
          }
        }, {
          title: '采购',
          key: 'procurement',
          colSpan: 2,
          width: 220,
          render: (text, record, index) => {
            const document = record.documents_from_distribution['procurement']
            return document ? (
              <a
                className='document-link'
                href={document.path}
                download={document.name}
              >
                {document.name}
              </a>
            ) : ''
          }
        }, {
          key: 'procurement_status',
          colSpan: 0,
          width: 60,
          render : (text, record, index) => {
            const document = record.documents_from_distribution['procurement']
            if (!document) {
              return '未上传'
            }
            return document.actions.status ? (
              <Button
                type='primary'
                size='small'
                data-id={document.id}
                data-map={JSON.stringify(document.actions.status)}
                onClick={this.handleCheckClick}
              >
                审核
              </Button>
            ) : document.pretty_status
          }
        }]
      },
      create_work_order: {
        render: (text, record, index) => {
          const abled = _.every(record.documents_from_distribution, (value, key) => {
            return value && value.pretty_status === '通过'
          })
          return (
            <Button
              type='primary'
              size='small'
              data-id={record.id}
              onClick={this.handleCreateClick}
              disabled={!abled}
            >
              生成工作令
            </Button>
          )
        }
      }
    })
  }

  buildWorkOrderColumns () {
    return util.buildColumns(workOrderColumns, {})
  }

  handleCheckClick = (e) => {
    const id = +e.target.dataset.id
    const map = JSON.parse(e.target.dataset.map)
    const checkList = _.map(map, (value, key) => {
      return {
        value: value,
        label: key
      }
    })
    this.setState({
      checkVisible: true,
      documentId: id,
      checkList: checkList
    })
  }

  handleCreateClick = (e) => {
    const id = +e.target.dataset.id
    this.setState({
      workOrderVisible: true,
      productionId: id
    })
  }

  _query (query = {}, page) {
    const oldQuery = QueryString.parse(this.props.location.search)
    return Object.assign({
      [page]: 1
    }, oldQuery, query)
  }

  updateQuery (newQuery = {}, page) {
    let { pathname } = this.props.location
    let mergeQuery = this._query(newQuery, page)
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
    return filterQuery
  }

  handleChangeProductionTable = (pagination, filters, sorter) => {
    const query = this.updateQuery({
      page1: pagination.current > 1 ? pagination.current : ''
    }, 'page1')
    this.fetchProductionList(query, 'page1')
  }

  handleChangeWorkOrderTable = (pagination, filters, sorter) => {
    const query = this.updateQuery({
      page2: pagination.current > 1 ? pagination.current : ''
    }, 'page2')
    this.fetchWorkOrderList(query, 'page2')
  }

  handleCloseModal = () => {
    this.setState({
      workOrderVisible: false,
      checkVisible: false
    })
  }

  handleSaveWorkOrder = (fieldsValue) => {
    fetchAPI(apis.Distribution.saveWorkOrder, fieldsValue).then((repos) => {
      if (repos.id !== undefined) {
        message.success('工作令生成成功！')
        this.handleCloseModal()
        this.fetchProductionList(this._query({}, 'page1'))
        this.fetchWorkOrderList(this._query({}, 'page2'))
      }
    })
  }

  handleSaveCheck = (values) => {
    let api = apis.Distribution.saveCheckDocument
    api.url = api.url(values.id)
    fetchAPI(api, values.fieldsValue).then((repos) => {
      message.success('审核成功！')
      this.handleCloseModal()
      this.fetchProductionList(this._query({}, 'page1'))
    })
  }

  render () {
    const { workOrderVisible, productionId, checkVisible, documentId, checkList } = this.state
    const { status } = this.props
    const mydata = status.toJS()
    const productionList = _.get(mydata, 'productionList', [])
    const productionLoading = _.get(mydata, 'productionLoading')
    const productionPagination = _.get(mydata, 'productionPagination', {})
    const workOrderList = _.get(mydata, 'workOrderList', [])
    const workOrderLoading = _.get(mydata, 'workOrderLoading')
    const workOrderPagination = _.get(mydata, 'workOrderPagination', {})
    return (
      <div className='bid-document'>
        <CustomTable
          dataSource={productionList}
          columns={this._productionColumns}
          loading={productionLoading}
          pagination={productionPagination}
          size='middle'
          bordered
          onChange={this.handleChangeProductionTable}
        />
        <CustomTable
          dataSource={workOrderList}
          columns={this._workOrderColumns}
          loading={workOrderLoading}
          pagination={workOrderPagination}
          size='middle'
          bordered
          onChange={this.handleChangeWorkOrderTable}
        />
        { workOrderVisible &&
          <WorkOrderModal
            visible={workOrderVisible}
            productionId={productionId}
            onOk={this.handleSaveWorkOrder}
            onCancel={this.handleCloseModal}
          />
        }
        { checkVisible &&
          <CheckModal
            visible={checkVisible}
            documentId={documentId}
            checkList={checkList}
            onOk={this.handleSaveCheck}
            onCancel={this.handleCloseModal}
          />
        }
      </div>
    )
  }
}

BidDocument.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getProductionListDataAction: PropTypes.func.isRequired,
  getWorkOrderListDataAction: PropTypes.func.isRequired
}

export default BidDocument
