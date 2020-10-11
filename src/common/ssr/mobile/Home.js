import React from 'react';

import HomeTopSection from 'vaxalui/saya/Rick/HomeTopSection';
import Section from 'vaxalui/saya/Rick/Section';
import PartnerSection from 'vaxalui/saya/Rick/PartnerSection';
import Partner from 'vaxalui/saya/Rick/Partner';


import {
  urlPrefix,
} from 'config';

import redirect from './redirect';

const mobileBg1 = `${urlPrefix}img/mobile/m_banner01.jpg`;
const mobileBg2 = `${urlPrefix}img/mobile/m_home01.jpg`;
const mobileBg3 = `${urlPrefix}img/mobile/m_home02.jpg`;

const roundArrowImage = `${urlPrefix}img/round_arrow.svg`;
const backgroundPartner = `${urlPrefix}img/mobile/m_home03.jpg`;
const bottleImage = `${urlPrefix}img/mobile/m_home_bottle.svg`;

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
    <HomeTopSection
      backgroundImage={mobileBg1}
      roundArrowImage={roundArrowImage}
      onClick={() => {
        window.scrollTo(0, document.body.scrollHeight);
      }}
    />
    <div style={{ marginTop: 6 }}>
      <Section
        height={700}
        firstTitle="RSCUW / SAYA"
        firstTitleBack="NEXT"
        title="The industry’s most advanced mix content recycling project yet."
        subTitle="The SAYA RSCUW Project"
        backgroundImage={mobileBg2}
        buttonPosition="left"
        onClick={() => { redirect('rscuw-next'); }}
      />
    </div>
    <div style={{ marginTop: 6 }}>
      <Section
        height={610}
        firstTitle="PRODUCT"
        title={'Micro\nfibers.\nMacro\nimpact.'}
        subTitle="Sustainable Fiber Solutions for Every Budget and Design"
        backgroundImage={mobileBg3}
        buttonPosition="left"
        onClick={() => { redirect('saya-365'); }}
      />
    </div>
    <div style={{ marginTop: 6 }}>
      <Section
        height={795}
        color="#000000"
        firstTitle="PARTNERS"
        title={'Partners in\nSustainability'}
        subTitle="It takes a village to achieve sustainability"
        lineColor="#000000"
        buttonPosition="center"
        onClick={() => { redirect('partners-overview'); }}
      >
        <PartnerSection
          borderColor="#e3e3e3"
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
      </Section>
    </div>
    <div style={{ marginTop: 6 }}>
      <Partner
        backgroundImage={backgroundPartner}
        bottleImage={bottleImage}
      />
    </div>
  </React.Fragment>
);
