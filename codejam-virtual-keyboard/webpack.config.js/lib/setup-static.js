const path = require('path');
const {
  rootPath,
  srcPath
} = require('./variables');

module.exports = function setupStatic(pattern) {

  return {
    test: pattern,
    loader: 'file-loader',
    options: {
      name: `[name].[ext]`,
      outputPath: (url, resourcePath, context) => {
        let src = path.join(rootPath, srcPath);
        return path.relative(src, resourcePath).replace(/\\/g, `/`);
      },
    }
  }
}
