// jest.config.cjs
module.exports = {
  testEnvironment: "node",
  testTimeout: 20000,
  verbose: true,
  collectCoverageFrom: [
    "src/**/*.js",
    "controllers/**/*.js",
    "routes/**/*.js"
  ],
  coverageDirectory: "coverage",
  moduleFileExtensions: ["js", "json"],
  // treat .js files as ESM if your project is ESM — if you run into trouble,
  // remove this line or adjust based on your project setup
  //extensionsToTreatAsEsm: [".js"],
  // transform: {} // leave default, no Babel necessary for Node >= 18 if ESM works
};