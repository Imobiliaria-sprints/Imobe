export default {
  bail: true,

  clearMocks: true,

  collectCoverage: true,

  collectCoverageFrom: ["src/**/*.ts"],

  coverageDirectory: "__tests__/coverage",

  coverageReporters: ["json", "lcov"],

  coverageProvider: "v8",

  moduleNameMapper: {
    "@App/(.*)": "<rootDir>/src/$1",
    "@Shared/(.*)": "<rootDir>/src/Shared/$1",
    "@cases/(.*)": "<rootDir>/src/useCases/$1",
    "@config/(.*)": "<rootDir>/src/config/$1",
    "@entity/(.*)": "<rootDir>/src/entities/$1",
    "@repos/(.*)": "<rootDir>/src/repositories/$1",
    "@views/(.*)": "<rootDir>/src/views/$1",
    "@middle/(.*)": "<rootDir>/src/infra/http/middlewares/$1",
    "@provider/(.*)": "<rootDir>/src/infra/provider/$1",
    "@dtos/(.*)": "<rootDir>/src/dtos/$1",
    "@app/(.*)": "<rootDir>/src/infra/http/$1",
  },

  preset: "ts-jest",

  // testEnvironment: "node",

  testMatch: ["<rootDir>/__tests__/**/*.spec.ts"],

  transform: {
    "^.+\\.ts$": "ts-jest",
  },

  verbose: true,
};
