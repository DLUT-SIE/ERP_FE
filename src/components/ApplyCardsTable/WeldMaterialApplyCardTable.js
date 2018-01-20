/**
 * Created by lh on 2018/1/8.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Button } from 'antd'
import moment from 'moment'
import _ from 'lodash'
import './WeldMaterialApplyCardTable.less'

class WeldMaterialApplyCardTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  changeSign = (e) => {
    const { id, actions } = e.target.dataset
    const { changeStatus } = this.props
    changeStatus && changeStatus(id, actions)
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
      <div className='material-apply-card-table'>
        <p className='title'><u><span>太重滨海煤化工分公司</span></u></p>
        <p className='title'>
          <span>焊接材料领用卡</span>
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
            <tr className='tr-label' >
              <td rowSpan={2} className='sub-order-uid'>
                <p><span>工作令</span></p>
              </td>
              <td rowSpan={2} className='welding-seam-uid'>
                <p><span>焊缝编号</span></p>
              </td>
              <td rowSpan={2} className='material-mark'>
                <p><span>焊材牌号</span></p>
              </td>
              <td rowSpan={2} className='model'>
                <p><span>型号</span></p>
              </td>
              <td rowSpan={2} className='specification'>
                <p><span>规格</span></p>
              </td>
              <td colSpan={2} className='apply-num'>
                <p><span>领用量</span></p>
              </td>
              <td rowSpan={2} className='material-code'>
                <p><span>材质标记</span></p>
              </td>
              <td colSpan={2} className='actual-num'>
                <p><span>实发量</span></p>
              </td>
            </tr>
            <tr className='tr-label-row-1'>
              <td className='apply-detail'>
                <p><span>重量(kg)</span></p>
              </td>
              <td className='apply-detail'>
                <p><span>数量</span></p>
              </td>
              <td className='apply-detail'>
                <p><span>重量(kg)</span></p>
              </td>
              <td className='apply-detail'>
                <p><span>数量</span></p>
              </td>
            </tr>
            <tr className='tr-value'>
              <td className='sub-order-uid-value'>
                <p><span>{applyCard.sub_order_uid}</span></p>
              </td>
              <td className='welding-seam-uid-value'>
                <p><span>{applyCard.welding_seam_uid}</span></p>
              </td>
              <td className='material-mark-value'>
                <p><span>{applyCard.material_mark}</span></p>
              </td>
              <td className='model-value'>
                <p><span>{applyCard.model}</span></p>
              </td>
              <td className='specification-value'>
                <p><span>{applyCard.specification}</span></p>
              </td>
              <td className='apply-value'>
                <p><span>{applyCard.apply_weight}</span></p>
              </td>
              <td className='apply-value'>
                <p><span>{applyCard.apply_count}</span></p>
              </td>
              <td className='material-code-value'>
                <p><span>{applyCard.material_code}</span></p>
              </td>
              <td className='apply-value'>
                <p><span>{applyCard.actual_weight}</span></p>
              </td>
              <td className='apply-value'>
                <p><span>{applyCard.actual_count}</span></p>
              </td>
            </tr>
            <tr className='remark_tr'>
              <td colSpan={10} className='remark'>
                <p><span>备注：1、以上六项为领用人填写；2、后二项为发料人填写</span></p>
              </td>
            </tr>
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
              <span>发料人：{this.getStatusButton(applyCard.id, applyCard.keeper, applyCard.status, applyCard.actions, 3)}</span>
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
