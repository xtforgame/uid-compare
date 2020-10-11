import React from 'react';

import TopSection from 'vaxalui/saya/Kenny/TopSection';
import CenteredContainer from 'vaxalui/saya/CenteredContainer';
import Article from 'vaxalui/saya/Article';
import SayaBreadcrumbs from 'vaxalui/saya/Rick/Breadcrumbs';
import Post from 'vaxalui/saya/Post';
import MobileCard from 'vaxalui/saya/MobileCard';

import {
  urlPrefix,
} from 'config';

import redirect from '../redirect';

export default ({ articles }) => (
  <React.Fragment>
    <CenteredContainer
      style={{
        // backgroundColor: '#c8c6c6',
        overflow: 'hidden',
        // marginTop: 6,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 40,
        marginBottom: 6,
      }}
    >
      {
        articles.map(artcle => (
          <MobileCard
            key={artcle.id}
            title={artcle.title}
            description={artcle.description}
            image={artcle.thumbnail}
            width={310}
            height={305}
            onClick={() => {
              redirect(`${artcle.category.routePathPrefix}${artcle.id}`);
            }}
          />
        ))
      }
    </CenteredContainer>
  </React.Fragment>
);
