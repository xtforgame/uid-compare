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

const background_TopSection1 = `${urlPrefix}img/mobile/m_banner07.jpg`;
const SectionBG = `${urlPrefix}img/mobile/m_product02.jpg`;

export default props => (
  <React.Fragment>
    <TopSection
      height={550}
      firstTitle="PERFORMANCE"
      title="Stretch Fibers with Good Conscious"
      subtitle="STRETCH"
      backgroundImage={background_TopSection1}
      titleFontFamily="bold"
      subtitleFontFamily="light"
      paddingTop={122}
      titlePaddingTop={43}
      subtitlePaddingTop={16}
    />

    <div style={{ marginTop: 6 }}>
      <ProductFeatures
        title="PRODUCT FEATURES"
        list={[
          '35% Stretch and Recovery',
          '50% Recycled PET + 50% Bio-Based PTT',
          'Moisture management to keep cool and dry',
          '0% Rubber content',
        ]}
      />
    </div>

    <CollapseSection
      height="336px"
      title="Greater Stretch,Durability and Recovery "
      subtitle="SAYA Renew, Bio-Based, and Rubber-Free"
      // image={<div style={{ width: 340, height: 440, backgroundColor: 'black' }} />}
      description={`SAYA offers industry's highest stretch ratio with recycled and bio-based fibers. This makes fabrics that flexes and expands with your potentials, not limiting it. Chlorine resistant, rubber free, durable stretch, our Stretch is where durability and sustainability meet.`}
    />

    <div style={{ marginTop: 6 }}>
      <Section2
        color="#FFFFFF"
        title={'Superior Hybrid\nStretch with\nSAYA Renew\nTechnology'}
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
      title={'STRETCH\nProduct Specs'}
      rows={[
        {
          item: 'STRETCH - Carefree\n(PTT/PET)',
          types: [
            {
              type: 'DTY',
              denie: [30, 50, 75, 80, 100, 150],
              filame: [36, 36, 36, 84, 108, 72],
              luster: ['SD', 'SD', 'SD', 'FD', 'FD', 'SD'],
            },
            {
              type: 'FDY',
              denie: [30, 40, 50, 75],
              filame: [24, 36, 36, 36],
              luster: ['SD', 'SD', 'SD', 'SD'],
            },
          ],
        },
        {
          item: 'STRETCH -Leisure\n(PTT/PET)',
          types: [
            {
              type: 'DTY',
              denie: [50, 75, 75, 100, 150, 150],
              filame: [24, 24, 48, 24, 48, 96],
              luster: ['SD', 'SD', 'SD', 'SD', 'SD', 'SD'],
            },
            {
              type: 'SDY',
              denie: [30, 50, 75, 100],
              filame: [12, 12, 24, 24],
              luster: ['SD', 'SD', 'SD', 'SD'],
            },
          ],
        },
        {
          item: 'STRETCH - HCR',
          types: [
            {
              type: 'DTY',
              denie: [20, 30, 30, 50, 50, 75, 150],
              filame: [18, 36, 36, 48, 72, 72, 96],
              luster: ['SD', 'SD', 'FD', 'SD', 'SD', 'SD', 'SD'],
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
          title: 'High Performance Antibacterial Fiber',
          buttonText: 'Learn More',
          disabled: false,
          onClick: () => { redirect('saya-fresh'); },
          type: 'FRESH',
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
