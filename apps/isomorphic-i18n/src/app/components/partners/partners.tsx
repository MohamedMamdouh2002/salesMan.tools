'use client'
import React from 'react'
import Image from 'next/image'
import { images } from '@/data/partner'
import style from './partners.module.css'
import { useTranslation } from '@/app/i18n/client';

const Partners: React.FC<{ lang: string }> = ({ lang }) => { 
  const { t } = useTranslation(lang, "home");

  return (
    <>
      <section className="dark:bg-[#1C1C1C] bg-[#F8FAFC] py-16">
        <div className="mx-auto rounded-3xl h-[400px] py-10">
          <h2 className="text-[#171717] dark:text-white mb-10 w-11/12 mx-auto text-base lg:text-xl text-center tracking-[4px] font-monbold font-montserrat capitalize">
            {t('partner')}
          </h2>
          <div className="logoSlider overflow-x-hidden">
            <div className="overflow-hidden p-5 flex">
              <div className={`${style.logoWrapper} flex items-center justify-around`}>
                <div className={style.slider}>
                  <div className={style.slideTrack}>
                    {images.map((item, index) => (
                      <div
                        key={index}
                        className={`logoItem ml-4 p-4 rounded-lg aspect-[30/9] place-items-center dark:border dark:border-[#3C4541] border border-[#171717] ${
                          index % 2 ? 'bg-white' : 'bg-[#CFFFE8]'
                        }`}
                      >
                        <Image
                          loading="lazy"
                          src={item.img}
                          className={`${style.img} lg:w-[10rem] 3xl:w-[15rem] xs:w-[5rem] lg:h-[3rem] h-[1rem] w-20`}
                          alt=""
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-hidden p-5 flex">
              <div className={`${style.logoWrapper} flex items-center justify-around`}>
                <div className={style.slider}>
                  <div className={`${style.slideTrack} ${style.reverce}`}>
                    {images.map((item, index) => (
                      <div
                        key={index}
                        className={`logoItem ml-4 p-4 rounded-lg aspect-[30/9] place-items-center dark:border dark:border-[#3C4541] border border-[#171717] ${
                          index % 2 ? 'bg-white' : 'bg-[#CFFFE8]'
                        }`}
                      >
                        <Image
                          loading="lazy"
                          src={item.img}
                          className={`${style.img} lg:w-[10rem] 3xl:w-[15rem] xs:w-[5rem] lg:h-[3rem] h-[1rem] w-20`}
                          alt=""
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Partners;
