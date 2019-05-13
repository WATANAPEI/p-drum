const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

module.exports = {
    mode: 'production',
    entry: {
        js: ['@babel/polyfill', path.resolve(__dirname, './client/index.js')]
    },
    output: {
        path: path.resolve(__dirname, './out'),
        filename: 'bundle.js'
    },
    devtool: 'eval-source-map',
    devServer: {
      contentBase: path.resolve(__dirname, './out'),
      port: 8080,
      compress: true,
      inline: true,
      disableHostCheck: true,
      host: "0.0.0.0",
      https: {
          key: fs.readFileSync('/etc/ssl/certs/localhost-key.pem'),
          cert: fs.readFileSync('/etc/ssl/certs/localhost-crt.pem'),
          ca: fs.readFileSync('/etc/nginx/local_root_CA/rootCA.pem')
      }
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

