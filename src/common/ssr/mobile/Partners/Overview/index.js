import React from 'react';

import TopSection from 'vaxalui/saya/Rick/TopSection';
import CollapseSection from 'vaxalui/saya/Rick/CollapseSection';
import Boxes from 'vaxalui/saya/Rick/Boxes';
import ImageBoxSmall from 'vaxalui/saya/Rick/ImageBoxSmall';

import {
  urlPrefix,
} from 'config';

import redirect from '../../redirect';

const background_TopSection1 = `${urlPrefix}img/mobile/m_banner13.jpg`;
const leftBox = `${urlPrefix}img/mobile/m_banner14s.jpg`;
const midBox = `${urlPrefix}img/mobile/m_banner15s.jpg`;
const rightBox = `${urlPrefix}img/mobile/m_banner16s.jpg`;

export default props => (
  <React.Fragment>
    <TopSection
      height={550}
      firstTitle="PARTNERS"
      title="Partners in Sustainability "
      subtitle="It takes a village to achieve sustainability."
      backgroundImage={background_TopSection1}
      titleFontFamily="bold"
      subtitleFontFamily="light"
      paddingTop={152}
      titlePaddingTop={43}
      subtitlePaddingTop={16}
    />

    <div style={{ marginTop: 6 }}>
      <CollapseSection
        height="450px"
        title="Millions of first line collectors, like-minded manufacturers, brands, and conscious consumers"
        subtitle="Together we weave a sustainable global village"
        // image={<div style={{ width: 340, height: 440, backgroundColor: 'black' }} />}
        description={`It takes expertise to mitigate the plastic mess we’ve made (and we continue to make more everyday) as we shift to making a circular-economy a reality.. Help from you along with millions of first line waste collectors, like-minded manufacturers, brands, and conscious consumers, we reshape this global village. 

As manufacturers, we understand the critical role we play in the supply chain as it relates to sustainability. We realize that our mission is interdependent upon the success of our partners and the networks we co-create. As we continuously strive to build a more sustainable business, we seek partners that share our core values. SAYA is honored to stand with these dedicated brands and organizations as we work together to grow our businesses and reduce our impacts. `}
      />
    </div>

    <div style={{ marginTop: 6 }}>
      <Boxes
        title={'Partners &\nCertifications'}
        content={'Collaborate to Achieve Sustainability Like a Pro'}
        backgroundColor="#e3e3e3"
        color="#000000"
      >
        <ImageBoxSmall
          title="MANUFACTURERS"
          backgroundImage={leftBox}
          paddingTop={86}
          fontColor="#000000"
          onClick={() => redirect('manufacturers')}
        />
        <ImageBoxSmall
          title="BRANDS"
          backgroundImage={midBox}
          paddingTop={86}
          fontColor="#ffffff"
          onClick={() => redirect('partners-brandpartners')}
        />
        <ImageBoxSmall
          title={'CERTIFICATIONS'}
          backgroundImage={rightBox}
          paddingTop={86}
          fontColor="#ffffff"
          onClick={() => redirect('partners-certifications')}
        />
      </Boxes>
    </div>
  </React.Fragment>
);
