import fetch from './fetch'
import _ from 'lodash'
import querystring from 'querystring'

export default function fetchAPI (api, body, rest, multipartFormData = false) {
  let { url, method } = api
  let config = {
    headers: {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    credentials: 'include',
    method: method
  }
  if (method === 'GET') {
    if (body) {
      if (rest) {
        url = url + `${body}`
      } else {
        let params = _.isPlainObject(body) ? querystring.stringify(body) : body
        url = url + `?${params}`
      }
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
