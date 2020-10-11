import gulp from 'gulp';
import del from 'del';

function addCleanTasks(serverConfig, envConfig) {
  const outputDistEnv = serverConfig.getOutputDistEnv();
  const outputDir = envConfig.env.joinPathByKeys([]);

  gulp.task(serverConfig.addPrefix(`clean${envConfig.postfix}`), (cb) => del([outputDir]));
}

function addTasks(gulpConfig) {
  const serverConfig = gulpConfig.getSubmodule('server');
  const envConfigs = serverConfig.getEnvConfigsForDevDist();

  envConfigs.map((envConfig, i) => addCleanTasks(serverConfig, envConfig));
}

const gulpModules = { addTasks };
export default gulpModules;
