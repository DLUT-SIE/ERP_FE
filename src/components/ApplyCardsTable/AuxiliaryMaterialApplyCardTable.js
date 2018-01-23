/**
 * Created by lh on 2018/1/19.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Button } from 'antd'
import _ from 'lodash'
import moment from 'moment'
import './AuxiliaryMaterialApplyCardTable.less'
import { MATERIAL_APPLY_CARD_TYPE } from 'const'

class AuxiliaryMaterialApplyCardTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  changeSign = (e) => {
    const { id, actions } = e.target.dataset
    const { changeStatus } = this.props
    changeStatus && changeStatus(MATERIAL_APPLY_CARD_TYPE.AUXILIARY, id, actions)
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
    console.log('table', applyCard)
    return (
      <div className='auxiliary-apply-card-table'>
        <p className='title'><u><span>太重滨海煤化工分公司</span></u></p>
        <p className='title'>
          <span>内部材料领用单</span>
        </p>
        <div className='wrapper'>
          <Row>
            <Col span={8}>
              <span className='outline'>领用单位：{applyCard.department}</span>
            </Col>
            <Col span={8}>
              <span className='outline'>日期：{applyCard.create_dt && moment(applyCard.create_dt).format('YYYY-MM-DD')}</span>
            </Col>
            <Col span={8}>
              <span className='outline'>材料编号：{applyCard.uid}</span>
            </Col>
          </Row>
          <table className='table-info'>
            <tr className='tr-label' >
              <td className='menu'>
                <p><span /></p>
              </td>
              <td className='name'>
                <p><span>材料名称</span></p>
              </td>
              <td className='spec'>
                <p><span>规格</span></p>
              </td>
              <td className='department'>
                <p><span>单位</span></p>
              </td>
              <td className='count'>
                <p><span>数量</span></p>
              </td>
            </tr>
            <tr className='tr-value' >
              <td className='menu'>
                <p><span>请领</span></p>
              </td>
              <td className='name'>
                <p><span>{applyCard.apply_inventory_name}</span></p>
              </td>
              <td className='spec'>
                <p><span>{applyCard.specification}</span></p>
              </td>
              <td className='department'>
                <p><span>{applyCard.department}</span></p>
              </td>
              <td className='count'>
                <p><span>{applyCard.apply_count}</span></p>
              </td>
            </tr>
            <tr className='tr-label' >
              <td className='menu'>
                <p><span>实发</span></p>
              </td>
              <td className='name'>
                <p><span>{applyCard.actual_inventory_name}</span></p>
              </td>
              <td className='spec'>
                <p><span>{applyCard.specification}</span></p>
              </td>
              <td className='department'>
                <p><span>{applyCard.department}</span></p>
              </td>
              <td className='count'>
                <p><span>{applyCard.actual_count}</span></p>
              </td>
            </tr>
            <tr>
              <td className='menu'>备注</td>
              <td colSpan={4} className='remark'>{applyCard.remark}</td>
            </tr>
          </table>
          <Row className='actions'>
            <Col span={6}>
              <span>领料人：{this.getStatusButton(applyCard.id, applyCard.applicant, applyCard.status, applyCard.actions, 0)}</span>
            </Col>
            <Col span={6}>
              <span>主管：{this.getStatusButton(applyCard.id, applyCard.auditor, applyCard.status, applyCard.actions, 1)}</span>
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
AuxiliaryMaterialApplyCardTable.propTypes = {
  details: PropTypes.object.isRequired,
  changeStatus: PropTypes.func.isRequired
}

export default AuxiliaryMaterialApplyCardTable
