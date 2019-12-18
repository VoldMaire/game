var path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = env => {
    return {
        watch: true,
        entry: "./src/Application.ts",
        output: {
            filename: "./bundle.js",
        },

        plugins: [
            new CleanWebpackPlugin(),
        ],

        mode: env === 'dev' ? "development" : "production",
        devtool: "inline-source-map",

        resolve: {
            extensions: [".tsx", ".ts", ".js"]
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: ['source-map-loader'],
                    enforce: 'pre'
                },
                {
                    test: /\.ts$/,
                    loader: "ts-loader"
                },
                {
                    include: path.resolve(__dirname, "node_modules/pixi.js"),
                    enforce: "post",
                    loader: "transform?brfs"
                }
            ]
        },
        externals: [
            // Don't bundle pixi.js, assume it'll be included in the HTML via a script
            // tag, and made available in the global variable PIXI.
            { "pixi.js": "PIXI" }
        ]
    }
};
