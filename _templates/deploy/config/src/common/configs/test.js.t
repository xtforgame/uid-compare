---
to: src/common/configs/codegen/test.js
---
const externalUrl = 'http://localhost:8080';
const jwtIssuer = '<%= common.jwtIssuer %>';

export {
  externalUrl,
  jwtIssuer,
};
