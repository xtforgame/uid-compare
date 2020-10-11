import gulp from 'gulp';
import path from 'path';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import gutil from 'gulp-util';
import webpack from 'webpack';

import webpackConfigDev from '../../../../webpack/server/webpack.dev';
import webpackConfig from '../../../../webpack/server/webpack';

function addBuildTasks(serverConfig, commonLibraryConfig, envConfig, serverOptions = {}, commonLibraryOptions = {}) {
  let waitingTasks = [/* 'clean' */];
  waitingTasks = serverConfig.addPrefix(waitingTasks);

  const mainFunc = function (callback) {
    webpack(webpackConfigDev, (err, stats) => {
      if (err) throw new gutil.PluginError('webpack', err);
      gutil.log('[webpack]', stats.toString({
        // output options
      }));
      callback();
    });

    // console.log('cb :', cb);
    // const jsSourceFiles = serverConfig.joinPathByKeys(['entry', 'js', 'glob']);
    // const jsOutputDir = envConfig.env.joinPathByKeys(['js']);

    // return gulp.src(jsSourceFiles)
    //   // .pipe(plumber())
    //   .pipe(sourcemaps.init())
    //   .pipe(babel({
    //     // modules: 'amd',
    //     moduleIds: false,
    //     comments: false,
    //     compact: false,
    //     ...(serverOptions).babel,
    //   }))
    //   .pipe(sourcemaps.write('.'))
    //   .pipe(gulp.dest(jsOutputDir));
  };
  (mainFunc).displayName = serverConfig.addPrefix(`build:<main>${envConfig.postfix}`);

  if (waitingTasks.length > 0) {
    gulp.task(serverConfig.addPrefix(`build${envConfig.postfix}`), gulp.series(
      gulp.parallel(...waitingTasks),
      mainFunc
    ));
  } else {
    gulp.task(serverConfig.addPrefix(`build${envConfig.postfix}`), mainFunc);
  }

  // prepare everything except js from server side for dev mode
  gulp.task(serverConfig.addPrefix(`build:extras${envConfig.postfix}`), /* ['server:clean'], */ () => {
    const serverSourceDir = serverConfig.joinPathByKeys(['entry']);
    const jsSourceFiles = serverConfig.joinPathByKeys(['entry', 'js', 'glob']);
    const outputDir = envConfig.env.joinPathByKeys([]);
    return gulp.src([
      `${serverSourceDir}/**/*.*`,
      `!${jsSourceFiles}`,
    ], {
      dot: true,
    }).pipe(gulp.dest(outputDir));
  });
}

function addTasks(gulpConfig) {
  const serverConfig = gulpConfig.getSubmodule('server');
  const commonLibraryConfig = gulpConfig.getSubmodule('commonLibrary');
  const envConfigs = serverConfig.getEnvConfigsForDevDist();
  const serverOptionsList = serverConfig.getOptionsForDevDist() || [];
  const commonLibraryOptionsList = commonLibraryConfig.getOptionsForDevDist() || [];

  envConfigs.map((envConfig, i) => addBuildTasks(serverConfig, commonLibraryConfig, envConfig, serverOptionsList[i] || {}, commonLibraryOptionsList[i] || {}));
}

const gulpModules = { addTasks };
export default gulpModules;
