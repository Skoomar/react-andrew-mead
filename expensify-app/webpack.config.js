const path = require('path');

// use this nodeJS function to expose an object to another file
// so Webpack will grab this file, run it, and have access to whatever we put in this object
// this object contains the Webpack config details
// there are many different properties you can put in here: https://webpack.js.org/concepts/
// but the two basic things you NEED to tell it are:
//  - the entry point: i.e. where to start looking to build the bundle
//  - and an object containing details of where the output bundle file should be stored
module.exports = {
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
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }]
    },
    devtool: 'cheap-module-source-map',
    devServer: {
        static: path.join(__dirname, 'public')
    }
}