const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        app: ['@babel/polyfill', './lib/app.js']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'var',
        library: 'EntryPoint',
    },
    devServer: {
        contentBase: path.join(__dirname, '/'),
        compress: false,
        port: 8888
    },
    plugins: [
        new CleanWebpackPlugin(['dist'])
    ],
    module: {
        rules: [{
            test: /\.js$/,
            include: path.join(__dirname),
            exclude: /(node_modules)|(dist)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                    // presets: [
                    //     ['env', {
                    //         'targets': {
                    //             'browsers': ['last 2 versions', 'ie >= 8']
                    //         }
                    //     }]
                    // ]
                }
            }
        }]
    },
    devtool: 'source-map'
};
