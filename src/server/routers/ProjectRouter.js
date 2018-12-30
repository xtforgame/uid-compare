import {
  // RestfulResponse,
  RestfulError,
} from 'az-restful-helpers';
import RouterBase from '../core/router-base';
import fakeUserManager from '../utils/fakeUserManager';

export default class ProjectRouter extends RouterBase {
  setupRoutes({ router }) {
    router.get('/api/projects', fakeUserManager.getIdentity, (ctx, next) => {
      // console.log('ctx.local.user.projects :', ctx.local.user.projects);
      if (!ctx.local.userSession || !ctx.local.exposedUser) {
        RestfulError.koaThrowWith(ctx, 404, 'User not found');
      }
      return ctx.body = ctx.local.user.projects;
    });
  }
}
