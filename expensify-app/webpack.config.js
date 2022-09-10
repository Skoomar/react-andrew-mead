const path = require('path');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

// use this nodeJS function to expose an object to another file
// so Webpack will grab this file, run it, and have access to whatever we put in this object
// this object contains the Webpack config details
// there are many different properties you can put in here: https://webpack.js.org/concepts/
// but the two basic things you NEED to tell it are:
//  - the entry point: i.e. where to start looking to build the bundle
//  - and an object containing details of where the output bundle file should be stored
module.exports = (env) => {
    const isProd = env === 'production';

    return {
        entry: './src/app.js',
        output: {
            // path requires an absolute path.
            // You can use __dirname to get the absolute path of this project, then if desired, use path.join() to concatenate any more specific directory within this project
            path: path.join(__dirname, 'public'),
            filename: 'bundle.js'
        },
        mode: 'development',
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                test: /\.s?css$/,
                use: [miniCssExtractPlugin.loader, "css-loader", "sass-loader"]
                // --- tbh I think we could just keep this line above and remove the sourceMap option things below as the console already seem to point to the styles in the right place
                // Andrew just put these lines below because his versions of libraries seem to point the console at the big bundle.js/styles.css instead of the files they actually come from - don't think we need that tho
                // use: [
                //     miniCssExtractPlugin.loader,
                //     {
                //         loader: "css-loader",
                //         options: {
                //             sourceMap: true
                //         }
                //     },
                //     {
                //         loader: "sass-loader",
                //         options: {
                //             sourceMap: true
                //         }
                //     }
                // ]
            }]
        },
        plugins: [
            new miniCssExtractPlugin()
        ],
        // use the slower but more optimised source-map if building prod, else use the quicker cheap-module-source-map (changed to inline-source-map now for some reason)
        devtool: isProd ? 'source-map' : 'inline-source-map',
        devServer: {
            static: path.join(__dirname, 'public'),
            historyApiFallback: true
        }
    };
};