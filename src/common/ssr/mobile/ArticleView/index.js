import React from 'react';

import TopSection from 'vaxalui/saya/Kenny/TopSection';
import TitleLineBox from 'vaxalui/saya/Kenny/TitleLineBox';
import MobileArticle from 'vaxalui/saya/MobileArticle';
import SayaBreadcrumbs from 'vaxalui/saya/Rick/Breadcrumbs';
import Post from 'vaxalui/saya/Post';
import Card from 'vaxalui/saya/Card';

import {
  urlPrefix,
} from 'config';

import ArticleList from './ArticleList';
import OtherArticles from './OtherArticles';

import redirect from '../redirect';


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
          <SayaBreadcrumbs
            separatorColor="#000000"
            style={{
              width: 310,
            }}
            bread={[
              ...article.category.paths.map(path => ({
                name: <span style={{ fontSize: 12, fontFamily: 'FilsonSoftRegular', color: 'black' }}>{path.label}</span>,
                link: path.link,
              })),
              { name: <span style={{ fontSize: 12, fontFamily: 'FilsonSoft-Bold', color: 'black' }}>{article.title}</span>, link: '' },
            ]}
          />
        </div>
        <div style={{ marginTop: 35, marginBottom: 60 }}>
          <MobileArticle
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
        <SayaBreadcrumbs
          separatorColor="#000000"
          bread={[
            ...category.paths.map((path, i, a) => ({
              name: <span style={{ fontSize: 12, fontFamily: i === a.length - 1 ? 'FilsonSoft-Bold' : 'FilsonSoftRegular', color: 'black' }}>{path.label}</span>,
              link: path.link,
            })),
          ]}
        />
      </div>
      <ArticleList articles={articles} />
    </React.Fragment>
  );
};
