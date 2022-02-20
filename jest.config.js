const { defaults } = require('jest-config')

const config = {
  preset: 'react-native',
  verbose: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  testEnvironment: 'jsdom',
  setupFiles: ['./src/__mocks__/@react-native-community/async-storage.ts'],
}

module.exports = config
