import webpack from 'webpack';
import CompressionPlugin from 'compression-webpack-plugin';
import webpackCommon from './webpack.common';

const cfg = webpackCommon({
  mode: 'development',
});

cfg.devtool = 'inline-source-map';
// cfg.plugins.splice(1, 0,
//   new BundleAnalyzerPlugin({
//     analyzerMode: 'server',
//     analyzerHost: 'localhost',
//     analyzerPort: 8889,
//     reportFilename: 'report.html',
//     defaultSizes: 'parsed',
//     openAnalyzer: false,
//     generateStatsFile: false,
//     statsFilename: 'stats.json',
//     statsOptions: null,
//     logLevel: 'info',
//   })
// );

module.exports = cfg;
