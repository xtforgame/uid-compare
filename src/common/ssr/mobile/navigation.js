// import {
//   urlPrefix,
//   routerPrefix,
// } from 'config';
import Home from './Home';
import TechnologiesNowOverview from './Technologies/Overview';
import TechnologiesNowCoastal from './Technologies/NowCoastal';
import TechnologiesNowUsa from './Technologies/NowUsa';
import TechnologiesNextRscuw from './Technologies/NextRscuw';
import TechnologiesSustainabilityInnovations from './Technologies/SustainabilityInnovations';

import ProductsOverview from './Products/Overview';
import ProductsSaya365 from './Products/Saya365';
import ProductsChromuchSolutionDyed from './Products/ChromuchSolutionDyed';
import ProductsSayaStretch from './Products/SayaStretch';
import ProductsSayaFresh from './Products/SayaFresh';
import ProductsSayaMicrofiber from './Products/SayaMicrofiber';

import AboutNews from './About/News';
import AboutSaya from './About/Saya';
import AboutMediaDownloads from './About/MediaDownloads';

import PartnersOverview from './Partners/Overview';
import PartnersCertifications from './Partners/Certifications';
import PartnersBrandPartners from './Partners/BrandPartners';
import PartnersTextilePartners from './Partners/TextilePartners';


export const navigation = [
  {
    name: '',
    path: 'mobile',
    component: Home,
    exact: true,
  },
  {
    name: 'TECHNOLOGIES',
    listDirection: 'bottom',
    items: [
      {
        name: 'Bottles',
        path: 'mobile/bottles',
        listDirection: 'right',
        component: TechnologiesNowOverview,
      },
      {
        name: 'RSCUW / Next',
        path: 'mobile/rscuw-next',
        listDirection: 'right',
        component: TechnologiesNextRscuw,
      },
      {
        name: 'GARMA / Next',
        path: 'mobile/garma-next',
        disabled: true,
        listDirection: 'right',
      },
      {
        name: 'Knowledge Base',
        path: 'mobile/knowledge-base',
        exact: true,
        component: TechnologiesSustainabilityInnovations,
      },
      {
        name: '',
        path: 'mobile/knowledge-base/:articleId',
        component: TechnologiesSustainabilityInnovations,
      },
    ],
  },
  {
    name: 'PRODUCTS',
    listDirection: 'bottom',
    items: [
      {
        name: 'SAYA 365',
        path: 'mobile/saya-365',
        component: ProductsSaya365,
      },
      {
        name: 'Performance',
        listDirection: 'right',
        items: [
          {
            name: 'Solution Dyed',
            path: 'mobile/chromuch',
            component: ProductsChromuchSolutionDyed,
          },
          {
            name: 'Stretch',
            path: 'mobile/saya-stretch',
            component: ProductsSayaStretch,
          },
          {
            name: 'Fresh',
            path: 'mobile/saya-fresh',
            component: ProductsSayaFresh,
          },
          {
            name: 'Microfiber',
            path: 'mobile/saya-microfiber',
            component: ProductsSayaMicrofiber,
          },
        ],
      },
    ],
  },
  {
    name: 'ABOUT',
    listDirection: 'bottom',
    items: [
      {
        name: 'SAYA',
        path: 'mobile/about-saya',
        component: AboutSaya,
      },
      {
        name: 'News',
        path: 'mobile/news',
        exact: true,
        component: AboutNews,
      },
      {
        name: '',
        path: 'mobile/news/:articleId',
        component: AboutNews,
      },
      // {
      //   name: 'Version & Mission',
      //   path: 'mobile/version-mission',
      //   component: AboutVisionMission,
      // },
      {
        name: 'Media',
        path: 'mobile/media',
        component: AboutMediaDownloads,
      },
    ],
  },
  {
    name: 'PARTNERS',
    listDirection: 'bottom',
    items: [
      {
        name: 'Overview',
        path: 'mobile/partners-overview',
        component: PartnersOverview,
      },
      {
        name: 'Manufacturers',
        path: 'mobile/manufacturers',
        component: PartnersTextilePartners,
      },
      {
        name: 'Brands',
        path: 'mobile/partners-brandpartners',
        component: PartnersBrandPartners,
      },
      {
        name: 'Certifications',
        path: 'mobile/partners-certifications',
        component: PartnersCertifications,
      },
    ],
  },
];

export default navigation;

export const forEachNodeRecur = (node, cb) => {
  cb(node);
  if (node.items) {
    node.items.forEach(node => forEachNodeRecur(node, cb));
  }
};

export const forEachNode = (cb) => {
  navigation.forEach(node => forEachNodeRecur(node, cb));
};
