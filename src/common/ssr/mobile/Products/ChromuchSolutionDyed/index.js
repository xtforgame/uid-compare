import React from 'react';

import TopSection from 'vaxalui/saya/Rick/TopSection';
import ProductFeatures from 'vaxalui/saya/Rick/ProductFeatures';
import ImageNumberBox from 'vaxalui/saya/Rick/ImageNumberBox';
import Section2 from 'vaxalui/saya/Rick/Section2';
import TitleButton from 'vaxalui/saya/Rick/TitleButton';
import CollapseSection from 'vaxalui/saya/Rick/CollapseSection';
import CollapseTable from 'vaxalui/saya/Rick/CollapseTable';
import TechnologyProjects from 'vaxalui/saya/Rick/TechnologyProjects';

import {
  urlPrefix,
} from 'config';

import redirect from '../../redirect';

const background_TopSection1 = `${urlPrefix}img/mobile/m_banner06.jpg`;
const numberBox1 = `${urlPrefix}img/mobile/m_bg10.jpg`;
const numberBox2 = `${urlPrefix}img/mobile/m_bg11.jpg`;
const SectionBG = `${urlPrefix}img/mobile/m_product01.jpg`;


export default props => (
  <React.Fragment>
    <TopSection
      height={550}
      firstTitle="PERFORMANCE"
      title="Color without Compromise"
      subtitle="Chromuch Solution Dyed"
      backgroundImage={background_TopSection1}
      titleFontFamily="bold"
      subtitleFontFamily="light"
      paddingTop={151}
      titlePaddingTop={43}
      subtitlePaddingTop={16}
    />

    <div style={{ marginTop: 6 }}>
      <ProductFeatures
        title="PRODUCT FEATURES"
        list={[
          'Patneted ChromShield™ Yields Most Saturate and Vibrant Colors',
        ]}
      />
    </div>

    <div style={{ display: 'flex' }}>
      <ImageNumberBox
        number="100"
        topTile="Post Consumer"
        bottomTitle="Recycled Fiber"
        backgroundColor="#d8d8d8"
        color="#000000"
        lineColor="#000000"
      // backgroundImage={}
      />
      <ImageNumberBox
        number="94"
        topTile="less"
        bottomTitle="water usage"
        color="#ffffff"
        lineColor="#ffffff"
        backgroundImage={numberBox1}
      />
    </div>
    <div style={{ display: 'flex' }}>
      <ImageNumberBox
        number="78"
        topTile="less"
        bottomTitle="CO² production"
        color="#ffffff"
        lineColor="#ffffff"
        backgroundImage={numberBox2}
      />
      <ImageNumberBox
        number="64"
        topTile="less"
        bottomTitle="energy usage"
        backgroundColor="#d8d8d8"
        color="#000000"
        lineColor="#000000"
      // backgroundImage={}
      />
    </div>

    <CollapseSection
      height="336px"
      title="Where Breathtaking Color Meets Conscious Design "
      subtitle="Color without Compromise"
      // image={<div style={{ width: 340, height: 440, backgroundColor: 'black' }} />}
      description={`CHROMUCH advances a new standard in sustainable color design that takes the compromises out of the equation. For the deepest blacks, richest reds and the brightest blues, CHROMUCH uses a patented ChromShield™ Technology to provide ultra-rich color and superior fade resistance from the elements like UV, machine washing and general wear and tear. Our water-free, eco-colors stay brighter and more vibrant longer.`}
    />

    <div style={{ marginTop: 6 }}>
      <Section2
        color="#FFFFFF"
        title="Most Vibrant Color Spectrum in Recycled Solution Dye "
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
      title={'CHROMUCH\nProduct Specs'}
      rows={[
        {
          item: 'CHROMUCH -Chromshield',
          types: [
            {
              type: 'DTY',
              denie: [50, 75, 75, 150],
              filame: [48, 36, 72, 48],
              luster: ['SD', 'SD', 'SD', 'SD'],
            },
            {
              type: 'N/A',
              denie: [],
              filame: [],
              luster: [],
            },
          ],
        },
        {
          item: 'CHROMUCH -Traditional',
          types: [
            {
              type: 'DTY',
              denie: [50, 50, 75, 75, 100, 150],
              filame: [36, 72, 36, 72, 36, 48],
              luster: ['SD', 'SD', 'BR', 'BR', 'BR', 'BR'],
            },
            {
              type: 'FDY',
              denie: [30, 50, 75, 150],
              filame: [12, 24, 36, 48],
              luster: ['BR', 'SD', 'BR', 'BR'],
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
