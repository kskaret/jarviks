module.exports = {
    "moduleNameMapper": {
      '^@/(.*)$': '<rootDir>/$1'
    },
    //"setupFilesAfterEnv": ['<rootDir>/tests/setup.js'],
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
    ],
}