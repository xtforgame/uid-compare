import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';

import webpackConfigDev from '../../../../webpack/server/webpack.dev';
import webpackConfigProd from '../../../../webpack/server/webpack.prod';

function addBuildTasks(serverConfig, envConfig) {
  let waitingTasks = ['clean'];
  waitingTasks = serverConfig.addPrefix(waitingTasks);

  const webpackConfig = envConfig.postfix ? webpackConfigDev : webpackConfigProd;

  const mainFunc = (callback) => {
    webpack(webpackConfig, (err, stats) => {
      if (err) throw new gutil.PluginError('webpack', err);
      gutil.log('[webpack]', stats.toString({
        // output options
      }));
      callback();
    });
  };
  mainFunc.displayName = serverConfig.addPrefix(`build:<main>${envConfig.postfix}`);

  if (waitingTasks.length > 0) {
    gulp.task(serverConfig.addPrefix(`build${envConfig.postfix}`), gulp.series(
      gulp.parallel(...waitingTasks),
      mainFunc
    ));
  } else {
    gulp.task(serverConfig.addPrefix(`build${envConfig.postfix}`), mainFunc);
  }
}

function addTasks(gulpConfig) {
  const serverConfig = gulpConfig.getSubmodule('server');
  const envConfigs = serverConfig.getEnvConfigsForDevDist();

  envConfigs.map((envConfig, i) => addBuildTasks(serverConfig, envConfig));
}

const gulpModules = { addTasks };
export default gulpModules;
