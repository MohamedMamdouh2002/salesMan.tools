import React from 'react';
import style from './Card.module.css';
import subIcon from '@public/feature/subIcon.svg'
import Image from 'next/image';
type cardProps = {
  sectionTitle: string;
  content: string;
};

const Card: React.FC<cardProps> = ({ sectionTitle, content }, { lang }: { lang?: string }) => {
  return (
    <>
<div className="card p-4  w-full md:w-[300px] lg:w-[250px] xl:w-[300px] 2xl:w-[360px] 4xl:w-[600px] font-montserrat h-auto dark:bg-[#171717] dark:border dark:border-[#3C3C3C] dark:border-b-0 border border-[#fff] border-b-0 py-6">
<div className="flex gap-3 items-center mb-5">
  <Image width={40} height={40} src={subIcon} className='p-2.5 bg-greenColor rounded-lg'  alt='sub icon'/>

      <p className="card-title font-medium text-greenColor dark:text-greenColor text-2xl 4xl:text-3xl">{sectionTitle}</p>
  </div>
      <p className="small-desc text-lg 4xl:text-2xl text-[#5D5D5D] dark:text-[#B9B9B9]">
        {content}
      </p>
    </div>
    </>
  );
};

export default Card;
