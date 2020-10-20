---
to: src/common/configs/codegen/development.js
---
const externalUrl = 'http://localhost:8080';
const jwtIssuer = '<%= common.jwtIssuer %>';

export {
  externalUrl,
  jwtIssuer,
};
