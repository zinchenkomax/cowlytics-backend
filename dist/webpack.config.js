"use strict";
var webpack = require("webpack");
var path = require("path");
var fs = require("fs");
var nodeModules = {};
fs.readdirSync("node_modules")
    .filter(function (x) {
    return [".bin"].indexOf(x) === -1;
})
    .forEach(function (mod) {
    nodeModules[mod] = "commonjs " + mod;
});
module.exports = {
    devtool: "sourcemap",
    entry: "./src/app/server.ts",
    externals: nodeModules,
    output: {
        filename: "backend.js",
        path: path.join(__dirname, "build"),
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    target: "node",
};
//# sourceMappingURL=webpack.config.js.map