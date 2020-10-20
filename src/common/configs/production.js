/*
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!WARNING!!!!!!!!!!!!!!!!!!!!!!

This library may be included by front-end code,
please DO NOT put any sensitive information here.

!!!!!!!!!!!!!!!!!!!!!!WARNING!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
*/

/* eslint-disable import/prefer-default-export */
import { externalUrl } from './codegen/production';

export { jwtIssuer, externalUrl } from './codegen/production';

const runningMode = 'Production';

// const urlPrefix = '/myweb/';
// const routerPrefix = '/myweb';

const urlPrefix = '/';
const routerPrefix = '';

const publicUrlBase = externalUrl;

export {
  runningMode,
  urlPrefix,
  routerPrefix,
  publicUrlBase,
};
