const HappyWebpack = require("happypack");
const os = require("os");
const happyThreadPoll = HappyWebpack.ThreadPool({
    size: os.cpus().length
});
module.exports = [
    new HappyWebpack({
        id: 'happyTS',
        threadPool: happyThreadPoll,
        verbose: true,
        loaders: [{
            path: "ts-loader",
            query: {
                happyPackMode: true
            }
        }]
    }),
    new HappyWebpack({
        id: 'happyCSS',
        threadPool: happyThreadPoll,
        loaders: [{
                loader: 'css-loader',
                options: {
                    importLoaders: 1
                }
            },
            'postcss-loader'
        ]
    })
];