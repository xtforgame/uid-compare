/* eslint-disable no-param-reassign */
// import Sequelize from 'sequelize';
import {
  // RestfulResponse,
  RestfulError,
} from 'az-restful-helpers';
import RouterBase from '../core/router-base';
import fakeUserManager from '../utils/fakeUserManager';

export default class UserRouter extends RouterBase {
  // findUserSettings(userId, type) {
  //   const UserSetting = this.resourceManager.getSqlzModel('userSetting');

  //   return UserSetting.findAll({
  //     attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] },
  //     where: {
  //       user_id: userId,
  //       // type,
  //     },
  //   });
  // }

  setupRoutes({ router }) {
    router.get('/api/userSettings', fakeUserManager.getIdentity, (ctx, next) => {
      // console.log('ctx.local.user.userSettings :', ctx.local.user.userSettings);
      if (!ctx.local.userSession || !ctx.local.exposedUser) {
        RestfulError.koaThrowWith(ctx, 404, 'User not found');
      }
      return ctx.body = ctx.local.user.userSettings;
    });

    router.patch('/api/userSettings/:userSettingType', fakeUserManager.getIdentity, (ctx, next) => {
      // console.log('ctx.local.user.userSettings :', ctx.local.user.userSettings);
      if (!ctx.local.userSession || !ctx.local.exposedUser) {
        RestfulError.koaThrowWith(ctx, 404, 'User not found');
      }
      const result = ctx.local.user.userSettings
      .filter(setting => setting.type === ctx.params.userSettingType)
      .map(setting => (setting.data = ({
        ...setting.data,
        ...ctx.request.body,
      })));
      return [ctx.body] = result;
    });
  }
}
