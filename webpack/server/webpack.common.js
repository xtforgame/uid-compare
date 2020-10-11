import path from 'path';
import webpack from 'webpack';
import appRootPath from 'app-root-path';
import nodeExternals from 'webpack-node-externals';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import gulpConfig from '../../azdata/gulp-config';

const appRoot = appRootPath.resolve('./');

const baseFolderName = '.';
const projRoot = path.resolve(__dirname, '../..');

const commonConfig = gulpConfig.getSubmodule('commonLibrary');
const commonConfigJsEntryFolder = commonConfig.joinPathByKeys(['entry', 'js']);

const serverConfig = gulpConfig.getSubmodule('server');
const serverJsEntryFolder = serverConfig.joinPathByKeys(['entry', 'js']);
let serverJsEntryFilename = serverConfig.joinPathByKeys(['entry', 'js', 'filename']);
const serverJsPublicFolder = serverConfig.joinPathByKeys(['entry', 'static']);
const serverJsOutputFolder = serverConfig.joinPathByKeys(['output', 'default']);
serverJsEntryFilename = `${serverJsEntryFolder}/index.ts`;

export default function ({ mode }) {
  return {
    mode,
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    externals: [
      nodeExternals(),
      {
        'webpack-dev-config': 'commonjs2 ../../webpack/front-end/webpack.dev.wrapper',
      },
    ],
    devtool: 'inline-source-map',
    entry: {
      index: [
        '@babel/polyfill',
        path.resolve(projRoot, serverJsEntryFilename),
      ],
    },
    output: {
      // path: path.resolve(projRoot, serverJsPublicFolder),
      path: path.resolve(projRoot, serverJsOutputFolder),
      pathinfo: mode === 'development',
      filename: `${baseFolderName}/[name].js`,
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
            path.resolve(projRoot, serverJsEntryFolder),
            path.resolve(projRoot, commonConfigJsEntryFolder),
          ],
          use: [{
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [
                ['@babel/preset-env', {
                  targets: {
                    node: '10',
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
      // new CopyWebpackPlugin([
      //   {
      //     from: path.resolve(projRoot, serverJsPublicFolder),
      //     to: path.resolve(projRoot, serverJsOutputFolder),
      //   },
      // ]),
      // new HtmlWebpackPlugin({
      //   chunks: ['app'],
      //   template: path.resolve(projRoot, serverJsEntryFolder, 'index.html'),
      //   filename: 'index.html',
      // }),
    ],
  };
}
