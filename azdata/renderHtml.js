export default ({
  css = '',
  content = '',
  urlPrefix = '/',
  header = '',
  body = '',
  azPreloadedStateKey = '__AZ_PRELOADED_STATE__',
  azPreloadedState = {},
}) => `<!DOCTYPE html>
<html>
  <head>
    <!-- The first thing in any HTML file should be the charset -->
    <meta charset="utf-8">
    <!-- Make the page mobile compatible -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="mobile-web-app-capable" content="yes">
    <title>My Web</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    ${header}
    <!-- <link rel="stylesheet" type="text/css" href="${urlPrefix}font.css"> -->
    <style id="jss-server-side">${css}</style>
  </head>
  <body>
    <script>
      // WARNING: See the following for security issues around embedding JSON in HTML:
      // https://redux.js.org/recipes/server-rendering/#security-considerations
      window.${azPreloadedStateKey} = ${
  JSON.stringify(azPreloadedState).replace(
    /</g,
    '\\u003c'
  )
}
    </script>
    <div id="page_main">${content}</div>
    ${body}
  </body>
</html>
`;
