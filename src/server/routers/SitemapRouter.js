import { SitemapStream, streamToPromise } from 'sitemap';
import { createGzip } from 'zlib';
import { publicUrlBase } from 'common/config';
import { forEachNode } from 'react-root/desktop/navigation';
import { forEachNode as forEachMobileNode } from 'react-root/mobile/navigation';
import RouterBase from '../core/router-base';

let sitemap;

export default class SitemapRouter extends RouterBase {
  setupRoutes({ router }) {
    router.get('/sitemap.xml', async (ctx, next) => {
      ctx.set('Content-Type', 'application/xml');
      ctx.set('Content-Encoding', 'gzip');
      if (sitemap) {
        ctx.body = sitemap;
        return;
      }

      try {
        const smStream = new SitemapStream({ hostname: publicUrlBase });
        const pipeline = smStream.pipe(createGzip());

        // pipe your entries or directly write them.
        forEachNode((node) => {
          const {
            path, dynamic, disabled, changefreq = 'weekly', priority = 0.5,
          } = node;
          if (path != null && !dynamic && !disabled) {
            smStream.write({ url: path, changefreq, priority /* , img: 'http://urlTest.com' */ });
            // console.log('path :', path);
          }
        });

        forEachMobileNode((node) => {
          const {
            path, dynamic, disabled, changefreq = 'weekly', priority = 0.5,
          } = node;
          if (path != null && !dynamic && !disabled) {
            smStream.write({ url: path, changefreq, priority /* , img: 'http://urlTest.com' */ });
            // console.log('path :', path);
          }
        });

        /* or use
        Readable.from([{url: '/page-1'}...]).pipe(smStream)
        if you are looking to avoid writing your own loop.
        */

        // make sure to attach a write stream such as streamToPromise before ending
        smStream.end();

        // cache the response
        sitemap = await streamToPromise(pipeline);

        ctx.body = sitemap;
        // stream write the response
      } catch (e) {
        console.error(e);
        ctx.status = 500;
      }
    });
  }
}
