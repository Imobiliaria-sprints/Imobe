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
          "@middle": "./src/infra/http/middlewares",
          "@provider": "./src/infra/provider",
          "@dtos": "./src/dtos",
          "@app": "./src/infra/http",
        },
      },
    ],
  ],
  ignore: ["**/*.spec.ts"],
};
