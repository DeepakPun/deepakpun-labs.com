const { defineConfig } = require("jest")

module.exports = defineConfig({
  roots: ["<rootDir>/tests/"],
  testEnvironment: "node",
  transform: {},
})
