import {
  // RestfulResponse,
  RestfulError,
} from 'az-restful-helpers';
import { externalUrl, sendRecoveryTokenInterval } from 'config';
import RouterBase from '../core/router-base';
import fakeUserManager from '../utils/fakeUserManager';

export default class RecoveryRouter extends RouterBase {
  challengeRecoveryTokens(ctx) {
    if (!ctx.request.body.username) {
      return { passed: false };
    }
    const result = fakeUserManager.getRecoveryToken(ctx.request.body.username);
    if (!result) {
      return { passed: false };
    }

    return {
      passed: result.token != null && result.token === ctx.request.body.token,
      user: result.user,
    };
  }

  setupRoutes({ router }) {
    router.post('/api/recoveryTokens', (ctx, next) => {
      // console.log('ctx.request.body :', ctx.request.body);
      if (!ctx.request.body.username) {
        return RestfulError.koaThrowWith(ctx, 400, 'Invalid username');
      }
      const result = fakeUserManager.getRecoveryToken(ctx.request.body.username);
      if (!result) {
        return RestfulError.koaThrowWith(ctx, 404, 'User not found');
      }
      const { updatedTime } = result;
      if (updatedTime) {
        const remainingTime = sendRecoveryTokenInterval - (new Date().getTime() - new Date(updatedTime).getTime());
        if (remainingTime > 0) {
          return RestfulError.koaThrowWith(ctx, 429, { error: 'Too Many Request', remainingTime });
        }
      }

      const data = fakeUserManager.updateRecoveryToken(ctx.request.body.username);
      const remainingTime = sendRecoveryTokenInterval - (new Date().getTime() - data.updatedTime);
      this.mailer.sendResetPasswordMail(ctx.request.body.username, `${externalUrl}/#/recovery/${encodeURI(ctx.request.body.username)}/${data.token}`, data.token);
      return ctx.body = { remainingTime };
    });

    router.post('/api/challengeRecoveryTokens', (ctx, next) => {
      // console.log('ctx.request.body :', ctx.request.body);
      const result = this.challengeRecoveryTokens(ctx);
      return ctx.body = { passed: result.passed };
    });

    router.post('/api/resetPasswordRequests', (ctx, next) => {
      const result = this.challengeRecoveryTokens(ctx);
      if (!result.passed || !result.user) {
        return ctx.body = { passed: result.passed };
      }
      fakeUserManager.updateUserPasswordById(result.user.id, ctx.request.body.newPassword);
      return ctx.body = { passed: result.passed };
    });
  }
}
