import fetch from 'isomorphic-fetch'
import { message } from 'antd'

/**
 * 检查接口响应状态码
 *
 * @param {Object} response fetch返回的响应对象
 * @return {Object} 状态码正常时返回响应本身，否则返回 reject 信息
 */
function checkStatus (response) {
  const { status } = response
  if (status >= 200 && status < 300) {
    return response
  } else {
    return response.json().then(repos => {
      const msg = getErrorMsgByStatusCode(repos.msg, status)
      return Promise.reject({ msg, response })
    })
  }
}

/**
 * 返回状态码对应文本提示信息
 *
 * @param {number} code 响应状态码
 * @return {string} 文本提示
 */
function getErrorMsgByStatusCode (msg, code) {
  let result = '未知错误'
  if (code >= 400 && code < 500) {
    switch (code) {
      case 401:
        result = msg || '您尚未登录,请登录后访问.'
        break
      case 403:
        result = msg || '您所请求的资源被禁止访问.'
        break
      case 404:
        result = msg || '您所请求的资源并不存在.'
        break
      case 405:
        result = msg || '非法请求被禁止.'
        break
      case 406:
        result = msg || '参数错误.'
        break
      default:
        result = `抱歉，程序出了问题(${code}).`
    }
  } else if (code >= 500 && code < 600) {
    result = msg || '服务器出错啦.'
  }
  return result
}

/**
 * 异常处理函数，包含错误提示
 *
 * @param {Object} e 错误信息
 */
function handleError (e) {
  // 断网情况
  if (!e.response) {
    e.msg = (navigator && navigator.onLine) ? '网络异常' : '网络中断'
    message.error(e.msg)
  } else {
    message.warning(e.msg, 1)
  }
  throw e
}

export default {
  request:(url, config) => {
    return fetch(url, config)
    .then(checkStatus)
    .then((rps) => {
      return rps.status === 204 ? rps.text() : rps.json()
    })
    .catch(handleError)
  }
}
