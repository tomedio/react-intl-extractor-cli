const path = require("path");
const webpack = require('webpack');

module.exports = {
    target: 'node',
    entry: "./main.js",
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
        ],
    },
    resolve: {
        extensions: ["*", ".js"],
    },
    output: {
        path: path.resolve(__dirname, "bin"),
        filename: "intl_extractor",
    },
    stats: {
        colors: true,
    },
    mode: "production",
    plugins: [
        new webpack.BannerPlugin({ banner: "#!/usr/bin/env node", raw: true }),
    ]
};