import fetch from './fetch'
import _ from 'lodash'
import querystring from 'querystring'

/**
 * @param {object} api 接口对象，包括url和method
 * @param {object} body 传递的参数
 * @param {object} params 传递接口中的动态参数值的对象
 * @param {boolean} multipartFormData 是否使用multipart/form-data格式传输数据
 * @return {function} 调用fetch.request
*/
export default function fetchAPI (api, body, params, multipartFormData = false) {
  let { url, method } = api
  let config = {
    headers: {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    credentials: 'include',
    method: method
  }
  if (!_.isEmpty(params)) {
    _.forEach(params, (value, key) => {
      url = url.replace(`:${key}`, value)
    })
  }
  if (method === 'GET') {
    if (!_.isEmpty(body)) {
      let params = _.isPlainObject(body) ? querystring.stringify(body) : body
      url = url + `?${params}`
    }
  } else {
    if (multipartFormData) {
      const formData = new FormData()
      for (let name in body) {
        let value = _.isPlainObject(body[name]) ? JSON.stringify(body[name]) : body[name]
        formData.append(name, value)
      }
      config.body = formData
    } else {
      config.headers['Content-Type'] = 'application/json'
      config.body = JSON.stringify(body)
    }
  }
  return fetch.request(url, config)
}
