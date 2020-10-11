import React from 'react';

import TopSection from 'vaxalui/saya/Rick/TopSection';
import CollapseSection from 'vaxalui/saya/Rick/CollapseSection';
import TechnologyProjects from 'vaxalui/saya/Rick/TechnologyProjects';

import {
  urlPrefix,
} from 'config';

import redirect from '../../redirect';

const background_TopSection1 = `${urlPrefix}img/mobile/m_banner10.jpg`;
const background_TopSection2 = `${urlPrefix}img/mobile/m_bg12.jpg`;

export default props => (
  <React.Fragment>
    <TopSection
      color="#000000"
      lineColor="#000000"
      height={550}
      firstTitle="ABOUT SAYA"
      title="Renewed Fiber is the Name of the Game"
      subtitle="Fiber is in Our Name"
      backgroundImage={background_TopSection1}
      titleFontFamily="bold"
      subtitleFontFamily="light"
      paddingTop={80}
      titlePaddingTop={43}
      subtitlePaddingTop={40}
    />

    <div style={{ marginTop: 6 }}>
      <CollapseSection
        height="415px"
        title="Look Beyond the Label and into the Conscience"
        subtitle="We are a branch of the Formosa Plastics Group, one of the largest conglomerate in Taiwan, founded in 1954"
        // image={<div style={{ width: 340, height: 440, backgroundColor: 'black' }} />}
        description={`SAYA is able to push the boundaries thanks to its parent company Nan Ya Plastics, a branch of the Formosa Plastics Group, a family business founded by two brothers in 1954. More than 50 years later, Formosa has become one of the largest privately-held companies in Taiwan, and Forbes’ 1000 Largest Public Companies in the world. 

As a global leader in performance fibers, Nan Ya has committed to reliably deliver quality, innovative products through a transparent supply chain. By fostering close partnerships, creating responsible solutions and improving the environmental performance of all their products, Nan Ya continues to innovate to stay ahead of fast-moving market trends and raise the bar of the entire industry.`}
      />
    </div>

    <div style={{ marginTop: 6 }}>
      <TopSection
        height={550}
        firstTitle="VISION & MISSION"
        title="A Greater Expectation"
        subtitle={'Cleaner manufacturing efficiency,\nEquates more sustainable products'}
        backgroundImage={background_TopSection2}
        titleFontFamily="light"
        subtitleFontFamily="bold"
        paddingTop={131}
        titlePaddingTop={43}
        subtitlePaddingTop={18}
      />
    </div>


    <div style={{ marginTop: 6 }}>
      <CollapseSection
        height="296px"
        title="Recover, Renew, Rebuild "
        subtitle="Redefine what’s possible in textile."
        // image={<div style={{ width: 340, height: 440, backgroundColor: 'black' }} />}
        description={`We manufacture sustainable fibers from recycled resources to lessen our impacts, grow our partners and better our world. 

Our motto is recover, renew, rebuild and our mission is to bring new life to what was once discarded. 
        
We innovate to bring better manufacturing methods, cleaner processes and more sustainable products to market. We don’t shy away from more challenging endeavors as we seek to redefine what’s possible in textile renewal. 
        
At SAYA, we believe that raising the bar, within the supply chain, elevates us all.`}
        backgroundColor="#e3e3e3"
        color="#000000"
        buttonColor="#64703f"
      />
    </div>


    <TechnologyProjects
      height={594}
      backgroundColor="#ffffff"
      title="Explore More"
      list={[
        {
          title: 'NEWS',
          buttonText: 'Learn More',
          onClick: () => { redirect('news'); },
          disabled: false,
        },
        {
          title: 'MEDIA',
          buttonText: 'Learn More',
          onClick: () => { redirect('media'); },
          disabled: false,
        },
      ]}
    />
  </React.Fragment>
);
