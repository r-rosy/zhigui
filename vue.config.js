const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api/v1': {
          target: 'http://119.3.2.168:2333', //API服务器的地址
          changeOrigin: true,
          pathRewrite: {
              
          }
      }
  }}
})
