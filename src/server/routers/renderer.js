import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles';
import Routes from 'common/ssr/Routes';
import { urlPrefix, routerPrefix } from 'common/config';



export default (path) => {
  const sheets = new ServerStyleSheets();

  console.log('routerPrefix :', routerPrefix);
  console.log('path :', path);
  const content = renderToString(
    sheets.collect(
      <StaticRouter basename={routerPrefix} location={path}>
        {renderRoutes(Routes)}
      </StaticRouter>
    ),
  );
  const css = sheets.toString();

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <!-- The first thing in any HTML file should be the charset -->
        <meta charset="utf-8">
        <!-- Make the page mobile compatible -->
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="mobile-web-app-capable" content="yes">
        <title>My Site</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <!-- <link rel="stylesheet" type="text/css" href="${urlPrefix}font.css"> -->
        <style id="jss-server-side">${css}</style>
      </head>
      <body>
        <div id="page_main">${content}</div>
        <script src="${urlPrefix}assets/js/app.js"></script>
      </body>
    </html>
  `;
};
