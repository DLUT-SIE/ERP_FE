import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'antd'

// import './ApplyWriteModal.less'

class ApplyWriteModal extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { visible, bid, onCancel } = this.props
    return (
      <Modal
        className='apply-write-modal'
        title='招标文件填写'
        width={600}
        visible={visible}
        onOk={onCancel}
        onCancel={onCancel}
      >
        { bid.category === 0
          ? <div>
            <Button
              type='primary'
              // onClick={this.handleWriteApplyForm}
            >
              填写招标申请表
            </Button>
            <Button
              type='success'
            >
              填写供应商审核表
            </Button>
          </div>
          : <Button
            type='primary'
          >
            填写比质比价卡
          </Button>
        }
      </Modal>
    )
  }
}

ApplyWriteModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  bid: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired
}

export default ApplyWriteModal
