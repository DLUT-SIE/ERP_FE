/**
 * Created by lh on 2018/1/19.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Button } from 'antd'
import moment from 'moment'
import _ from 'lodash'
import './SteelMaterialApplyCardTable.less'
import { MATERIAL_APPLY_CARD_TYPE } from 'const'

class SteelMaterialApplyCardTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  iterateValues = (details) => {
    const lists = details.map((item, index) => {
      return (
        <tr className='tr-value' key={index}>
          <td className='sub-order-uid'>
            {item.sub_order_uid}
          </td>
          <td className='material-mark'>
            {item.material_mark}
          </td>
          <td className='material-code'>
            {item.material_code}
          </td>
          <td className='spec'>
            {item.specification}
          </td>
          <td className='count'>
            {item.count}
          </td>
          <td className='components'>
            {item.component}
          </td>
        </tr>
      )
    })
    return lists
  }
  changeSign = (e) => {
    const { id, actions } = e.target.dataset
    const { changeStatus } = this.props
    changeStatus && changeStatus(MATERIAL_APPLY_CARD_TYPE.STEEL, id, actions)
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
    let applyCard = this.props.details
    return (
      <div className='steel-material-apply-card-table'>
        <p className='title'><u><span>太重滨海煤化工分公司</span></u></p>
        <p className='title'>
          <span>原材料领用卡</span>
        </p>
        <div className='wrapper'>
          {/* <p className='scrap'></p> */}
          <Row>
            <Col span={8}>
              <span className='outline'>领用单位：{applyCard.department}</span>
            </Col>
            <Col span={8}>
              <span className='outline'>日期：{applyCard.create_dt && moment(applyCard.create_dt).format('YYYY-MM-DD')}</span>
            </Col>
            <Col span={8}>
              <span className='outline'>编号：{applyCard.uid}</span>
            </Col>
          </Row>
          <table className='table-info'>
            <tbody>
              <tr className='tr-label' >
                <td className='sub-order-uid'>
                  <p><span>工作令</span></p>
                </td>
                <td className='material-mark'>
                  <p><span>钢号</span></p>
                </td>
                <td className='material-code'>
                  <p><span>材质编号</span></p>
                </td>
                <td className='spec'>
                  <p><span>规格</span></p>
                </td>
                <td className='count'>
                  <p><span>数量</span></p>
                </td>
                <td className='components'>
                  <p><span>零件编号</span></p>
                </td>
              </tr>
              {this.iterateValues(applyCard.details)}
              <tr className='remark_tr'>
                <td colSpan={7} className='remark'>
                  <p><span>备注：1、以上六项为领用人填写；2、后二项为发料人填写</span></p>
                </td>
              </tr>
            </tbody>
          </table>
          <Row className='actions'>
            <Col span={6}>
              <span>领料人：{this.getStatusButton(applyCard.id, applyCard.applicant, applyCard.status, applyCard.actions, 0)}</span>
              {/* <span>领料人：{_.isNull(applyCard.applicant) ? <Button onClick={this.props.changeStatus}>签字</Button> : applyCard.applicant }</span> */}
            </Col>
            <Col span={6}>
              <span>审核人：{this.getStatusButton(applyCard.id, applyCard.auditor, applyCard.status, applyCard.actions, 1)}</span>
            </Col>
            <Col span={6}>
              <span>检察员：{this.getStatusButton(applyCard.id, applyCard.inspector, applyCard.status, applyCard.actions, 2)}</span>
            </Col>
            <Col span={6}>
              <span>库管员：{this.getStatusButton(applyCard.id, applyCard.keeper, applyCard.status, applyCard.actions, 3)}</span>
            </Col>
          </Row>
        </div>
      </div>)
  }
}
SteelMaterialApplyCardTable.propTypes = {
  details: PropTypes.object.isRequired,
  changeStatus: PropTypes.func.isRequired
}

export default SteelMaterialApplyCardTable
