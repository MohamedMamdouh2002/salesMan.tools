'use client'
import Image from 'next/image'
import home from '../../../../public/assets/home.webp'
import style from './Header.module.css'
import Button from '../ui/Button'
import body from '../../../../public/assets/9295e98e-b8b1-4fab-87de-4c380471d772.svg'
import hand from '../../../../public/assets/d96ad54e-110a-4c13-b2c8-36689e7f8a4e.svg'
import linked from '../../../../public/social/linkedin.svg'
import instagram from '../../../../public/social/instagram.svg'
import facebook from '../../../../public/social/facebook.svg'
import tiktok from '../../../../public/social/tiktok.svg'
import whatsApp from '../../../../public/social/whatsapp.svg'
import snapchat from '../../../../public/social/snapchat.svg'
import telegram from '../../../../public/social/telegram.svg'

import { useTranslation } from "@/app/i18n/client";
import { Link } from 'react-scroll'
import { faAnglesUp} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  useEffect, useMemo, useState } from "react";




function Header({lang}: { lang?: string }) {
    const [showbtn,setShowBtn]=useState(false)
    
    const { t } = useTranslation( lang!,"home");
    type iconsProps={
      id:number
      img:string
    }
   

   
  useEffect(() => {
    window.addEventListener('scroll',()=>{
      if(window.scrollY>300){
        setShowBtn(true)
      }else{
        
        setShowBtn(false)
        
      }
      
    })
  }, [])

  return (
    <main>
      <header id='home' className={`overflow-hidden flex justify-between h-auto pt-3 pb-8  relative font-montserrat  text-mainText  bg-lightGradient dark:bg-darkGradient `}>
        <div className={`w-11/12 md:w-9/12 3xl:11/12 mx-auto `}>
        <div className={`${style.flashBg} dark:before:bg-mobileFlash md:dark:before:bg-flash  dark:before:absolute dark:before:left-0 dark:before:bottom-[4%] dark:before:w-[100%]  md:dark:before:h-[80%]  dark:before:h-[80%] dark:before:z-[0]`}></div>
        <div className="flex justify-center my-5">
            <Button className={`${style.headerBtn1} group h-20 md:h-12 3xl:w-[700px] 4xl:w-[1100px] 3xl:h-16 4xl:h-20 w-[250px] px-4 py-2 font-[14px] md:font-[16px] md:w-[590px]`} width='sm:560px' height='sm:60px'>
           <span className='text-sm md:text-base 3xl:text-xl 4xl:text-2xl dark:text-mainText dark:hover:text-secondaryText text-mainText group-hover:text-secondaryText'>
               {t('header-top-btn')}
            </span>
            </Button>
          </div>
          <h1 className='font-monsemibold relative z-10 md:font-monbold text-[#004030] dark:text-white dark:z-50 text-6xl 3xl:text-[120px] 4xl:text-[165px] xs:text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl  mt-8 text-center '>
            {t("header-text1-breaks")} <span className={`${style.animateBreak}  dark:z-50 text-[#43DC8D] dark:text-greenColor duration-150`}>{t("header-text2-breaks")}</span>{t("header-text3-breaks")} 
          </h1>
       

          <p className='text-xl dark:z-1 dark:relative dark:text-white text-darkGreenColor 3xl:text-3xl 4xl:text-4xl 4xl:my-16 font-monmedium mt-12 text-center'>
           {t("header-p")}
          </p>
   
          <div className="md:flex justify-center items-center gap-5 mt-7">
            <Button className={`${style.btn1} dark:z-50 md:m-0 mx-auto block w-60  md:w-60 3xl:w-[270px] 4xl:w-[370px] group  h-9 3xl:h-11 4xl:h-14 text-center dark:bg-white bg-mainBg hover:bg-[#56F09F] dark:hover:bg-[#56F09F]  mb-2`} width='sm:230px' height='sm40px'>
              <span className='4xl:text-3xl 3xl:text-xl text-mainText  dark:text-secondaryText group-hover:text-black '>
                  {t("header-btn1")}
              </span>
            </Button>
            <Button className={`${style.btn2}  z-50 md:m-0 mx-auto block w-60 md:w-48 group 3xl:w-[230px] 4xl:w-[330px] h-9 3xl:h-11 4xl:h-14 text-center pt-1 outline-4 text-black`} width='sm:200px' height='sm40px'>
            <span className='4xl:text-3xl 3xl:text-xl text-black group-hover:text-white  dark:text-white '>
                  {t("header-btn2")}
              </span>
            </Button>
          </div>
          <div className="flex justify-center mt-28 z-50 relative">
          <Image     
            src={home}
            alt="Photo from dashboard"
            width={720}
            height={400}
            rel='preload'
            loading="lazy"
            className='z-[2]'
            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 720px"
          />

            <div className={` ${style.errorAnimate}`}>
              <Image loading='lazy' className={`w-8 md:w-20 absolute -top-[2px]  md:-top-1 right-[102px]  delay-200 md:right-[380px]  2xl:right-[480px] 3xl:right-[580px] 4xl:right-[780px]  `}  src={hand} alt='5' />
              <Image loading='lazy' className={`-z-10 w-8 md:w-20 absolute delay-200 -top-7 md:-top-[50px] right-[100px] md:right-[380px] 2xl:right-[480px] 3xl:right-[580px] 4xl:right-[780px] `} src={body} alt='5' />
            </div>
            <div className={` ${style.errorAnimate}`}>
              <Image loading='lazy' className='w-6 md:w-12 absolute -top-[2px]  md:-top-1 right-[70px] md:right-[288px] 2xl:right-[388px] 3xl:right-[488px] 4xl:right-[680px]' src={hand} alt='5' />
              <Image loading='lazy' className={`-z-10  w-6 md:w-12 absolute delay-200 -top-3 md:-top-[30px] right-[70px] md:right-72 2xl:right-[388px] 3xl:right-[488px]  4xl:right-[680px]`} src={body} alt='5' />
            </div>
          </div>
        </div>
          {showbtn&& (  <Link 
                          activeClass="active" 
                          to="home" 
                          spy={true} 
                          smooth={true} 
                          offset={-200} 
                          duration={500} 
                          >
              <button  className='duration-700 leading-4   bg-greenColor 4xl:w-20 4xl:h-20 w-12 h-12   z-[999] fixed 4xl:right-16 4xl:bottom-10 right-5 bottom-6 rounded-full'>
              <FontAwesomeIcon icon={faAnglesUp}  className='text-white text-lg 4xl:text-3xl' />
              </button>
              </Link>
          )}
      </header>
    </main>
  );
}

export default Header;
