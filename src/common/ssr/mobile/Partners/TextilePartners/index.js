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

const background_TopSection1 = `${urlPrefix}img/mobile/m_banner14.jpg`;
const Background = `${urlPrefix}img/mobile/m_bg13.jpg`;

const apluschanchia = `${urlPrefix}pix_bw/partner logos/apluschanchia.svg`;
const littleking = `${urlPrefix}pix_bw/partner logos/littleking.svg`;
const caroltex = `${urlPrefix}pix_bw/partner logos/caroltex.svg`;
const intl = `${urlPrefix}pix_bw/partner logos/mds-intl.svg`;
const delicacy = `${urlPrefix}pix_bw/partner logos/delicacy.svg`;
const newwide = `${urlPrefix}pix_bw/partner logos/newwide.svg`;
const eclat = `${urlPrefix}pix_bw/partner logos/eclat.svg`;
const nstars = `${urlPrefix}pix_bw/partner logos/nstars.svg`;
const evertex = `${urlPrefix}pix_bw/partner logos/evertex.svg`;
const paiho = `${urlPrefix}pix_bw/partner logos/paiho.svg`;
const flyingtex = `${urlPrefix}pix_bw/partner logos/flyingtex.svg`;
const promaxtex = `${urlPrefix}pix_bw/partner logos/promaxtex.svg`;
const fct = `${urlPrefix}pix_bw/partner logos/fct.svg`;
const rtfiber = `${urlPrefix}pix_bw/partner logos/rtfiber.svg`;
const fuhsun = `${urlPrefix}pix_bw/partner logos/fuhsun.svg`;
const singtex = `${urlPrefix}pix_bw/partner logos/singtex.svg`;
const grandtextile = `${urlPrefix}pix_bw/partner logos/grandtextile.svg`;
const tahtong = `${urlPrefix}pix_bw/partner logos/tahtong.svg`;
const hugebamboo = `${urlPrefix}pix_bw/partner logos/hugebamboo.svg`;
const labtex = `${urlPrefix}pix_bw/partner logos/labtex.svg`;
const tun = `${urlPrefix}pix_bw/partner logos/tun.svg`;
const licheng = `${urlPrefix}pix_bw/partner logos/licheng.svg`;
const yuyuang = `${urlPrefix}pix_bw/partner logos/yuyuang.svg`;

export default props => (
  <React.Fragment>
    <TopSection
      color="#000000"
      lineColor="#000000"
      height={350}
      firstTitle="MANUFACTURERS"
      title="One Professional to Another"
      backgroundImage={background_TopSection1}
      titleFontFamily="light"
      paddingTop={70}
      titlePaddingTop={40}
    />

    <div style={{ marginTop: 6 }}>
      <CollapseSection
        height="296px"
        title="We Know Your Manufacturing Needs"
        subtitle="The Best-In-Class Quality Yield"
        // image={<div style={{ width: 340, height: 440, backgroundColor: 'black' }} />}
        description={`SAYA supplies the best-in-class performance fibers for top fabric manufacturers around the world. SAYA recycled fibers retain the best strength, dyeability, and overall A Grade yield.

Whether you need better fabric tenacity, color matching or simply hassle-free transition to recycled content, we’ve got your back.`}
      />
    </div>

    <div style={{ marginTop: 6 }}>
      <ImageContainer >
        <pre style={{ backgroundSize: 'cover', width: '100%', height: 175, color: '#ffffff', textAlign: 'center', fontSize: 24, fontWeight: 'bold', fontFamily: 'FilsonSoft-Bold', backgroundImage: `url(${Background})`, paddingTop: 56, margin: 0 }}>
          {'Industry Professionals\nRunning on SAYA'}
        </pre>
      </ImageContainer>
    </div>

    <div style={{ backgroundColor: "#444343", paddingTop: 40, paddingBottom: 72, }}>
      <PartnerSection
        partner={[
          [
            { imgUrl: eclat, url: 'http://www.eclat.com.tw/zh-tw' },
            { imgUrl: fct, url: 'http://www.ftc.com.tw/newftc/index.php' },
            { imgUrl: promaxtex, url: 'http://www.promaxtex.com/front/bin/home.phtml' },
            { imgUrl: fuhsun, url: 'http://www.fuhsun.com' },
          ],
          [
            { imgUrl: intl, url: 'http://www.mds-intl.com/zh-tw/Page/company' },
            { imgUrl: grandtextile, url: 'http://www.grandtextile.com.tw' },
            { imgUrl: hugebamboo, url: 'http://www.hugebamboo.net' },
            { imgUrl: licheng, url: 'https://licheng.choice-web.com' },
          ],
          [
            { imgUrl: evertex, url: 'https://www.evertex.tw' },
            { imgUrl: newwide, url: 'http://www.newwide.com/newwide' },
            { imgUrl: tun, url: 'http://www.tun.com.tw' },
            { imgUrl: littleking, url: 'http://www.littleking.com.tw/tw' },
          ],
          [
            { imgUrl: rtfiber, url: 'http://www.rtfiber.com.tw' },
            { imgUrl: tahtong, url: 'http://tw.tahtong.com.tw' },
            { imgUrl: apluschanchia, url: 'https://www.apluschanchia.com' },
            { imgUrl: flyingtex, url: 'http://www.flyingtex.com.tw/zh' },
          ],
          [
            { imgUrl: delicacy, url: 'https://www.delicacy.com.tw' },
            { imgUrl: labtex, url: 'http://www.labtex.com.tw' },
            { imgUrl: singtex, url: 'http://www.singtex.com' },
            { imgUrl: nstars, url: 'http://nstars.com.tw' },
          ],
          [
            { imgUrl: yuyuang, url: 'https://www.yuyuang.com.tw' },
            { imgUrl: paiho, url: 'http://www.paiho.com' },
            { imgUrl: caroltex, url: 'http://www.caroltex.com' },
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
          title: 'Design Responsibly with Confidence',
          buttonText: 'Learn More',
          disabled: false,
          onClick: () => { redirect('partners-brandpartners'); },
          type: <span>BRANDS</span>,
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
