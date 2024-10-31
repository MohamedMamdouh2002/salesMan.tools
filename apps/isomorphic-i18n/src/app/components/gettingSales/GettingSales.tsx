'use client'
import React from 'react'
import style from './GettingSales.module.css'
import hero from '@public/assets/hero.svg'
import Face from '@public/assets/heroFace.svg'
import net from '@public/assets/net.svg'
import line from '@public/assets/line.svg'
import facebook from '@public/social/facebook.svg'
import insta from '@public/social/instagram.svg'
import tiktok from '@public/social/tiktok.svg'
import youtube from '@public/social/youtube.svg'

import Image from 'next/image'
import { useTranslation } from '@/app/i18n/client';
import Button from '../ui/Button'
const images=[facebook,youtube,insta,tiktok]
function GettingSales({lang}:{lang?:string}) {
    const { t } = useTranslation( lang!,"home");

  return <>
  <div className="relative dark:bg-mainBg bg-[#F5F9FC]">
    <div className="absolute w-full h-full top-0 right-0">
        <Image width={600} height={300} className=' h-full' src={net} alt='salesMan hero'/>
    </div>
    <div className={`w-11/12 md:w-9/12 3xl:11/12 mx-auto `}>
        <div className="lg:flex items-center justify-between">
            <div className="">
                <div className="flex items-center gap-1">
                    <Image width={600} height={300} className='w-8 h-8' src={Face} alt='salesMan hero'/>
                    <h3 className='text-black dark:text-white font-bold text-xl'>{t('Sales-Man')}</h3>
                </div>
                <h4 className='text-4xl py-2 dark:text-white text-black font-semibold'>{t('getting-start')}</h4>
                <div className=" space-y-2">
                    <p className='text-2xl dark:text-white text-black font-regular'>{t('we-support')}</p>
                    <p className='text-2xl dark:text-white text-black font-regular'>{t('get-support')}</p>
                </div>
                <div className="md:flex  items-center gap-8 mt-6  ">
                    <Button className={`${style.btn1} group md:m-0 duration-100 mx-auto block w-full md:w-60 3xl:w-[270px] 4xl:w-[390px] h-11 4xl:h-16 text-center mb-2`} width='sm:230px' height='sm:40px'>
                        <span className='4xl:text-3xl text-black duration-100 group-hover:text-secondaryText'>
                            {t("header-btn1")}
                        </span>
                    </Button>
                    <Button className={`${style.btn2} group md:m-0 mx-auto block w-full md:w-60 3xl:w-[270px] 4xl:w-[390px] h-11 4xl:h-16 text-center pt-1 outline-4 text-mainText`} width='sm:200px' height='sm:40px'>
                        <span className='4xl:text-3xl text-black dark:text-white  group-hover:text-mainText'>
                            {t("header-btn2")}
                        </span>
                    </Button>
                </div>
               
            </div>
            <div className="">
                <Image width={600} height={300} className='w-full h-60 md:mt-0 mt-10 md:h-full' src={hero} alt='salesMan hero'/>
            </div>
        </div>
        <div className=" py-5">
            <Image width={600} height={300} className='w-full h-5' src={line} alt='salesMan hero'/>
            <div className="flex">
                {images?.map((img,index)=>

                <Image key={index} width={600} height={300} className='w-1/4 sm:h-10 h-5 ' src={img} alt='salesMan hero'/>
                )}
            </div>
        </div>
    </div>
  </div>
  </>
}

export default GettingSales