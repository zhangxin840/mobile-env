var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        './src/home/index'
    ],
    output: {
        path: path.join(__dirname, 'build/public'),
        filename: 'bundle.js',
    },
    plugins: [],
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel'],
            include: path.join(__dirname, 'src')
        }, {
            test: /\.s?css$/,
            loader: "style!css!sass"
        }]
    }
};
