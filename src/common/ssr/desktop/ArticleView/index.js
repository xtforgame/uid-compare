import React from 'react';

import Article from 'vaxalui/saya/Article';

import {
  urlPrefix,
} from 'config';

import ArticleList from './ArticleList';
import OtherArticles from './OtherArticles';

import redirect from '../redirect';

const Breadcrumbs = ({ breadcrumbs }) => breadcrumbs.map((bc, i) => (
  <React.Fragment key={bc.label}>
    <a href={bc.link}>{bc.label}</a>
    {i !== breadcrumbs.length - 1 && '/'}
  </React.Fragment>
));

export default ({ articles, category, match }) => {
  let article = null;
  if (match.params && match.params.articleId) {
    article = articles.find(a => a.id === match.params.articleId);
  }

  if (article) {
    const filteredArticles = articles.filter(a => a.id !== match.params.articleId);
    return (
      <React.Fragment>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            marginTop: 40,
          }}
        >
          <Breadcrumbs
            breadcrumbs={[
              ...article.category.paths,
              { label: article.title, link: '' },
            ]}
          />
        </div>
        <div style={{ marginTop: 35 }}>
          <Article
            data={article}
          />
        </div>
        <OtherArticles articles={filteredArticles} />
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          marginTop: 40,
        }}
      >
        <Breadcrumbs
          breadcrumbs={[
            ...category.paths,
          ]}
        />
      </div>
      <ArticleList articles={articles} />
    </React.Fragment>
  );
};
