import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import yargs from 'yargs';

function addServeTasks(serverConfig, commonLibraryConfig = null, reactRootConfig = null, envConfig, serverOptions = {}) {
  const serverSourceDir = serverConfig.joinPathByKeys(['entry']);
  const delay = serverConfig.get('reloadDelay') || 1000;
  const watchArray = [serverSourceDir];
  const useCommonLibrary = serverConfig.get('useCommonLibrary');
  if (commonLibraryConfig && useCommonLibrary) {
    const commonLibrarySourceDir = commonLibraryConfig.joinPathByKeys(['entry']);
    watchArray.push(commonLibrarySourceDir);
  }

  if (reactRootConfig && reactRootConfig.get('devUseSsr')) {
    const reactRootSourceDir = reactRootConfig.joinPathByKeys(['entry']);
    watchArray.push(reactRootSourceDir);
  }

  const outputEntryFile = envConfig.env.joinPathByKeys(['js', 'filename']);
  const reloadTasks = serverConfig.addPrefix([`build${envConfig.postfix}`]);

  const mainFunc = (cb) => {
    const nodemonConfig = {
      script: outputEntryFile,
      watch: watchArray,
      ignore: [
        `${serverSourceDir}/app-doc/`,
        'gulpfile.babel.js',
        'node_modules/',
        'doc/',
      ],
      tasks: reloadTasks,
      delay,
      ...(serverOptions).nodemon,
    };
    if (yargs.argv.inspect) {
      nodemonConfig.exec = 'node --inspect';
    }
    let called = false;
    return nodemon(nodemonConfig)
    .on('start', () => {
      if (!called) {
        called = true;
        cb();
      }
    })
    .on('restart', () => {
      setTimeout(() => {
        // do some callback
      }, 1000);
    });
  };
  mainFunc.displayName = serverConfig.addPrefix(`serve:<main>${envConfig.postfix}`);

  gulp.task(serverConfig.addPrefix(`serve${envConfig.postfix}`), gulp.series(
    serverConfig.addPrefix(`clean${envConfig.postfix}`),
    gulp.parallel(...reloadTasks),
    mainFunc
  ));
}

function addTasks(gulpConfig) {
  const serverConfig = gulpConfig.getSubmodule('server');
  const commonLibraryConfig = gulpConfig.getSubmodule('commonLibrary');
  const reactRootConfig = gulpConfig.getSubmodule('reactRoot');
  const envConfigs = serverConfig.getEnvConfigsForDevDist();
  const serverOptionsList = serverConfig.getOptionsForDevDist() || [];

  envConfigs.map((envConfig, i) => addServeTasks(serverConfig, commonLibraryConfig, reactRootConfig, envConfig, serverOptionsList[i] || {}));
}

const gulpModules = { addTasks };
export default gulpModules;
