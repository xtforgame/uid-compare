import path from 'path';

let credentialFiles = {
  basePath: path.join(__dirname, '..', 'ssl/production/xxxxxx'),
  key: 'privatekey.pem',
  cert: 'certificate.pem',
};

let httpPort = 80;
let httpsPort = 443;

let sendRecoveryTokenInterval = 2 * 60 * 1000;
let externalUrl = 'https://localhost:8443';

export {
  credentialFiles,
  httpPort,
  httpsPort,

  sendRecoveryTokenInterval,
  externalUrl,
};
