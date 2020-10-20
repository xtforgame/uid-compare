---
to: azdata/renderHtml.js
---
export default ({
  css = '',
  content = '',
  urlPrefix = '/',
  header = '',
  body = '',
}) => `<!DOCTYPE html>
<html>
  <head>
    <!-- The first thing in any HTML file should be the charset -->
    <meta charset="utf-8">
    <!-- Make the page mobile compatible -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="mobile-web-app-capable" content="yes">
    <title><%= h.capitalize(project.name) %></title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    ${header}
    <!-- <link rel="stylesheet" type="text/css" href="${urlPrefix}font.css"> -->
    <style id="jss-server-side">${css}</style>
  </head>
  <body>
    <div id="page_main">${content}</div>
    ${body}
  </body>
</html>
`;
