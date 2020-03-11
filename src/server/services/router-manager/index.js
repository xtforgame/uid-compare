import { promiseReduce } from 'common/utils';
import ServiceBase from '../ServiceBase';
// ========================================
import Routers from '~/routers';


export default class RouterManager extends ServiceBase {
  static $name = 'routerManager';

  static $type = 'service';

  static $inject = ['httpApp', 'mailer', 'minioApi'];

  constructor(httpApp, mailer, minioApi) {
    super();
    this.mailer = mailer;
    this.minioApi = minioApi;

    this.routers = Routers
    .map(Router => new Router({
      httpApp,
      mailer: this.mailer,
      minioApi: this.minioApi,
    }));
    this.routers.map(router => router.setupRoutes(httpApp.appConfig));
  }

  onStart() {
  }

  onAllStarted(containerInterface) {
    return promiseReduce(this.routers, (_, router) => router.onAllStarted(containerInterface));
  }

  onDestroy() {
  }
}
