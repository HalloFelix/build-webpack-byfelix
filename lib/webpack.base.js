const { resolve } = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const projectRoot = process.cwd()

const setMPA = () => {
  const entry = {}
  const HtmlWebpackPlugins = []

  const entryFiles = glob.sync(resolve(projectRoot, 'src/*/index.js'))
  
  entryFiles.map((entryFile) => {
    const entryName = entryFile.match(/src\/(.*)\/index\.js$/)[1]
    entry[entryName] = entryFile
    const template = entryFile.replace(/\.js$/, '.html')

    HtmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template,
        filename: `${entryName}.html`,
        chunks: [entryName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false,
        },
      }),
    )
  })
  return {
    entry,
    HtmlWebpackPlugins,
  }
}

const { entry, HtmlWebpackPlugins } = setMPA()

module.exports = {
  mode: 'development',
  entry,
  output: {
    path: resolve(projectRoot, './dist'),
    filename: 'js/[name]_[hash:8].js',
  },
  devServer: {
    contentBase: './dist',
    stats: 'errors-only',
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          'css-loader',
          'postcss-loader',
          {
            loader: 'px2rem-loader',
            options: {
              remUni: 75,
              remPrecision: 8,
            },
          },
          'less-loader',
        ],
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'imgs/[name]_[hash:8].[ext]',
            limit: 1024 * 10,
          },
        },
      },
    ],
  },
  plugins: [
    ...HtmlWebpackPlugins,
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name]_[contenthash:8].css'
    }),
    new FriendlyErrorsWebpackPlugin(),
    function ErrorPlugin() {
      console.log('函数执行了');

      this.hooks.done.tap('done', (stats) => {
        console.log('hooks函数执行了');
        if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
          console.log('build error')
          process.exit(444)
        }
      })
    },
  ],
  stats: 'errors-only',
}
