/**
 * Created by lh on 2018/1/8.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Button } from 'antd'
import moment from 'moment'
import _ from 'lodash'
import './SteelBoardMaterialRefundCardTable.less'
import { MATERIAL_REFUND_CARD_TYPE } from 'const'

class SteelBoardMaterialRefundCardTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  iterateValues = (details, status) => {
    const lists = details.map((item, index) => {
      return (
        <tr className='tr-value' key={index}>
          <td className='name'>
            <p><span>{item.name}</span></p>
          </td>
          <td className='material'>
            <p><span>{item.material}</span></p>
          </td>
          <td className='spec'>
            <p><span>{item.specification}</span></p>
          </td>
          <td className='material-code'>
            <p><span>{item.material_code}</span></p>
          </td>
          <td className='status'>
            <p><span>{status}</span></p>
          </td>
          <td className='count'>
            <p><span>{item.count}</span></p>
          </td>
          <td className='weight'>
            <p><span>{item.weight}</span></p>
          </td>
          <td className='apply-card-uid'>
            <p><span>{item.apply_card_uid}</span></p>
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
    changeStatus && changeStatus(MATERIAL_REFUND_CARD_TYPE.STEEL, id, actions)
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
      <div className='steel-board-material-refund-card-table'>
        <p className='title'><u><span>太重滨海煤化工分公司</span></u></p>
        <p className='title'>
          <span>板材余料退库单</span>
        </p>
        <div className='wrapper'>
          <Row>
            <Col span={8}>
              <span className='outline'>工作令：{refundCard.sub_order_uid}</span>
            </Col>
            <Col span={8}>
              <span className='outline'>日期：{refundCard.create_dt && moment(refundCard.create_dt).format('YYYY-MM-DD')}</span>
            </Col>
            <Col span={8}>
              <span className='outline'>单据编号：{refundCard.uid}</span>
            </Col>
          </Row>
          <table className='table-info'>
            <tbody>
              <tr className='tr-label' >
                <td className='name'>
                  <p><span>名称</span></p>
                </td>
                <td className='material'>
                  <p><span>材质</span></p>
                </td>
                <td className='spec'>
                  <p><span>规格</span></p>
                </td>
                <td className='material-code'>
                  <p><span>材质编号</span></p>
                </td>
                <td className='status'>
                  <p><span>状态</span></p>
                </td>
                <td className='count'>
                  <p><span>数量</span></p>
                </td>
                <td className='weight'>
                  <p><span>重量</span></p>
                </td>
                <td className='apply-card-uid'>
                  <p><span>领用单编号</span></p>
                </td>
                <td className='remark'>
                  <p><span>备注</span></p>
                </td>
              </tr>
              {this.iterateValues(refundCard.board_details, refundCard.pretty_status)}
              <tr className='tr-pic'>
                <td className='pic'>
                  <p><span>简图</span></p>
                </td>
                <td colSpan={8} />
              </tr>
              <tr className='tr-btns'>
                <td>
                  <p><span>退料人</span></p>
                </td>
                <td colSpan={2}>
                  <p><span>{this.getStatusButton(refundCard.id, refundCard.refunder, refundCard.status, refundCard.actions, 0)}</span></p>
                </td>
                <td>
                  <p><span>检验人</span></p>
                </td>
                <td colSpan={2}>
                  <p><span>{this.getStatusButton(refundCard.id, refundCard.inspector, refundCard.status, refundCard.actions, 1)}</span></p>
                </td>
                <td>
                  <p><span>库管员</span></p>
                </td>
                <td colSpan={2}>
                  <p><span>{this.getStatusButton(refundCard.id, refundCard.keeper, refundCard.status, refundCard.actions, 2)}</span></p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>)
  }
}
SteelBoardMaterialRefundCardTable.propTypes = {
  details: PropTypes.object.isRequired,
  changeStatus: PropTypes.func.isRequired
}

export default SteelBoardMaterialRefundCardTable
