import React from 'react';
import TechnologyProjects from 'vaxalui/saya/Rick/TechnologyProjects';

import Frame from './Frame';

import { tsArticles, categories } from '../../../articles';

import ArticleView from '../../ArticleView';

import redirect from '../../redirect';

export default ({ match }) => (
  <Frame>
    <ArticleView
      articles={tsArticles}
      match={match}
      category={categories['technologies/knowledge-base']}
    />

    <div style={{ marginTop: 6 }}>
      <TechnologyProjects
        title="Explore More"
        backgroundColor="#e3e3e3"
        list={[
          {
            title: 'Upgrade Your Bottle Renewal Technology',
            buttonText: 'Learn More',
            disabled: false,
            onClick: () => { redirect('bottles'); },
            type: <span>BOTTLES</span>,
          },
          {
            title: 'Cutting Scraps and Overstocks',
            buttonText: 'Learn More',
            disabled: false,
            onClick: () => { redirect('bottles'); },
            type: <span>RSCUW  /  SAYA</span>,
            typeBack: <span>NEXT</span>,
          },
          {
            title: 'Used Garment to Fiber Solution',
            buttonText: 'Coming Soon',
            disabled: true,
            type: <span>GARMA / SAYA</span>,
            typeBack: <span>NEXT</span>,
          },
        ]}
      />
    </div>
  </Frame>
);
