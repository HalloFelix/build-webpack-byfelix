const { resolve } = require('path')
console.log(__dirname)

process.chdir(resolve(__dirname, 'smoke/template'))

describe('builder-webpack test case', () => {
  require('./unit/webpack-base-test')
});