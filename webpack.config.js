const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const readline = require('readline');
const cpu_number = require('os').cpus().length;

module.exports = {
    mode : 'production',
    entry: {
        app: ['@babel/polyfill', './lib/app.js']
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js?v=[chunkhash]',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'var',
        library: 'EntryPoint',
    },
    devServer: {
        contentBase: path.join(__dirname, '/'),
        compress: false,
        port: 8888
    },
    module: {
        rules: [{
            test: /\.js$/,
            include: path.join(__dirname),
            exclude: /(node_modules)|(dist)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                'targets' : {
                                    'browsers' : ['last 2 versions', 'ie >= 8']
                                }
                            }
                        ]
                    ],
                    cacheDirectory: true
                }
            }
        }]
    },
    optimization : {
        minimizer: [
            new TerserPlugin({
                parallel : cpu_number - 1,
                sourceMap: true,
                cache : true
            })
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.SourceMapDevToolPlugin({
            filename : 'sourcemap/[name].js.map',
            publicPath : __dirname + '/dist/'
        }),
        new webpack.ProgressPlugin((percentage, message) => {
            readline.cursorTo(process.stdout, 0);
            readline.clearLine(process.stdout,0);
            process.stdout.write(`\x1b[1m\x1b[36m${(percentage * 100).toFixed()}% \x1b[0m\x1b[2m\x1b[36m${message}`);
        })
    ]
};
