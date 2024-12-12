/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  jest: {
    "globalSetup": "./jest-global-setup.js"
  }
};