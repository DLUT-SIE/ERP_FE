import React from 'react'
import _ from 'lodash'
import { COLUMNS, UNKNOW_COLUMN } from 'const'
import { Select } from 'antd'

const Option = Select.Option

const _findItem = (list = [], value, key = 'name') => {
  return list.find((item, index) => {
    return '' + item[key] === '' + value
  })
}

let util = {
  findItem (list = [], value, key = 'name') {
    if (_.isArray(value)) {
      return _.filter(list, (item) => {
        return value.find((v) => ('' + item[key] === '' + v))
      })
    }
    return _findItem(list, value, key)
  },
  str2num (value) {
    return _.isArray(value) ? value.map(util.str2num) : (
      _.isUndefined(value) ? undefined : +value
    )
  },
  num2str (value) {
    return _.isArray(value) ? value.map(util.num2str) : (
      _.isUndefined(value) ? undefined : '' + value
    )
  },
  selectFilter (key = 'value') {
    return (input, option) => (
      option.props[key].toLowerCase().indexOf(input.toLowerCase()) >= 0
    )
  },
  buildColumns (list = [], opts = {}) {
    return list.map((item, index) => {
      let column = {}
      if (_.isString(item)) {
        column = { ...(COLUMNS[item] || UNKNOW_COLUMN) }
      } else {
        column = { ...(COLUMNS[item.key] || UNKNOW_COLUMN), ...item }
      }
      if (opts[column.key]) {
        column = Object.assign(column, opts[column.key])
      }
      return column
    })
  },
  buildOptions (list = [], opts = {}) {
    let { makeValue, makeLabel, valueField = 'id', labelField = 'name' } = opts
    return list.map((item, index) => {
      let key = item[valueField]
      let value = makeValue ? makeValue(item, index) : item[valueField]
      let label = makeLabel ? makeLabel(item, index) : item[labelField]
      return (
        <Option
          key={key || index}
          data-id={key}
          value={_.isNumber(value) ? ('' + value) : value}
        >
          {label}
        </Option>
      )
    })
  }
}

export default util
