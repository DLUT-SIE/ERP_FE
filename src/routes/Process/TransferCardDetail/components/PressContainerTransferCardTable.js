import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Button } from 'antd'

import TransferCardProcessTr from './TransferCardProcessTr'
import './TransferCardTable.less'

const PAGE_SIZE = 7

class PressContainerTransferCardTable extends React.Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
    this.initProcessList()
  }

  componentWillReceiveProps (nextProps) {
    this.initProcessList(nextProps)
  }

  initProcessList (props = this.props) {
    const { processList } = props
    if (processList.length === 0) {
      processList.push({
        index: 0
      })
    }
    while (processList.length < PAGE_SIZE) {
      processList.push({})
    }
  }

  render () {
    const { cardInfo, pagination, processList, onEdit, onDelete, onMove } = this.props
    const { current, totalPage } = pagination
    return (
      <table className='transfer-card-table'>
        <tbody>
          <tr className='first-tr'>
            <td className='compony-td' colSpan={7} rowSpan={3}>
              <p className='p'>太重（天津）滨海</p>
              <p className='p'>重型机械有限公司</p>
            </td>
            <td className='transfer-card-name-td' colSpan={11} rowSpan={3}>
              <b>压力容器产品试板工艺卡（流转）</b>
            </td>
            <td className='file-number-td' colSpan={3}>
              文件编号
            </td>
            <td className='file-number-value-td' colSpan={2}>
              {cardInfo.file_index}
            </td>
            <td className='according-file-name-td' colSpan={2}>
              依据文件名称
            </td>
            <td className='according-file-name-value-td' colSpan={2}>
              备料工艺卡
            </td>
          </tr>
          <tr className='file-number-tr'>
            <td className='container-category-td' colSpan={3}>
              试板类型
            </td>
            <td className='container-category-value-td' colSpan={2}>
              {cardInfo.category === '焊接试板流转卡' ? '试板' : '母材'}
            </td>
            <td className='according-file-number-td' colSpan={2}>
              依据文件编号
            </td>
            <td className='according-file-number-value-td' colSpan={2}>
              <b>{cardInfo.basic_file}</b>
            </td>
          </tr>
          <tr className='work-ticket-tr'>
            <td className='work-ticket-td' colSpan={3}>
              工作票号
            </td>
            <td className='work-ticket-value-td' colSpan={2}>
              <b>{cardInfo.ticket_number}#</b>
            </td>
            <td className='current-page-td' colSpan={2}>
              第 {current} 页
            </td>
            <td className='total-page-td' colSpan={2}>
             共 {totalPage} 页
            </td>
          </tr>
          <tr className='card-info-tr'>
            <td className='work-order-td' colSpan={4}>
              工作令
            </td>
            <td className='parent-drawing-number-td' colSpan={5}>
              部件图号
            </td>
            <td className='welding-plate-idx-td' colSpan={5}>
              试板图号
            </td>
            <td className='count-td' colSpan={2}>
              数量
            </td>
            <td className='material-td' colSpan={2}>
              材    质
            </td>
            <td className='supply-status-td' colSpan={3}>
              供货状态
            </td>
            <td className='material-index-td' colSpan={2}>
              材质标记
            </td>
            <td className='checker-td' colSpan={2}>
              检查员
            </td>
            <td className='circulation-route-td' colSpan={2}>
              路线
            </td>
          </tr>
          <tr className='card-info-tr'>
            <td className='work-order-td' colSpan={4}>
              {cardInfo.work_order_uid}
            </td>
            <td className='parent-drawing-number-td' colSpan={5}>
              {cardInfo.parent_drawing_number}
            </td>
            <td className='welding-plate-idx-td' colSpan={5}>
              {cardInfo.welding_plate_idx}
            </td>
            <td className='count-td' colSpan={2}>
              {cardInfo.count}
            </td>
            <td className='material-td' colSpan={2}>
              {cardInfo.material}
            </td>
            <td className='supply-status-td' colSpan={3} />
            <td className='material-index-td' colSpan={2}>
              {cardInfo.material_index}
            </td>
            <td className='checker-td' colSpan={2} />
            <td className='circulation-route-td' colSpan={2}>
              {cardInfo.circulation_routes.join(', ')}
            </td>
          </tr>
          <tr className='simple-image-tr'>
            <td className='simple-image-td' colSpan={18}>
              简图：
              {cardInfo.path &&
                <img className='simple-img' src={cardInfo.path} alt='简图' />
              }
            </td>
            <td className='requirement-td' colSpan={9} rowSpan={9}>
              技术要求：
              <p>
                {cardInfo.tech_requirement}
              </p>
            </td>
          </tr>
          <tr className='control-unit-tr'>
            <td className='order-td'>
              序号
            </td>
            <td className='process-td' colSpan={6}>
              工序及控制环节
            </td>
            <td className='group-td' colSpan={3}>
              小组
            </td>
            <td className='operator-td' colSpan={2}>
              操作者
            </td>
            <td className='first-date-td' colSpan={2}>
              日 期
            </td>
            <td className='checker-td' colSpan={3}>
              检查者
            </td>
            <td className='second-date-td'>
              日 期
            </td>
          </tr>
          {
            _.map(processList, (process, index) => (
              <TransferCardProcessTr
                key={index}
                type='pressContainer'
                process={process}
                index={index}
                onEdit={onEdit}
                onDelete={onDelete}
                onMove={onMove}
              />
            ))
          }
          <tr className='sign-tr'>
            <td className='mark-td' colSpan={2} />
            <td className='revise-td' />
            <td className='change-file-number-td' colSpan={4} />
            <td className='sign-td' colSpan={4} />
            <td className='data-td' colSpan={2} />
            <td className='write-td' colSpan={4} rowSpan={2}>
              编  制
            </td>
            <td className='writer-td' colSpan={3} rowSpan={2}>
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
            <td className='write-dt-td' colSpan={2} rowSpan={2}>
              {cardInfo.write_dt}
            </td>
            <td className='review-td' colSpan={2} rowSpan={2}>
              审  核
            </td>
            <td className='reviewer-td' colSpan={2} rowSpan={2}>
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
            <td className='review-dt-td' colSpan={2} rowSpan={2}>
              {cardInfo.review_dt}
            </td>
          </tr>
          <tr className='sign-tr'>
            <td className='mark-td' colSpan={2} />
            <td className='revise-td' />
            <td className='change-file-number-td' colSpan={4} />
            <td className='sign-td' colSpan={4} />
            <td className='data-td' colSpan={2} />
          </tr>
          <tr className='sign-tr'>
            <td className='mark-td' colSpan={2} />
            <td className='revise-td' />
            <td className='change-file-number-td' colSpan={4} />
            <td className='sign-td' colSpan={4} />
            <td className='data-td' colSpan={2} />
            <td className='proof-td last-sign-td' colSpan={4} rowSpan={2}>
              校  对
            </td>
            <td className='proofreader-td last-sign-td' colSpan={3} rowSpan={2}>
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
            <td className='proofread-dt-td last-sign-td' colSpan={2} rowSpan={2}>
              {cardInfo.proofreader}
            </td>
            <td className='approve-td last-sign-td' colSpan={2} rowSpan={2}>
              批  准
            </td>
            <td className='approver-td last-sign-td' colSpan={2} rowSpan={2}>
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
            <td className='approver-dt-td last-sign-td' colSpan={2} rowSpan={2}>
              {cardInfo.approve_dt}
            </td>
          </tr>
          <tr className='sign-tr last-sign-tr'>
            <td className='mark-td' colSpan={2}>
              标记
            </td>
            <td className='revise-td'>
              处数
            </td>
            <td className='change-file-number-td' colSpan={4}>
              更改文件号
            </td>
            <td className='sign-td' colSpan={4}>
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

PressContainerTransferCardTable.propTypes = {
  cardInfo: PropTypes.object.isRequired,
  pagination: PropTypes.object.isRequired,
  processList: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired
}

export default PressContainerTransferCardTable
