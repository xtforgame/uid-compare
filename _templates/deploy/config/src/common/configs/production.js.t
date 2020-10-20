---
to: src/common/configs/codegen/production.js
---
const externalUrl = '<%= server.externalUrl %>';
const jwtIssuer = '<%= common.jwtIssuer %>';

export {
  externalUrl,
  jwtIssuer,
};
