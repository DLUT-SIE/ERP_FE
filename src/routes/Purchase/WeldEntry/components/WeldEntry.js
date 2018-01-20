import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import fetchAPI from 'api'
import { apis } from 'api/config'
import { Button, message } from 'antd'

import WeldEntryDetailTr from './WeldEntryDetailTr'
import DetailModal from './DetailModal'
import './WeldEntry.less'

class WeldEntry extends React.Component {
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
    fetchAPI(apis.PurchaseAPI.updateWeldingMaterialEntryDetail, fieldsValue, { id }).then((repos) => {
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
    return (
      <div className='weld-entry'>
        <p className='title-compony'>
          <u>太重滨海煤化工分公司</u>
        </p>
        <p className='title-entry'>焊材入库单</p>
        <div className='date-uid'>
          <span>入库时间：{data.create_dt && data.create_dt.split('T')[0]}</span>
          <span>单据编号：{data.uid}</span>
        </div>
        <table className='weld-entry-table' cellSpacing={0} cellPadding={0}>
          <thead>
            <tr className='head-tr'>
              <th className='name-td'>名称</th>
              <th className='material-td'>牌号</th>
              <th className='model-td'>型号</th>
              <th className='spec-td'>规格</th>
              <th className='total-weight-td'>公斤数</th>
              <th className='weight-td'>单件重量</th>
              <th className='count-td'>件数</th>
              <th className='batch-number-td'>材料批号</th>
              <th className='material-number-td'>材质编号</th>
              <th className='production-dt-td'>出厂日期</th>
              <th className='factory-td'>厂家</th>
            </tr>
            {
              _.map(data.details, (item, index) => {
                return (
                  <WeldEntryDetailTr
                    key={index}
                    index={index}
                    item={item}
                    onEdit={this.handleOpenModal}
                  />
                )
              })
            }
            <tr className='sign-tr'>
              <td className='purchaser-td'>采购员</td>
              <td className='purchaser-value-td' colSpan={2}>
                { data.purchaser ? data.purchaser : (
                  <Button type='primary' size='small'>签字</Button>
                ) }
              </td>
              <td className='inspector-td'>检验员</td>
              <td className='inspector-value-td' colSpan={3}>
                { data.inspector ? data.inspector : (
                  <Button type='primary' size='small'>签字</Button>
                ) }
              </td>
              <td className='keeper-td'>库管员</td>
              <td className='keeper-value-td' colSpan={3}>
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
            onOk={this.handleSave}
            onCancel={this.handleCloseModal}
          />
        }
      </div>
    )
  }
}

WeldEntry.propTypes = {
  location: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getDataAction: PropTypes.func.isRequired,
  changeModalAction: PropTypes.func.isRequired
}

export default WeldEntry
