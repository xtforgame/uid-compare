import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';
import { ServerStyleSheets } from '@material-ui/core/styles';
import Routes from 'react-root/Routes';
import { urlPrefix, routerPrefix, publicUrlBase } from 'common/config';
import preloadedStateContext, { injectionKey } from 'common/react/az-preloaded-state-context';
import renderHtml from '../../../azdata/renderHtml';


export default (path, { canonicalUrl } = {}) => {
  const sheets = new ServerStyleSheets();

  console.log('path :', path);

  const azPreloadedState = { xxx: 1 };
  const content = renderToString(
    sheets.collect(
      <preloadedStateContext.Provider value={{ state: azPreloadedState }}>
        <StaticRouter basename={routerPrefix} location={path}>
          {renderRoutes(Routes)}
        </StaticRouter>
      </preloadedStateContext.Provider>
    ),
  );
  const css = sheets.toString();

  return renderHtml({
    urlPrefix,
    css,
    content,
    header: canonicalUrl != null ? `<link rel="canonical" href="${publicUrlBase}/${canonicalUrl}" />` : '',
    body: `<script src="${urlPrefix}assets/js/app.js"></script>`,
    azPreloadedStateKey: injectionKey,
    azPreloadedState,
  });
};
