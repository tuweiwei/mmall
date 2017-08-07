var webpack  = require('webpack');
//var commonPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var htmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');
var WEBPACK_ENV       = process.env.WEBPACK_ENV || 'dev';

var getHtmlConfig = function (name,title) {

    return {

        template: './view/'+ name +'.html',
        filename: 'html/'+name+'.html',
        inject: true,
        hash: true,
        chunks: ['common',name],
        title : title
    }
}
var config= {
    entry: {
        common: ['./page/common/index.js'],
        index: ['./page/index/index.js'],
        login: ['./page/login/index.js'],
    },
    output: {
        path: path.resolve(__dirname,'dist'),
        publicPath: '/dist',
        filename: 'js/[name].js'
    },
    externals: {
        'jquery' : 'window.jQuery',
    },
    plugins: [
        new ExtractTextPlugin("css/[name].css"),
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js',
        }),
        new htmlWebpackPlugin(getHtmlConfig('index','首页')),
        new htmlWebpackPlugin(getHtmlConfig('login','登陆')),
    ],
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader:  ExtractTextPlugin.extract( 'style-loader','css-loader')
            },
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader!file-loader?limit=100&name=images/[name].[ext]' },
        ],
    }


};

if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8080/');
}


module.exports  = config;