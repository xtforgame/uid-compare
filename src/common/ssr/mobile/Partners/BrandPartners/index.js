import React from 'react';

import TopSection from 'vaxalui/saya/Rick/TopSection';
import CollapseSection from 'vaxalui/saya/Rick/CollapseSection';
import TechnologyProjects from 'vaxalui/saya/Rick/TechnologyProjects';
import PartnerSection from 'vaxalui/saya/Rick/PartnerSection';
import ImageContainer from 'vaxalui/saya/ImageContainer';

import {
  urlPrefix,
} from 'config';

import redirect from '../../redirect';

const background_TopSection1 = `${urlPrefix}img/mobile/m_banner15.jpg`;
const Background = `${urlPrefix}img/mobile/m_bg14.jpg`;

const adidas = `${urlPrefix}pix_bw/partner logos/adidas.svg`;
const arcteryx = `${urlPrefix}pix_bw/partner logos/arcteryx.svg`;
const asics = `${urlPrefix}pix_bw/partner logos/asics.svg`;
const athleta = `${urlPrefix}pix_bw/partner logos/athleta.svg`;
const columbia = `${urlPrefix}pix_bw/partner logos/columbia.svg`;
const ikea = `${urlPrefix}pix_bw/partner logos/ikea.svg`;
const lululemon = `${urlPrefix}pix_bw/partner logos/lululemon.svg`;
const newbalance = `${urlPrefix}pix_bw/partner logos/newbalance.svg`;
const nike = `${urlPrefix}pix_bw/partner logos/nike.svg`;
const patagonia = `${urlPrefix}pix_bw/partner logos/patagonia.svg`;
const puma = `${urlPrefix}pix_bw/partner logos/puma.svg`;
const thenorthface = `${urlPrefix}pix_bw/partner logos/thenorthface.svg`;
const underarmour = `${urlPrefix}pix_bw/partner logos/underarmour.svg`;
const walmart = `${urlPrefix}pix_bw/partner logos/walmart.svg`;

export default props => (
  <React.Fragment>
    <TopSection
      height={350}
      firstTitle="BRANDS"
      title="Design Responsibly with Confidence"
      backgroundImage={background_TopSection1}
      titleFontFamily="light"
      paddingTop={45}
      titlePaddingTop={40}
    />

    <div style={{ marginTop: 6 }}>
      <CollapseSection
        height="335px"
        title="Develop with Confidence,and Good Conscience"
        subtitle="Building Blocks Behind Every Great Product"
        // image={<div style={{ width: 340, height: 440, backgroundColor: 'black' }} />}
        description={`Reliability and performance are the fundamentals of designing and building outstanding gear. SAYA has been making functional fibers for the past 50 years and now they are available sustainably. Leading brands of the world count on SAYA’s innovation, dependability, and quality. Join us and take advantage of the world’s largest renewing network built for you.`}
        backgroundColor="#e3e3e3"
        color="#000000"
        buttonColor="#64703f"
      />
    </div>

    <div style={{ marginTop: 6 }}>
      <ImageContainer >
        <div style={{ backgroundSize: 'cover', width: '100%', height: 175, color: '#ffffff', textAlign: 'center', fontSize: 24, fontWeight: 'bold', fontFamily: 'FilsonSoft-Bold', backgroundImage: `url(${Background})`, paddingTop: 56, margin: 0 }}>
          Brands Running on SAYA
        </div>
      </ImageContainer>
    </div>

    <div style={{ backgroundColor: "#c8c6c6", paddingTop: 40, paddingBottom: 72, }}>
      <PartnerSection
        borderColor="#858585"
        partner={[
          [
            { imgUrl: nike, url: 'https://www.nike.com' },
            { imgUrl: adidas, url: 'https://www.adidas.com' },
            { imgUrl: patagonia, url: 'https://www.patagonia.com' },
            { imgUrl: thenorthface, url: 'www.thenorthface.com' },
          ],
          [
            { imgUrl: underarmour, url: 'www.underarmour.com' },
            { imgUrl: asics, url: 'https://www.asics.com' },
            { imgUrl: puma, url: 'https://www.puma.com' },
            { imgUrl: arcteryx, url: 'https://www.arcteryx.com' },
          ],
          [
            { imgUrl: columbia, url: 'https://www.columbia.com' },
            { imgUrl: ikea, url: 'https://www.ikea.com' },
            { imgUrl: walmart, url: 'https://www.walmart.com' },
            { imgUrl: newbalance, url: 'https://www.newbalance.com' },
          ],
          [
            { imgUrl: lululemon, url: 'https://www.lululemon.com' },
            { imgUrl: athleta, url: 'https://www.athleta.com' },
            null,
            null,
          ],
        ]}
      />
    </div>

    <TechnologyProjects
      height={594}
      backgroundColor="#ffffff"
      title="Explore More"
      list={[
        {
          title: 'One Professional to Another',
          buttonText: 'Learn More',
          disabled: false,
          onClick: () => { redirect('manufacturers'); },
          type: <span>MANUFACTURERS</span>,
        },
        {
          title: 'Certified Peace of Mind',
          buttonText: 'Learn More',
          disabled: false,
          onClick: () => { redirect('partners-certifications'); },
          type: <span>CERTIFICATIONS</span>,
        },
      ]}
    />
  </React.Fragment>
);
