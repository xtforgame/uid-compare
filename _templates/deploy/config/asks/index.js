const askProjectConfig = require('./askProjectConfig');
const askCommonConfig = require('./askCommonConfig');
const askServerConfig = require('./askServerConfig');
const askDockerCommon = require('./askDockerCommon');
const askDockerMinio = require('./askDockerMinio');
const askDockerPostgres = require('./askDockerPostgres');

module.exports = [
  askProjectConfig,
  askCommonConfig,
  askServerConfig,
  askDockerCommon,
  askDockerMinio,
  askDockerPostgres,
];
