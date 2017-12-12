const proxy = [
  // {
  //   url: '/api/*',
  //   target: 'https://www.easy-mock.com/mock/5a1b72b5fc9bad5c3ee4cbe9'
  // },
  {
    url: '/api/*',
    target: 'http://192.168.3.2:8010'
  }
]

module.exports = proxy
