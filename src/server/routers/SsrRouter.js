import { urlPrefix, routerPrefix } from 'common/config';
import { forEachNode } from 'react-root/desktop/navigation';
import { forEachNode as forEachMobileNode } from 'react-root/mobile/navigation';
import renderer from './renderer';
import RouterBase from '../core/router-base';

export default class SsrRouter extends RouterBase {
  setupRoutes({ router }) {
    if (process.env.reactSsrMode) {
      router.get('/', (ctx, next) => {
        if (ctx.local.md.phone()) {
          ctx.status = 301;
          ctx.redirect(`${urlPrefix}mobile`);
        } else {
          ctx.body = renderer(ctx.path, {});
          // next();
        }
      });

      forEachNode((node) => {
        const { path, canonicalPath } = node;
        if (path != null) {
          router.get(`/${path}`, (ctx, next) => {
            const p = ctx.path.toLowerCase();
            if (p !== ctx.path) {
              ctx.status = 301;
              ctx.redirect(p);
              return;
            }
            ctx.body = renderer(ctx.path, {
              canonicalUrl: canonicalPath,
            });
            // next();
          });
        }
      });

      forEachMobileNode((node) => {
        const { path, canonicalPath } = node;
        if (path != null) {
          router.get(`/${path}`, (ctx, next) => {
            const p = ctx.path.toLowerCase();
            if (p !== ctx.path) {
              ctx.status = 301;
              ctx.redirect(p);
              return;
            }
            ctx.body = renderer(ctx.path, {
              canonicalUrl: canonicalPath, // ctx.path.replace(/\/mobile/g, ''),
            });
            // next();
          });
        }
      });

      router.get('/articles/:articleId', (ctx, next) => {
        ctx.body = renderer(`/articles/${ctx.params.articleId}`, {});
      });
    }
  }
}
