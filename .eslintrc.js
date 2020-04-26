module.exports = {
  "parser": "babel-eslint", 
  "extends": "airbnb-base",
  "env": {
    // 指定环境以后会把相关的环境变量添加到全局, 使用window, global时不报错
    "browser": true,
    "node": true
  },
  "rules": {
      "linebreak-style": ["error", "windows"],
      "semi": "off",
      "no-console": "off",
      "array-callback-return": "off",
      "global-require": "off"
  }
}