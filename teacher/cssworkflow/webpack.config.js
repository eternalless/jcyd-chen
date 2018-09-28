const postcssPresetEnv = require("postcss-preset-env");
module.exports = {
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        ident: 'postcss',
                        plugins: () => [
                            //这里
                            postcssPresetEnv({
                                /* use stage 3 features + css nesting rules */
                                stage: 3,
                                features: {
                                    'nesting-rules': true
                                }
                            })
                        ]
                    }
                }
            ]
        }]
    }
};