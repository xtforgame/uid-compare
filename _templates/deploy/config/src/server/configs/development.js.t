---
to: src/server/configs/codegen/development.js
---
const externalUrl = 'http://localhost:8080';
const minioBucketName = '<%= server.minioBucketName %>';
const postgresDbName = '<%= server.postgresDbName %>';

export {
  externalUrl,
  minioBucketName,
  postgresDbName,
};
