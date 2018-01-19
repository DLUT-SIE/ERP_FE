import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import fetchAPI from 'api'
import { apis } from 'api/config'
import { Button, message } from 'antd'

import SteelEntryDetailTr from './SteelEntryDetailTr'
import DetailModal from './DetailModal'
import './SteelEntry.less'

class SteelEntry extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    const query = QueryString.parse(this.props.location.search)
    this._id = +query.id
  }

  componentDidMount () {
    if (!_.isUndefined(this._id)) {
      this.props.getDataAction({
        id: this._id
      })
    }
  }

  handleOpenModal = (index) => {
    const mydata = this.props.status.toJS()
    const data = _.get(mydata, 'data', [])
    this.props.changeModalAction({
      visible: true,
      fieldsValue: data.details[index]
    })
  }

  handleCloseModal = () => {
    this.props.changeModalAction({
      visible: false
    })
  }

  handleSave = (id, fieldsValue) => {
    fetchAPI(apis.PurchaseAPI.updateSteelMaterialEntryDetail, fieldsValue, { id }).then((repos) => {
      message.success('修改成功！')
      this.handleCloseModal()
      this.props.getDataAction({
        id: this._id
      })
    })
  }

  render () {
    const { status } = this.props
    const mydata = status.toJS()
    const data = _.get(mydata, 'data', [])
    const modal = _.get(mydata, 'modal', {})
    const isBar = data.steel_type === 1
    return (
      <div className='steel-entry'>
        <p className='title-compony'>
          <u>太重（滨海）重型机械有限公司</u>
          <span className='modification-number'>修改号：</span>
        </p>
        <p className='title-entry'>
          入库单
          <span className='sample-form'>样表：</span>
        </p>
        <div className='base-info'>
          <span>货物来源：{data.source}</span>
          <span>订购单编号：{data.purchase_order_uid}</span>
          <span>接收检查记录表编号：{data.check_number}</span>
          <span>编号：{data.uid}</span>
        </div>
        <table className='steel-entry-table' cellSpacing={0} cellPadding={0}>
          <thead>
            <tr className='head-tr'>
              <th className='order-td'><b>序号</b></th>
              <th className='work-order-uid-td'><b>工作令</b></th>
              <th className='figure-number-td'><b>标准号或图号</b></th>
              <th className='name-spec-td'><b>名称及规格</b></th>
              <th className='material-number-td'><b>材料牌号</b></th>
              <th className='batch-number-td'><b>炉批号</b></th>
              <th className='sign-td'><b>标记号</b></th>
              <th className='unit-td'><b>单位</b></th>
              <th className='count-td'><b>数量</b></th>
              { isBar &&
                <th className='length-td'><b>长度</b></th>
              }
              <th className='weight-td'><b>重量</b></th>
            </tr>
            {
              _.map(data.details, (item, index) => {
                return (
                  <SteelEntryDetailTr
                    key={index}
                    isBar={isBar}
                    index={index}
                    item={item}
                    onEdit={this.handleOpenModal}
                  />
                )
              })
            }
            <tr className='remark-tr'>
              <td colSpan={11} className='remark-td'>
                备注：
                <p>{data.remark}</p>
              </td>
            </tr>
            <tr className='sign-tr'>
              <td className='purchaser-td' colSpan={3}>
                采购员：
                { data.purchaser ? data.purchaser : (
                  <Button type='primary' size='small'>签字</Button>
                ) }
              </td>
              <td className='inspector-td' colSpan={4}>
                检验员：
                { data.inspector ? data.inspector : (
                  <Button type='primary' size='small'>签字</Button>
                ) }
              </td>
              <td className='keeper-td' colSpan={4}>
                库管员：
                { data.keeper ? data.keeper : (
                  <Button type='primary' size='small'>签字</Button>
                ) }
              </td>
            </tr>
          </thead>
        </table>
        { modal.visible &&
          <DetailModal
            {...modal}
            isBar={isBar}
            onOk={this.handleSave}
            onCancel={this.handleCloseModal}
          />
        }
      </div>
    )
  }
}

SteelEntry.propTypes = {
  location: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getDataAction: PropTypes.func.isRequired,
  changeModalAction: PropTypes.func.isRequired
}

export default SteelEntry
