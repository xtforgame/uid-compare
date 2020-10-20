---
to: src/server/configs/codegen/test.js
---
const externalUrl = 'http://localhost:8080';
const minioBucketName = '<%= server.minioBucketName %>';
const postgresDbName = '<%= server.postgresDbName %>';

export {
  externalUrl,
  minioBucketName,
  postgresDbName,
};
