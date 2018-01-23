/**
 * Created by lh on 2018/1/8.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Button } from 'antd'
import moment from 'moment'
import _ from 'lodash'
import './BroughtInMaterialRefundCardTable.less'
import { MATERIAL_REFUND_CARD_TYPE } from 'const'

class BroughtInMaterialRefundCardTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  iterateValues = (details) => {
    const lists = details.map((item, index) => {
      return (
        <tr className='tr-value' >
          <td className='index'>
            <p><span>{index}</span></p>
          </td>
          <td className='drawing-number'>
            <p><span>{item.drawing_number}</span></p>
          </td>
          <td className='name'>
            <p><span>{item.name}</span></p>
          </td>
          <td className='material-number'>
            <p><span>{item.material_number}</span></p>
          </td>
          <td className='specification'>
            <p><span>{item.specification}</span></p>
          </td>
          <td className='material-code'>
            <p><span>{item.material_code}</span></p>
          </td>
          <td className='remark'>
            <p><span>{item.remark}</span></p>
          </td>
        </tr>
      )
    })
    return lists
  }
  changeSign = (e) => {
    const { id, actions } = e.target.dataset
    const { changeStatus } = this.props
    changeStatus && changeStatus(MATERIAL_REFUND_CARD_TYPE.BROUGHT_IN, id, actions)
  }
  getStatusButton = (id, people, status, actions, tarStatus) => {
    if (!_.isNull(people)) {
      return people
    } else if (status === tarStatus) {
      const nextStatus = _.values(actions.status)
      return <Button onClick={this.changeSign} data-actions={nextStatus[0]} data-id={id}>签字</Button>
    } else {
      return <Button disabled>签字</Button>
    }
  }
  render () {
    let refundCard = this.props.details
    console.log('table', refundCard)
    return (
      <div className='brought-in-material-refund-card-table'>
        <p className='title'><u><span>太重滨海煤化工分公司</span></u></p>
        <p className='title'>
          <span>外购件退库卡</span>
        </p>
        <div className='wrapper'>
          <Row>
            <Col span={6}>
              <span className='outline'>工作令号：{refundCard.department}</span>
            </Col>
            <Col span={6}>
              <span className='outline'>领用单位：{refundCard.create_dt && moment(refundCard.create_dt).format('YYYY-MM-DD')}</span>
            </Col>
            <Col span={6}>
              <span className='outline'>日期：{refundCard.uid}</span>
            </Col>
            <Col span={6}>
              <span className='outline'>编号：{refundCard.uid}</span>
            </Col>
          </Row>
          <table className='table-info'>
            <tr className='tr-label' >
              <td className='index'>
                <p><span>序号</span></p>
              </td>
              <td className='drawing-number'>
                <p><span>零件图/标准</span></p>
              </td>
              <td className='name'>
                <p><span>名称及规格</span></p>
              </td>
              <td className='material-number'>
                <p><span>材料牌号</span></p>
              </td>
              <td className='count'>
                <p><span>数量</span></p>
              </td>
              <td className='material-code'>
                <p><span>标记号</span></p>
              </td>
              <td className='remark'>
                <p><span>备注</span></p>
              </td>
            </tr>
            {this.iterateValues(refundCard.details)}
          </table>
          <Row className='actions'>
            <Col span={12}>
              <span>退库人：{this.getStatusButton(refundCard.id, refundCard.refunder, refundCard.status, refundCard.actions, 0)}</span>
            </Col>
            <Col span={12}>
              <span>库管人：{this.getStatusButton(refundCard.id, refundCard.keeper, refundCard.status, refundCard.actions, 2)}</span>
            </Col>
          </Row>
        </div>
      </div>)
  }
}
BroughtInMaterialRefundCardTable.propTypes = {
  details: PropTypes.object.isRequired,
  changeStatus: PropTypes.func.isRequired
}

export default BroughtInMaterialRefundCardTable
