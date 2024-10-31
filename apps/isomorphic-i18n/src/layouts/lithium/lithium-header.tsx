"use client";

import Link from "next/link";
import { Badge, ActionIcon } from "rizzui";
import cn from "@utils/class-names";
import MessagesDropdown from "@/layouts/messages-dropdown";
import NotificationDropdown from "@/layouts/notification-dropdown";
import ProfileMenu from "@/layouts/profile-menu";
import SettingsButton from "@/layouts/settings-button";
import HamburgerButton from "@/layouts/hamburger-button";
import Logo from "@components/logo";
import {
  PiBellSimpleRingingDuotone,
  PiChatsCircleDuotone,
  PiGearDuotone,
  PiMagnifyingGlassDuotone,
} from "react-icons/pi";
import HeaderMenuLeft from "@/layouts/lithium/lithium-menu";
import Sidebar from "@/layouts/hydrogen/sidebar";
import StickyHeader from "@/layouts/sticky-header";
import LanguageSwitcher from "@/app/i18n/language-switcher";
import SearchWidget from "@/app/shared/search/search";
import { MouseEventHandler, useState } from "react";
import Theme from "@/app/components/ui/Theme";
// import { useRouter } from 'next/router';

import { useTranslation } from "@/app/i18n/client";
import { usePathname, useRouter } from "next/navigation";
const isMounted = typeof window !== 'undefined';

const isAdminPath = isMounted && window.location.pathname.includes('/admin');
function HeaderMenuRight({lang}:{lang:string}) {
  const {t}=useTranslation(lang!,'auth')
  const router = useRouter(); 

  // const[token]=useState(false)
  function handleLog(){
    router.push('/signin');

    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('email');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('roles');
  }
  
const token=localStorage.getItem('accessToken')
  return (
    <div className="ms-auto flex shrink-0 items-center gap-2  text-gray-700 xs:gap-3 xl:gap-4">
      
      {/* <MessagesDropdown>
        <ActionIcon
          aria-label="Messages"
          variant="text"
          className={cn(
            " relative h-[34px] w-[34px] overflow-hidden rounded-full md:h-9 md:w-9 3xl:h-10 3xl:w-10 "
          )}
        >
          <PiChatsCircleDuotone className="h-6 w-auto" />
          <Badge
            renderAsDot
            color="success"
            enableOutlineRing
            className="absolute right-1 top-2.5 -translate-x-1 -translate-y-1/4"
          />
        </ActionIcon>
      </MessagesDropdown>
      <NotificationDropdown>
        <ActionIcon
          aria-label="Notification"
          variant="text"
          className={cn(
            "relative h-[34px] w-[34px] overflow-hidden rounded-full md:h-9 md:w-9 3xl:h-10 3xl:w-10"
          )}
        >
          <PiBellSimpleRingingDuotone className="h-6 w-auto" />
          <Badge
            renderAsDot
            color="warning"
            enableOutlineRing
            className="absolute right-1 top-2.5 -translate-x-1 -translate-y-1/4"
          />
        </ActionIcon>
      </NotificationDropdown>
      <SettingsButton className="rounded-full text-gray-700 shadow-none backdrop-blur-none hover:text-gray-1000 3xl:h-10 3xl:w-10 dark:bg-gray-100/0">
        <PiGearDuotone className="h-[22px] w-auto animate-spin-slow" />
      </SettingsButton>
      <ProfileMenu
        buttonClassName="w-auto sm:w-auto p-1 border border-gray-300"
        avatarClassName="!w-7 !h-7 sm:!h-8 sm:!w-8"
      /> */}
     
     <>
      
      <>
      {!token?
        <Link href={`/${lang!}/signin`}>
        <button className="font-semibold text-black dark:text-white p-2 md:p-3 rounded-lg border-[#21E786] border-2 hover:bg-[#21E786]">
          <span className="4xl:text-xl  text-black dark:text-white ">  
            {t('auth-login')}
          </span>
          </button>
        </Link>
        :
       
        <button onClick={handleLog} className="font-semibold text-black dark:text-white p-2 md:p-3 rounded-lg border-2 border-[#21E786] hover:bg-[#21E786]">
          <span className="4xl:text-xl  text-black dark:text-white ">  
            {t('auth-logout')}
          </span>
          </button>
     
      }
        <div className=" ">
          <Theme/>
        </div>
      </>
      
      </>
     
    </div>
  );
}

export default function Header({ lang }: { lang?: string }) {
  const token=localStorage.getItem('accessToken')
  const router = useRouter();

  const pathname = usePathname(); // يحصل على المسار الحالي

  return (
    <>
    {
      pathname.includes('sign')?
    <StickyHeader
      className={"z-[990]   2xl:py-5 2xl:pl-6  3xl:px-8 dark:bg-black dark:text-white bg-white text-secondaryText"}
    >
      <div className="md:w-11/12 md:px-8 4xl:px-0 w-11/12 4xl:h-20  mx-auto flex justify-between">

        <div className="hidden items-center gap-3 xl:flex  ">
          <Link
            // aria-label="Site Logo"
            href={`/${lang!}/`}
            className="me-4 hidden  w-[155px] 4xl:w-[300px]  shrink-0  lg:me-5 xl:block"
          >

            <h1 className=" text-black dark:text-white">
              SalesMan
            </h1>  
          </Link>
          {/* <HeaderMenuLeft  lang={lang!} /> */}
        </div>
        <div className="flex w-full items-center gap-5 xl:w-auto 3xl:gap-6">
          <div className="flex w-full max-w-2xl items-center xl:w-auto">
            <HamburgerButton
            className="left-0"
              view={<Sidebar className="relative w-full 2xl:w-full" lang={lang} />}
            />
            <Link
              aria-label="Site Logo"
              href={"/"}
              className="me-4 w-9 shrink-0 lg:me-5 xl:hidden"
            >
              <Logo iconOnly={true} lang={lang} />
            </Link>
            <LanguageSwitcher
              lang={lang!}
              className="me-3 4xl:text-2xl 4xl:w-12 w-auto rounded-none shadow-none "
              variant="text"
            />
            <SearchWidget 
              icon={<PiMagnifyingGlassDuotone className="h-[20px] w-[20px] 4xl:w-[30px] xs:h-[30px]" />}
              className={cn(
                "text-black dark:text-white  focus-visible:outline-0 active:translate-y-0 xl:border-0 xl:p-0 xl:shadow-none xl:backdrop-blur-none xl:hover:border-0 xl:hover:outline-0 xl:focus:outline-0 xl:focus-visible:outline-0 [&_.magnifying-glass]:me-0 [&_.placeholder-text]:hidden [&_.search-command]:ms-2 [&_.search-command]:hidden [&_.search-command]:lg:text-gray-0"
              )}
            />
          </div>
          <Theme/>

          {/* <HeaderMenuRight  lang={lang!}/> */}
        </div>
      </div>
    </StickyHeader>
      :
      <StickyHeader
      className={"z-[990]   2xl:py-5 2xl:pl-6  3xl:px-8 dark:bg-black dark:text-mainText bg-white text-secondaryText"}
    >
      <div className="md:w-10/12 md:px-8 4xl:px-0 w-11/12 4xl:h-20  mx-auto flex justify-between">

        <div className="hidden items-center gap-3 xl:flex  ">
          <Link
            aria-label="Site Logo"
            href={`/${lang!}/`}
            className="me-4 hidden w-[155px] 4xl:w-[300px]  shrink-0  lg:me-5 xl:block"
          >
            <h1 className=" text-black dark:text-white">
              SalesMan
            </h1>       
            {/* <Logo className="w-[155px] 4xl:w-[300px]" /> */}
          </Link>
          <HeaderMenuLeft  lang={lang!} />
        </div>
        <div className="flex w-full items-center gap-5 xl:w-auto 3xl:gap-6">
          <div className="flex w-full max-w-2xl items-center xl:w-auto">
            <HamburgerButton
            className="left-0"
              view={<Sidebar className="relative w-full 2xl:w-full" lang={lang} />}
            />
            <Link
              aria-label="Site Logo"
              href={"/"}
              className="me-4 w-9 shrink-0 lg:me-5 xl:hidden"
            >
              <Logo iconOnly={true} lang={lang} />
            </Link>
            <LanguageSwitcher
              lang={lang!}
              className="me-3 4xl:text-2xl 4xl:w-12 w-auto rounded-none shadow-none "
              variant="text"
            />
            <SearchWidget 
              icon={<PiMagnifyingGlassDuotone className="h-[20px] w-[20px] 4xl:w-[30px] xs:h-[30px]" />}
              className={cn(
                "text-black dark:text-white  focus-visible:outline-0 active:translate-y-0 xl:border-0 xl:p-0 xl:shadow-none xl:backdrop-blur-none xl:hover:border-0 xl:hover:outline-0 xl:focus:outline-0 xl:focus-visible:outline-0 [&_.magnifying-glass]:me-0 [&_.placeholder-text]:hidden [&_.search-command]:ms-2 [&_.search-command]:hidden [&_.search-command]:lg:text-gray-0"
              )}
            />
          </div>
          <HeaderMenuRight  lang={lang!}/>
        </div>
      </div>
    </StickyHeader>
    }
    </>
  );
}
