import {
  // RestfulResponse,
  RestfulError,
} from 'az-restful-helpers';
import RouterBase from '../core/router-base';
import fakeUserManager from '../utils/fakeUserManager';

export default class OrganizationRouter extends RouterBase {
  setupRoutes({ router }) {
    router.get('/api/organizations', fakeUserManager.getIdentity, (ctx, next) => {
      // console.log('ctx.local.user.organizations :', ctx.local.user.organizations);
      if (!ctx.local.userSession || !ctx.local.exposedUser) {
        RestfulError.koaThrowWith(ctx, 404, 'User not found');
      }
      return ctx.body = ctx.local.user.organizations;
    });
  }
}
