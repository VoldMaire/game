var path = require('path');

module.exports = {
    entry: "./src/Application.ts",
    output: {
        filename: "./dist/bundle.js",
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' as resolvable extensions.
        extensions: [".ts", ".js"]
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: "pre",
                loader: "source-map-loader"
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
        {"pixi.js": "PIXI"}
    ]

};
