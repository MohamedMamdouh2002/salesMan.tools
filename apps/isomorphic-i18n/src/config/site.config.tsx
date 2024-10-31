import { Metadata } from 'next';
import logoImg from '@public/logo.svg';
import { LAYOUT_OPTIONS } from '@/config/enums';
import logoIconImg from '@public/logo-short.svg';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import logo from '@public/assets/hero1.jpg'

enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: 'Sales Man ',
  description: `Salesman is one of the best sites in digital marketing`,
  logo: logoImg,
  icon: logoIconImg,
  mode: MODE.DARK,
  layout: LAYOUT_OPTIONS.HYDROGEN,
  // TODO: favicon
};

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  return {
    title: title ? `${title} - Sales Man` : siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} Sales Man` : title,
      description,
      url: 'https://isomorphic-furyroad.vercel.app',
      siteName: 'Sales Man', // https://developers.google.com/search/docs/appearance/site-names
      images: {
        url: '@public/assets/hero1.jpg',
        width: 1200,
        height: 630,
      },
      locale: 'en_US',
      type: 'website',
    },
  };
};
