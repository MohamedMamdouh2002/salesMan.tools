'use client';

import Link from 'next/link';
import logoImg from '@public/logo-primary.svg';
import logoImgText from '@public/logo-primary-text.svg';
import Image from 'next/image';
import { Title, Text, Button } from 'rizzui';
import { PiAppleLogo, PiArrowLeftBold } from 'react-icons/pi';
import { FcGoogle } from 'react-icons/fc';
import OrSeparation from './or-separation';
import toast from 'react-hot-toast';
import { useTranslation } from '@/app/i18n/client';

export default function AuthWrapperOne({
  children,
  title,
  bannerTitle,
  bannerDescription,
  description,
  pageImage,
  isSocialLoginActive = false,
  isSignIn = false,
  lang,
}: {
  children: React.ReactNode;
  title: React.ReactNode;
  description?: string;
  bannerTitle?: string;
  bannerDescription?: string;
  pageImage?: React.ReactNode;
  isSocialLoginActive?: boolean;
  isSignIn?: boolean;
  lang?: string;
}) {
  const { t } = useTranslation(lang!, 'auth');

  function handleSignIn() {
    toast.error(
      <h1>
        {t('auth-demo-text')}{' '}
        <p className="font-semibold text-gray-900">
          {t('auth-sign-in')}
        </p>{' '}
       {t('auth-button-to-login')}
      </h1>
    );
  }
  return (
    <>
      <Link
        href={'/'}
        className="sticky   start-0 top-0 z-20 flex items-center justify-center bg-blue p-3.5 text-sm font-medium text-white md:p-4 lg:hidden"
      >
        <PiArrowLeftBold />
        <p className="ms-1 font-lexend text-black dark:text-white">{t('auth-back-to-home')}</p>
      </Link>

      <div className="min-h-screen bg-white dark:bg-black justify-between gap-x-8 px-4 py-8 pt-10 md:pt-12 lg:flex lg:p-6 xl:gap-x-10 xl:p-7 2xl:p-10 2xl:pt-10 [&>div]:min-h-[calc(100vh-80px)]">
        <div className="relative bg-white dark:bg-black flex w-full items-center justify-center lg:w-5/12 2xl:justify-end 2xl:pe-24">
          <div className=" w-full bg-white dark:bg-black max-w-sm md:max-w-md lg:py-7 lg:ps-3 lg:pt-16 2xl:w-[630px] 2xl:max-w-none 2xl:ps-20 2xl:pt-7">
            <Link
              href={'/'}
              className="absolute -top-4 start-0 hidden p-3 text-gray-500 hover:text-gray-700 lg:flex lg:items-center 2xl:-top-7 2xl:ps-20 "
            >
              <PiArrowLeftBold />
              <b className="ms-1 font-medium">{t('auth-back-to-home')}</b>
            </Link>
            <div className="mb-7 px-6 pt-3 text-center md:pt-0 lg:px-0 lg:text-start xl:mb-8 2xl:mb-10">
              <Link
                href={'/'}
                className="mb-6 inline-flex max-w-[168px] xl:mb-8"
              >
                <Image src={logoImg} alt="Isomorphic" />
                <Image
                  src={logoImgText}
                  alt="Isomorphic"
                  className="ps-2.5 dark:invert"
                />
              </Link>
              <h2
                className="mb-5 text-[26px]  dark:text-white text-black leading-snug md:text-3xl md:!leading-normal lg:mb-7 lg:pe-16 lg:text-[28px] xl:text-3xl 2xl:pe-8 2xl:text-4xl"
              >
                {title}
              </h2>
              <p className=" leading-[1.85] dark:text-white text-black  md:leading-loose lg:pe-8 2xl:pe-14">
                {description}
              </p>
            </div>
            {isSocialLoginActive && (
              <>
                <div className="grid grid-cols-1 gap-4 pb-5 md:grid-cols-1 md:pb-6 xl:gap-5 xl:pb-7">
                  {/* <Button
                    onClick={() =>
                      // it should be signIn('apple')
                      handleSignIn()
                    }
                    className="h-11 w-full"
                  >
                    <PiAppleLogo className="me-2 h-4 w-4 shrink-0" />
                    <span className="truncate">
                      {t('auth-sign-in-with-apple')}
                    </span>
                  </Button> */}
                  <Button
                    variant="outline"
                    onClick={() =>
                      // it should be signIn('google')
                      handleSignIn()
                    }
                    className="h-11 w-full"
                  >
                    <FcGoogle className="me-2 h-4 w-4 shrink-0" />
                    <span className="truncate">
                    auth-sign-in-with-google
                    </span>
                  </Button>
                </div>
                <OrSeparation title="OR" className="mb-5 2xl:mb-7" isCenter />
              </>
            )}

            {children}
          </div>
        </div>
        <div className="hidden w-7/12 items-center justify-center rounded-[20px]  px-6 dark:bg-secDark bg-slate-50 lg:flex xl:justify-start 2xl:px-16">
          <div className="pb-8 pt-10  dark:bg-secDark bg-slate-50  text-center xl:pt-16 2xl:block 2xl:w-[1063px]">
            <div className="mx-auto  dark:bg-secDark bg-slate-50   mb-10 max-w-sm pt-2 2xl:max-w-lg">
              <h2
                className="mb-5 font-semibold !leading-normal dark:text-white text-black lg:text-[26px] 2xl:px-10 2xl:text-[32px]"
              >
                {bannerTitle}
              </h2>
              {/* <p className="leading-[1.85] text-gray-700 md:leading-loose 2xl:px-6">
                {bannerDescription}
              </p> */}
            </div>
            {pageImage}
          </div>
        </div>
      </div>
    </>
  );
}
