const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const minify = require('html-minifier').minify;
const path = require("path");
module.exports = {
    output: {
        filename: "scripts/[name].[hash:5].bundle.js"
    },
    plugins: [
        //处理views的模板
        new CopyWebpackPlugin([{
            from: path.join(__dirname, "../" + "/src/webapp/views/common/layout.html"),
            to: '../views/common/layout.html'
        }]),
        //处理components模板
        new CopyWebpackPlugin([{
            from: path.join(__dirname, "../" + "/src/webapp/components/"),
            to: '../components',
            transform(content) {
                return minify(content.toString("utf-8"), {
                    collapseWhitespace: true
                });
            }
        }], {
            ignore: ["*.js", "*.css", "*.ts", "*.png", ".DS_Store"]
        }),
        new ExtractTextPlugin({
            filename: "styles/[name][hash:5].css",
            allChunks: true,
        })
    ]
}