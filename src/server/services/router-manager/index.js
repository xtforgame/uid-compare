import ServiceBase from '../ServiceBase';
// ========================================
import MainRouter from '~/routers/MainRouter';
import SessionRouter from '~/routers/SessionRouter';
import UserRouter from '~/routers/UserRouter';
import UserSettingRouter from '~/routers/UserSettingRouter';
import RecoveryRouter from '~/routers/RecoveryRouter';
import OrganizationRouter from '~/routers/OrganizationRouter';
import ProjectRouter from '~/routers/ProjectRouter';
import MemoRouter from '~/routers/MemoRouter';
import ModuleComplierRouter from '~/routers/ModuleComplierRouter';

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
      OrganizationRouter,
      ProjectRouter,
      MemoRouter,
      ModuleComplierRouter,
    ]
    .map(Router => new Router({
      mailer: this.mailer,
      zcfService: this.zcfService,
    }).setupRoutes(httpApp.appConfig));
  }

  onStart() {
  }

  onDestroy() {
  }
}
