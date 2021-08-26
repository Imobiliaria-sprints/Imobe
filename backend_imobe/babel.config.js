module.exports = {
  presets: [
    [
      "@babel/env",
      {
        targets: {
          node: "current",
        },
      },
    ],
    "@babel/preset-typescript",
  ],
  plugins: [
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    [
      "module-resolver",
      {
        alias: {
          "@cases": "./src/useCases",
          "@config": "./src/config",
          "@entity": "./src/entities",
          "@repos": "./src/repositories",
          "@views": "./src/repositories",
          "@middle": "./src/middlewares",
        },
      },
    ],
  ],
  ignore: ["**/*.spec.ts"],
};
