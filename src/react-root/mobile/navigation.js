// import {
//   urlPrefix,
//   routerPrefix,
// } from 'config';
import Home from './Home';
import ArticlePage from './Blog/Articles';

import About from './About/About';

export const navigation = [
  {
    name: '',
    path: 'mobile',
    canonicalPath: '',
    component: Home,
    exact: true,
  },
  {
    name: 'Blog',
    items: [
      {
        name: 'Some Disabled Page',
        path: 'mobile/some-page',
        canonicalPath: 'some-page',
        disabled: true,
      },
      {
        name: 'Articles',
        path: 'mobile/blogc1',
        canonicalPath: 'blogc1',
        exact: true,
        component: ArticlePage,
      },
      {
        name: 'Article',
        path: 'mobile/blogc1/:articleId',
        canonicalPath: 'blogc1/:articleId',
        dynamic: true,
        component: ArticlePage,
      },
    ],
  },
  {
    name: 'ABOUT',
    items: [
      {
        name: 'About',
        path: 'mobile/about',
        canonicalPath: 'about',
        component: About,
      },
    ],
  },
];

export default navigation;

export const forEachNodeRecur = (node, cb) => {
  cb(node);
  if (node.items) {
    node.items.forEach(node => forEachNodeRecur(node, cb));
  }
};

export const forEachNode = (cb) => {
  navigation.forEach(node => forEachNodeRecur(node, cb));
};
