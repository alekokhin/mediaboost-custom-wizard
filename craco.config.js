const path = require('path')

module.exports = {
  webpack: {
    configure: webpackConfig => {
      // Update output public path
      webpackConfig.output.publicPath = '/wizard/'

      // Update asset loader public path
      const urlLoader = webpackConfig.module.rules.find(
        rule => rule.loader && rule.loader.includes('url-loader'),
      )
      if (urlLoader) {
        urlLoader.options.publicPath = '/wizard/'
      }

      return webpackConfig
    },
  },
  // Update dev server config
  devServer: {
    historyApiFallback: {
      index: '/wizard/index.html',
    },
  },
}
