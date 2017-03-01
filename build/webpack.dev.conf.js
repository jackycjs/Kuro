const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const htmlWebpackPlugin = require('html-webpack-plugin');
const friendlyErrorsPlugins = require('friendly-errors-webpack-plugin');

const BUILD_CONFIG = require('./config/BUILD.js');
const PATHS_CONFIG = require('./config/PATHS.js');
const WEBPACK_BASE_CONFIG = require('./webpack.base.conf');

// another simple setting for hot-reload
// WEBPACK_BASE_CONFIG.entry.app = [
//     'webpack-hot-middleware/client?reload=true',
//     WEBPACK_BASE_CONFIG.entry.app
// ];

// add hot-reload related code to entry chunks
Object.keys(WEBPACK_BASE_CONFIG.entry).forEach(function(name) {
    WEBPACK_BASE_CONFIG.entry[name] = ['./build/dev-client'].concat(WEBPACK_BASE_CONFIG.entry[name])
})

// 开发环境下直接内嵌 CSS 以支持热替换
WEBPACK_BASE_CONFIG.module.loaders.push({
    test: /\.css$/,
    loader: 'style-loader!css-loader'
}, {
    test: /\.less$/,
    loader: 'style-loader!css-loader!less-loader'
}, {
    test: /\.scss$/,
    loader: 'style-loader!css-loader!sass-loader'
});

module.exports = merge(WEBPACK_BASE_CONFIG, {
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        //new webpack.NoEmitOnErrorsPlugin(),
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: PATHS_CONFIG.SRC.pathJoin('index.html'),
            inject: true
        }),
        new friendlyErrorsPlugins()
    ]
});