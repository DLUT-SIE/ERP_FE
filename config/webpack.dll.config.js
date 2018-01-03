const webpack = require('webpack')
const path = require('path')
// const project = require('./project.config')

const vendors = [
  'react',
  'react-dom',
  'react-redux',
  'react-router',
  'react-router-dom',
  'redux',
  'immutable',
  'isomorphic-fetch',
  'lodash',
  'antd',
  'redux-saga',
  'query-string'
]

module.exports = {
  devtool: '#source-map',
  output: {
    path: path.join(__dirname, '../dll'),
    filename: '[name].js',
    library: '[name]'
  },
  entry: {
    'lib': vendors
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../dll/manifest.json'),
      name: '[name]',
      context: __dirname
    })
  ]
}

// module.exports = {
//   devtool: '#source-map',
//   output: {
//     path: path.join(__dirname, '../dll'),
//     filename: '[name].[chunkhash].js',
//     library: '[name]_[chunkhash]'
//   },
//   entry: {
//     lib: vendors
//   },
//   plugins: [
//     new webpack.DllPlugin({
//       path: path.join(__dirname, '../dll/manifest.json'),
//       name: '[name]_[chunkhash]',
//       context: __dirname
//     })
//   ]
// }
