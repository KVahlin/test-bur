const devMode = process.env.NODE_ENV === 'development';

module.exports = {
    publicPath: devMode
            ? `http://127.0.0.1:8880/`
            : '/',
    outputDir: './../',
    assetsDir: '',
    devServer: {
        port: 8880,
        host: '127.0.0.1',
        open: false,
        disableHostCheck: true,
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    },
    
    filenameHashing: false,
    chainWebpack: config => {
        config.optimization.delete('splitChunks')
    },
    configureWebpack: {
        output: {
            filename: '[name].js',
            chunkFilename: '[name].js'
        },
    },
    css: {extract: false},
    pages: {
        'test-task': {
            entry: './src/test-task/page_entry.js',
            template: 'public/index.html',
        },
    },
    productionSourceMap: false,
    
}
