import {
  urlPrefix,
} from 'config';

export const getLinkUrl = path => `${urlPrefix}${path}`;

export default (path) => {
  // const {
  //   protocol,
  //   host,
  // } = window.location;
  // console.log('window :', `${protocol}//${host}${urlPrefix}${path}`);
  window.location.pathname = getLinkUrl(path);
};
