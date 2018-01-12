import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Button } from 'antd'

import './TransferCardTable.less'

const FIRST_PAGE_SIZE = 7
const PAGE_SIZE = 10

class BarrelTransferCardTable extends React.Component {
  constructor (props) {
    super(props)
  }

  getProcessTr = () => {
    const { processList, currentPage } = this.props
    const pageSize = currentPage === 1 ? FIRST_PAGE_SIZE : PAGE_SIZE
    while (processList.length < pageSize) {
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
    const isFirstPage = current === 1
    return (
      <table className='transfer-card-table'>
        <tbody>
          <tr className='first-tr'>
            <td className='compony-td' colSpan={4} rowSpan={3}>
              <p className='p'>太重（天津）滨海</p>
              <p className='p'>重型机械有限公司</p>
            </td>
            <td className='transfer-card-name-td' colSpan={5} rowSpan={3}>
              <b>{cardInfo.category === '筒体流转卡' ? '筒体工艺卡（流转）' : '封头工艺卡（流转）'}</b>
            </td>
            <td className='file-number-td' colSpan={4} rowSpan={2}>
              文件编号
            </td>
            <td className='file-number-value-td' colSpan={4} rowSpan={2}>
              {cardInfo.file_index}
            </td>
            <td className='according-file-name-td' colSpan={5}>
              依据文件名称
            </td>
            <td className='according-file-name-value-td' colSpan={4}>
              备料工艺卡
            </td>
          </tr>
          <tr className='file-number-tr'>
            <td className='according-file-number-td' colSpan={5}>
              依据文件编号
            </td>
            <td className='according-file-number-value-td' colSpan={4}>
              <b>{cardInfo.basic_file}</b>
            </td>
          </tr>
          <tr className='work-ticket-tr'>
            <td className='work-ticket-td' colSpan={4}>
              工作票号
            </td>
            <td className='work-ticket-value-td' colSpan={4}>
              <b>{cardInfo.ticket_number}#</b>
            </td>
            <td className='current-page-td' colSpan={5}>
              第 {current} 页
            </td>
            <td className='total-page-td' colSpan={4}>
             共 {totalPage} 页
            </td>
          </tr>
          { isFirstPage &&
            <tr className='simple-graph-tr'>
              <td className='simple-graph-td' colSpan={8} rowSpan={7}>
                简图：
                { cardInfo.path &&
                  <img className='simple-graph-img' src={cardInfo.path} alt='简图' />
                }
              </td>
              <td className='first-base-info-td' colSpan={5}>
                工 作 令
              </td>
              <td className='first-base-info-value-td' colSpan={4}>
                {cardInfo.work_order_uid}
              </td>
              <td className='second-base-info-td' colSpan={5}>
                零 件 图 号
              </td>
              <td className='second-base-info-value-td' colSpan={4}>
                {cardInfo.drawing_number}
              </td>
            </tr>
          }
          { isFirstPage &&
            <tr className='simple-graph-tr'>
              <td className='first-base-info-td' colSpan={5}>
                产 品 名 称
              </td>
              <td className='first-base-info-value-td' colSpan={4}>
                {cardInfo.product_name}
              </td>
              <td className='second-base-info-td' colSpan={5}>
                零 件 名 称
              </td>
              <td className='second-base-info-value-td' colSpan={4}>
                {cardInfo.name}
              </td>
            </tr>
          }
          { isFirstPage &&
            <tr className='simple-graph-tr'>
              <td className='first-base-info-td' colSpan={5}>
                容 器 类 别
              </td>
              <td className='first-base-info-value-td' colSpan={4}>
                {cardInfo.container_category}
              </td>
              <td className='second-base-info-td' colSpan={5}>
                数 量 / 台
              </td>
              <td className='second-base-info-value-td' colSpan={4}>
                {cardInfo.count}
              </td>
            </tr>
          }
          { isFirstPage &&
            <tr className='simple-graph-tr'>
              <td className='first-base-info-td' colSpan={5}>
                所属部件名称
              </td>
              <td className='first-base-info-value-td' colSpan={4}>
                {cardInfo.parent_name}
              </td>
              <td className='second-base-info-td' colSpan={5}>
                受 压 标 记
              </td>
              <td className='second-base-info-value-td' colSpan={4}>
                {cardInfo.press_mark}
              </td>
            </tr>
          }
          { isFirstPage &&
            <tr className='simple-graph-tr'>
              <td className='first-base-info-td' colSpan={5}>
                所属部件图号
              </td>
              <td className='first-base-info-value-td' colSpan={4}>
                {cardInfo.parent_drawing_number}
              </td>
              <td className='second-base-info-td' colSpan={5}>
                材     料
              </td>
              <td className='second-base-info-value-td' colSpan={4}>
                {cardInfo.material}
              </td>
            </tr>
          }
          { isFirstPage &&
            <tr className='simple-graph-tr'>
              <td className='first-base-info-td' colSpan={5}>
                产品试板图号
              </td>
              <td className='first-base-info-value-td' colSpan={4}>
                {cardInfo.welding_plate_idx}
              </td>
              <td className='second-base-info-td' colSpan={5}>
                材 质 标 记
              </td>
              <td className='second-base-info-value-td' colSpan={4}>
                {cardInfo.material_index}
              </td>
            </tr>
          }
          { isFirstPage &&
            <tr className='simple-graph-tr'>
              <td className='first-base-info-td' colSpan={5}>
                母材试板图号
              </td>
              <td className='first-base-info-value-td' colSpan={4}>
                {cardInfo.parent_plate_idx}
              </td>
              <td className='second-base-info-td' colSpan={5}>
                路     线
              </td>
              <td className='second-base-info-value-td' colSpan={4}>
                {cardInfo.circulation_routes.join(', ')}
              </td>
            </tr>
          }
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

BarrelTransferCardTable.propTypes = {
  cardInfo: PropTypes.object.isRequired,
  currentPage: PropTypes.number.isRequired,
  pagination: PropTypes.object.isRequired,
  processList: PropTypes.array.isRequired
}

export default BarrelTransferCardTable
