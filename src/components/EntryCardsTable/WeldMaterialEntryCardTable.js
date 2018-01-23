/**
 * Created by lh on 2018/1/8.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Button } from 'antd'
import moment from 'moment'
import _ from 'lodash'
import './WeldMaterialEntryCardTable.less'

class WeldMaterialEntryCardTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  iterateValues = (details) => {
    const lists = details.map((item, index) => {
      return (
        <tr className='tr-value'>
          <td className='name'>
            <p><span>{item.name}</span></p>
          </td>
          <td className='band-num'>
            <p><span>{item.band_number}</span></p>
          </td>
          <td className='model'>
            <p><span>{item.model}</span></p>
          </td>
          <td className='spec'>
            <p><span>{item.specification}</span></p>
          </td>
          <td className='weight'>
            <p><span>{item.weight}</span></p>
          </td>
          <td className='per-weight'>
            <p><span>{item.per_weight}</span></p>
          </td>
          <td className='count'>
            <p><span>{item.count}</span></p>
          </td>
          <td className='batch-number'>
            <p><span>{item.batch_number}</span></p>
          </td>
          <td className='material-number'>
            <p><span>{item.material_number}</span></p>
          </td>
          <td className='production-dt'>
            <p><span>{item.production_dt}</span></p>
          </td>
          <td className='factory'>
            <p><span>{item.factory}</span></p>
          </td>
          <td className='remark'>
            <p><span>{item.remark}</span></p>
          </td>
          <td className='per-price'>
            <p><span>{item.per_price}</span></p>
          </td>
          <td className='total-price'>
            <p><span>{item.total_price}</span></p>
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
    console.log('table', entryCard)
    return (
      <div className='weld-material-entry-card-table'>
        <p className='title'><u><span>太重滨海煤化工分公司</span></u></p>
        <p className='title'>
          <span>焊材入库单</span>
        </p>
        <div className='wrapper'>
          <Row>
            <Col span={12}>
              <span className='outline'>入库时间：{entryCard.create_dt && moment(entryCard.create_dt).format('YYYY-MM-DD')}</span>
            </Col>
            <Col span={12}>
              <span className='outline'>单据编号：{entryCard.uid}</span>
            </Col>
          </Row>
          <table className='table-info'>
            <tr className='tr-label' >
              <td className='name'>
                <p><span>名称</span></p>
              </td>
              <td className='band-num'>
                <p><span>牌号</span></p>
              </td>
              <td className='model'>
                <p><span>型号</span></p>
              </td>
              <td className='spec'>
                <p><span>规格</span></p>
              </td>
              <td className='weight'>
                <p><span>公斤数</span></p>
              </td>
              <td className='per-weight'>
                <p><span>单件重量</span></p>
              </td>
              <td className='count'>
                <p><span>件数</span></p>
              </td>
              <td className='batch-number'>
                <p><span>材料批号</span></p>
              </td>
              <td className='material-number'>
                <p><span>材质编号</span></p>
              </td>
              <td className='production-dt'>
                <p><span>出厂日期</span></p>
              </td>
              <td className='factory'>
                <p><span>厂家</span></p>
              </td>
              <td className='remark'>
                <p><span>备注</span></p>
              </td>
              <td className='per-price'>
                <p><span>单价</span></p>
              </td>
              <td className='total-price'>
                <p><span>总价</span></p>
              </td>
            </tr>
            {this.iterateValues(entryCard.details)}
            <tr className='tr-btns'>
              <td className='purchaser'>
                <p><span>采购员</span></p>
              </td>
              <td colSpan={2} className='purchaser-value'>
                <p><span>{this.getStatusButton(entryCard.id, entryCard.purchaser, entryCard.status, entryCard.actions, 0)}</span></p>
              </td>
              <td className='inspector'>
                <p><span>检验员</span></p>
              </td>
              <td colSpan={3} className='inspector-value'>
                <p><span>{this.getStatusButton(entryCard.id, entryCard.inspector, entryCard.status, entryCard.actions, 1)}</span></p>
              </td>
              <td className='keeper'>
                <p><span>库管员</span></p>
              </td>
              <td colSpan={3} className='keeper-value'>
                <p><span>{this.getStatusButton(entryCard.id, entryCard.keeper, entryCard.status, entryCard.actions, 2)}</span></p>
              </td>
              <td colSpan={2} className='total-num'>
                <p><span>合计:</span></p>
              </td>
              <td className='total-num-value'>
                <p><span /></p>
              </td>
            </tr>
          </table>
        </div>
      </div>)
  }
}
WeldMaterialEntryCardTable.propTypes = {
  details: PropTypes.object.isRequired,
  changeStatus: PropTypes.func.isRequired
}

export default WeldMaterialEntryCardTable
