import React from 'react';

import TopSection from 'vaxalui/saya/Kenny/TopSection';
import TitleLineBox from 'vaxalui/saya/Kenny/TitleLineBox';
import Article from 'vaxalui/saya/Article';
import SayaBreadcrumbs from 'vaxalui/saya/Rick/Breadcrumbs';
import Post from 'vaxalui/saya/Post';
import Card from 'vaxalui/saya/Card';

import {
  urlPrefix,
} from 'config';

const articlePic1 = `${urlPrefix}images/logo2.png`;
const articlePic2 = `${urlPrefix}images/logo2.png`;
const articlePic3 = `${urlPrefix}images/logo2.png`;
const articlePic4 = `${urlPrefix}images/logo2.png`;

export const categories = {
  'blog/category1': {
    id: 1,
    routePathPrefix: 'blogc1/',
    paths: [
      { label: 'Blog', link: '' },
      { label: 'Category1', link: '' },
    ],
  },
  'blog/category2': {
    id: 2,
    routePathPrefix: 'blogc2/',
    paths: [
      { label: 'Blog', link: '' },
      { label: 'Category2', link: '' },
    ],
  },
};

export const tsArticles = [
  {
    id: 'ts-wiprp01',
    category: categories['blog/category1'],
    thumbnail: articlePic1,
    title: 'What is post-consumer\nrecycled polyester',
    description: 'Recycled polyester (rPET) is obtained by melting down existing plastic and re-spinning it into new polyester fiber.',
    content: [
      { type: 'paragraph', text: 'Recycled polyester (rPET) is obtained by melting down existing plastic and re-spinning it into new polyester fiber. Often rPET is made from plastic bottles but it can also be derived from other post-industrial and post-consumer input materials including textiles or garments. If recycled content is labeled post-consumer some of the content has been derived from used items or garments as opposed to post-industrial recycled content which never reached the consumer such as cutting scraps from a manufacturing facility.' },
      { type: 'image', src: articlePic1 },
      { type: 'paragraph', text: 'Using rPET gives a second life to a material that’s not biodegradable and would otherwise end up in landfill or the ocean. The Environmental Protection Agency reported that US’s landfills receive over 26 million tons of plastic a year and Ocean Conservancy reports that 8 million metric tons of plastic enter the ocean every year.' },
      { type: 'paragraph', text: 'In addition, production of fiber or products using rPET over virgin plastic requires less energy and produces less CO2 and it contributes to reducing the extraction of crude oil and natural gas from the Earth to make more plastic.' },
    ],
  },
  {
    id: 'ts-wiprp02',
    category: categories['blog/category1'],
    thumbnail: articlePic2,
    title: 'Recycled vs. Recyclable',
    description: 'Recycling is the process of collecting and processing materials that would otherwise be thrown away as trash...',
    content: [
      { type: 'image', src: articlePic2 },
      { type: 'paragraph', text: 'Recycled vs. Recyclable - Recycling is the process of collecting and processing materials that would otherwise be thrown away as trash and turning them into new products.  Recycled items are made with material from goods which were once used in another form. The Recyclability of a material depends on its ability to reacquire the properties it had in its virgin or original state or in another useful state such as Recycling PET water bottles into textiles. Recycled items are often Recyclable which means they can be recycled once again.' },
    ],
  },
  {
    id: 'ts-wiprp03',
    category: categories['blog/category1'],
    thumbnail: articlePic3,
    title: 'Mechanical Recycling',
    description: 'Mechanical recycling transforms materials into "new" secondary raw materials without changing the base...',
    content: [
      { type: 'paragraph', text: 'Mechanical Recycling - Mechanical recycling transforms materials into "new" secondary raw materials without changing the base molecular structure of the material. For example, after sorting and processing, plastic is shredded and then melted down and then re-extruded into plastic pellets. These pellets are then used in new polyester fibers or other products.  No chemicals are used in this method.' },
      { type: 'image', src: articlePic3 },
    ],
  },
  {
    id: 'ts-wiprp04',
    category: categories['blog/category1'],
    thumbnail: articlePic4,
    title: 'Chemical Recycling',
    description: 'Chemical recycling, also called advanced recycling,  is taking  plastic waste  and reducing it back to its...',
    content: [
      { type: 'paragraph', text: 'Chemical Recycling - Chemical recycling, also called advanced recycling,  is taking  plastic waste  and reducing it back to its original molecular form, which is indistinguishable from virgin polyester. This can then go back into the regular polyester manufacturing system and eventually be processed into entirely new polyester fiber or plastic items. Chemical recycling is accomplished by dissolving the plastic with enzymes or chemicals or using heat to break down plastics into their original components.' },
      { type: 'image', src: articlePic4 },
      { type: 'paragraph', text: 'Chemical recycling is used with plastics which are difficult to sort and process mechanically. It is also used to recycle plastics in food contact applications and packaging. The processes used in advanced recycling of used plastics either using chemicals or thermal processes takes place in the absence of oxygen so emissions from advanced recycling are generally considered very low.' },
    ],
  },
];

const articlePic5 = `${urlPrefix}pix_bw/fake/Screenshots 2020-09-16 at 12.41.55 AM.png`;
const articlePic6 = `${urlPrefix}pix_bw/fake/Screenshots 2020-09-16 at 12.42.08 AM.png`;
const articlePic7 = `${urlPrefix}pix_bw/fake/Screenshots 2020-09-16 at 12.42.27 AM.png`;

export const anArticles = [
  {
    id: 'an-wiprp01',
    category: categories['blog/category2'],
    thumbnail: articlePic7,
    title: 'SUSTON: ACHIEVING SUSTAINABILITY WITH SYNTHETIC FIBERS',
    description: '...',
    content: [
      { type: 'image', src: articlePic7 },
      // { type: 'paragraph', variant: 'heading4', text: 'ACHIEVING SUSTAINABILITY WITH SYNTHETIC FIBERS' },
      { type: 'paragraph', variant: 'heading4', text: 'ONE OF THE MOST ECO-CERTIFIED RECYCLED SYNTHETIC FIBERS ON THE PLANET, CHROMUCH, IS THE SUSTAINABLE FIBER THE PERFORMANCE AND OUTDOOR INDUSTRIES HAVE BEEN LOOKING FOR.' },
      { type: 'paragraph', text: 'If one were to summarize the textile industry’s environmental footprint in a nutshell, it all comes down to waste: wasteful resource extraction, wasteful production, and a wasteful use and disposal stage. Fortunately, there are solutions at every stage just waiting to be implemented.' },
      { type: 'paragraph', variant: 'subtitle', text: '100% post-consumer recycled' },
      {
        type: 'paragraph', text: `Polyester has performance and durability qualities that are hard to beat. But considering the sheer amounts of polyester waste currently being generated and the relative ease of recycling it, using virgin polyester hardly makes sense. Recycled polyester, on the other hand, effectively kills two birds with one stone: it reduces the need for raw resource extraction while mitigating waste stream impacts.
Chromuch fibers are made entirely of recycled post-consumer PET bottles, whereby every kilogram of Chromuch fiber uses 77 plastic bottles that would otherwise end up in landfills and seas. At end of life, Chromuch is working to offer fully-recyclable fabrics that can be returned to the recycled input stream from which it came.`,
      },
      { type: 'paragraph', variant: 'subtitle', text: '100% water-free production' },
      {
        type: 'paragraph', text: `When it comes to resources, none are more precious than water. But judging by the textiles industry’s water consumption and pollution, one could be forgiven for thinking this resource was in endless supply. Of course, the opposite is true: Just 1% of our planet’s water is unfrozen fresh water, a quantity that needs to satisfy both human and land animal thirsts.
Chromuch provides a solution to the industry’s unsustainable consumption of water by using absolutely no water at all. Employing a water-free solution dyeing process, Chromuch saves 3 gallons of fresh water per yard of fabric.`,
      },
      { type: 'paragraph', variant: 'subtitle', text: 'Fully certified' },
      {
        type: 'paragraph', text: `Recycled, waterless, durable and recyclable – Chromuch claims to be one of the most sustainable synthetic fibers out there, offering a cradle-to-cradle solution at each stage of the product cycle. But one needn’t take their word for it. With certifications like Global Recycled Standard 4.0, Bluesign Approved, Higg Index Certified, Oeko Tex, ISO-14001 and ISO-9001, Chromuch’s credentials can speak for themselves.`,
      },
      { type: 'paragraph', variant: 'subtitle', text: 'CHROMSHIELD™ TECHNOLOGY' },
      {
        type: 'paragraph', text: `If you placed a Chromuch fiber under a microscope, you’d find a colored fiber core. This is where the primary color ‘lives’ so to speak, but next comes the ‘shield’ – a solution dyed protective wrap that provides yet another layer of magnified color vibrancy, superior colorfastness, and the possibility to add a layer of performance functionality into the yarn such as UV, fire-retardant, quick-dry, cooling, heat retention, anti-static and antibacterial protection. The result is a premium, recycled polyester yarn that offers longer lasting, more intense colors and enhanced performance features for apparel and equipment.`,
      },
    ],
  },
  {
    id: 'an-wiprp02',
    category: categories['blog/category2'],
    thumbnail: articlePic6,
    title: 'SYNTHETIC FIBER MAKER CHROMUCH TEAMS WITH PROMOSTYL FOR 2021 COLOR GUIDE',
    description: 'Recycling is the process of collecting and processing materials that would otherwise be thrown away as trash...',
    content: [
      { type: 'image', src: articlePic5 },
      { type: 'paragraph', text: `Chromuch, a manufacturer of sustainable and color-rich synthetic fibers, has curated 50 colors for 2021 with trend agency and color specialist PromoSTYL. 
The 2021 Color Guide includes 50 signature hues in five color collections for applications in apparel and equipment, including activewear, athleisure, tents and sleeping bags. The collections range from sophisticated and urban “Push & Go” tones to calm, but intense colors in “Drift Away.”

“With over 1,000 colors in the total palette, designers can now take a modern approach to design where sustainable sourcing and premium color come first,” a spokesperson for Chromuch said. “By partnering with PromoSTYL, we are taking the risks out of the coloring process for our customers by ensuring that the right colors hit the market at the right time.”

Chromuch noted that its solution-dyed synthetic fibers are fade-resistant, made from post-consumer recycled plastic bottles and use no water in the dyeing process.
“In the world of sportswear, manufacturing times are very long because it is more technical and it is important to anticipate trends well in advance–usually around two years,” Marion Hugoo, a color specialist from PromoSTYL, said. “Tastes evolve, so you have to be as close as possible to the consumer’s aspirations.”

She said as activewear is increasingly inspired by fashion, the Chromuch collection has refined shades that are more urban and subtle.

“One of the key strengths of Chromuch is the very dense and deep colors available, and also the subtle fluorescent colors, especially the very elegant bleached fluorescent yellows,” Hugoo said. “We love their pale yellow, orange and green fluros.”` },
      { type: 'image', src: articlePic6 },
      { type: 'paragraph', text: `Chromuch is also introducing Chromuch Now, a developer-friendly program of competitively priced, trend-right colors that are in stock for better lead times and low minimum order quantities. The program allows developers to select PromoSTYL-curated colors while eliminating the need to color- match.

PromoSTYL is an international design and trend-forecasting agency that deciphers the latest and most relevant lifestyle and design currents that reflect the trends across design, fashion, consumer behavior and marketing to give clients a strategic edge in the marketplace.` },
    ],
  },
];


export const articleMap = {
  ...tsArticles.reduce((m, a) => ({ ...m, [a.id]: a }), {}),
  ...anArticles.reduce((m, a) => ({ ...m, [a.id]: a }), {}),
};
