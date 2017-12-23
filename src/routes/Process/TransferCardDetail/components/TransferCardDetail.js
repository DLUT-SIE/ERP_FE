import React from 'react'
import { Button } from 'antd'
import './TransferCardDetail.less'

class TransferCardDetail extends React.Component {
  constructor (props) {
    super(props)
  }

  handlePrint = () => {
    console.log('handlePrint')
    window.print()
  }
  render () {
    return (
      <div className='transfer-card-detail'>
        <div className='btn-group'>
          <Button icon='left'>上一页</Button>
          <Button icon='printer' onClick={this.handlePrint}>打印</Button>
          <Button icon='right'>下一页</Button>
        </div>
        <table className='transfer-card-table'>
          <tbody>
            <tr className='first-tr'>
              <td className='compony-td' colSpan={4} rowSpan={3}>
                <p className='p'>太重（天津）滨海</p>
                <p className='p'>重型机械有限公司</p>
              </td>
              <td className='transfer-card-name-td' colSpan={5} rowSpan={3}>
                <b>筒 体 工 艺 卡（流转)</b>
              </td>
              <td className='file-number-td' colSpan={4} rowSpan={2}>
                文件编号
              </td>
              <td className='file-number-value-td' colSpan={4} rowSpan={2}>
                RH04-3456--01
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
                <b>RH01-3456</b>
              </td>
            </tr>
            <tr className='work-ticket-tr'>
              <td className='work-ticket-td' colSpan={4}>
                工作票号
              </td>
              <td className='work-ticket-value-td' colSpan={4}>
                <b>1#</b>
              </td>
              <td className='current-page-td' colSpan={5}>
                第&nbsp;&nbsp;页
              </td>
              <td className='total-page-td' colSpan={4}>
               共&nbsp;&nbsp;页
              </td>
            </tr>
            <tr className='simple-graph-tr'>
              <td className='simple-graph-td' colSpan={8} rowSpan={7}>
                简图：
                { true &&
                  <img src='' />
                }
              </td>
              <td className='first-base-info-td' colSpan={5}>
                工 作 令
              </td>
              <td className='first-base-info-value-td' colSpan={4}>
                123456
              </td>
              <td className='second-base-info-td' colSpan={5}>
                零 件 图 号
              </td>
              <td className='second-base-info-value-td' colSpan={4}>
                R3041
              </td>
            </tr>
            <tr className='simple-graph-tr'>
              <td className='first-base-info-td' colSpan={5}>
                产 品 名 称
              </td>
              <td className='first-base-info-value-td' colSpan={4}>
                123
              </td>
              <td className='second-base-info-td' colSpan={5}>
                零 件 名 称
              </td>
              <td className='second-base-info-value-td' colSpan={4}>
                中高压氮气储罐
              </td>
            </tr>
            <tr className='simple-graph-tr'>
              <td className='first-base-info-td' colSpan={5}>
                容 器 类 别
              </td>
              <td className='first-base-info-value-td' colSpan={4}>
                ss
              </td>
              <td className='second-base-info-td' colSpan={5}>
                数 量 / 台
              </td>
              <td className='second-base-info-value-td' colSpan={4}>
                1
              </td>
            </tr>
            <tr className='simple-graph-tr'>
              <td className='first-base-info-td' colSpan={5}>
                所属部件名称
              </td>
              <td className='first-base-info-value-td' colSpan={4}>
                sss
              </td>
              <td className='second-base-info-td' colSpan={5}>
                受 压 标 记
              </td>
              <td className='second-base-info-value-td' colSpan={4}>
                S
              </td>
            </tr>
            <tr className='simple-graph-tr'>
              <td className='first-base-info-td' colSpan={5}>
                所属部件图号
              </td>
              <td className='first-base-info-value-td' colSpan={4}>
                sssdf
              </td>
              <td className='second-base-info-td' colSpan={5}>
                材     料
              </td>
              <td className='second-base-info-value-td' colSpan={4}>
                部件
              </td>
            </tr>
            <tr className='simple-graph-tr'>
              <td className='first-base-info-td' colSpan={5}>
                产品试板图号
              </td>
              <td className='first-base-info-value-td' colSpan={4}>
                123
              </td>
              <td className='second-base-info-td' colSpan={5}>
                材 质 标 记
              </td>
              <td className='second-base-info-value-td' colSpan={4}>
                aaaa
              </td>
            </tr>
            <tr className='simple-graph-tr'>
              <td className='first-base-info-td' colSpan={5}>
                母材试板图号
              </td>
              <td className='first-base-info-value-td' colSpan={4}>
                123
              </td>
              <td className='second-base-info-td' colSpan={5}>
                路     线
              </td>
              <td className='second-base-info-value-td' colSpan={4}>
                llll
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
            <tr className='process-tr'>
              <td className='order-td'>
                2
              </td>
              <td className='process-td'>
                切割
              </td>
              <td className='process-request-td' colSpan={14}>
                采用数控切割，均分两端下料，1/2下料尺寸：-46X2364-4214
              </td>
              <td className='name-td' colSpan={4}>
                张三
              </td>
              <td className='first-date-td' colSpan={2}>
                2017.12.20
              </td>
              <td className='name-td' colSpan={3}>
                李四
              </td>
              <td className='second-date-td'>
                2017.12.21
              </td>
            </tr>
            <tr className='sign-tr'>
              <td className='mark-td'>
                标记1
              </td>
              <td className='revise-td'>
                处数1
              </td>
              <td className='change-file-number-td' colSpan={2}>
                更改文件号1
              </td>
              <td className='sign-td' colSpan={2}>
                签字1
              </td>
              <td className='data-td' colSpan={2}>
                日期1
              </td>
              <td className='write-td' colSpan={2} rowSpan={2}>
                编 制
              </td>
              <td className='writer-td' colSpan={4} rowSpan={2}>
                用户1
              </td>
              <td className='write-date-td' colSpan={3} rowSpan={2}>
                2017.11.24
              </td>
              <td className='proof-td' colSpan={2} rowSpan={2}>
                审 核
              </td>
              <td className='proof-reader-td' colSpan={4} rowSpan={2}>
                用户1
              </td>
              <td className='proof-date-td' colSpan={3} rowSpan={2}>
                2017.11.25
              </td>
            </tr>
            <tr className='sign-tr'>
              <td className='mark-td'>
                标记2
              </td>
              <td className='revise-td'>
                处数2
              </td>
              <td className='change-file-number-td' colSpan={2}>
                更改文件号2
              </td>
              <td className='sign-td' colSpan={2}>
                签字2
              </td>
              <td className='data-td' colSpan={2}>
                日期2
              </td>
            </tr>
            <tr className='sign-tr'>
              <td className='mark-td'>
                标记3
              </td>
              <td className='revise-td'>
                处数3
              </td>
              <td className='change-file-number-td' colSpan={2}>
                更改文件号3
              </td>
              <td className='sign-td' colSpan={2}>
                签字3
              </td>
              <td className='data-td' colSpan={2}>
                日期3
              </td>
              <td className='write-td' colSpan={2} rowSpan={2}>
                编  制
              </td>
              <td className='writer-td' colSpan={4} rowSpan={2}>
                用户1
              </td>
              <td className='write-date-td' colSpan={3} rowSpan={2}>
                2017.11.24
              </td>
              <td className='proof-td' colSpan={2} rowSpan={2}>
                审  核
              </td>
              <td className='proof-reader-td' colSpan={4} rowSpan={2}>
                用户1
              </td>
              <td className='proof-date-td' colSpan={3} rowSpan={2}>
                2017.11.25
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
      </div>
    )
  }
}

export default TransferCardDetail
