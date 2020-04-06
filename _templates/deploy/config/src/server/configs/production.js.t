---
to: src/server/configs/codegen/production.js
---
const externalUrl = '<%= server.externalUrl %>';
const minioBucketName = '<%= server.minioBucketName %>';
const postgresDbName = '<%= server.postgresDbName %>';

export {
  externalUrl,
  minioBucketName,
  postgresDbName,
};
