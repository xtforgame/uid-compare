import gulp from 'gulp';

function addWatchTasks(serverConfig, envConfig) {
  const jsSourceFiles = serverConfig.joinPathByKeys(['entry', 'js', 'glob']);
  const mainFunc = (cb) => {
    // let `serve`(nodemon) handle this
    cb();
  };
  (mainFunc).displayName = serverConfig.addPrefix(`watch:<main>${envConfig.postfix}`);

  gulp.task(serverConfig.addPrefix(`watch${envConfig.postfix}`), gulp.series(
    gulp.parallel(...serverConfig.addPrefix([`serve${envConfig.postfix}`])),
    mainFunc
  ));
}

function addTasks(gulpConfig) {
  const serverConfig = gulpConfig.getSubmodule('server');
  const envConfigs = serverConfig.getEnvConfigsForDevDist();

  envConfigs.map(envConfig => addWatchTasks(serverConfig, envConfig));
}

const gulpModules = { addTasks };
export default gulpModules;
