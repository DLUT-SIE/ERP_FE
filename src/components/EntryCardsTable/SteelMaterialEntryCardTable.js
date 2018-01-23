/**
 * Created by lh on 2018/1/8.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Button } from 'antd'
import _ from 'lodash'
import './SteelMaterialEntryCardTable.less'

class SteelMaterialEntryCardTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  iterateValues = (details, type) => {
    const lists = details.map((item, index) => {
      return (
        <tr className='tr-value' >
          <td className='index'>
            <p><span>{index + 1}</span></p>
          </td>
          <td className='sub-order'>
            <p><span>{item.sub_order_uid}</span></p>
          </td>
          <td className='spec-number'>
            <p><span>{item.draw_number}</span></p>
          </td>
          <td className='spec'>
            <p><span>{item.specification}</span></p>
          </td>
          <td className='material-number'>
            <p><span>{item.procurement_material}</span></p>
          </td>
          <td className='batch-number'>
            <p><span>{item.batch_number}</span></p>
          </td>
          <td className='mark-number'>
            <p><span>{item.mark_number}</span></p>
          </td>
          <td className='unit'>
            <p><span>{item.unit}</span></p>
          </td>
          <td className='count'>
            <p><span>{item.count}</span></p>
          </td>
          <td className='weight'>
            <p><span>{item.weight}</span></p>
          </td>
          {type === 0 ? <td className='length'><p><span>{item.lenght}</span></p></td> : ''}
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
    let entryCard = this.props.details
    return (
      <div className='steel-material-entry-card-table'>
        <span className='float-right'>修改号：</span>
        <p className='title'><u><span>太重滨海煤化工分公司</span></u></p>
        <span className='float-right'>样表：</span>
        <p className='title'>
          <span>入库单</span>
        </p>
        <div className='wrapper'>
          <Row>
            <Col span={5}>
              <span className='outline'>货物来源：{entryCard.source }</span>
            </Col>
            <Col span={6}>
              <span className='outline'>订购单编号：</span>
            </Col>
            <Col span={8}>
              <span className='outline'>接收检查记录表编号：</span>
            </Col>
            <Col span={5}>
              <span className='outline'>编号：{entryCard.uid}</span>
            </Col>
          </Row>
          <table className='table-info'>
            <tr className='tr-label' >
              <td className='index'>
                <p><span>序号</span></p>
              </td>
              <td className='sub-order'>
                <p><span>工作令</span></p>
              </td>
              <td className='spec-number'>
                <p><span>标准号或图号</span></p>
              </td>
              <td className='spec'>
                <p><span>名称及规格</span></p>
              </td>
              <td className='material-number'>
                <p><span>材料牌号</span></p>
              </td>
              <td className='batch-number'>
                <p><span>炉批号</span></p>
              </td>
              <td className='mark-number'>
                <p><span>标记号</span></p>
              </td>
              <td className='unit'>
                <p><span>单位</span></p>
              </td>
              <td className='count'>
                <p><span>数量</span></p>
              </td>
              <td className='weight'>
                <p><span>重量</span></p>
              </td>
              {entryCard.steel_type === 0 ? <td className='length'><p><span>长度</span></p></td> : ''}
            </tr>
            {this.iterateValues(entryCard.details, entryCard.steel_type)}
            <tr>
              {entryCard.steel_type === 0 ? <td className='remark' colSpan={11}><p><span>备注:{entryCard.remark}</span></p></td>
                : <td className='remark' colSpan={10}><p><span>备注:{entryCard.remark}</span></p></td>}
            </tr>
          </table>
          <Row className='actions'>
            <Col span={8}>
              <span>采购员：{this.getStatusButton(entryCard.id, entryCard.purchaser, entryCard.status, entryCard.actions, 0)}</span>
            </Col>
            <Col span={8}>
              <span>检查员：{this.getStatusButton(entryCard.id, entryCard.inspector, entryCard.status, entryCard.actions, 1)}</span>
            </Col>
            <Col span={8}>
              <span>库管员：{this.getStatusButton(entryCard.id, entryCard.keeper, entryCard.status, entryCard.actions, 2)}</span>
            </Col>
          </Row>
        </div>
      </div>)
  }
}
SteelMaterialEntryCardTable.propTypes = {
  details: PropTypes.object.isRequired,
  changeStatus: PropTypes.func.isRequired
}

export default SteelMaterialEntryCardTable
