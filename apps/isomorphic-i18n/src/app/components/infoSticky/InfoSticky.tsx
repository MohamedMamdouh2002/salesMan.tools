'use client';
import { useEffect, useState } from 'react';
import style from './InfoSticky.module.css';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { useTranslation } from "@/app/i18n/client";
import { getBenfit } from '@/lib/api/getBenfit';
import Image from 'next/image';
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


const InfoSticky: React.FC = ({ lang }:{ lang?: string }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 600;
  const {t}=useTranslation(lang!,'home')
  const [benfit, setBenfit] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
            const data = await getBenfit();
            if (data) {
                setBenfit(data);
            }
     
    };
    fetchData();
}, []);
// const settings = {
//   className: "center",
//   // dots:true,
//   centerMode: true,
//   infinite: true,
//   centerPadding: "0", 
//   slidesToShow: 3, 
//   speed: 500,
//   autoplay: true, 
//   autoplaySpeed: 3000, 
//   responsive: [
//     {
//       breakpoint: 1024, 
//       settings: {
//         slidesToShow: 2,  
//       }
//     },
//     {
//       breakpoint: 768, 
//       settings: {
//         // dots:true,
//         slidesToShow: 1, 
//       }
//     }
//   ]
// };

  return (
  
      <section className={`relative md:flex md:justify-center bg-[#F8FAFC] dark:bg-[#1C1C1C] font-inter py-10`}>
        <div className={`${style.clipBg} bg-slate-50 dark:bg-[#1C1C1C]`}></div>
        <div className="w-full py-10">
          <div className="text-center mb-10 w-5/6 md:w-4/6 mx-auto">
            <h1 className={`text-5xl 3xl:text-6xl 4xl:text-8xl font-bold `}>
              <span className= {`text-[#171717] dark:text-white font-regular text-4xl md:text-[55px] 4xl:text-8xl`}>{t("Info-sticky-text-why")}</span> <br className='md:hidden block '/><span className={`${style.infoStickyHeader2}  dark:bg-gradient-to-r dark:from-secondaryBg dark:to-greenColor text-4xl md:text-[55px] 4xl:text-8xl md:text-5xl`}>{t("Info-sticky-text-sales")}</span>
            </h1>
            <p className={`${style.infoStickyText} text-[#5B5B5C] dark:text-[#BBBBBB] my-5 font-medium text-base md:text-xl 3xl:text-2xl 4xl:text-3xl`}>
              {t("Info-sticky-text-p")}{" "}{t("Info-sticky-text-p-bold")}
            </p>
     
          </div>
          <div className="">
            <Swiper
              spaceBetween={0}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter:true
              }}
              modules={[Autoplay]}
              breakpoints={{
                  0: {
                      slidesPerView: 1,
                      slidesPerGroup: 1,
                  },
                  
                  425: {
                      slidesPerView: 1,
                      slidesPerGroup: 2,
                  },
                  520: {
                      slidesPerView: 1,
                      slidesPerGroup: 2,
                  },
                  640: {
                      slidesPerView: 2,
                      slidesPerGroup: 1,
                  },
                  800: {
                      slidesPerView: 2,
                      slidesPerGroup: 1,
                  },
                  1024: {
                      slidesPerView: 3,
                      slidesPerGroup: 1,
                  },
                  1280: {
                      slidesPerView: 3,
                      slidesPerGroup: 1,
                  },
                  2080: {
                      slidesPerView: 3,
                      slidesPerGroup: 1,
                  },
              }}
            >

              {benfit.map((item) => (
              <SwiperSlide key={item.id} className='flex'>
                <div key={item.id} className="flex gap-52">
                  <div
                    className={`${style.textBg} secShadow mx-auto hover:cursor-grab dark:border dark:border-[#262626] dark:border-b-0  dark:bg-[#171717] 4xl:h-[300px] 4xl:w-[800px] 3xl:h-[250px] 3xl:w-[600px] 2xl:w-[480px] xl:w-[400px] lg:w-[320px] md:w-[380px] w-5/6 h-[200px] 4xl:mt-32 p-5 bg-[#fff]`}
                  >
                    <div className="flex justify-start">
                      <Image
                        src={item.imageUrl}
                        width={30}
                        height={30}
                        className={`${style.icon} dark:bg-[#262626] dark:border dark:border-[#3B3B3B] w-14 h-14  3xl:w-[70px] 4xl:w-20 4xl:h-20 p-2 rounded-md`}
                        alt="icon"
                      />
                    </div>
                    <div className="ml-0">
                      <h2 className="dark:text-white text-lg xl:text-xl font-semibold 3xl:text-4xl 4xl:text-4xl pt-4 mb-2 text-start text-[#000]">
                        {item.name}
                      </h2>
                      <h3 className={`text-[#171717] dark:text-[#9E9E9E] text-sm lg:text-base font-light 3xl:text-2xl 4xl:text-3xl text-start`}>
                        {item.description}
                      </h3>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              ))}
            </Swiper>
        
            
          </div>   
          <div className="flex flex-col items-center justify-center">
              <Button className={`${style.Link} flex items-center group lg:mx-0 mx-auto mb-2 dark:hover:bg-white dark:text-black my-5 font-medium group text-sm w-52 h-12 md:w-72 md:h-12  4xl:h-24 4xl:text-3xl 4xl:w-[400px]`} width="sm:230px" height="sm55px">
                <p className={`${style.linkP} text-base 4xl:text-3xl dark:text-black dark:group-hover:text-black  group-hover:text-white text-black `}>{t("Info-sticky-btn")}</p>
                {/* <FontAwesomeIcon icon={faLayerGroup}  className='mt-1 dark:hover:text-red-400 dark:text-secondaryText'/> */}
              </Button>
              <span className={` ${style.infoStickyText} text-xs 4xl:text-2xl font-semibold text-[#393939] dark:text-white`}>
              {t("Info-sticky-p-cancel1")} <span className={` text-xs 4xl:text-2xl dark:text-greenColor text-greenColor font-bold`}> {t("Info-sticky-p-cancel2")}</span>
              </span>
          </div>

        
        </div>
      </section>
    
  );
};

export default InfoSticky;
