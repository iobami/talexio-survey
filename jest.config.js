/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(e2e).[jt]s?(x)'], // Run  e2e test files
  // testMatch: ['**/?(*.)+(test).[jt]s?(x)'], // Run test files
  testTimeout: 200000,
};