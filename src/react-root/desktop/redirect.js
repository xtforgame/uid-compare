import {
  urlPrefix,
} from 'config';
import createLink from '../utils/createLink';

export const getLinkUrl = path => `${urlPrefix}${path}`;

export const Link = createLink(getLinkUrl);

export default (path) => {
  // const {
  //   protocol,
  //   host,
  // } = window.location;
  // console.log('window :', `${protocol}//${host}${urlPrefix}${path}`);
  window.location.pathname = getLinkUrl(path);
};
