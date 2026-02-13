/*
  online images

    https://www.pexels.com/

    https://unsplash.com/
*/

import type { Sample } from '~/types/Sample';
import type { RemoteImage } from '~/types/RemoteImage';

//----------------------------------------------------------------------------//

const remoteImages: RemoteImage[] = [
  {
    altText: 'sunlight-streams-through-a-snow-covered-forest',
    source:
      'https://unsplash.com/photos/sunlight-streams-through-a-snow-covered-forest-j1OtjqKMfJU',
    url: 'https://images.unsplash.com/photo-1770836175449-c1e0c3e87f2c'
  },

  {
    altText: 'cavalo-branco-em-cena-de-nascer-do-sol-nevado-no-inverno',
    source:
      'https://www.pexels.com/photo/cavalo-branco-em-cena-de-nascer-do-sol-nevado-no-inverno-35758271',
    url: 'https://images.pexels.com/photos/35758271/pexels-photo-35758271.jpeg'
  },

  {
    altText: 'basilica-de-sao-pedro-e-rio-tibre-em-roma',
    source:
      'https://www.pexels.com/photo/basilica-de-sao-pedro-e-rio-tibre-em-roma-35874529',
    url: 'https://images.pexels.com/photos/35874529/pexels-photo-35874529.jpeg'
  },

  {
    altText: 'montanhas-majestosas-cobertas-de-neve-ao-nascer-do-sol',
    source:
      'https://www.pexels.com/photo/montanhas-majestosas-cobertas-de-neve-ao-nascer-do-sol-35917021',
    url: 'https://images.pexels.com/photos/35917021/pexels-photo-35917021.jpeg'
  }
];

const getHeroImage = (imageIndex: number) => {
  const image = remoteImages[imageIndex];

  if (!image) {
    return {};
  }

  return {
    heroImage: image.url,
    heroImageAltText: image.altText
  };
};

const getMarkdownImage = (imageIndex: number) => {
  const image = remoteImages[imageIndex];

  if (!image) {
    return '';
  }

  return `![${image.altText}](${image.url})`;
};

//---

export const samples: Sample[] = [
  {
    slug: 'sample-page-1',
    title: 'Sample page without any image',
    content: `there no image to show here, sorry...`
  },

  {
    slug: 'sample-page-2',
    title: 'Sample page with hero image',
    ...getHeroImage(0),
    content: `Sample page that has only an hero image`
  },

  {
    slug: 'sample-page-3',
    title: 'Sample page with images only on its content',
    content: `Sample page 3 content

text 1
${getMarkdownImage(2)}
text 2
${getMarkdownImage(3)}
text 3
    `
  },

  {
    slug: 'sample-page-4',
    title: 'Sample page with images',
    ...getHeroImage(2),
    content: `text 1
${getMarkdownImage(1)}
text 2`
  }
];
