module.exports = {
  chainWebpack: config => {
    config.module.rules.delete('svg')

    config.module
      .rule('svg-sprite')
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: "[name]" })

    config.module
      .rule('svg-sprite')
      .use('svgo-loader')
      .loader('svgo-loader')
  }
}