import AmmOrm from 'az-model-manager/core';

export default class RouterBase {
  httpApp!: any;
  mailer!: any;
  minioApi!: any;
  authKit!: any;
  resourceManager!: AmmOrm;

  constructor(_props) {
    const props = _props || {};
    Object.keys(props).map(name => this[name] = props[name]);
  }

  onAllStarted(containerInterface) {
    return Promise.resolve();
  }
}
