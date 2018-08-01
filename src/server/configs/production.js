import path from 'path';

const credentialFiles = {
  basePath: path.join(__dirname, '..', 'ssl/production/xxxxxx'),
  key: 'privatekey.pem',
  cert: 'certificate.pem',
};

const httpPort = 80;
const httpsPort = 443;

const sendRecoveryTokenInterval = 2 * 60 * 1000;
const externalUrl = 'https://localhost:8443';

export {
  credentialFiles,
  httpPort,
  httpsPort,

  sendRecoveryTokenInterval,
  externalUrl,
};
