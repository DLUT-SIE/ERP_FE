import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import util from 'utils'
import { Button, Upload, message } from 'antd'
import fetchAPI from 'api'
import { apis } from 'api/config'

import CustomTable from 'components/CustomTable'

const columns = [
  'production_name', 'send_file'
]

class Production extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    fetchAPI(apis.Distribution.getDeptMap).then((map) => {
      this.setState({
        deptMap: map
      }, () => {
        const columns = this.buildColumns()
        this.setState({
          columns
        })
      })
      this.props.getListDataAction({
        params: {
          related: map['Distribution']
        }
      })
    })
  }

  getDepartmentFile = (deptName, documents) => {
    const { deptMap } = this.state
    const deptId = deptMap[deptName]
    const document = _.find(documents, (document) => {
      return document.dst === deptId
    })
    return document
  }

  uploadFile = (file) => {
    console.log('file', file.file, typeof file.file)
    fetchAPI(apis.Distribution.uploadBidFile, {
      path: file.file,
      ...file.data
    }).then((repos) => {
      message.success('上传成功')
    })
  }

  buildColumns () {
    const { deptMap } = this.state
    return util.buildColumns(columns, {
      send_file: {
        children: [{
          title: '生产',
          key: 'production',
          colSpan: 2,
          render: (text, record, index) => {
            const document = this.getDepartmentFile('Production', record.documents)
            return document ? (
              <a href={document.path} download={document.name}>
                {document.name}
              </a>
            ) : ''
          }
        }, {
          key: 'production_upload',
          colSpan: 0,
          render : (text, record, index) => {
            const data = { product: record.id, dst: deptMap['Production'], src: deptMap['Distribution'] }
            return (
              <Upload
                name='file'
                data={data}
                customRequest={this.uploadFile}
              >
                <Button
                  type='primary'
                  size='small'
                >
                  上传
                </Button>
              </Upload>
            )
          }
        }, {
          title: '工艺',
          key: 'process',
          colSpan: 2,
          render: (text, record, index) => {
            const document = this.getDepartmentFile('Process', record.documents)
            return document ? (
              <a href={document.path} download={document.name}>
                {document.name}
              </a>
            ) : ''
          }
        }, {
          key: 'process_upload',
          colSpan: 0,
          render : (text, record, index) => {
            const data = { product: record.id, dst: deptMap['Process'], src: deptMap['Distribution'] }
            return (
              <Upload
                name='file'
                data={data}
                customRequest={this.uploadFile}
              >
                <Button
                  type='primary'
                  size='small'
                >
                  上传
                </Button>
              </Upload>
            )
          }
        }, {
          title: '采购',
          key: 'procurement',
          colSpan: 2,
          render: (text, record, index) => {
            const document = this.getDepartmentFile('Procurement', record.documents)
            return document ? (
              <a href={document.path} download={document.name}>
                {document.name}
              </a>
            ) : ''
          }
        }, {
          key: 'procurement_upload',
          colSpan: 0,
          render : (text, record, index) => {
            const data = { product: record.id, dst: deptMap['Procurement'], src: deptMap['Distribution'] }
            return (
              <Upload
                name='file'
                data={data}
                customRequest={this.uploadFile}
              >
                <Button
                  type='primary'
                  size='small'
                >
                  上传
                </Button>
              </Upload>
            )
          }
        }]
      }
    })
  }

  handleChangeTable = (pagination, filters, sorter) => {
    const { deptMap } = this.state
    this.props.getListDataAction({
      params: {
        related: deptMap['Distribution'],
        page: pagination.current > 1 ? pagination.current : ''
      }
    })
  }

  render () {
    const { columns } = this.state
    const { status } = this.props
    const mydata = status.toJS()
    const list = _.get(mydata, 'list', [])
    const loading = _.get(mydata, 'loading')
    const pagination = _.get(mydata, 'pagination', {})
    return (
      <div>
        <CustomTable
          dataSource={list}
          columns={columns}
          loading={loading}
          pagination={pagination}
          size='middle'
          bordered
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
