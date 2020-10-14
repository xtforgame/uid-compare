/*
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!WARNING!!!!!!!!!!!!!!!!!!!!!!

This library may be included by front-end code,
please DO NOT put any sensitive information here.

!!!!!!!!!!!!!!!!!!!!!!WARNING!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
*/

/* eslint-disable import/prefer-default-export */
export { jwtIssuer } from './codegen/development';

const runningMode = 'Development';

const urlPrefix = '/';
const routerPrefix = '';

const publicUrlBase = 'http://localhost:8080';

export {
  runningMode,
  urlPrefix,
  routerPrefix,
  publicUrlBase,
};
