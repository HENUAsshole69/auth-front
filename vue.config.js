module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = '社会文物登记服务中心'
                return args
            })
        if (process.env.NODE_ENV === 'production') {
            config.plugin('html').tap((opts) => {
                opts[0].filename = './auth_center.html';
                return opts;
            });
        }
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
