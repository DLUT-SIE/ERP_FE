/**
 * Created by lh on 2018/1/19.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Button } from 'antd'
import _ from 'lodash'
import moment from 'moment'
import './BroughtInMaterialApplyCardTable.less'

class BroughtInMaterialApplyCardTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  iterateValues = (details) => {
    const lists = details.map((item, index) => {
      return (
        <tr className='tr-value'>
          <td className='index'>
            <p><span>{index}</span></p>
          </td>
          <td className='drawing-number'>
            <p><span>{item.drawing_number}</span></p>
          </td>
          <td className='spec'>
            <p><span>{item.specification}</span></p>
          </td>
          <td className='material-mark'>
            <p><span>{item.name}</span></p>
          </td>
          <td className='count'>
            <p><span>{item.count}</span></p>
          </td>
          <td className='material-code'>
            <p><span>{item.material_number}</span></p>
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
      <div className='brought-in-material-apply-card-table'>
        <p className='title'><u><span>太重滨海煤化工分公司</span></u></p>
        <p className='title'>
          <span>领用单</span>
        </p>
        <div className='wrapper'>
          {/* <p className='scrap'></p> */}
          <Row>
            <Col span={7}>
              <span className='outline'>工作令号：{applyCard.sub_order_uid}</span>
            </Col>
            <Col span={6}>
              <span className='outline'>领用单位：{applyCard.department}</span>
            </Col>
            <Col span={5}>
              <span className='outline'>日期：{applyCard.create_dt && moment(applyCard.create_dt).format('YYYY-MM-DD')}</span>
            </Col>
            <Col span={6}>
              <span className='outline'>编号：{applyCard.uid}</span>
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
              <td className='spec'>
                <p><span>名称及规格</span></p>
              </td>
              <td className='material-mark'>
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
            {this.iterateValues(applyCard.details)}
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
BroughtInMaterialApplyCardTable.propTypes = {
  details: PropTypes.object.isRequired,
  changeStatus: PropTypes.func.isRequired
}

export default BroughtInMaterialApplyCardTable
