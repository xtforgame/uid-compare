import MobileDetect from 'mobile-detect';
import RouterBase from '../core/router-base';
import { urlPrefix, routerPrefix } from 'common/config';
import { forEachNode } from 'common/ssr/desktop/navigation';
import { forEachNode as forEachMobileNode } from 'common/ssr/mobile/navigation';
import renderer from './renderer';

export default class SsrRouter extends RouterBase {
  setupRoutes({ router }) {
    router.get('/', (ctx, next) => {
      const md = new MobileDetect(ctx.request.headers['user-agent']);
      if (md.phone()) {
        ctx.redirect(`${urlPrefix}mobile`);
      } else {
        ctx.body = renderer(ctx.path);
        // next();
      }
    });

    forEachNode((node) => {
      const { path } = node;
      if (path != null) {
        router.get(`/${path}`, (ctx, next) => {
          ctx.body = renderer(ctx.path);
        });
      }
    });

    forEachMobileNode((node) => {
      const { path } = node;
      if (path != null) {
        router.get(`/${path}`, (ctx, next) => {
          ctx.body = renderer(ctx.path);
        });
      }
    });

    // router.get('/mobile', (ctx, next) => {
    //   ctx.body = renderer(ctx.path);
    //   // next();
    // });

    router.get('/articles/:articleId', (ctx, next) => {
      ctx.body = renderer(`/articles/${ctx.params.articleId}`);
    });
  }
}
