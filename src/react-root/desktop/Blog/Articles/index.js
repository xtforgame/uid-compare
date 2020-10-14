import React from 'react';

import Frame from './Frame';

import { tsArticles, categories } from '../../../articles';

import ArticleView from '../../ArticleView';


export default ({ match }) => (
  <Frame>
    <ArticleView
      articles={tsArticles}
      match={match}
      category={categories['blog/category1']}
    />
  </Frame>
);
