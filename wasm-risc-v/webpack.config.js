const path = require('path');

module.exports = {
  context: __dirname,
  mode: 'none',
  target: 'webworker',
  entry: {
    extension: './extension.js',
  },
  resolve: {
    mainFields: ['module', 'main'],
    extensions: ['.js'],
  },
  externals: {
    'vscode': 'commonjs vscode',
  },
  performance: {
    hints: false
  },
  output: {
    filename: 'extension.js',
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'commonjs'
  },
  devtool: 'source-map'
};
