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
    "@babel/plugin-transform-async-to-generator",
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    [
      "@babel/plugin-transform-runtime",
      {
        helpers: true,
        regenerator: true,
      },
    ],
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
          "@provider": "./src/provider",
          "@dtos": "./src/dtos",
          "@app": "./src",
        },
      },
    ],
  ],
  ignore: ["**/*.spec.ts"],
};
