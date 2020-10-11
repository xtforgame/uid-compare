import React from 'react';

import TopSection from 'vaxalui/saya/Rick/TopSection';
import ImageBoxSmall from 'vaxalui/saya/Rick/ImageBoxSmall';
import ImageContainer from 'vaxalui/saya/ImageContainer';
import Card from 'vaxalui/saya/Card';
import TitleLineBox from 'vaxalui/saya/Rick/TitleLineBox';

import {
  urlPrefix,
} from 'config';

import articlePic2 from '../../img/mobile/m_pic2.jpg';
import articlePic3 from '../../img/mobile/m_pic3.jpg';
import articlePic4 from '../../img/mobile/m_pic4.jpg';
import MobileBg1 from '../../img/mobile/m_pic1_0.jpg'
import img from '../../img/mobile/m_pic1_1.jpg';
import leftBox from '../../img/mobile/m_bg40.jpg';
import rightBox from '../../img/mobile/m_bg67.jpg';

storiesOf('saya|Pages/Mobile/MobileAbout', module)
  // .addParameters({
  //   info: {
  //     inline: true,
  //     propTables: false,
  //     header: false,
  //     maxPropObjectKeys: 10,
  //     maxPropArrayLength: 10,
  //   },
  // })
  .add('NewsArticle',
    () => (
      <div style={{ width: '100%' }}>
        <MobileLayout>
          <TopSection
            firstTitle="News"
            secondTitle={'What is post-\nconsumer\nrecycled polyester'}
            backgroundImage={MobileBg1}
            secondTitlePaddingTop={148}
            color="#ffffff"
            lineBackgroundColor="#ffffff"
            secondLineDisplay="none"
            secondTitleFontSize={33}
          />

          <ImageContainer
            style={{
              height: 1230, fontFamily: 'FilsonSoftRegular', textAlign: 'left',
            }}
          >
            <div style={{ paddingTop: 40, fontSize: 12, textAlign: 'center', }}>
              About / News /
              <div style={{ fontFamily: 'FilsonSoft-Bold', }}>
                What is post-consumer recycled polyester
              </div>
            </div>
            <pre style={{ fontSize: 16, lineHeight: 1.5, paddingTop: 38, }}>
              {'Recycled polyester (rPET) is obtained by\nmelting down existing plastic and re-\nspinning it into new polyester fiber.\nOften rPET is made from plastic bottles\nbut it can also be derived from other\npost-industrial and post-consumer\ninput materials including textiles or\ngarments. If recycled content is labeled\npost-consumer some of the content has\nbeen derived from used items or\ngarments as opposed to post-industrial\nrecycled content which never reached\nthe consumer such as cutting scraps\nfrom a manufacturing facility.'}
            </pre>
            <img src={img} style={{ height: 205, width: 310, marginTop: 40, }} />
            <pre style={{ fontSize: 16, lineHeight: 1.5, paddingTop: 40, }}>
              {'Using rPET gives a second life to a\nmaterial that’s not biodegradable and\nwould otherwise end up in landfill or the\nocean. The Environmental Protection\nAgency reported that US’s landfills\nreceive over 26 million tons of plastic a\nyear and Ocean Conservancy reports\nthat 8 million metric tons of plastic\nenter the ocean every year.\n\nIn addition, production of fiber or\nproducts using rPET over virgin plastic\nrequires less energy and produces less\nCO2 and it contributes to reducing the\nextraction of crude oil and natural gas\nfrom the Earth to make more plastic.'}
            </pre>
          </ImageContainer>

          <ImageContainer
            style={{
              height: 681,
              backgroundColor: '#c3c1c1',
              overflow: 'scroll',
            }}
          >
            <div
              style={{
                height: 200,
                fontFamily: 'FilsonSoft-Bold',
                fontSize: 18,
                paddingTop: 88,
                position: 'absolute',
                width: '80%',
              }}
            >
              Other Articles
              <div style={{ width: '100%', height: 1, marginTop: 23, backgroundColor: '#000000' }} />
            </div>
            <div style={{ display: 'flex', width: '90%', marginTop: 191, }}>
              <div style={{ position: 'absolute', display: 'flex', }}>
                <Card
                  title="Recycled vs. Recyclable"
                  description="Recycling is the process of collecting and processing materials that would otherwise be thrown away as trash..."
                  image={articlePic2}
                  width={310}
                  height={270}
                />
                <Card
                  title="Mechanical Recycling"
                  description='Mechanical recycling transforms materials into "new" secondary raw materials without changing the base...'
                  image={articlePic3}
                  width={310}
                  height={270}
                />
                <Card
                  title="Chemical Recycling"
                  description="Chemical recycling, also called advanced recycling,  is taking  plastic waste  and reducing it back to its..."
                  image={articlePic4}
                  width={310}
                  height={270}
                />
              </div>
            </div>
          </ImageContainer>

          <TitleLineBox
            title="About SAYA"
            backgroundColor="#e5e5e5"
            color="#000000"
          >
            <ImageBoxSmall
              title={'About\nSAYA'}
              backgroundImage={leftBox}
              paddingTop={53}
              fontColor="#000000"
            />
            <ImageBoxSmall
              title={'Media\n&\nDownloads'}
              backgroundImage={rightBox}
              paddingTop={35}
              fontColor="#ffffff"
            />
          </TitleLineBox>
        </MobileLayout>
      </div >
    ));
