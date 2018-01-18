import React from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import _ from 'lodash'
import { Button, message } from 'antd'
import fetchAPI from 'api'
import { apis } from 'api/config'

import SubApplyItemTr from './SubApplyItemTr'
import MaterialSubApplyModal from './MaterialSubApplyModal'
import ApplyItemModal from './ApplyItemModal'
import './MaterialSubApplyDetail.less'

class MaterialSubApplyDetail extends React.Component {
  constructor (props) {
    super(props)
    const query = QueryString.parse(props.location.search)
    this._id = +query.id
  }

  componentDidMount () {
    if (!_.isUndefined(this._id)) {
      this.fetchData()
    }
  }

  fetchData () {
    this.props.getDataAction({
      id: this._id
    })
  }

  handleOpenApplyModal = () => {
    const { status } = this.props
    const mydata = status.toJS()
    const apply = _.get(mydata, 'apply', {})
    this.props.changeApplyModal({
      visible: true,
      fieldsValue: {
        uid: apply.uid,
        work_order: apply.work_order,
        figure_code: apply.figure_code,
        production: apply.production
      }
    })
  }

  handleCloseApplyModal = () => {
    this.props.changeApplyModal({
      visible: false
    })
  }

  handleSaveApply = (fieldsValue) => {
    fetchAPI(apis.PurchaseAPI.updateMaterialSubApplies, fieldsValue, { id: this._id }).then((repos) => {
      message.success('修改成功！')
      this.handleCloseApplyModal()
      this.fetchData()
    })
  }

  handleDeleteItem = (id) => {
    fetchAPI(apis.PurchaseAPI.deleteMaterialSubApplyItems, {}, { id }).then((repos) => {
      message.success('删除成功！')
      this.fetchData()
    })
  }

  handleOpenItemModal = (index) => {
    const { status } = this.props
    const mydata = status.toJS()
    const apply = _.get(mydata, 'apply', {})
    const { sub_apply_items } = apply
    this.props.changeItemModal({
      visible: true,
      fieldsValue: sub_apply_items[index]
    })
  }

  handleOpenAddItemModal = (e) => {
    this.props.changeItemModal({
      visible: true,
      fieldsValue: {}
    })
  }

  handleCloseItemModal = () => {
    this.props.changeItemModal({
      visible: false
    })
  }

  handleSaveItem = (id, fieldsValue) => {
    if (_.isUndefined(id)) {
      fetchAPI(apis.PurchaseAPI.addMaterialSubApplyItems, {
        ...fieldsValue,
        sub_apply: this._id
      }).then((repos) => {
        message.success('添加成功！')
      })
    } else {
      fetchAPI(apis.PurchaseAPI.updateMaterialSubApplyItems, fieldsValue, { id }).then((repos) => {
        message.success('修改成功！')
      })
    }
    this.handleCloseItemModal()
    this.fetchData()
  }

  render () {
    const { status } = this.props
    const mydata = status.toJS()
    const apply = _.get(mydata, 'apply', {})
    const applyModal = _.get(mydata, 'applyModal', {})
    const itemModal = _.get(mydata, 'itemModal', {})
    const { sub_apply_items, sub_spply_comments } = apply
    return (
      <div className='material-sub-apply'>
        <div className='btn-area'>
          <Button
            type='primary'
            onClick={this.handleOpenApplyModal}
          >
            编辑申请单
          </Button>
          <Button
            type='success'
            onClick={this.handleOpenAddItemModal}
          >
            添加明细
          </Button>
        </div>
        <p className='title-prefix'>
          <b>太重（天津）滨海重型机械<u className='title-compony'>有限公司</u></b>
        </p>
        <p className='title-apply'><b>材料代用申请单</b></p>
        <p className='number-p'><b>编号：</b>{apply.uid}</p>
        <table className='material-sub-apply-table' cellSpacing={0} cellPadding={0}>
          <tbody>
            <tr className='work-order-tr'>
              <td className='work-order-td' colSpan={2}>工作令号</td>
              <td className='work-order-value-td'>{apply.work_order}</td>
              <td className='production-td' colSpan={4}>产品名称</td>
              <td className='production-value-td' colSpan={3}>{apply.production}</td>
              <td className='figure-code-td'>图号</td>
              <td className='figure-code-value-td' colSpan={2}>{apply.figure_code}</td>
              <td className='applicant-td' colSpan={2}>申请人</td>
              <td className='applicant-value-td' colSpan={2}>{apply.applicant}</td>
            </tr>
            <tr className='part-figure-code-tr'>
              <td className='part-figure-code-td' colSpan={2} rowSpan={2}>部件图号</td>
              <td className='part-ticket-code-td' colSpan={3} rowSpan={2}>零件图号或票号</td>
              <td className='old-td' colSpan={7}>原用材料</td>
              <td className='new-td' colSpan={5}>拟用材料</td>
            </tr>
            <tr className='name-tr'>
              <td className='old-name-td' colSpan={3}>名称</td>
              <td className='old-standard-td'>钢号及标准</td>
              <td className='old-size-td' colSpan={3}>规格尺寸</td>
              <td className='new-name-td' colSpan={2}>名称</td>
              <td className='new-standard-td' colSpan={2}>钢号及标准</td>
              <td className='new-size-td'>规格尺寸</td>
            </tr>
            {
              _.map(sub_apply_items, (item, index) => (
                <SubApplyItemTr
                  key={index}
                  item={item}
                  index={index}
                  onEdit={this.handleOpenItemModal}
                  onDelete={this.handleDeleteItem}
                />
              ))
            }
            <tr className='sub-spply-comments-tr'>
              <td className='comment-td' colSpan={6}>材料责任工程师意见</td>
              <td className='comment-value-td' colSpan={11}>{sub_spply_comments.material}</td>
            </tr>
            <tr className='sub-spply-comments-tr'>
              <td className='comment-td' colSpan={6}>工艺责任工程师意见</td>
              <td className='comment-value-td' colSpan={11}>{sub_spply_comments.material}</td>
            </tr>
            <tr className='sub-spply-comments-tr'>
              <td className='comment-td' colSpan={6}>焊接责任工程师意见</td>
              <td className='comment-value-td' colSpan={11}>{sub_spply_comments.material}</td>
            </tr>
            <tr className='sub-spply-comments-tr'>
              <td className='comment-td' colSpan={6}>设计责任工程师意见</td>
              <td className='comment-value-td' colSpan={11}>{sub_spply_comments.material}</td>
            </tr>
            <tr className='sub-spply-comments-tr'>
              <td className='comment-td' colSpan={6}>原设计单位意见</td>
              <td className='comment-value-td' colSpan={11}>{sub_spply_comments.material}</td>
            </tr>
          </tbody>
        </table>
        { applyModal.visible &&
          <MaterialSubApplyModal
            {...applyModal}
            onOk={this.handleSaveApply}
            onCancel={this.handleCloseApplyModal}
          />
        }
        { itemModal.visible &&
          <ApplyItemModal
            {...itemModal}
            onOk={this.handleSaveItem}
            onCancel={this.handleCloseItemModal}
          />
        }
      </div>
    )
  }
}

MaterialSubApplyDetail.propTypes = {
  location: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getDataAction: PropTypes.func.isRequired,
  changeApplyModal: PropTypes.func.isRequired,
  changeItemModal: PropTypes.func.isRequired
}

export default MaterialSubApplyDetail
