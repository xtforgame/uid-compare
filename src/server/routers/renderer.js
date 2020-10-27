import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';
import { ServerStyleSheets } from '@material-ui/core/styles';
import Routes from 'react-root/Routes';
import { urlPrefix, routerPrefix, publicUrlBase } from 'common/config';
import preloadedStateContext, { injectionKey } from 'common/react/az-preloaded-state-context';
import renderHtml from '../../../azdata/renderHtml';


export default (ctx, path, { canonicalPath, azPreloadedState = {} } = {}) => {
  const sheets = new ServerStyleSheets();

  console.log('path :', path);
  const context = {};
  const content = renderToString(
    sheets.collect(
      <preloadedStateContext.Provider value={{ state: azPreloadedState }}>
        <StaticRouter basename={routerPrefix} location={path} context={context}>
          {renderRoutes(Routes)}
        </StaticRouter>
      </preloadedStateContext.Provider>
    ),
  );

  if (context.url) {
    console.log('context :', context);
    ctx.status = 301;
    ctx.redirect(context.url);
    return;
  }

  const css = sheets.toString();

  ctx.body = renderHtml({
    urlPrefix,
    css,
    content,
    header: canonicalPath != null ? `<link rel="canonical" href="${publicUrlBase}${canonicalPath}" />` : '',
    body: `<script src="${urlPrefix}assets/js/app.js"></script>`,
    azPreloadedStateKey: injectionKey,
    azPreloadedState,
  });
};
