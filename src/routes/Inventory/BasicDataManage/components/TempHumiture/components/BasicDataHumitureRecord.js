import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import QueryString from 'query-string'
import util, { makeFields } from 'utils'
import fetchAPI from 'api'
import { apis } from 'api/config'
import { Button, message, Form, Input } from 'antd'
import './BasicDataHumitureRecord.less'

const columns = [
  'create_dt', 'keeper', 'action'
]
const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 8 }
}
const formItemLayout2 = {
  wrapperCol: { span: 11 }
}
const fieldsConfig = {
  requireTemp: {
    rules:[{ required: true, message:'请输入要求温度' }, {
      pattern: /^[0-9]+$/, message: '请输入数值！'
    }]
  },
  requireHumid: {
    rules:[{ required: true, message:'请输入要求湿度' }, {
      pattern: /^[0-9]+$/, message: '请输入数值！'
    }]
  }
}
const FormItem = Form.Item
class BasicDataHumitureRecord extends React.Component {
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
    return util.buildColumns(columns, {})
  }

  updatelist (query = QueryString.parse(this.props.location.search)) {
    this.props.getListDataAction({
      params: query
    })
  }
  handleSave = (fieldsValue) => {
    fetchAPI(apis.InventoryAPI.updateWeldHumitureRecord, fieldsValue, { id: fieldsValue.id }).then((repos) => {
      this.handleCloseModal()
      message.success('修改成功！')
      this.props.getListDataAction({
        params: this._query()
      })
    })
    return
  }
  handleChangeTable = (pagination, filters, sorter) => {
    this.updateQuery({
      page: pagination.current > 1 ? pagination.current : ''
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
  render () {
    const { form } = this.props
    // const mydata = status.toJS()
    // const list = _.get(mydata, 'list', [])
    const { getFieldDecorator } = form
    return (
      <Form className='basic-data-humiture-record'>
        <FormItem label='要求温度' {...formItemLayout}>
          {
            getFieldDecorator('requireTemp', fieldsConfig['requireTemp'])(
              <Input placeholder='请输入要求温度' />)
          }
        </FormItem>
        <FormItem label='要求湿度' {...formItemLayout}>
          {
            getFieldDecorator('requireHumid', fieldsConfig['requireHumid'])(
              <Input placeholder='请输入要求温度' />)
          }
        </FormItem>
        <FormItem {...formItemLayout2}>
          <Button className='float-right' type='success'>确定</Button>
        </FormItem>
      </Form>
    )
  }
}

BasicDataHumitureRecord.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  getListDataAction: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired
}

const WrappedForm = Form.create({
  mapPropsToFields (props) {
    return makeFields(props.fieldsValue)
  }
})(BasicDataHumitureRecord)

export default WrappedForm
