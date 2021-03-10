const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (_env, options) => {
  const copyPluginConfig = {
    patterns: [
      {
        from: "**/*",
        context: "src",
        globOptions: {
          dot: false,
          gitignore: false,
          ignore: ["**/*.ts", "**/icon.svg"],
        },
      },
    ],
  };

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
