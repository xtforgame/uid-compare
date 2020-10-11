import React from 'react';

import TopSection from 'vaxalui/saya/Rick/TopSection';
import ProductFeatures from 'vaxalui/saya/Rick/ProductFeatures';
import Section2 from 'vaxalui/saya/Rick/Section2';
import TitleButton from 'vaxalui/saya/Rick/TitleButton';
import CollapseSection from 'vaxalui/saya/Rick/CollapseSection';
import CollapseTable from 'vaxalui/saya/Rick/CollapseTable';
import TechnologyProjects from 'vaxalui/saya/Rick/TechnologyProjects';

import {
  urlPrefix,
} from 'config';

import redirect from '../../redirect';

const background_TopSection1 = `${urlPrefix}img/mobile/m_banner09.jpg`;
const SectionBG = `${urlPrefix}img/mobile/m_product04.jpg`;

export default props => (
  <React.Fragment>
    <TopSection
      height={550}
      firstTitle="PERFORMANCE"
      title="Fluffy Soft, Ultimate Drape and Versatile"
      subtitle="MICROFIBER"
      backgroundImage={background_TopSection1}
      titleFontFamily="bold"
      subtitleFontFamily="light"
      paddingTop={92}
      titlePaddingTop={43}
      subtitlePaddingTop={16}
    />

    <div style={{ marginTop: 6 }}>
      <ProductFeatures
        title="PRODUCT FEATURES"
        list={[
          '0.2 dpf - as low as',
          '100% Recycled content',
          'Up to 432 filaments',
          'Starting from 5 deniers and up',
        ]}
      />
    </div>

    <CollapseSection
      height="375px"
      title="Ultra Fine Filament,The Ultimate Drape and Luxury"
      subtitle="0.2 dpf Softech(r) Direct Spinning Technology "
      // image={<div style={{ width: 340, height: 440, backgroundColor: 'black' }} />}
      description={`SAYA Microfiber provides the finest performance in 100% recycled content. Each filament can be 100x thinner than a human hair with a luxurious drape, hand feel, and lint-free absorption.`}
    />

    <div style={{ marginTop: 6 }}>
      <Section2
        color="#FFFFFF"
        title={'Microfiber Redefined\nand Renewed'}
        backgroundImage={SectionBG}
      />
    </div>

    <div style={{ marginTop: 6 }}>
      <TitleButton
        color="#ffffff"
        title={`Learn more about\nSAYA Next Technology.`}
        onClick={() => { redirect('rscuw-next'); }}
        label="Learn More"
        background="#444343"
      />
    </div>

    <CollapseTable
      title={'MICROFIBER\nProduct Specs'}
      rows={[
        {
          item: 'MICRO',
          types: [
            {
              type: 'DTY',
              denie: [10, 20, 20, 25, 35, 50, 50, 55, 75, 75, 100, 150],
              filame: [12, 24, 72, 72, 144, 96, 144, 216, 96, 144, 144, 216],
              luster: ['SD', 'SD', 'SD', 'SD', 'SD', 'SD', 'SD', 'SD', 'SD', 'SD', 'SD', 'SD'],
            },
            {
              type: 'FDY',
              denie: [20, 25, 30, 35, 40, 40, 40, 55, 75],
              filame: [48, 72, 72, 72, 48, 48, 72, 144, 144],
              luster: ['SD', 'SD', 'SD', 'SD', 'SD', 'FD', 'SD', 'SD', 'SD'],
            },
          ],
        },
      ]}
    />
    <TechnologyProjects
      height={1018}
      backgroundColor="#e3e3e3"
      title="See Technology Projects"
      list={[
        {
          title: 'For Every Task and Budget',
          buttonText: 'Learn More',
          disabled: false,
          onClick: () => { redirect('saya-365'); },
          type: <>
            <span>SAYA</span>
            <span style={{ fontFamily: 'FilsonSoft-Light' }}>365</span>
          </>,
        },
        {
          title: 'Color without Compromise',
          buttonText: 'Learn More',
          disabled: false,
          onClick: () => { redirect('chromuch'); },
          type: <span>CHROMUCH Solution Dyed</span>,
        },
        {
          title: 'Stretch Fibers with Good Conscious',
          buttonText: 'Learn More',
          disabled: false,
          onClick: () => { redirect('saya-stretch'); },
          type: 'STRETCH',
        },
        {
          title: 'High Performance Antibacterial Fiber',
          buttonText: 'Learn More',
          disabled: false,
          onClick: () => { redirect('saya-fresh'); },
          type: 'FRESH',
        },
      ]}
    />
  </React.Fragment>
);
