import EnvCfg from '~/services/env-cfg';
import HttpApp from '~/services/http-app';
import RouterManager from '~/services/router-manager';
import Mailer from '~/services/mailer';
import MinioApi from '~/services/minio';

export default [
  EnvCfg,
  HttpApp,
  RouterManager,
  Mailer,
  MinioApi,
];
