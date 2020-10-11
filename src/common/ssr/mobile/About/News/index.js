import React from 'react';

import TopSection from 'vaxalui/saya/Rick/TopSection';
import AboutNews from 'vaxalui/saya/Rick/AboutNews';
import TechnologyProjects from 'vaxalui/saya/Rick/TechnologyProjects';

import {
  urlPrefix,
} from 'config';

import redirect from '../../redirect';

import Frame from './Frame';

import { anArticles, categories } from '../../../articles';

import ArticleView from '../../ArticleView';

export default ({ match }) => (
  <Frame>
    <ArticleView
      articles={anArticles}
      match={match}
      category={categories['about/news']}
    />

    <div style={{ marginTop: 6 }}>
      <TechnologyProjects
        title="Explore More"
        backgroundColor="#e3e3e3"
        list={[
          {
            title: 'Renewed Fiber is the Name of the Game',
            buttonText: 'Learn More',
            disabled: false,
            onClick: () => { redirect('about-saya'); },
            type: <span>ABOUT SAYA</span>,
          },
          {
            title: 'MEDIA',
            buttonText: 'Learn More',
            disabled: false,
            onClick: () => { redirect('news'); },
            type: '',
          },
        ]}
      />
    </div>
  </Frame>
);
