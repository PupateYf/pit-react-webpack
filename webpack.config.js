const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

var webpackConfig = {
    entry: {
        index: './app.jsx',
        vendor: ['react', 'react-dom']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        plugins: ['transform-react-jsx']
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': process.env.NODE_ENV == 'develop' ? '"develop"' : '"production"'
        }),
        new HtmlWebpackPlugin({
            title: 'React App',
            template: './index.html',
            filename: path.resolve(__dirname, 'dist/index.html')
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './dist',
        port: 3333,
        inline: true,
        hot: true,
        open: true
    }
}

if (process.env.NODE_ENV == 'production') {
    webpackConfig.plugins.push(
        new UglifyJSPlugin({
            sourceMap: true
        })
    )
}



module.exports = webpackConfig