import React from 'react'

const CardProcessThead = () => {
  return (
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
  )
}

export default CardProcessThead
