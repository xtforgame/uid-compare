import {
  // RestfulResponse,
  RestfulError,
} from 'az-restful-helpers';
import RouterBase from '../core/router-base';
import fakeUserManager from '../utils/fakeUserManager';

export default class MemoRouter extends RouterBase {
  findUser(userId, withMemo = false) {
    const User = this.resourceManager.getSqlzModel('user');
    const Memo = this.resourceManager.getSqlzModel('memo');

    const extraOptions = withMemo && {
      include: [{
        model: Memo,
        as: 'memos',
      }],
    };

    return User.findOne({
      where: {
        id: userId,
      },
      ...extraOptions,
    });
  }

  setupRoutes({ router }) {
    router.get('/api/memos', fakeUserManager.getIdentity, (ctx, next) => {
      // console.log('ctx.local.user.userSettings :', ctx.local.user.userSettings);
      if (!ctx.local.userSession || !ctx.local.exposedUser) {
        RestfulError.koaThrowWith(ctx, 404, 'User not found');
      }

      return ctx.body = ctx.local.user.memos;
    });

    router.post('/api/memos', fakeUserManager.getIdentity, (ctx, next) => {
      // console.log('ctx.local.user.userSettings :', ctx.local.user.userSettings);
      if (!ctx.local.userSession || !ctx.local.exposedUser) {
        RestfulError.koaThrowWith(ctx, 404, 'User not found');
      }

      const memo = {
        id: ctx.local.user.memos.length + 1,
        data: ctx.request.body,
      };

      ctx.local.user.memos.push(memo);
      return ctx.body = memo;
    });
  }
}
