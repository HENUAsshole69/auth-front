module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = '社会文物登记服务中心'
                return args
            })
    },
    "transpileDependencies": [
        "vuetify"
    ],
    devServer: {
        proxy: {
            '^/': {
                target: 'http://127.0.0.1:8080',
                ws: true,
                changeOrigin: true
            }
        }
    }
}
