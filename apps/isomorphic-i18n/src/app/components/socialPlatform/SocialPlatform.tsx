'use client'
import style from './SocialPlatform.module.css';
import hero from '../../../../public/assets/hero.svg';
import photo from '../../../../public/social (1).webp';
import Image from 'next/image'
import Button from '../ui/Button'
import { useTranslation } from '@/app/i18n/client';
import { LinkPreview } from '../ui/link-preview';




const SocialPlatforms: React.FC =({lang}: { lang?: string }) => {
  const { t } =  useTranslation( lang!,"home");

  type image={
    photo:any
  }
  const img:image[]=[
    {photo:photo},
    {photo:photo},
    {photo:photo},
    {photo:photo},
    {photo:photo},
    {photo:photo},
    {photo:photo},
    {photo:photo},
    {photo:photo},

  ]


  return (
    <div className="slider-container w-full h-[700px] lg:h-[635px] xl:h-[680px] 4xl:h-[1050px] bg-white  overflow-hidden relative ">
      <div className={`hidden lg:block h-[700px] lg:h-[1050px] xl:h-[680px] 4xl:h-[1300px]`}>
      <div className={`${style.slider}  h-[700px] lg:h-[1050px] xl:h-[680px] 4xl:h-[1300px]`}>
        <div className={style.slideTrack}>
          {img.map((item,index)=>
          <div key={index} className={style.slide}>
            <Image loading='lazy' src={item.photo} className='lg-w-96 h-[100%]  '  alt="Social Media Platforms" />  
          </div>
          )}
      
        </div>
      </div>
          
      </div>
   
      <div className={`${style.layer}  `}>
        <div className={`w-11/12 xs:h-[510px] md:h-[635px] lg:h-[635px] 4xl:h-[950px] mx-auto md:pb-20 rounded-2xl relative lg:py-6 xl:py-5`}>
      <h1 className='font-bold text-xl md:text-[32px] lg:text-[26px] xl:text-[32px]  4xl:text-6xl text-center dark:text-[#362D59] text-[#362D59]'>{t("Social-head")}</h1>
      <p className='text-center font-regular text-base md:w-[40%] 4xl:text-2xl mx-auto dark:text-[#362D59] text-[#362D59] mt-5'>{t("Social-head-p")}</p>
      <Image src={hero} className='md:h-96 h-80 xs:h-64 4xl:h-[600px] xl:w-[40%] mx-auto rounded-lg my-4' alt="hero social" />
      <p className='text-center text-base font-regular 4xl:text-2xl mx-auto dark:text-[#362D59] text-[#362D59] mt-3 z-10 relative'>
          {t("Social-head-docP")}{" "}
          <LinkPreview
              url="https://sales-man-ten.vercel.app/en/documentation"
              className="font-bold bg-clip-text dark:text-geenColor text-greenColor "
          >
              {t("Social-head-doc")}
          </LinkPreview>{" "}
      </p>

      <div className="md:flex justify-center items-center gap-8 mt-3 4xl:mt-6 ">
          <Button className={`${style.btn1} group md:m-0 duration-100 mx-auto block w-full md:w-60 3xl:w-[270px] 4xl:w-[390px] h-11 4xl:h-16 text-center mb-2`} width='sm:230px' height='sm:40px'>
              <span className='4xl:text-3xl text-black duration-100 group-hover:text-secondaryText'>
                  {t("header-btn1")}
              </span>
          </Button>
          <Button className={`${style.btn2} group md:m-0 mx-auto block w-full md:w-60 3xl:w-[270px] 4xl:w-[390px] h-11 4xl:h-16 text-center pt-1 outline-4 text-mainText`} width='sm:200px' height='sm:40px'>
              <span className='4xl:text-3xl dark:text-secondaryText group-hover:text-mainText'>
                  {t("header-btn2")}
              </span>
          </Button>
      </div>
      
      {/* ديف خاص بالظل */}
        </div>
        <div className={`absolute bottom-0 left-0 right-0 h-[180px] ${style.blurBackground} z-[-1]`}></div>
      </div>
    </div>
  );
}

export default SocialPlatforms;
