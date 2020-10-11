import React from 'react';

import TopSection from 'vaxalui/saya/Rick/TopSection';

import {
  urlPrefix,
} from 'config';

const background_TopSection = `${urlPrefix}img/mobile/m_banner11.jpg`;

export default ({ children }) => (
  <React.Fragment>
    <TopSection
      height={350}
      firstTitle="ABOUT"
      title="News"
      backgroundImage={background_TopSection}
      titleFontFamily="light"
      paddingTop={120}
      titlePaddingTop={40}
    />
    {children}
  </React.Fragment>
);
