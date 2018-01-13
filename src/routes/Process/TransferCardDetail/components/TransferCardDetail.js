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
import CardProcessModal from './CardProcessModal'

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

  updateProcessData = () => {
    const { status, getProcessDataAction } = this.props
    const mydata = status.toJS()
    const pagination = _.get(mydata, 'pagination', {})
    const { current } = pagination
    const firstPageSize = this._firstPageSize
    const pageSize = this._pageSize
    const id = this._id
    if (current === 1) {
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
          offset: firstPageSize + (current - 2) * pageSize,
          limit: pageSize,
          current: current,
          firstPageSize,
          pageSize,
          transfer_card: id
        }
      })
    }
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

  handleOpenCardProcessModal = (fieldsValue) => {
    this.props.changeCardProcessModalAction({
      visible: true,
      ...fieldsValue
    })
  }

  handleCloseCardProcessModal = () => {
    this.props.changeCardProcessModalAction({
      visible: false
    })
  }

  handleChangeCardProcess = (e) => {
    const { type } = e.target.dataset
    const mydata = this.props.status.toJS()
    const processList = _.get(mydata, 'processList')
    const cardProcessModal = _.get(mydata, 'cardProcessModal')
    let { index } = cardProcessModal
    if (type === 'previous') {
      if (index === 0) {
        message.warning('本条已为当前页的第一条！')
        return
      }
      index -= 1
    } else {
      if (index === processList.length - 1) {
        message.warning('本条已为当前页的最后一条！')
        return
      }
      index += 1
    }
    this.props.changeCardProcessModalAction({
      visible: true,
      index,
      type: 'edit',
      fieldsValue: processList[index]
    })
  }

  handleSaveCardProcess = (id, fieldsValue) => {
    if (_.isUndefined(id)) {
      fetchAPI(apis.ProcessAPI.addTransferCardProcess, {
        ...fieldsValue,
        transfer_card: this._id
      }).then((repos) => {
        message.success('添加成功！')
        this.updateProcessData()
        this.handleCloseCardProcessModal()
      })
    } else {
      fetchAPI(apis.ProcessAPI.updateTransferCardProcess, fieldsValue, { id }).then((repos) => {
        message.success('修改成功！')
        this.updateProcessData()
        this.handleCloseCardProcessModal()
      })
    }
  }

  handleDeleteCardProcess = (id) => {
    fetchAPI(apis.ProcessAPI.deleteTransferCardProcess, { transfer_card: this._id }, { id }).then((repos) => {
      message.success('删除成功！')
      this.updateProcessData()
    })
  }

  handleMoveCardProcess = (fieldsValue) => {
    const mydata = this.props.status.toJS()
    const pagination = _.get(mydata, 'pagination', {})
    const processList = _.get(mydata, 'processList')
    const { current, totalPage } = pagination
    const { index, direction, id } = fieldsValue
    if (current === 1 && index === 0 && direction === 0) {
      message.warning('本条已是第一条，无法上移！')
      return
    }
    if (current === totalPage && index === processList.length - 1 && direction === 1) {
      message.warning('本条已是最后一条，无法下移！')
      return
    }
    fetchAPI(apis.ProcessAPI.updateTransferCardProcess, { direction }, { id }).then((repos) => {
      message.success('移动成功！')
      this.updateProcessData()
    })
  }

  render () {
    const { status } = this.props
    const mydata = status.toJS()
    const cardInfo = _.get(mydata, 'cardInfo', [])
    const processList = _.get(mydata, 'processList')
    const pagination = _.get(mydata, 'pagination', {})
    const cardModal = _.get(mydata, 'cardModal', {})
    const cardProcessModal = _.get(mydata, 'cardProcessModal', {})
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
            onEdit={this.handleOpenCardProcessModal}
            onDelete={this.handleDeleteCardProcess}
            onMove={this.handleMoveCardProcess}
          />
        }
        { (cardInfo.category === '受压元件流转卡' || cardInfo.category === '特别元件流转卡') &&
          <SpecialElementTransferCardTable
            cardInfo={cardInfo}
            pagination={pagination}
            processList={processList}
            onEdit={this.handleOpenCardProcessModal}
            onDelete={this.handleDeleteCardProcess}
            onMove={this.handleMoveCardProcess}
          />
        }
        { (cardInfo.category === '焊接试板流转卡' || cardInfo.category === '母材试板流转卡') &&
          <PressContainerTransferCardTable
            cardInfo={cardInfo}
            pagination={pagination}
            processList={processList}
            onEdit={this.handleOpenCardProcessModal}
            onDelete={this.handleDeleteCardProcess}
            onMove={this.handleMoveCardProcess}
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
        { cardProcessModal.visible &&
          <CardProcessModal
            {...cardProcessModal}
            onOk={this.handleSaveCardProcess}
            onCancel={this.handleCloseCardProcessModal}
            onChange={this.handleChangeCardProcess}
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
  changeCardModalAction: PropTypes.func.isRequired,
  changeCardProcessModalAction: PropTypes.func.isRequired
}

export default TransferCardDetail
