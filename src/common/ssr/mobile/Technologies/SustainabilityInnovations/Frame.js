import React from 'react';

import TopSection from 'vaxalui/saya/Rick/TopSection';

import {
  urlPrefix,
} from 'config';

const background_TopSection = `${urlPrefix}img/mobile/m_banner04.jpg`;

export default ({ children }) => (
  <React.Fragment>
    <TopSection
      height={350}
      firstTitle="KNOWLEDGE BASE"
      title="Sustainable Innovations"
      backgroundImage={background_TopSection}
      titleFontFamily="light"
      paddingTop={70}
      titlePaddingTop={43}
      titleFontSize={50}
    />
    {children}
  </React.Fragment>
);
