const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const dependencies = require("./package.json").dependencies;

module.exports = {
  mode: "development",
  devServer: {
    port: 4000,
    historyApiFallback: true,
  },
  output: {
    publicPath: "http://localhost:4000/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            ["@babel/preset-react", { runtime: "automatic" }],
            "@babel/preset-typescript",
          ],
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },

      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.png$/,
        loader: "file-loader",
      },
      {
        test: /\.gif$/,
        loader: "file-loader",
      },
      {
        test: /\.mp4$/,
        loader: "file-loader",
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "home",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: require("./exposedComponents.json"),
      shared: [
        {
          ...dependencies,

          react: {
            requiredVersion: dependencies.react,
            singleton: true,
            eager: true,
          },
          "react-dom": {
            requiredVersion: dependencies["react-dom"],
            singleton: true,
            eager: true,
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
