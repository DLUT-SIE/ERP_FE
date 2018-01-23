/**
 * Created by lh on 2018/1/8.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Button } from 'antd'
import moment from 'moment'
import _ from 'lodash'
import './AuxiliaryMaterialEntryCardTable.less'

class AuxiliaryMaterialEntryCardTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  iterateValues = (details) => {
    const lists = details.map((item, index) => {
      return (
        <tr className='tr-value' >
          <td className='name'>
            <p><span>{item.name}</span></p>
          </td>
          <td className='spec'>
            <p><span>{item.specification}</span></p>
          </td>
          <td className='count'>
            <p><span>{item.count}</span></p>
          </td>
          <td className='factory'>
            <p><span>{item.factory}</span></p>
          </td>
          <td className='supplier'>
            <p><span>{item.supplier}</span></p>
          </td>
          <td className='remark'>
            <p><span>{item.remark}</span></p>
          </td>
          <td className='unit'>
            <p><span>{item.unit}</span></p>
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
    let entryCard = this.props.details
    return (
      <div className='auxiliary-material-entry-card-table'>
        <p className='title'><u><span>太重滨海煤化工分公司</span></u></p>
        <p className='title'>
          <span>辅材入库单</span>
        </p>
        <div className='wrapper'>
          <Row>
            <Col span={12}>
              <span className='outline'>入库时间：{entryCard.create_dt && moment(entryCard.create_dt).format('YYYY年MM月DD日') }</span>
            </Col>
            <Col span={12} >
              <span className='outline float-right' >单据编号：{entryCard.uid}</span>
            </Col>
          </Row>
          <table className='table-info'>
            <tr className='tr-label' >
              <td className='name'>
                <p><span>名称</span></p>
              </td>
              <td className='spec'>
                <p><span>规格</span></p>
              </td>
              <td className='count'>
                <p><span>数量</span></p>
              </td>
              <td className='factory'>
                <p><span>厂家</span></p>
              </td>
              <td className='supplier'>
                <p><span>供货商</span></p>
              </td>
              <td className='remark'>
                <p><span>备注</span></p>
              </td>
              <td className='unit'>
                <p><span>单位</span></p>
              </td>
            </tr>
            {this.iterateValues(entryCard.details)}
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
AuxiliaryMaterialEntryCardTable.propTypes = {
  details: PropTypes.object.isRequired,
  changeStatus: PropTypes.func.isRequired
}

export default AuxiliaryMaterialEntryCardTable
