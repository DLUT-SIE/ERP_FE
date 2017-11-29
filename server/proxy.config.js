const proxy = [
  {
    url: '/api/*',
    target: 'https://www.easy-mock.com/mock/5a1b72b5fc9bad5c3ee4cbe9'
  },
  {
    url: '/back_end/*',
    target: 'http://192.168.13.91:8000'
  }
]

module.exports = proxy
