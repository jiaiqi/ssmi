module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/text/'
    : '/',

  // cli3 代理是从指定的target后面开始匹配的，不是任意位置；配置pathRewrite可以做替换
  devServer: {
    proxy: {
      '/api':{
        target: "http://192.168.0.134:8087/test/select",
        changeOrigin:true,
        pathRewrite:{
          '^/api':'/'
        }
      },
      '/api2':{
        target: "http://192.168.0.192:8101/emr/select",
        changeOrigin:true,
        pathRewrite:{
          '^/api2':'/'
        }
      }
    }
  }
}
