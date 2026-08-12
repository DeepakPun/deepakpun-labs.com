export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  // Scans both your main source files and your entire test structure
  roots: ["<rootDir>/src/", "<rootDir>/tests/"],

  extensionsToTreatAsEsm: [".ts", ".tsx"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],

  moduleNameMapper: {
    "\\.md\\?raw$": "<rootDir>/tests/__mocks__/markdownMock.mjs",
    "^.*/constants/kanbanData\\.json$":
      "<rootDir>/tests/__mocks__/kanbanMock.json",
  },

  transform: {
    // Crucial: Ensures your .tsx test inside __mocks__ goes through the compiler
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: "./tsconfig.json",
        diagnostics: {
          ignoreCodes: [151002],
        },
      },
    ],
  },
}

// ignoreCodes: [151002],
