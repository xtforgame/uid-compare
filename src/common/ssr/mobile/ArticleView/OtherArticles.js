import React from 'react';

import TopSection from 'vaxalui/saya/Kenny/TopSection';
import CenteredContainer from 'vaxalui/saya/CenteredContainer';
import Article from 'vaxalui/saya/Article';
import SayaBreadcrumbs from 'vaxalui/saya/Rick/Breadcrumbs';
import Post from 'vaxalui/saya/Post';
import MobileCardSmall from 'vaxalui/saya/MobileCardSmall';

import {
  urlPrefix,
} from 'config';

import redirect from '../redirect';

export default ({ articles }) => (
  <React.Fragment>
    <CenteredContainer
      style={{
        backgroundColor: '#c8c6c6',
        overflow: 'hidden',
        marginTop: 6,
        paddingLeft: 20,
        paddingTop: 60,
      }}
    >
      <div
        style={{
          fontFamily: 'FilsonSoft-Bold',
          fontSize: 18,
          width: '100%',
          paddingLeft: 12,
          paddingRight: 32,
        }}
      >
        Other Articles
        <div style={{ width: '100%', height: 1, marginTop: 14, marginBottom: 60, backgroundColor: '#000000' }} />
      </div>
      <div style={{ display: 'flex', width: '100%', overflow: 'scroll', marginBottom: 88 }}>
        <div style={{ display: 'flex' }}>
          {
            articles.map(artcle => (
              <MobileCardSmall
                key={artcle.id}
                title={artcle.title}
                description={artcle.description}
                image={artcle.thumbnail}
                elevation={8}
                onClick={() => {
                  redirect(`${artcle.category.routePathPrefix}${artcle.id}`);
                }}
              />
            ))
          }
        </div>
      </div>
    </CenteredContainer>
  </React.Fragment>
);
