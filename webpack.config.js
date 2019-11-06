const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env, options) => {
  const copyPluginConfig = [
    {
      from: "**/*",
      context: "src",
      ignore: ["scripts/**/*", "images/icon.svg"],
    },
  ];

  const config = {
    entry: {
      background: "./src/scripts/background.ts",
    },
    output: {
      filename: "./scripts/[name].js",
    },
    plugins: [new CopyWebpackPlugin(copyPluginConfig)],
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js"],
      modules: ["node_modules/", "src/scripts/"],
    },
  };

  if (options.mode === "development") {
    config["devtool"] = "inline-source-map";
  }

  return config;
};
