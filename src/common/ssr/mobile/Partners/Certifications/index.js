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

const background_TopSection1 = `${urlPrefix}img/mobile/m_banner16.jpg`;

const SGS = `${urlPrefix}pix_bw/partner logos/SGS.svg`;
const higgindex = `${urlPrefix}pix_bw/partner logos/higgindex.svg`;
const blobalrecycledstandard = `${urlPrefix}pix_bw/partner logos/blobalrecycledstandard.svg`;
const iso14001 = `${urlPrefix}pix_bw/partner logos/iso14001.svg`;
const bluesign = `${urlPrefix}pix_bw/partner logos/bluesign.svg`;
const oekotex = `${urlPrefix}pix_bw/partner logos/oekotex.svg`;
const eco = `${urlPrefix}pix_bw/partner logos/eco.svg`;


export default props => (
  <React.Fragment>
    <TopSection
      height={350}
      firstTitle="CERTIFICATIONS"
      title={'Certified Peace of\nMind'}
      backgroundImage={background_TopSection1}
      titleFontFamily="light"
      paddingTop={70}
      titlePaddingTop={40}
    />

    <div style={{ backgroundColor: "#e3e3e3", paddingTop: 40, paddingBottom: 72, }}>
      <PartnerSection
        borderColor="#c8c6c6"
        partner={[
          [
            { imgUrl: bluesign },
            { imgUrl: higgindex },
            { imgUrl: oekotex },
            { imgUrl: eco },
          ],
          [
            { imgUrl: iso14001 },
            { imgUrl: blobalrecycledstandard },
            { imgUrl: SGS },
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
          title: 'Design Responsibly with Confidence',
          buttonText: 'Learn More',
          disabled: false,
          onClick: () => { redirect('partners-brandpartners'); },
          type: <span>BRANDS</span>,
        },
      ]}
    />
  </React.Fragment>
);
