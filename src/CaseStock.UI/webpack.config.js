const webpack = require("webpack");
const path = require("path");

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const contentRoot = path.resolve(__dirname, "wwwroot/");

module.exports = (env, argv) => {
    const config = {
        entry: {
            app: "./Assets/Scripts/app.ts"
        },

        output: {
            filename: "./Scripts/[name].min.js",
            path: contentRoot
        },

        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true
                }),

                new OptimizeCssAssetsPlugin()
            ]
        },

        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jquery: "jquery"
            }),

            new MiniCssExtractPlugin({
                filename: "./Styles/[name].min.css",
                chunkFilename: "./Styles/[id].min.css"
            }),

            new CopyPlugin([
                { from: "./Assets/Media", to: "Media" },
                { from: "./Assets/Static", to: "Static" },
            ])
        ],

        module: {
            rules: [
                // TypeScript
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                    exclude: /node_modules/
                },

                // (S)CSS
                {
                    test: /\.s?css$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                chunkFilename: "[name].css",
                                publicPath: "../"
                            }
                        },
                        "css-loader",
                        "postcss-loader",
                        "sass-loader"
                    ]
                },

                // Media
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: "Media/[name].[ext]"
                            }
                        }
                    ]
                },

                // Fonts
                {
                    test: /\.(ttf|eot|woff2?)$/i,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: "Fonts/[name].[ext]"
                            }
                        }
                    ]
                },

                // Expose JQuery
                {
                    test: require.resolve("jquery"),
                    use: [
                        {
                            loader: "expose-loader",
                            options: "$"
                        },

                        {
                            loader: "expose-loader",
                            options: "jquery"
                        },

                        {
                            loader: "expose-loader",
                            options: "jQuery"
                        }
                    ]
                }

            ]
        },

        resolve: {
            extensions: [ ".ts", ".tsx", ".js"]
        }
    };

    return config;
}