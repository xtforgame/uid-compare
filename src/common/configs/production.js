/*
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!WARNING!!!!!!!!!!!!!!!!!!!!!!

This library may be included by front-end code,
please DO NOT put any sensitive information here.

!!!!!!!!!!!!!!!!!!!!!!WARNING!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
*/

/* eslint-disable import/prefer-default-export */
export { jwtIssuer } from './codegen/production';

const runningMode = 'Production';

// const urlPrefix = '/myweb/';
// const routerPrefix = '/myweb';

const urlPrefix = '/';
const routerPrefix = '';

const publicUrlBase = 'http://localhost:8080';

export {
  runningMode,
  urlPrefix,
  routerPrefix,
  publicUrlBase,
};
