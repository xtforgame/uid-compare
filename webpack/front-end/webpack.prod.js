import webpack from 'webpack';
import CompressionPlugin from 'compression-webpack-plugin';
import webpackCommon from './webpack.common';

const cfg = webpackCommon({
  mode: 'production',
});

cfg.devtool = 'cheap-source-map';
cfg.output.publicPath = './';
cfg.plugins.splice(
  1, 0,
  new webpack.optimize.AggressiveMergingPlugin(),
  new CompressionPlugin({
    test: /\.js/,
  })
);

// // for debug
// cfg.optimization = {
//   minimize: false,
// };

export default cfg;
