import React from 'react';

import TopSection from 'vaxalui/saya/Rick/TopSection';
import TopSection4 from 'vaxalui/saya/Rick/TopSection4';
import TitleButton from 'vaxalui/saya/Rick/TitleButton';
import CollapseSection from 'vaxalui/saya/Rick/CollapseSection';
import ImageNumberBox from 'vaxalui/saya/Rick/ImageNumberBox';
import Introduction from 'vaxalui/saya/Rick/Introduction';
import GreenNumberSection from 'vaxalui/saya/Rick/GreenNumberSection';
import StageWithIcon from 'vaxalui/saya/Rick/StageWithIcon';
import ImageContainer from 'vaxalui/saya/ImageContainer';
import SubtitleContent from 'vaxalui/saya/SubtitleContent';
import TechnologyProjects from 'vaxalui/saya/Rick/TechnologyProjects';


import {
  urlPrefix,
} from 'config';

import redirect from '../../redirect';

const background_TopSection1 = `${urlPrefix}img/mobile/m_banner02.jpg`;
const background_TopSection2 = `${urlPrefix}img/mobile/m_bg01.jpg`;
const background_TopSection3 = `${urlPrefix}img/mobile/m_bg02.jpg`;
const background_TopSection4 = `${urlPrefix}img/mobile/m_bg03.jpg`;

const global = `${urlPrefix}img/mobile/m_fig06.svg`;
const icon1 = `${urlPrefix}img/mobile/m_fig02.svg`;
const icon2 = `${urlPrefix}img/mobile/m_fig03.svg`;
const icon3 = `${urlPrefix}img/mobile/m_fig04.svg`;
const blackRectangle = `${urlPrefix}img/mobile/fig05.svg`;
const oceanCycle = `${urlPrefix}img/mobile/ocean-cycle-218x300.png`;

export default props => (
  <React.Fragment>
    <TopSection
      height={550}
      firstTitle="BOTTLES"
      title="Upgrade Your Bottle Renewal Technology"
      subtitle="Advanced Recycled Fibers"
      backgroundImage={background_TopSection1}
      titleFontFamily="bold"
      subtitleFontFamily="light"
      paddingTop={92}
      titlePaddingTop={43}
      subtitlePaddingTop={16}
    />

    <div style={{ marginTop: 6 }}>
      <TopSection4
        height={350}
        firstTitle="SAYA recycles over"
        title="75,000,000,000"
        topTitle="single-use plastic bottles per year"
        bottomTitle="into functional and recyclable fibers"
      />
    </div>

    <CollapseSection
      height="500px"
      title="SAYA Renewal Technologies"
      subtitle="Not All Recycle Fibers Are Created Equal"
      // image={<div style={{ width: 340, height: 440, backgroundColor: 'black' }} />}
      description="SAYA recycles single use, low value, high volume plastic bottles and renews them into durable performance and functional fibers that could be put into durable, and yet still renewable use. We recycle over 100,000 tons of plastic bottles per year (equivalent to 1,000,000,000 bottles) and upcycle them into performance fibers that are durable, functional, and recyclable."
    />

    <div style={{ marginTop: 6 }}>
      <TopSection
        height={550}
        firstTitle="BOTTLES"
        title="Solid Backbone of our Sustainable Fibers"
        subtitle="Less Footprint, More Identity"
        backgroundImage={background_TopSection2}
        titleFontFamily="light"
        subtitleFontFamily="bold"
        paddingTop={87}
        titlePaddingTop={43}
        subtitlePaddingTop={8}
        titleFontSize={50}
      />
    </div>

    <div style={{ display: 'flex' }}>
      <ImageNumberBox
        number="75"
        topTile="billion bottles"
        bottomTitle="every year"
        backgroundColor="#c8c6c6"
        color="#000000"
        lineColor="#000000"
        hidePercent
      // backgroundImage={}
      />
      <ImageNumberBox
        number="13"
        topTile="bottle recycling"
        bottomTitle="facilities worldwide"
        backgroundColor="#ffffff"
        color="#000000"
        lineColor="#000000"
        hidePercent
      // backgroundImage={}
      />
    </div>

    <Introduction
      height={436}
      title={'Global Recycling\nNetwork'}
      subtitle={'Transparency and capacity to\ngrow with you'}
      description="Based in Taiwan, SAYA’s PET bottle recovery and renewal map spans throughout Asia including China, Japan, Philippines, Thailand and Vietnam. In recent years, collection efforts have expanded into regions of the USA and South America. SAYA continues to innovate our manufacturing processes and expand our sources for recycled fiber."
      color="#000000"
      lineColor="#000000"
      backgroundColor="#e3e3e3"
      subtitleFontFamily="bold"
    >
    </Introduction>
    <img src={global} style={{ height: 280 }} />

    <GreenNumberSection
      hideTop
      backgroundColor="#ffffff"
      number="50"
      topTile="years of"
      bottomTitle="experience"
      subtitle="We Got Your Back"
      description="SAYA has quietly grown into the world’s largest manufacturer of post-consumer recycled performance fiber with recycling networks that repurpose over 75 billion bottles every year. Working with a network of 13 PET recycling facilities worldwide, SAYANow serves as the backbone of our sustainable textile business."
      height={620}
      sign="+"
    />

    <Introduction
      height={720}
      title={'Not all Recycled\nFibers are Created\nEqual, SAYA Just\nGets More TLC'}
      subtitle={'5-stage Filtration + 2-stage\nPurification'}
      description="SAYA continues to perfect the process of renewing water bottles into yarns for multiple uses. Discarded water bottles are renewed through our proprietary, five-stage filtration process which are followed by two stages of purification for guaranteed safety and purity."
      color="#ffffff"
      lineColor="#ffffff"
      backgroundColor="#64703f"
      subtitleFontFamily="light"
    >
      <StageWithIcon
        icon={icon1}
      />
      <StageWithIcon
        icon={icon2}
      />
    </Introduction>
    <div style={{ paddingTop: 44, backgroundColor: '#64703f' }}>
      <Introduction
        hideTitle
        height={388}
        subtitle={'Performance Enhancing Process'}
        description="The resulting flakes are then transported to in-house facilities where they are batch-optimized to control color and tenacity and transformed into pellets ready to be extruded into recycled yarns designated for a specific end-use."
        color="#ffffff"
        lineColor="#ffffff"
        backgroundColor="#64703f"
        subtitleFontFamily="light"
      >
        <img src={icon3} style={{ height: 99, marginTop: 40, }} />
      </Introduction>
    </div>

    <ImageContainer>
      <div style={{ height: 150, width: 320 }}>
        <div style={{ position: 'absolute', }}>
          <img src={blackRectangle} style={{ width: 230, height: 300, marginLeft: 45 }} />
        </div>
      </div>
      <div style={{ width: '100%', height: 150, backgroundColor: '#e3e3e3' }} />
    </ImageContainer>
    <CollapseSection
      height="515px"
      title="Highest Safety and Performance Standards"
      subtitle="EU REACH - Oeko Tex 100 - Bluesign"
      // image={<div style={{ width: 340, height: 440, backgroundColor: 'black' }} />}
      description="The melting process goes through temperatures over 200C, this removes most potential virus and bacteria that may remain after the recycling process. SAYA’s proprietary filtration process ensures all yarns meet European Union REACH (2020), bluesign, and Oeko Tex 100 standards for heavy metal and other harmful RSL and residues."
      backgroundColor="#e3e3e3"
      color="#000000"
      buttonColor="#64703f"
    />
    <CollapseSection
      height="538px"
      title="Performance Fiber is the Name of the Game"
      subtitle="SAYA of Nan Ya Plastics"
      // image={<div style={{ width: 340, height: 440, backgroundColor: 'black' }} />}
      description="With over 50 years as a market leader in polyester fiber engineering, Nan Ya Plastics now defines their comprehensive selection of recycled performance fibers with the name SAYA. SAYA boasts the most comprehensive selection in performance fibers. We offer smart options including rubber free mechanical stretch, low denier, high microfilament, and colorfast solution dyed fiber just to name a few."
      backgroundColor="#c8c6c6"
      color="#000000"
      buttonColor="#64703f"
    />


    <div style={{ marginTop: 6 }}>
      <TitleButton
        color="#000000"
        title={`See our Product Section\nfor more details on yarn\nselection. `}
        onClick={() => { redirect('saya-365'); }}
        label="Learn More"
        background="#ffffff"
      />
    </div>

    <div style={{ marginTop: 6 }}>
      <TopSection
        height={550}
        firstTitle="COASTAL"
        title="Preventing the biggest source of ocean plastic"
        subtitle="Turn Potential Microplastics into Durable Microfibers"
        backgroundImage={background_TopSection3}
        titleFontFamily="light"
        subtitleFontFamily="bold"
        paddingTop={112}
        titlePaddingTop={43}
        subtitlePaddingTop={8}
        titleFontSize={50}
      />
    </div>

    <GreenNumberSection
      hideTop
      backgroundColor="#e3e3e3"
      number="80"
      topTile="ocean plastics"
      bottomTitle="from coastal land"
      subtitle="SAYA COASTAL"
      description="SAYA Coastal is a specialized recycling program that targets the clean-up and renewal of discarded plastic bottles in coastal regions that would otherwise migrate out to sea. Study shows more than 80% of ocean plastics actually originated from coastal land."
      height={600}
      sign="%"
    />

    <ImageContainer style={{ height: 560, marginTop: 6 }}>
      <img
        src={oceanCycle}
        style={{ width: 168, height: 230, marginTop: 60, }}
      />
      <SubtitleContent
        height={575}
        fontColor="#000000"
        subtitle={'Certified Ocean Plastic'}
        content={`We work with OceanCycle’s network of certified\ncoastal recyclers. Treated with SAYA Now’s\nproprietary renewing technology, we turn\npotential microplastics into microfibers.`}
        paddingTop={80}
      />
    </ImageContainer>

    <div style={{ marginTop: 6 }}>
      <TopSection
        height={550}
        firstTitle="USA"
        title="Recycled Fibers Made in USA"
        subtitle="A special collection made in our facility in South Carolina, USA."
        backgroundImage={background_TopSection4}
        titleFontFamily="light"
        subtitleFontFamily="bold"
        paddingTop={137}
        titlePaddingTop={43}
        subtitlePaddingTop={8}
        titleFontSize={50}
      />
    </div>

    <CollapseSection
      height="324px"
      title="Turnkey Solution to Made in USA Strategy"
      subtitle="Facility in Lake City, South Carolina"
      // image={<div style={{ width: 340, height: 440, backgroundColor: 'black' }} />}
      description={`SAYA USA is a special collection of recycled polyester fibers made in our facility in South Carolina, USA. Here we provide the options to use locally or internationally recycled bottles and wastes. If you are looking for a USA-based fiber program, SAYA is here to help with not only quality, delivery, but also global traceability and transparency.  

We partner with mills and finishing facilities around the USA to provide turnkey solutions to complete your sustainable and circular design product needs.`}
      backgroundColor="#c8c6c6"
      color="#000000"
      buttonColor="#64703f"
    />
    <div style={{ marginTop: 6 }}>
      <TechnologyProjects
        title="Other Technology Projects"
        list={[
          {
            title: "Cutting Scraps and Overstocks",
            buttonText: "Learn More",
            disabled: false,
            onClick: () => { redirect('bottles'); },
            type: <span>RSCUW  /  SAYA</span>,
            typeBack: <span>NEXT</span>
          },
          {
            title: "Used Garment to Fiber Solution",
            buttonText: "Coming Soon",
            disabled: true,
            type: <span>GARMA / SAYA</span>,
            typeBack: <span>NEXT</span>
          },
        ]}
      />
    </div>
  </React.Fragment>
);
