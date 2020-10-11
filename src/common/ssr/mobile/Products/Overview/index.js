import React from 'react';

import TopSection from 'vaxalui/saya/Rick/TopSection';
import Introduction from 'vaxalui/saya/Rick/Introduction';
import Boxes from 'vaxalui/saya/Rick/Boxes';
import ImageBox from 'vaxalui/saya/Rick/ImageBox';
import TwoCircleSection from 'vaxalui/saya/Rick/TwoCircleSection';

import {
  urlPrefix,
} from 'config';

const LeftBox = `${urlPrefix}img/bg3.jpg`;
const RightBox = `${urlPrefix}img/bg4.jpg`;

const TopLeftBox = `${urlPrefix}img/bg5.jpg`;
const TopRightBox = `${urlPrefix}img/bg6.jpg`;
const BottomLeftBox = `${urlPrefix}img/bg7.jpg`;
const BottomRightBox = `${urlPrefix}img/bg8.jpg`;

const MobileBg1 = `${urlPrefix}img/mobile/m_bg1.jpg`;
const MobileBg2 = `${urlPrefix}img/mobile/m_bg2.jpg`;

const NextCircle = `${urlPrefix}img/mobile/m_now_next_circle.png`;

export default props => (
  <React.Fragment>
    <TopSection
      firstTitle="PRODUCTS"
      secondTitle={'SAYA\nRenew\nFiber'}
      thirdTitle={'Design Consciously,\nKnow What Goes Into Your Gear'}
      backgroundImage={MobileBg1}
      secondTitlePaddingTop={91}
      secondLineMarginTop={82}
    />
    <Introduction
      height={570}
      title={'Not all Recycled\nFibers are\nCreated Equal,'}
      subtitle={'Work with the Best to Transition\nto Sustainable Fibers.'}
      content={'SAYA has the industry’s widest selection of\nPET recycled fiber specifications to meet all\nyour design needs and budget. Find out how\nwe can help to make your transition a smooth\none.'}
      backgroundImage={MobileBg2}
      color="#ffffff"
      lineColor="#ffffff"
    />
    <Boxes
      title="SAYA 365"
      subtitle="Under SAYA Now Technology."
      content={'Industry’s Favorite* Recycle\nPET Bottle Fiber for Every\nApplication and Budget'}
      backgroundColor="#444343"
      color="#ffffff"
    >
      <ImageBox
        title="SAYA 365"
        subtitle="Lorem ipsum dolor sit amet."
        backgroundImage={LeftBox}
        paddingTop={80}
        fontColor="#000000"
      />
    </Boxes>
    <Boxes
      title={'Re Performance\nFibers'}
      subtitle="Under SAYA Now Technology."
      content={'Industry’s Favorite* Recycle\nPET Bottle Fiber for Every\nApplication and Budget'}
      backgroundColor="#c8c6c6"
      color="#000000"
    >
      <ImageBox
        title={'CHROMUCH\nSolution Dyed'}
        subtitle="Lorem ipsum dolor sit amet."
        backgroundImage={TopLeftBox}
        paddingTop={40}
        fontColor="#ffffff"
      />
      <ImageBox
        title="SAYA 365"
        subtitle="Lorem ipsum dolor sit amet."
        backgroundImage={TopRightBox}
        paddingTop={80}
        fontColor="#ffffff"
      />
      <ImageBox
        title="SAYA 365"
        subtitle="Lorem ipsum dolor sit amet."
        backgroundImage={BottomLeftBox}
        paddingTop={80}
        fontColor="#ffffff"
      />
      <ImageBox
        title="SAYA 365"
        subtitle="Lorem ipsum dolor sit amet."
        backgroundImage={BottomRightBox}
        paddingTop={80}
        fontColor="#ffffff"
      />
    </Boxes>

    <TwoCircleSection
      backgroundImage={NextCircle}
      height={888}
      circleMarginTop={45}
    >
      <div style={{ fontSize: 18, fontFamily: 'FilsonSoftRegular', paddingTop: 72 }}>
        All The Products are Available in
        <div style={{ fontFamily: 'FilsonSoft-Bold', lineHeight: 1 }}>SAYA Now & SAYA Next</div>
        <div>Technologies.</div>
      </div>

    </TwoCircleSection>
  </React.Fragment>
);
