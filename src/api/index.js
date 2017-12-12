import fetch from './fetch'
import _ from 'lodash'
import querystring from 'querystring'

export default function fetchAPI (api, body, rest, multipartFormData = true) {
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
        console.log('name', name, body[name])
        let value = _.isObjectLike(body[name]) ? JSON.stringify(body[name]) : body[name]
        console.log('value', value)
        formData.append(name, body[name])
      }
      config.body = formData
    } else {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      config.body = querystring.stringify(body)
    }
  }
  return fetch.request(url, config)
}
