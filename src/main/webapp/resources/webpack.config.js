var webpack  = require('webpack');
var commonPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

var config= {
    entry: './scripts/app.js',
    output: {
        path: './dist',
        filename: 'app.js'
    },
    plugins: [],
    module: {
        loaders: [
            {},
            {}
        ]
    },

    resolve: {

        alias: {

        }

    }

};

module.exports  = config;