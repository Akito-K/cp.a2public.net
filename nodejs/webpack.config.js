'use strict';
var path = require('path');
var webpack = require('webpack');
const gulpConfig = require('./gulp.config.js');
var env = process.env.NODE_ENV;
let config = {
    mode: gulpConfig.mode,
    devtool: 'source-map',
    entry: {
        'script': gulpConfig.tsDir + '/script.ts'
    },
    output: {
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.webpack.js', '.web.js', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader'
            },
            {
                test: /\.(css|scss|sass)/,
                use: [
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require("sass"),
                            sassOptions: {
                                fiber: false,
                            },
                            presets: ["solid"]
                        },
                    },
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.APP_ENV' : JSON.stringify('production')
        }),
    ]
};

if (gulpConfig.mode === 'production') {
    // config.output.filename = '[name].min.js';
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }));
} else {
    config.devtool = 'source-map';
}

module.exports = config;