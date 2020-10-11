import React from 'react';

import TopSection2 from 'vaxalui/saya/Rick/TopSection2';
import MediaTable from 'vaxalui/saya/Rick/MediaTable';
import ImageContainer from 'vaxalui/saya/ImageContainer';
import PartnerForm from 'vaxalui/saya/Rick/PartnerForm';
import TechnologyProjects from 'vaxalui/saya/Rick/TechnologyProjects';

import {
  urlPrefix,
} from 'config';

import redirect from '../../redirect';

const background_TopSection = `${urlPrefix}img/mobile/m_banner12.jpg`;

export default props => (
  <React.Fragment>
    <TopSection2
      height={350}
      firstTitle="ABOUT"
      title="Media"
      backgroundImage={background_TopSection}
      titleFontFamily="light"
    />

    <div style={{ marginTop: 6 }}>
      <ImageContainer>
        <MediaTable
          title="Papers and Education"
          rows={[
            {
              id: 1,
              name: 'Sustainability Report 2020',
              body: (
                <div>
                  <div style={{ fontFamily: 'FilsonSoftRegular', lineHeight: 1, fontSize: 12, color: '#64703f' }}>
                    Please subscribe our newsletter to download
                  </div>
                  <div
                    style={{
                      height: 300,
                      marginTop: 11,
                      paddingTop: 22,
                      paddingBottom: 22,
                      paddingLeft: 20,
                      paddingRight: 20,
                      backgroundColor: '#e5e5e5',
                      textAlign: 'left',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <PartnerForm
                      subtitle={'Sign up to stay in touch on the newest renewal technologies, products, events, and news from SAYA.'}
                      labelContent={'SAYA Brand may use my email address to provide relevant marketing updates. I can unsubscribe these communications at anytime.'}
                    />
                  </div>
                  <div style={{ height: 11, width: '100%' }} />
                </div>
              ),
            },
            {
              id: 2,
              name: 'Promostyl',
              linkName: 'Download',
              url: 'x',
            },
            {
              id: 3,
              name: 'Tools',
              linkName: 'Download',
              url: 'x',
            },
          ]}
        />
        <div style={{ width: '100%', height: 0 }} />
        <MediaTable
          title="Artworks"
          rows={[
            {
              id: 1,
              name: 'Hangtag',
              linkName: 'Download',
              url: 'x',
            },
            {
              id: 2,
              name: 'Posters ',
              linkName: 'Download',
              url: 'x',
            },
            {
              id: 3,
              name: 'Wall Paper',
              linkName: 'Download',
              url: 'x',
            },
          ]}
        />
        <div style={{ width: '100%', height: 0 }} />
        <MediaTable
          title="Press Releases"
          rows={[
            {
              id: 1,
              name: '1',
              linkName: 'Download',
              url: 'x',
            },
            {
              id: 2,
              name: '2',
              linkName: 'Download',
              url: 'x',
            },
          ]}
        />
        <div style={{ width: '100%', height: 60 }} />
      </ImageContainer>
    </div>

    <div style={{ marginTop: 6 }}>
      <TechnologyProjects
        title="Explore More"
        backgroundColor="#e3e3e3"
        list={[
          {
            title: 'Renewed Fiber is the Name of the Game',
            buttonText: 'Learn More',
            disabled: false,
            onClick: () => { redirect('about-saya'); },
            type: <span>ABOUT SAYA</span>,
          },
          {
            title: 'NEWS',
            buttonText: 'Learn More',
            disabled: false,
            onClick: () => { redirect('news'); },
            type: '',
          },
        ]}
      />
    </div>
  </React.Fragment>
);
