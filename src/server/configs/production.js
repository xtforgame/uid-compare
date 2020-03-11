import path from 'path';
import appRootPath from 'app-root-path';

const appRoot = appRootPath.resolve('./');
const secretsFolder = path.join(appRoot, 'secrets');

const credentialFiles = {
  basePath: path.join(secretsFolder, 'ssl'),
  key: 'privatekey.pem',
  cert: 'certificate.pem',
};

const jwtSecretFiles = {
  basePath: path.join(secretsFolder, 'jwt'),
  private: 'jwtRS256.key',
  public: 'jwtRS256.key.pub',
};

const httpPort = 80;
const httpsPort = 443;

const sendRecoveryTokenInterval = 2 * 60 * 1000;
const externalUrl = 'https://localhost:8443';

const mailerConfig = {
  type: 'gmail',
  senderName: '"Az Service" <no-reply@az-authn.io>',
  serviceName: 'Az Service',
  domainName: 'az-authn.io',
  supportEmail: 'support@az-authn.io',
  credentialsFile: path.join(secretsFolder, 'gmail', 'credentials.json'),
  tokenFile: path.join(secretsFolder, 'gmail', 'token.json'),
};

const minioInfoConfig = {
  endPoint: 'minio1',
  port: 9000,
  useSSL: false,
  accessKey: 'minioxxxak',
  secretKey: 'minioxxxsk',
  retry: 10,
  retryInterval: 3000,
  ignoreInitFailure: false,
  defaultBucketName: 'az-rmd-minio',
};

export {
  credentialFiles,
  jwtSecretFiles,
  httpPort,
  httpsPort,

  sendRecoveryTokenInterval,
  externalUrl,

  mailerConfig,

  minioInfoConfig,
};
