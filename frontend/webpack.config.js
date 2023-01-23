//webpack.config.js
const { SourceMapDevToolPlugin } = require("webpack");
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');



module.exports = {
    entry: './src/index.js',
    resolve: {
        alias: {
            "styled-components": path.resolve(__dirname, "node_modules", "styled-components"),
        }
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },
    devServer: {
        port: 3000
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-url-loader',
                        options: {
                            limit: 10000,
                        },
                    },
                ],
            }
        ]
    },
    plugins: [
        new InterpolateHtmlPlugin({ PUBLIC_URL: '.'}),
        new HtmlWebpackPlugin({
            inject: true,
            template: path.join(__dirname, '/public/index.html')
        }),
        new SourceMapDevToolPlugin({
            filename: "[file].map"
        }),


    ]
}