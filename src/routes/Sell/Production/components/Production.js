import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import util from 'utils'
import { Button, Upload } from 'antd'

import CustomTable from 'components/CustomTable'

const columns = [
  'production_name', 'send_file', 'product', 'product_upload', 'craft', 'craft_upload', 'purchase', 'purchase_upload'
]

class Production extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this._columns = this.buildColumns()
  }

  componentDidMount () {
    this.props.getListDataAction({
      params: {}
    })
  }

  buildColumns () {
    return util.buildColumns(columns, {
      product: {
        colSpan: 2
      },
      craft: {
        colSpan: 2
      },
      purchase: {
        colSpan: 2
      },
      product_upload: {
        colSpan: 0,
        render : (text, record, index) => {
          return (
            <Upload
              name='file'
              action='jsonplaceholder.typicode.com/posts/'
            >
              <Button
                type='primary'
                size='small'
                data-id={record.id}
              >
                上传
              </Button>
            </Upload>
          )
        }
      },
      craft_upload: {
        colSpan: 0,
        render : (text, record, index) => {
          return (
            <Button
              type='primary'
              size='small'
              data-id={record.id}
            >
              上传
            </Button>
          )
        }
      },
      purchase_upload: {
        colSpan: 0,
        render : (text, record, index) => {
          return (
            <Button
              type='primary'
              size='small'
              data-id={record.id}
            >
              上传
            </Button>
          )
        }
      }
    })
  }

  handleChangeTable = (pagination, filters, sorter) => {
    this.updateQuery({
      page: pagination.current > 1 ? pagination.current : ''
    })
  }

  render () {
    const { status } = this.props
    const mydata = status.toJS()
    const list = _.get(mydata, 'list', [])
    const loading = _.get(mydata, 'loading')
    const pagination = _.get(mydata, 'pagination', {})
    return (
      <div>
        <CustomTable
          dataSource={list}
          columns={this._columns}
          loading={loading}
          pagination={pagination}
          size='middle'
          onChange={this.handleChangeTable}
        />
      </div>
    )
  }
}

Production.propTypes = {
  status: PropTypes.object.isRequired,
  getListDataAction: PropTypes.func.isRequired
}

export default Production
