import Documentation from '@/app/components/doc/Documentation';
import React from 'react'

function Doc(
{ params: { lang },
}: {
  params: {
    lang?: string;
  };
}) {
  return <>
  <Documentation lang={lang!}/>
  </>
}

export default Doc