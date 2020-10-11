import React from 'react';

import TopSection from 'vaxalui/saya/Rick/TopSection';
import Introduction from 'vaxalui/saya/Rick/Introduction';
import TitleLineBox from 'vaxalui/saya/Rick/TitleLineBox';
import ImageBoxSmall from 'vaxalui/saya/Rick/ImageBoxSmall';

import {
  urlPrefix,
} from 'config';

const MobileBg1 = `${urlPrefix}img/mobile/m_bg50.jpg`;
const MobileBg2 = `${urlPrefix}img/mobile/m_bg51.jpg`;

const leftBox = `${urlPrefix}img/mobile/m_bg45.jpg`;
const rightBox = `${urlPrefix}img/mobile/m_bg16.jpg`;

export default props => (
  <React.Fragment>
    <TopSection
      firstTitle="SAYA Now Series"
      secondTitle={'SAYA\n'}
      secondTitleBack="USA"
      thirdTitle="USA-based fiber program"
      backgroundImage={MobileBg1}
      secondTitlePaddingTop={115}
      secondLineMarginTop={106}
      lineBackgroundColor="#000000"
      color="#000000"
    />

    <div style={{ marginTop: 23 }}>
      <Introduction
        height={680}
        title={'Turnkey Solution\nto Made in USA\nProjects'}
        subtitle={'SAYA Fiber Facility in Lake City,\nSouth Carolina'}
        content={'SAYA USA is a special collection of recycled\npolyester fibers made in our facility in South\nCarolina, USA. Here we provide the options to\nuse locally or internationally recycled bottles\nand wastes. If you are looking for a USA-\nbased fiber program, SAYA is here to help\nwith not only quality, delivery, but also global\ntraceability and transparency.\n\nWe partner with mills and finishing facilities\naround the USA to provide turnkey solutions\nto complete your sustainable and circular\ndesign product needs.'}
        backgroundImage={MobileBg2}
        color="#ffffff"
        lineColor="#ffffff"
      />
    </div>

    <TitleLineBox
      title="Other SAYA Now Projects"
      color="#000000"
    >
      <ImageBoxSmall
        title="SAYA"
        titleBack="365"
        subtitle={'Certified Recycle PET\nFor Everyday Needs'}
        backgroundImage={leftBox}
        paddingTop={70}
        fontColor="#000000"
      />
      <ImageBoxSmall
        title="SAYA"
        titleBack="COASTAL"
        subtitle={'Traceable Ocean\nPreventing Plastic Fibers'}
        backgroundImage={rightBox}
        paddingTop={70}
        fontColor="#000000"
      />
    </TitleLineBox>
  </React.Fragment>
);
