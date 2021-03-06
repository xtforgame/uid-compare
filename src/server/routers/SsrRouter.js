import pathLib from 'path';
import { urlPrefix, routerPrefix } from 'common/config';
import { forEachNode } from 'react-root/desktop/navigation';
import { forEachNode as forEachMobileNode } from 'react-root/mobile/navigation';
import renderer from './renderer';
import RouterBase from '../core/router-base';

export default class SsrRouter extends RouterBase {
  setupRoutes({ router }) {
    if (process.env.reactSsrMode) {
      forEachNode((node) => {
        const { path, canonicalPath } = node;
        if (path != null) {
          router.get(path, this.authKit.koaHelperEx.getIdentity, (ctx, next) => {
            const p = ctx.path.toLowerCase();
            if (p !== ctx.path) {
              ctx.status = 301;
              ctx.redirect(p);
              return;
            }
            if (ctx.local.md.phone()) {
              ctx.status = 301;
              console.log('urlPrefix :', urlPrefix);
              ctx.redirect(pathLib.join(`${urlPrefix}mobile`, p.replace(urlPrefix, '')));
              return;
            }
            renderer(ctx, ctx.path, {
              canonicalPath,
              azPreloadedState: {
                session: ctx.local.userSession,
                sessionExists: ctx.local.userSession,
              },
            });
            // next();
          });
        }
      });

      forEachMobileNode((node) => {
        const { path, canonicalPath } = node;
        if (path != null) {
          router.get(path, this.authKit.koaHelperEx.getIdentity, (ctx, next) => {
            const p = ctx.path.toLowerCase();
            if (p !== ctx.path) {
              ctx.status = 301;
              ctx.redirect(p);
              return;
            }
            renderer(ctx, ctx.path, {
              canonicalPath, // ctx.path.replace(/\/mobile/g, ''),
              azPreloadedState: {
                session: ctx.local.userSession,
                sessionExists: ctx.local.userSession,
              },
            });
            // next();
          });
        }
      });

      router.get('/articles/:articleId', (ctx, next) => {
        renderer(ctx, `/articles/${ctx.params.articleId}`, {});
      });
    }
  }
}
