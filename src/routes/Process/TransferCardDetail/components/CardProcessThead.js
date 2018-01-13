import React from 'react'

const CardProcessThead = () => {
  return (
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
  )
}

export default CardProcessThead
