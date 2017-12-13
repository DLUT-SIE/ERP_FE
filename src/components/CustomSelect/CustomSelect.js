import React from 'react'
import PropTypes from 'prop-types'
import util from 'utils'
import _ from 'lodash'
import fetchAPI from 'api'
import { apis } from 'api/config'
import { Select } from 'antd'
import shallowequal from 'shallowequal'
import './CustomSelect.less'

class CustomSelect extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      list: [],
      value: undefined
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    let newProps = nextProps
    let nowProps = this.props
    if (newProps.value !== nowProps.value) {
      this.updateValue(nextProps)
    }
    if (
      !shallowequal(newProps.apiQuery, nowProps.apiQuery) ||
      newProps.apiName !== nowProps.apiName
    ) {
      this.fetchData(nextProps)
    }
    this.fillList(nextProps)
  }

  componentWillMount () {
    this.fillList(this.props)
    this.updateValue(this.props)
  }

  componentDidMount () {
    const { list, apiConfig, apiName } = this.props
    if (!list && (apiConfig || apiName)) {
      this.fetchData()
    }
  }

  fillList (props) {
    if (props.list) {
      this.setState({
        list: props.list
      })
    }
  }

  fetchData (props = this.props) {
    const { fields, defaultOptionIndex, apiConfig, apiName, apiQuery, enabledCache } = props
    if (!_.isEmpty(this._cacheList) && enabledCache) {
      this.setState({
        list: this._cacheList
      })
      return
    }
    fetchAPI(apiConfig || apis[apiName], apiQuery).then((reps) => {
      if (reps.success) {
        let data = reps.data
        this.setState({
          list: data
        })
        if (enabledCache) {
          this._cacheList = data
        }
        if (defaultOptionIndex >= 0 && data.length > 0) {
          this.handleChange(data[0][fields.valueField])
        }
      }
    })
  }

  updateValue (props) {
    let { value } = props
    this.setState({
      value
    })
  }

  handleChange (value) {
    let item = this.getItemByValue(value)
    this.props.onChange && this.props.onChange(value, item)
    this.setState({
      value
    })
  }

  getItemByValue (value) {
    let { fields, labelInValue } = this.props
    let { list = [] } = this.state
    let _value = labelInValue && value ? value.key : value
    return list.find((item, index) => {
      return '' + item[fields['valueField']] === '' + _value
    })
  }

  fixedValue (value) {
    if (_.isNull(value)) {
      return undefined
    } else if (_.isNumber(value)) {
      return value + ''
    } else if (_.isArray(value)) {
      return value.map(v => v + '')
    } else {
      return value
    }
  }

  getConcatList (list) {
    const { pushList, fields } = this.props
    const key = fields.valueField
    if (!_.isEmpty(pushList)) {
      return _.unionWith(list, pushList, (a, b) => {
        return '' + a[key] === '' + b[key]
      })
    }
    return list
  }

  render () {
    const { value, list } = this.state
    const { fields } = this.props
    return (
      <Select
        className='select custom-select'
        placeholder='请选择'
        showSearch
        size='large'
        notFoundContent='没有找到'
        filterOption={util.selectFilter('children')}
        {...this.props}
        value={this.fixedValue(value)}
        onChange={this.handleChange}
      >
        {util.buildOptions(this.getConcatList(list), fields)}
      </Select>
    )
  }
}

CustomSelect.propTypes = {
  list: PropTypes.array,
  pushList: PropTypes.array,
  apiConfig: PropTypes.object,
  apiName: PropTypes.string,
  fields: PropTypes.object,
  onChange: PropTypes.func,
  labelInValue: PropTypes.bool
}

CustomSelect.defaultProps = {
  fields: {
    valueField: 'value',
    labelField: 'label'
  },
  enabledCache: false,
  apiQuery: {}
}

export default CustomSelect
