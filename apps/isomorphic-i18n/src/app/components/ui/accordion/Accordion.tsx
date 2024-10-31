"use client";
import { useState, useEffect } from 'react';
import style from './Accordion.module.css';
import Image from 'next/image';
import Lottie from 'lottie-react';
import svgLeft from '@public/accordion/svg-path (1).svg';
import svgbottom from '@public/accordion/XGZiSPjFHi.json';
import svgRight from '@public/accordion/svg-path.svg';
import walk from '@public/infoAccordion/walk.svg'
import alert1 from '@public/infoAccordion/alert1.svg'
import alertLeft from '@public/infoAccordion/alert2Left.svg'
import hands from '@public/infoAccordion/hands.svg'
import alertHang from '@public/infoAccordion/alertHang.svg'
import rightRocket from '@public/infoAccordion/rightRocket.svg'
import leftRocket from '@public/infoAccordion/leftRocket.svg'
import baseRocket from '@public/infoAccordion/baseRocket.svg'
import stars from '@public/infoAccordion/stars.svg'
import thanksRight from '@public/infoAccordion/thanksRight.svg'
import thanksLeft from '@public/infoAccordion/thanksLeft.svg'
import alertTop from '@public/infoAccordion/alertTop.svg'
const AccordionSection: React.FC<{ 
  section: any; 
  direction: string; 
 
  sectionIndex: number; // Add sectionIndex to receive the index of each section
}> = ({ section, direction, sectionIndex }) => { // Receive sectionIndex here
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const [pageDirection, setPageDirection] = useState<string>(direction);

  useEffect(() => {
    if (section.sectionItems.length > 0) {
      setSelectedItem(section.sectionItems[0].id);
      setSelectedVideoUrl(section.sectionItems[0].videoUrl);
    }
  }, [section.sectionItems]);

  const handleItemClick = (id: string, videoUrl: string) => {
    setSelectedItem(id);
    setSelectedVideoUrl(videoUrl);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 800);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isSmallScreen) {
      const lang = document.documentElement.lang || 'en';
      setPageDirection(lang === 'ar' ? 'rtl' : 'ltr');
    } else {
      setPageDirection(direction);
    }
  }, [isSmallScreen, direction]);

  return (
    <div
      className={`md:py-20 py-5 lg:grid lg:grid-cols-12 4xl:grid-cols-10 justify-center items-center gap-20 4xl:gap-20 ${
        pageDirection === 'rtl' ? 'lg:flex-row-reverse lg:dir-rtl flex-col' : 'lg:flex-row lg:dir-ltr flex-col'
      }`}
      dir={pageDirection}
      style={{ justifyContent: 'center' }}
    >
      <div className={`col-span-4 xl:col-span-4 4xl:col-span-4`}>
        <h2 className="my-3 font-bold dark:text-white text-darkGreenColor text-sm 4xl:text-2xl">
          {section.title}
        </h2>
        <p className="text-3xl font-bold 4xl:text-5xl my-2 4xl:my-5 text-darkGreenColor dark:text-white">{section.content}</p>
        {section.sectionItems.map((item: { id: string; name: string; description: string; videoUrl: string }) => (
          <div
            key={item.id}
            className={`cursor-pointer p-4 mb-4 rounded-lg ${
              selectedItem === item.id
              ? `lg:h-52 4xl:h-96 bg-white w-full dark:bg-white  4xl:p-10 ${style.hover2}`
              : `${style.secClose} text-[#002312] bg-[#21E786] dark:bg-[#57DF98] group hover:text-white dark:text-[#003829] 4xl:h-24 4xl:pt-7`
            } transition-all duration-500 ease-in-out`}
            onClick={() => handleItemClick(item.id, item.videoUrl)}
          >
            <h3
              className={`${
                selectedItem === item.id
                  ? 'text-[#002312] hover:text-white dark:text-[#002312]'
                  : 'dark:text-[#002312] text-[#002312] group-hover:dark:text-white'
              } text-xl font-bold 4xl:text-4xl group-hover:dark:text-white group-hover:text-white`}
            >
              {item.name}
            </h3>

            {selectedItem === item.id && (
              <>
                <p className="mt-2 4xl:mt-3 text-base font-regular text-b text-[#002312] dark:text-[#002312]">{item.description}</p>
                <div className={`lg:hidden`}>
                  {selectedVideoUrl ? (
                    <div className="relative px-4 pt-2">
                      <video
                        className="z-10 relative lg:w-[900px] lg:h-[500px] 4xl:h-[700px] 4xl:w-[2000px]"
                        autoPlay
                        autoFocus
                        muted
                        key={selectedVideoUrl}
                      >
                        <source src={selectedVideoUrl} type="video/webm" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ) : (
                    <p>Select an item to display the video</p>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className={`col-span-8 xl:col-span-8 4xl:col-span-6 lg:flex hidden`}>
      {selectedVideoUrl ? (
        <div className="relative z-50 px-4 flex justify-end ">
          <video
            className="lg:w-[800px] flex justify-end px-1.5 lg:h-[500px] 4xl:h-[700px] 4xl:w-[2000px] relative z-20" // اجعل الفيديو في طبقة أعلى
            autoPlay
            autoFocus
            muted
            key={selectedVideoUrl}
          >
            <source src={selectedVideoUrl} type="video/webm" />
          </video>
          
          {/* Apply styles conditionally based on the section index */}
          {(sectionIndex === 0 || sectionIndex === 3) &&(
            <>
              <Image src={walk} alt="svg" className="absolute -z-10 left-5 -bottom-4" />
              <Image src={alert1} alt="svg" className="absolute z-50 right-5 -bottom-6" />
              <Image src={alertLeft} alt="svg" className="absolute -z-30 left-1 bottom-[205px]" />
              <Image src={hands} alt="svg" className="absolute z-50 left-4 bottom-52" />
            </>
          )}
          {(sectionIndex === 1 || sectionIndex === 4) &&(
            <>
              <Image src={stars} alt="svg" className="absolute -z-30 right-0  bottom-0  " />
              <Image src={alertHang} alt="svg" className="absolute z-50 right-4  lg:-bottom-0  xl:-bottom-8 2xl:-bottom-14 4xl:-bottom-14" />
              <Image src={rightRocket} alt="svg" className="absolute z-50 -right-7 bottom-4" />
              <Image src={leftRocket} alt="svg" className="absolute z-50 -left-7 bottom-4" />
              <Image src={baseRocket} alt="svg" className="absolute z-50 left-[44%]  lg:-bottom-[32px] xl:-bottom-[63px] 2xl:-bottom-[82px]  4xl:-bottom-[88px]" />
            </>
          )}
          {(sectionIndex === 2 || sectionIndex === 5) &&(
            <>
              <Image src={alertTop} alt="svg" className="absolute -z-30 right-28 lg:top-[66px] 2xl:top-4" />
              <Image src={thanksLeft} alt="svg" className="absolute z-50 left-4 -bottom-20" />
              <Image src={thanksRight} alt="svg" className="absolute -z-30 left-36  -bottom-20  " />
              
            </>
          )}
        </div>
      ) : (
        <p>Select an item to display the video</p>
      )}

      </div>
    </div>
  );
};

export default AccordionSection;
