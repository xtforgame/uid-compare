/*
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!WARNING!!!!!!!!!!!!!!!!!!!!!!

This library may be included by front-end code,
please DO NOT put any sensitive information here.

!!!!!!!!!!!!!!!!!!!!!!WARNING!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
*/

/* eslint-disable import/prefer-default-export */
import { externalUrl } from './codegen/development';

export { jwtIssuer, externalUrl } from './codegen/development';

const runningMode = 'Development';

const urlPrefix = '/';
const routerPrefix = '';

const publicUrlBase = externalUrl;

export {
  runningMode,
  urlPrefix,
  routerPrefix,
  publicUrlBase,
};
