---
to: src/server/configs/codegen/test.js
---
const externalUrl = '<%= server.externalUrl %>';
const minioBucketName = '<%= server.minioBucketName %>';
const postgresDbName = '<%= server.postgresDbName %>';

export {
  externalUrl,
  minioBucketName,
  postgresDbName,
};
