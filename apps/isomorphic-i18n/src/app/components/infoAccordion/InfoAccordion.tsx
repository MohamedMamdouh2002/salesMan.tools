"use client"

import { useEffect, useState } from 'react';
import style from './InfoAccordion.module.css';
import { useTranslation } from '@/app/i18n/client';
import { getInfoAccordion } from '@/lib/api/getInfoAccordion';
import AccordionSection from '../ui/accordion/Accordion'; 
import svgRight from '@public/accordion/svg-path.svg';
import svgLeft from '@public/accordion/svg-path (1).svg';
import svgbottom from '@public/accordion/XGZiSPjFHi.json';

const InfoAccordion: React.FC<{ lang?: string }> = ({ lang }) => {
  const [info, setInfo] = useState<any[]>([]);
  const { t } = useTranslation(lang!, 'home');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getInfoAccordion();
      if (data && data.length > 0) {
        setInfo(data);
        console.log('====================================');
        console.log("data",data);
        console.log('====================================');
      }
    };
    fetchData();
  }, []);
  return (
    <div className={`bg-[#F8FAFC] md:h-auto relative font-montserrat`}>
      <div className={`${style.layer} dark:bg-mainBg bg-[#F8FAFC] h-auto`}>
        <div className="md:w-9/12 w-11/12 mx-auto 4xl:w-9/12 flex justify-between ">
          <div className="">
            {info.map((section, index) => {
              const direction = index % 2 === 0 ? 'rtl' : 'ltr';
              return (
                <AccordionSection
                  key={section.id}
                  section={section}
                  direction={direction}
                  sectionIndex={index} 

                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoAccordion;
