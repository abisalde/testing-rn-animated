import type { Config } from "jest";
import { defaults } from "jest-config";

const config: Config = {
  verbose: true,
  moduleDirectories: [...defaults.moduleDirectories],
  setupFilesAfterEnv: [
    "./jest.setup.ts",
    "./node_modules/react-native-gesture-handler/jestSetup.js",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  preset: "react-native",
      testMatch: [
        "**/__tests__/**/*.{js,jsx,ts,tsx}",
        "**/*.(test|spec).{js,jsx,ts,tsx}",
      ],
  testPathIgnorePatterns: ["node_modules", "__mocks__"],
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|react-native-reanimated|react-native-worklets|react-native-gesture-handler|@react-navigation|react-native-safe-area-context|react-native-screens)/)",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
};

export default config;
