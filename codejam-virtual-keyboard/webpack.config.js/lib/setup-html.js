const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function setupHtml(pattern, srcPath) {

  return glob
    .sync(pattern)
    .reduce((res, filePath) => {

      let name = path
        .relative(srcPath, filePath)
        .replace(/\\/g, `/`)
        .split('.')
        .reverse()
        .splice(1)
        .reverse()
        .join('.')
      ;

      res.push(new HtmlWebpackPlugin({
        filename: `${name}.html`,
        template: filePath,
        chunks: [
          path.join('js', name).replace(/\\/g, `/`)
        ]
      }))

      return res;
    }, [])
  ;
}