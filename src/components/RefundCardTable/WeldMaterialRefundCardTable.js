/**
 * Created by lh on 2018/1/8.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Button } from 'antd'
import moment from 'moment'
import _ from 'lodash'
import './WeldMaterialRefundCardTable.less'
import { MATERIAL_REFUND_CARD_TYPE } from 'const'

class WeldMaterialApplyCardTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  changeSign = (e) => {
    const { id, actions } = e.target.dataset
    const { changeStatus } = this.props
    changeStatus && changeStatus(MATERIAL_REFUND_CARD_TYPE.WELD, id, actions)
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
      <div className='material-refund-card-table'>
        <p className='title'><u><span>太重滨海煤化工分公司</span></u></p>
        <p className='title'>
          <span>焊接材料退库卡</span>
        </p>
        <div className='wrapper'>
          <Row>
            <Col span={8}>
              <span className='outline'>退库单位：{refundCard.department}</span>
            </Col>
            <Col span={8}>
              <span className='outline'>退库时间：{refundCard.create_dt && moment(refundCard.create_dt).format('YYYY-MM-DD')}</span>
            </Col>
            <Col span={8}>
              <span className='outline'>编号：{refundCard.uid}</span>
            </Col>
          </Row>
          <table className='table-info'>
            <tr className='tr-label' >
              <td rowSpan={2} className='sub-order-uid'>
                <p><span>工作令</span></p>
              </td>
              <td rowSpan={2} className='apply-card-dt'>
                <p><span>领用时间</span></p>
              </td>
              <td rowSpan={2} className='apply-card-uid'>
                <p><span>领用单编号</span></p>
              </td>
              <td rowSpan={2} className='model'>
                <p><span>型号</span></p>
              </td>
              <td rowSpan={2} className='specification'>
                <p><span>规格</span></p>
              </td>
              <td colSpan={2} className='refund-num'>
                <p><span>退库量</span></p>
              </td>
              <td rowSpan={2} className='refund-status'>
                <p><span>退库状态</span></p>
              </td>
            </tr>
            <tr className='tr-label-row-1'>
              <td className='weight'>
                <p><span>重量(kg)</span></p>
              </td>
              <td className='count'>
                <p><span>数量</span></p>
              </td>
            </tr>
            <tr className='tr-value'>
              <td className='sub-order-uid-value'>
                <p><span>{refundCard.sub_order_uid}</span></p>
              </td>
              <td className='welding-seam-uid-value'>
                <p><span>{refundCard.apply_card_create_dt && moment(refundCard.apply_card_create_dt).format('YYYY-MM-DD')}</span></p>
              </td>
              <td className='apply-card-uid'>
                <p><span>{refundCard.apply_card_uid}</span></p>
              </td>
              <td className='model-value'>
                <p><span>{refundCard.model}</span></p>
              </td>
              <td className='specification-value'>
                <p><span>{refundCard.specification}</span></p>
              </td>
              <td className='refund-value'>
                <p><span>{refundCard.weight}</span></p>
              </td>
              <td className='apply-value'>
                <p><span>{refundCard.count}</span></p>
              </td>
              <td className='material-code-value'>
                <p><span>{refundCard.pretty_status}</span></p>
              </td>
            </tr>
            <tr className='remark_tr'>
              <td colSpan={8} className='remark'>
                <p><span>备注：1、以上六项为领用人填写；2、后一项为发料人填写</span></p>
              </td>
            </tr>
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
WeldMaterialApplyCardTable.propTypes = {
  details: PropTypes.object.isRequired,
  changeStatus: PropTypes.func.isRequired
}

export default WeldMaterialApplyCardTable
