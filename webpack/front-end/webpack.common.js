import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import gulpConfig from '../../azdata/gulp-config';

const baseFolderName = 'assets';
const projRoot = path.resolve(__dirname, '../..');

const commonConfig = gulpConfig.getSubmodule('commonLibrary');
const commonConfigJsEntryFolder = commonConfig.joinPathByKeys(['entry', 'js']);

const frontEndConfig = gulpConfig.getSubmodule('frontEnd');
const frontEndJsEntryFolder = frontEndConfig.joinPathByKeys(['entry', 'js']);
const frontEndJsEntryFilename = frontEndConfig.joinPathByKeys(['entry', 'js', 'filename']);
const frontEndJsPublicFolder = frontEndConfig.joinPathByKeys(['entry', 'static']);
const frontEndJsOutputFolder = frontEndConfig.joinPathByKeys(['output', 'default']);

export default function ({ mode }) {
  return {
    mode,
    devtool: 'inline-source-map',
    entry: {
      app: [
        '@babel/polyfill',
        path.resolve(projRoot, frontEndJsEntryFilename),
      ],
    },
    output: {
      // path: path.resolve(projRoot, frontEndJsPublicFolder),
      path: path.resolve(projRoot, frontEndJsOutputFolder),
      pathinfo: mode === 'development',
      filename: `${baseFolderName}/js/[name].js`,
      publicPath: '/',
    },
    resolve: {
      // extensions: ['', '.jsx', '.js', '.scss', '.css', '.json', '.md'],
      alias: {
        '@material-ui/styles': path.resolve(projRoot, 'node_modules', '@material-ui/styles'),
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          include: [
            path.resolve(projRoot, frontEndJsEntryFolder),
            path.resolve(projRoot, commonConfigJsEntryFolder),
          ],
          use: [{
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [
                ['@babel/preset-env', {
                  targets: {
                    browsers: ['defaults', 'not dead'],
                  },
                }],
                '@babel/typescript',
                '@babel/preset-react',
              ],
              plugins: [
                ['@babel/proposal-decorators', { decoratorsBeforeExport: true }],
                '@babel/proposal-class-properties',
                '@babel/proposal-object-rest-spread',
              ],
            },
          }],
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.(jpg|png|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: `${baseFolderName}/images/[name].[ext]`,
            },
          }],
        },
        {
          test: /\.(woff|woff2|eot|ttf|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [{
            loader: 'file-loader',
            options: {
              // name: baseFolderName + '/fonts/[name].[ext]',
              name: `${baseFolderName}/fonts/[hash].[ext]`,
            },
          }],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify(mode) } }),
      new CopyWebpackPlugin([
        {
          from: path.resolve(projRoot, frontEndJsPublicFolder),
          to: path.resolve(projRoot, frontEndJsOutputFolder),
        },
      ]),
      new HtmlWebpackPlugin({
        chunks: ['app'],
        template: path.resolve(projRoot, frontEndJsEntryFolder, 'index.html'),
        filename: 'index.html',
      }),
    ],
  };
};
