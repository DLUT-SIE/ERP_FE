import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import QueryString from 'query-string'
import fetchAPI from 'api'
import { apis } from 'api/config'
import { Button, message, Upload } from 'antd'
import './TransferCardDetail.less'

import BarrelTransferCardTable from './BarrelTransferCardTable'
import SpecialElementTransferCardTable from './SpecialElementTransferCardTable'
import PressContainerTransferCardTable from './PressContainerTransferCardTable'
import CardInfoModal from './CardInfoModal'
import TechRequirementModal from './TechRequirementModal'

const FIRST_PAGE_SIZE = 7
const PAGE_SIZE = 10
const PRESS_PAGE_SIZE = 7

class TransferCardDetail extends React.Component {
  constructor (props) {
    super(props)
    const query = QueryString.parse(this.props.location.search)
    this._id = +query.id
    this._categary = query.category
    if (this._categary === '筒体流转卡' || this._categary === '封头流转卡') {
      this._firstPageSize = FIRST_PAGE_SIZE
      this._pageSize = PAGE_SIZE
    } else if (this._categary === '焊接试板流转卡' || this._categary === '母材试板流转卡') {
      this._firstPageSize = PRESS_PAGE_SIZE
      this._pageSize = PRESS_PAGE_SIZE
    } else {
      this._firstPageSize = PAGE_SIZE
      this._pageSize = PAGE_SIZE
    }
  }

  componentDidMount () {
    this.props.getCardDataAction({
      id: this._id
    })
    this.props.getProcessDataAction({
      params: {
        offset: 0,
        limit: this._firstPageSize,
        firstPageSize: this._firstPageSize,
        pageSize: this._pageSize,
        transfer_card: this._id
      }
    })
  }

  handleChangePage = (e) => {
    const { type } = e.target.dataset
    const { status, getProcessDataAction } = this.props
    const mydata = status.toJS()
    const pagination = _.get(mydata, 'pagination', {})
    const { current, totalPage } = pagination
    const firstPageSize = this._firstPageSize
    const pageSize = this._pageSize
    const id = this._id
    if (type === 'next') {
      if (current + 1 > totalPage) {
        message.warning('当前为最后一页！')
        return
      }
      getProcessDataAction({
        params: {
          offset: firstPageSize + (current - 1) * pageSize,
          limit: pageSize,
          current: current + 1,
          firstPageSize,
          pageSize,
          transfer_card: id
        }
      })
      return
    }
    if (current === 1) {
      message.warning('当前为第一页！')
      return
    } else if (current === 2) {
      getProcessDataAction({
        params: {
          offset: 0,
          limit: firstPageSize,
          current: 1,
          firstPageSize,
          pageSize,
          transfer_card: id
        }
      })
    } else {
      getProcessDataAction({
        params: {
          offset: firstPageSize + (current - 3) * pageSize,
          limit: pageSize,
          current: current - 1,
          firstPageSize,
          pageSize,
          transfer_card: id
        }
      })
    }
  }

  handlePrint = () => {
    window.print()
  }

  uploadImage = (file) => {
    fetchAPI(apis.ProcessAPI.updateTransferCard, { path: file.file }, { id: this._id }).then(() => {
      message.success('上传成功')
      this.props.getCardDataAction({
        id: this._id
      })
    })
  }

  handleOpenCardModal = () => {
    const { status, changeCardModalAction } = this.props
    const mydata = status.toJS()
    const cardInfo = _.get(mydata, 'cardInfo', {})
    changeCardModalAction({
      visible: true,
      fieldsValue: {
        container_category: cardInfo.container_category,
        parent_drawing_number: cardInfo.parent_drawing_number,
        material_index: cardInfo.material_index,
        welding_plate_idx: cardInfo.welding_plate_idx,
        parent_plate_idx: cardInfo.parent_plate_idx,
        tech_requirement: cardInfo.tech_requirement
      }
    })
  }

  handleCloseCardModal = () => {
    this.props.changeCardModalAction({
      visible: false
    })
  }

  handleEditCard = (fieldsValue) => {
    fetchAPI(apis.ProcessAPI.updateTransferCard, fieldsValue, { id: this._id }).then((repos) => {
      message.success('修改成功！')
      this.handleCloseCardModal()
      this.props.getCardDataAction({
        id: this._id
      })
    })
  }

  render () {
    const { status } = this.props
    const mydata = status.toJS()
    const cardInfo = _.get(mydata, 'cardInfo', [])
    const processList = _.get(mydata, 'processList')
    const pagination = _.get(mydata, 'pagination', {})
    const cardModal = _.get(mydata, 'cardModal', {})
    return (
      <div className='transfer-card-detail'>
        <div className='btn-group'>
          <Button
            icon='left'
            data-type='previous'
            onClick={this.handleChangePage}
          >
            上一页
          </Button>
          <Button
            icon='printer'
            onClick={this.handlePrint}
          >
            打印
          </Button>
          <Upload
            name='file'
            customRequest={this.uploadImage}
          >
            <Button
              icon='upload'
            >
              上传简图
            </Button>
          </Upload>
          { (cardInfo.category === '筒体流转卡' || cardInfo.category === '封头流转卡') &&
            <Button
              icon='edit'
              onClick={this.handleOpenCardModal}
            >
              编辑流转卡信息
            </Button>
          }
          { (cardInfo.category === '焊接试板流转卡' || cardInfo.category === '母材试板流转卡') &&
            <Button
              icon='edit'
              onClick={this.handleOpenCardModal}
            >
              编辑技术要求
            </Button>
          }
          <Button
            icon='right'
            data-type='next'
            onClick={this.handleChangePage}
          >
            下一页
          </Button>
        </div>
        { (cardInfo.category === '筒体流转卡' || cardInfo.category === '封头流转卡') &&
          <BarrelTransferCardTable
            cardInfo={cardInfo}
            pagination={pagination}
            processList={processList}
          />
        }
        { (cardInfo.category === '受压元件流转卡' || cardInfo.category === '特别元件流转卡') &&
          <SpecialElementTransferCardTable
            cardInfo={cardInfo}
            pagination={pagination}
            processList={processList}
          />
        }
        { (cardInfo.category === '焊接试板流转卡' || cardInfo.category === '母材试板流转卡') &&
          <PressContainerTransferCardTable
            cardInfo={cardInfo}
            pagination={pagination}
            processList={processList}
          />
        }
        { cardModal.visible && (cardInfo.category === '筒体流转卡' || cardInfo.category === '封头流转卡')
          ? <CardInfoModal
            {...cardModal}
            onOk={this.handleEditCard}
            onCancel={this.handleCloseCardModal}
          />
          : <TechRequirementModal
            {...cardModal}
            onOk={this.handleEditCard}
            onCancel={this.handleCloseCardModal}
          />
        }
      </div>
    )
  }
}

TransferCardDetail.propTypes = {
  location: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getCardDataAction: PropTypes.func.isRequired,
  getProcessDataAction: PropTypes.func.isRequired,
  changeCardModalAction: PropTypes.func.isRequired
}

export default TransferCardDetail
