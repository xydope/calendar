const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');


module.exports = ({ WEBPACK_SERVE, development }) => {

    //ПЕРЕДЕЛАТЬ! 
    //Если девсервер, то добавить ReactRefreshWebpackPlugin 
    const babelOptions = {
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins: []
    }

    const plugins = [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ]


    if (WEBPACK_SERVE) {
        babelOptions.plugins.push('react-refresh/babel');
        plugins.push(new ReactRefreshWebpackPlugin());
    }
    //^^^^^^^^^^^^^^^^^^ПЕРЕДЕЛАТЬ!^^^^^^^^^^^^^^^^^^

    return {
        context: path.resolve(__dirname, 'src'),
        mode: 'development',
        target: 'web',
        entry: {
            main: './index.js'
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].[hash].js',
            //assetModuleFilename: '[contenthash][ext]',
            clean: true
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        name: 'vendors',
                        test: /node_modules/,
                        chunks: 'all',
                        enforce: true
                    }
                }
            }
        },
        devtool: 'source-map',
        devServer: {
            contentBase: path.resolve(__dirname, 'dist'),
            port: 3000,
            hot: true
        },
        plugins,
        module: {
            rules: [
                {
                    test: /\.jsx?$/i,
                    include: path.resolve(__dirname, 'src'),
                    use: {
                        loader: 'babel-loader',
                        options: babelOptions //в шапке объявляем
                    }
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader', 'postcss-loader']
                },
                {
                    test: /\.(png|svg|jpe?g|gif)$/i,
                    include: path.resolve(__dirname, 'src/assets/img'),
                    type: 'asset/resource',
                    generator: {
                        filename: 'img/[contenthash][ext][query]'
                    }
                },
                {
                    test: /\.(woff2?|eot|ttf|otf|svg)$/i,
                    include: path.resolve(__dirname, 'src/assets/fonts'),
                    type: 'asset/resource',
                    generator: {
                        filename: 'fonst/[contenthash][ext][query]'
                    }
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx']
        }
    }
}