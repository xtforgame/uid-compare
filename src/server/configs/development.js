import path from 'path';
import appRootPath from 'app-root-path';

const appRoot = appRootPath.resolve('./');
const secretsFolder = path.join(appRoot, 'dev-secrets');

const credentialFiles = {
  basePath: path.join(secretsFolder, 'ssl'),
  key: 'privatekey.pem',
  cert: 'certificate.pem',
};

const httpPort = 8080;
const httpsPort = 8443;

const sendRecoveryTokenInterval = 1 * 20 * 1000;
const externalUrl = 'https://localhost:8443';

const mailerConfig = {
  type: 'ethereal',
  serviceName: 'Az Service',
  domainName: 'az-authn.io',
  supportEmail: 'support@az-authn.io',
  senderName: '"Az Service" <no-reply@az-authn.io>',
};

export {
  credentialFiles,
  httpPort,
  httpsPort,

  sendRecoveryTokenInterval,
  externalUrl,

  mailerConfig,
};
