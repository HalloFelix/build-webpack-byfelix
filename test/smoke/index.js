const { resolve } = require('path')
const webpack = require('webpack')
const rimraf = require('rimraf')
const Mocha = require('mocha')
const mocha = new Mocha({
  timeout: '10000ms'
})

// 进入到template目录
process.chdir(resolve(__dirname, 'template'))

// 构建
rimraf('./dist', () => {
  const prodConfig = require('../../lib/webpack.prod')
  
  webpack(prodConfig, (err, stats) => {
    if (err) { 
      console.log(err) 
      process.exit(2)
    }
    
    console.log(stats.toString({
      color: true,
      modules: false,
      children: false
    }))
    
    console.log(__dirname);
    
    // 开始执行测试用例
    mocha.addFile(resolve(__dirname, './html-test.js'))
    mocha.addFile(resolve(__dirname, './css-js-test.js'))

    mocha.run()
  })
})
