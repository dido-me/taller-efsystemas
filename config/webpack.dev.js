const { merge } = require("webpack-merge")
const common = require("./webpack.common")
const { HotModuleReplacementPlugin } = require("webpack")
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")

const devConfig = {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    contentBase: "./dist",
    open: true,
    hot: true,
    port: 3000,
  },
  plugins: [new HotModuleReplacementPlugin(), new ReactRefreshWebpackPlugin()],
  target: "web",
}

module.exports = merge(common, devConfig)
