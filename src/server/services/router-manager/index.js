import ServiceBase from '../ServiceBase';
//= =======================================
import MainRouter from '~/routers/MainRouter';
import SessionRouter from '~/routers/SessionRouter';
import UserRouter from '~/routers/UserRouter';
import UserSettingRouter from '~/routers/UserSettingRouter';
import RecoveryRouter from '~/routers/RecoveryRouter';

export default class RouterManager extends ServiceBase {
  static $name = 'routerManager';

  static $type = 'service';

  static $inject = ['httpApp', 'mailer'];

  constructor(httpApp, mailer) {
    super();
    this.mailer = mailer;

    this.routers = [
      MainRouter,
      SessionRouter,
      UserRouter,
      UserSettingRouter,
      RecoveryRouter,
    ]
    .map(Router => new Router({
      mailer: this.mailer,
    }).setupRoutes(httpApp.appConfig));
  }

  onStart() {
  }
}
