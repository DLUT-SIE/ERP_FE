import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Button } from 'antd'

import './TransferCardTable.less'

const PAGE_SIZE = 10

class SpecialElementTransferCardTable extends React.Component {
  constructor (props) {
    super(props)
  }

  getProcessTr = () => {
    const { processList } = this.props
    while (processList.length < PAGE_SIZE) {
      processList.push({})
    }
    const processTrs = _.map(processList, (process, index) => {
      return (
        <tr className='process-tr' key={index}>
          <td className='order-td'>
            {process.index}
          </td>
          <td className='process-td'>
            {process.name}
          </td>
          <td className='process-request-value-td' colSpan={14}>
            {process.detail}
          </td>
          <td className='name-td' colSpan={4} />
          <td className='first-date-td' colSpan={2} />
          <td className='name-td' colSpan={3} />
          <td className='second-date-td' />
        </tr>
      )
    })
    return processTrs
  }

  render () {
    const { cardInfo, pagination } = this.props
    const { current, totalPage } = pagination
    return (
      <table className='transfer-card-table'>
        <tbody>
          <tr className='first-tr'>
            <td className='compony-td' colSpan={4} rowSpan={3}>
              <p className='p'>太重（天津）滨海</p>
              <p className='p'>重型机械有限公司</p>
            </td>
            <td className='transfer-card-name-td' colSpan={10} rowSpan={3}>
              <b>特别元件工艺卡（流转）</b>
            </td>
            <td className='file-number-td' colSpan={2}>
              文件编号
            </td>
            <td className='file-number-value-td' colSpan={3}>
              {cardInfo.file_index}
            </td>
            <td className='according-file-name-td' colSpan={3}>
              依据文件名称
            </td>
            <td className='according-file-name-value-td' colSpan={4}>
              备料工艺卡
            </td>
          </tr>
          <tr className='file-number-tr'>
            <td className='container-category-td' colSpan={2}>
              容器类别
            </td>
            <td className='container-category-value-td' colSpan={3}>
              {cardInfo.container_category}
            </td>
            <td className='according-file-number-td' colSpan={3}>
              依据文件编号
            </td>
            <td className='according-file-number-value-td' colSpan={4}>
              <b>{cardInfo.basic_file}</b>
            </td>
          </tr>
          <tr className='work-ticket-tr'>
            <td className='work-ticket-td' colSpan={2}>
              工作票号
            </td>
            <td className='work-ticket-value-td' colSpan={3}>
              <b>{cardInfo.ticket_number}#</b>
            </td>
            <td className='current-page-td' colSpan={3}>
              第 {current} 页
            </td>
            <td className='total-page-td' colSpan={4}>
             共 {totalPage} 页
            </td>
          </tr>
          <tr className='card-info-tr'>
            <td className='work-order-td' colSpan={2}>
              工作令
            </td>
            <td className='production-name-td' colSpan={2}>
              产品名称
            </td>
            <td className='drawing-number-td' colSpan={2}>
              零件图号
            </td>
            <td className='name-td' colSpan={3}>
              零件名称
            </td>
            <td className='count-td'>
              数量
            </td>
            <td className='parent-drawing-number-td' colSpan={3}>
              所属部件图号
            </td>
            <td className='parent-name-td' colSpan={3}>
              所属部件名称
            </td>
            <td className='press-mark-td' colSpan={2}>
              受压标记
            </td>
            <td className='material-td' colSpan={2}>
              材    质
            </td>
            <td className='material-index-td' colSpan={3}>
              材质标记
            </td>
            <td className='circulation-route-td' colSpan={3}>
              工艺路线
            </td>
          </tr>
          <tr className='card-info-tr'>
            <td className='work-order-td' colSpan={2}>
              {cardInfo.work_order_uid}
            </td>
            <td className='production-name-td' colSpan={2}>
              {cardInfo.product_name}
            </td>
            <td className='drawing-number-td' colSpan={2}>
              {cardInfo.drawing_number}
            </td>
            <td className='name-td' colSpan={3}>
              {cardInfo.name}
            </td>
            <td className='count-td'>
              {cardInfo.count}
            </td>
            <td className='parent-drawing-number-td' colSpan={3}>
              {cardInfo.parent_drawing_number}
            </td>
            <td className='parent-name-td' colSpan={3}>
              {cardInfo.parent_name}
            </td>
            <td className='press-mark-td' colSpan={2}>
              {cardInfo.press_mark}
            </td>
            <td className='material-td' colSpan={2}>
              {cardInfo.material}
            </td>
            <td className='material-index-td' colSpan={3}>
              {cardInfo.material_index}
            </td>
            <td className='circulation-route-td' colSpan={3}>
              {cardInfo.circulation_routes.join(', ')}
            </td>
          </tr>
          <tr className='process-tr'>
            <td className='order-td' rowSpan={2}>
              序 号
            </td>
            <td className='process-td' rowSpan={2}>
              工 序
            </td>
            <td className='process-request-td' colSpan={14} rowSpan={2}>
              <b>工 艺 过 程 及 技 术 要 求</b>
            </td>
            <td className='operator-td' colSpan={6}>
              操 作 者
            </td>
            <td className='checker-td' colSpan={4}>
              检 查 者
            </td>
          </tr>
          <tr className='process-tr'>
            <td className='name-td' colSpan={4}>
              姓 名
            </td>
            <td className='first-date-td' colSpan={2}>
              日 期
            </td>
            <td className='name-td' colSpan={3}>
              姓 名
            </td>
            <td className='second-date-td'>
              日 期
            </td>
          </tr>
          {
            this.getProcessTr()
          }
          <tr className='sign-tr'>
            <td className='mark-td' />
            <td className='revise-td' />
            <td className='change-file-number-td' colSpan={2} />
            <td className='sign-td' colSpan={2} />
            <td className='data-td' colSpan={2} />
            <td className='write-td' colSpan={2} rowSpan={2}>
              编  制
            </td>
            <td className='writer-td' colSpan={4} rowSpan={2}>
              { cardInfo.writer
                ? cardInfo.writer
                : (
                  <Button
                    type='primary'
                    size='small'
                  >
                    签  字
                  </Button>
                )
              }
            </td>
            <td className='write-dt-td' colSpan={3} rowSpan={2}>
              {cardInfo.write_dt}
            </td>
            <td className='review-td' colSpan={2} rowSpan={2}>
              审  核
            </td>
            <td className='reviewer-td' colSpan={4} rowSpan={2}>
              { cardInfo.reviewer
                ? cardInfo.reviewer
                : (
                  <Button
                    type='primary'
                    size='small'
                  >
                    签  字
                  </Button>
                )
              }
            </td>
            <td className='review-dt-td' colSpan={3} rowSpan={2}>
              {cardInfo.review_dt}
            </td>
          </tr>
          <tr className='sign-tr'>
            <td className='mark-td' />
            <td className='revise-td' />
            <td className='change-file-number-td' colSpan={2} />
            <td className='sign-td' colSpan={2} />
            <td className='data-td' colSpan={2} />
          </tr>
          <tr className='sign-tr'>
            <td className='mark-td' />
            <td className='revise-td' />
            <td className='change-file-number-td' colSpan={2} />
            <td className='sign-td' colSpan={2} />
            <td className='data-td' colSpan={2} />
            <td className='proof-td' colSpan={2} rowSpan={2}>
              校  对
            </td>
            <td className='proofreader-td' colSpan={4} rowSpan={2}>
              { cardInfo.proofreader
                ? cardInfo.proofreader
                : (
                  <Button
                    type='primary'
                    size='small'
                  >
                    签  字
                  </Button>
                )
              }
            </td>
            <td className='proofread-dt-td' colSpan={3} rowSpan={2}>
              {cardInfo.proofreader}
            </td>
            <td className='approve-td' colSpan={2} rowSpan={2}>
              批  准
            </td>
            <td className='approver-td' colSpan={4} rowSpan={2}>
              { cardInfo.approver
                ? cardInfo.approver
                : (
                  <Button
                    type='primary'
                    size='small'
                  >
                    签  字
                  </Button>
                )
              }
            </td>
            <td className='approver-dt-td' colSpan={3} rowSpan={2}>
              {cardInfo.approve_dt}
            </td>
          </tr>
          <tr className='sign-tr'>
            <td className='mark-td'>
              标记
            </td>
            <td className='revise-td'>
              处数
            </td>
            <td className='change-file-number-td' colSpan={2}>
              更改文件号
            </td>
            <td className='sign-td' colSpan={2}>
              签    字
            </td>
            <td className='data-td' colSpan={2}>
              日   期
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

SpecialElementTransferCardTable.propTypes = {
  cardInfo: PropTypes.object.isRequired,
  pagination: PropTypes.object.isRequired,
  processList: PropTypes.array.isRequired
}

export default SpecialElementTransferCardTable
