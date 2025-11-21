module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: process.env.NODE_ENV === 'production'
    ? '/pa-developer-clone/'
    : '/',
  outputDir: 'dist',
  assetsDir: '',
  productionSourceMap: false,
  devServer: {
    port: 8080,
    open: true,
    proxy: {
      '/api': {
        target: 'https://docs.agin.cc:8080',
        changeOrigin: true,
        secure: false
      }
    }
  }
}
