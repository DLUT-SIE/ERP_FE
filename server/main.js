const express = require('express')
const debug = require('debug')('app:server')
const path = require('path')
const ejs = require('ejs')
const webpack = require('webpack')
const webpackConfig = require('../config/webpack.config')
const project = require('../config/project.config')
const compress = require('compression')
const bodyParser = require('body-parser')
const proxy = require('http-proxy-middleware')
// const querystring = require('querystring')
const proxyConfig = require('./proxy.config')
const routes = require('./routes')
const app = express()

// view engine setup
// app.set('views', path.join(__dirname, 'views'))
app.set('views', project.paths.template())
app.engine('.html', ejs.__express)
app.set('view engine', 'html')

// make http proxy middleware setting
const createProxySetting = function (url) {
  return {
    target: url,
    changeOrigin: true,
    headers: {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    onProxyReq: function (proxyReq, req) {
      if (req.method !== 'GET' && req.body) {
        const bodyData = JSON.stringify(req.body)
        proxyReq.write(bodyData)
      }
    }
  }
}

// parse application/json
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Apply gzip compression
app.use(compress())

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (project.env === 'development') {
  const compiler = webpack(webpackConfig)

  debug('Enabling webpack dev and HMR middleware')
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath  : webpackConfig.output.publicPath,
    contentBase : project.paths.client(),
    hot         : true,
    quiet       : project.compiler_quiet,
    noInfo      : project.compiler_quiet,
    lazy        : false,
    stats       : project.compiler_stats
  }))
  app.use(require('webpack-hot-middleware')(compiler, {
    path: '/__webpack_hmr'
  }))
  // proxy
  proxyConfig.forEach(function (item) {
    app.use(item.url, proxy(createProxySetting(item.target)))
  })

  // Serve static assets from ~/public since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(express.static(project.paths.public()))

  // This rewrites all routes requests to the root /index.html file
  // (ignoring file requests). If you want to implement universal
  // rendering, you'll want to remove this middleware.

  app.use('*', function (req, res, next) {
    const filename = path.join(compiler.outputPath, 'index.html')
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    })
  })
} else {
  debug(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.'
  )

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.

  // proxy
  proxyConfig.forEach(function (item) {
    app.use(item.url, proxy(createProxySetting(item.target)))
  })

  app.use(project.compiler_public_path, express.static(project.paths.dist()))
  app.use(project.compiler_base_route, routes)
}

module.exports = app
