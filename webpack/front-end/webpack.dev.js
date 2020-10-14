import webpack from 'webpack';
import CompressionPlugin from 'compression-webpack-plugin';
import webpackCommon from './webpack.common';
import gulpConfig from '../../azdata/gulp-config';

const reactRootConfig = gulpConfig.getSubmodule('reactRoot');

const cfg = webpackCommon({
  mode: 'development',
  ssrMode: reactRootConfig.get('devUseSsr'),
});

cfg.devtool = 'inline-source-map';
cfg.entry.app.splice(0, 0, 'webpack-hot-client/client?reload=true');
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

export default cfg;
