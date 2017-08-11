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
        favicon :  './favicon.ico',
        inject: true,
        hash: true,
        chunks: ['common',name],
        title : title
    }
}
var config= {
    entry: {
        common:             ['./page/common/index.js'],
        index:              ['./page/index/index.js'],
        login:              ['./page/login/index.js'],
        list              : ['./page/list/index.js'],
        detail            :  ['./page/detail/index.js'],
        cart              :  ['./page/cart/index.js'],
        'user-login'       : ['./page/user-login/index.js'],
        'user-register'     : ['./page/user-register/index.js'],
        'user-pass-reset'   : ['./page/user-pass-reset/index.js'],
        'user-center'       : ['./page/user-center/index.js'],
        'user-center-update': ['./page/user-center-update/index.js'],
        'user-pass-update'  : ['./page/user-pass-update/index.js'],
          result            : ['./page/result/index.js']

    },
    output: {
        path: path.resolve(__dirname,'dist'),
        publicPath: 'dev' === WEBPACK_ENV?'/dist/':'//s.tuweiwei.xyz/mall/dist/',
        filename: 'js/[name].js'
    },
    resolve : {
        alias : {
            node_modules    : __dirname + '/node_modules',
            util            : __dirname + '/util',
            page            : __dirname + '/page',
            service         : __dirname + '/service',
            image           : __dirname + '/imgs',
        }
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
        new htmlWebpackPlugin(getHtmlConfig('list', '商品列表页')),
        new htmlWebpackPlugin(getHtmlConfig('detail', '商品详情页')),
        new htmlWebpackPlugin(getHtmlConfig('cart', '购物车')),
        new htmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
        new htmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
        new htmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
        new htmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')),
        new htmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人信息')),
        new htmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码')),
        new htmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
    ],
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader:  ExtractTextPlugin.extract( 'style-loader','css-loader')
            },
            {
                test: /\.string$/,
                loader: 'html-loader',
                query:{
                    minimize:true,
                    removeAttributeQuotes:false
                }
            },
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=images/[name].[ext]' },
        ],
    }


};

if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8081/');
}


module.exports  = config;