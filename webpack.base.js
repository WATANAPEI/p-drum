const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

module.exports = {
    entry: {
        js: ['@babel/polyfill', path.resolve(__dirname, './client/index.js')]
    },
    output: {
        path: path.resolve('/www', 'app', 'p-drum'),
        filename: 'bundle.js'
    },
    resolve: {
      modules: [path.resolve(__dirname, "client"), "node_modules"],
      extensions: ['.js', '.jsx']
    },
    module: {
            rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                          presets: ['@babel/preset-env']
                        }
                    },
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader']
            }
            ],
    },
    plugins: [
      new HtmlWebpackPlugin({template: path.resolve(__dirname, './client/index.html')})
    ]
};

