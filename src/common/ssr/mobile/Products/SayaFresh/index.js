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

const background_TopSection1 = `${urlPrefix}img/mobile/m_banner08.jpg`;
const SectionBG = `${urlPrefix}img/mobile/m_product03.jpg`;

export default props => (
  <React.Fragment>
    <TopSection
      height={550}
      firstTitle="PERFORMANCE"
      title="High Performance Antibacterial Fiber"
      subtitle="FRESH"
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
          'Certified Anti Bacterial Performance over 50 Washes',
          'Prevents Odor Spreading Organisms',
          'Skin Friendly and Non-Leaching Zinc Oxide',
        ]}
      />
    </div>

    <CollapseSection
      height="375px"
      title="High Performance Antibacterial,Infused in Recycled Fiber"
      subtitle="Nature and Skin Friendly Non-leaching Zinc Oxide "
      // image={<div style={{ width: 340, height: 440, backgroundColor: 'black' }} />}
      description={`By effectively hindering the growth of bacteria, fungus and odors, SAYA Fresh extends the life of each wear with permanent bacteria and odor control. Zinc oxide interrupts bacterial and fungi metabolism and prevents growth.

Certified Anti Bacterial Performance over 50 Washes:  AATCC 100, ISO 20743, 
      
Certified Anti Fungi Performance over 50 Washes:  AATCC 30-2013 Test III `}
    />

    <div style={{ marginTop: 6 }}>
      <Section2
        color="#FFFFFF"
        title={'Renewed Fresh and\nStays Fresh'}
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
      title={'FRESH\nProduct Specs'}
      rows={[
        {
          item: 'TOPFRESH',
          types: [
            {
              type: 'DTY',
              denie: [50, 50, 75, 75, 100, 150],
              filame: [48, 72, 36, 72, 36, 48],
              luster: ['SD', 'SD', 'SD', 'SD', 'SD', 'SD'],
            },
            {
              type: 'FDY',
              denie: [75, 75, 100, 150],
              filame: [36, 72, 36, 48],
              luster: ['SD', 'SD', 'SD', 'SD'],
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
          title: 'Fluffy Soft, Ultimate Drape and Versatile',
          buttonText: 'Learn More',
          disabled: false,
          onClick: () => { redirect('saya-microfiber'); },
          type: 'MICROFIBER',
        },
      ]}
    />
  </React.Fragment>
);
