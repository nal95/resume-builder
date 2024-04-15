const {defaults} = require('jest-config');

/** @type {import('jest').Config} */
const config = {
  verbose: true,
  preset: 'jest-preset-angular',
  roots: ['src'],
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
};

module.exports = config;
