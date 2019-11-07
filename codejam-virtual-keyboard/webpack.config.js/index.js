const path = require('path');
const setupEntries = require('./lib/setup-entries');
const setupHtml = require('./lib/setup-html');
const setupStatic = require('./lib/setup-static');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const {
  rootPath,
  srcPath,
  destPath
} = require('./lib/variables');

module.exports = {

  mode: 'development',

  entry: setupEntries(`${srcPath}/js/*.js`, srcPath),

  output: {
    filename: `[name].js`,
    path: path.resolve(rootPath, destPath),
    sourceMapFilename: 'maps/[file].map',
  },

  devtool: 'source-map',

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.html$/i,
        use: [
          'html-loader'
        ]
      },
      {
        test: /\.scss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              url: true
            },
          },
          {
            loader: 'resolve-url-loader',
            options: {
              sourceMap: true,
              join: (uri, base) => {

                if (typeof base !== 'string'){
                  return base.join
                }

                return path.resolve(base, uri).replace(/\\/g, `/`);
              },
              root: rootPath
            }
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sourceMap: true,
              sassOptions: {
                includePaths: [path.join(rootPath, `node_modules`)]
              }
            }
          }
        ]
      },
      setupStatic(/\.(svg|png|jpg|jpeg|gif)$/i), // to the same relative path
      setupStatic(/\.(woff|woff2|eot|ttf|otf)$/i) // to the same relative path
    ]
  },

  plugins: []
    .concat(
      setupHtml(`${srcPath}/*.html`, srcPath)
    )
    .concat(
      new MiniCssExtractPlugin({
        moduleFilename: ({name}) => {
          return name.replace('js', 'css') + '.css';
        }
      })
    )
}
