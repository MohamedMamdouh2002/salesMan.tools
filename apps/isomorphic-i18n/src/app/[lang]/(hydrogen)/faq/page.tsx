import React from 'react'
import FaqComponent from '@/app/components/faq/Faq'
import { metaObject } from '@/config/site.config';
import { Metadata } from 'next/types';
export const metadata: Metadata = metaObject(
    'FAQ',  // عنوان الصفحة
    {
      title: 'FAQ - Sales Man',
      description: 'Frequently asked questions about Sales Man. Discover more about our services and how to make the most of them.',
      url: 'https://salesman.ordrat.com/faq',
      siteName: 'Sales Man',
      images: [
        {
          url: '/assets/hero1.jpg',  
          width: 1200,
          height: 630,
          alt: 'Sales Man FAQ',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    'Frequently asked questions about Sales Man. Discover more about our services and how to make the most of them.'
  );
  
function Faq() {
  return <>
  <FaqComponent/>
  </>
}

export default Faq