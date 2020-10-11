import {
  urlPrefix,
} from 'config';

export default (path) => {
  const {
    protocol,
    host,
  } = window.location;
  // console.log('window :', `${protocol}//${host}${urlPrefix}${path}`);
  // console.log('Layout');
  if (!path) {
    window.location.pathname = `${urlPrefix}mobile`;
  } else {
    window.location.pathname = `${urlPrefix}mobile/${path}`;
  }
};
