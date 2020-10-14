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
    path: '',
    component: Home,
    exact: true,
  },
  {
    name: 'Blog',
    items: [
      {
        name: 'Some Disabled Page',
        path: 'some-page',
        disabled: true,
      },
      {
        name: 'Articles',
        path: 'blogc1',
        exact: true,
        component: ArticlePage,
      },
      {
        name: 'Article',
        path: 'blogc1/:articleId',
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
        path: 'about',
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
