"use client";

import Link from "next/link";
import HamburgerButton from "@/layouts/hamburger-button";
import Logo from "@components/logo";
import { PiMagnifyingGlass } from "react-icons/pi";
import cn from "@utils/class-names";
import Sidebar from "@/layouts/beryllium/beryllium-sidebar-drawer";
import HeaderMenuRight from "@/layouts/header-menu-right";
import StickyHeader from "@/layouts/sticky-header";
import { useTranslation } from "@/app/i18n/client";
import SearchWidget from "@/app/shared/searchAdmin/search";
import AdminGuard from "@/app/components/AdminGuard";
import { useLayout } from "../use-layout";
import { LAYOUT_OPTIONS } from "@/config/enums";
import { useRouter } from "next/navigation";
import Theme from "@/app/components/ui/Theme";

export default function Header({
  className,
  lang,
}: {
  className?: string;
  lang?: string;
}) {
  const { t } = useTranslation(lang!, "common");
  const { setLayout } = useLayout();
  // const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default link navigation
    setLayout(LAYOUT_OPTIONS.LITHIUM);
    window.location.href = '/'; // Manually navigate
  };
  return (
    <AdminGuard>
      <StickyHeader
        className={cn(
          "z-[990] justify-between bg-gray-white-50 dark:bg-gray-900  text-gray-0 dark:text-gray-50  xl:pe-8 ",
          className
        )}
      >
        <div className="hidden items-center gap-3 xl:flex">
        <Link target="_blank" href="/" aria-label="Site Logo" className="me-4 hidden w-[155px] shrink-0  hover:text-gray-900 lg:me-5 xl:block">
          <div  className="flex  items-center gap-3 cursor-pointer">
            <h1 className="font-semibold text-3xl text-gray-1000 dark:text-gray-1000">
                SalesMan
            </h1>  
            {/* <Logo className="max-w-[155px]" /> */}
          </div>
      </Link>
    </div>

        <div className="flex w-full items-center justify-between gap-5 xl:w-[calc(100%_-_190px)] 2xl:w-[calc(100%_-_310px)] 3xl:gap-6">
          <div className="flex max-w-2xl items-center xl:w-auto">
            <HamburgerButton
              view={<Sidebar className="static w-full  2xl:w-full" lang={lang} />}
            />
            <Link
              aria-label="Site Logo"
              href="/"
              className="me-4 w-9 shrink-0 text-gray-800 hover:text-gray-900 lg:me-5 xl:hidden"
            >
              <Logo iconOnly={true} />
            </Link>
            <SearchWidget
              icon={<PiMagnifyingGlass className="me-3 text-gray-1000 h-[20px] w-[20px]" />}
              className="xl:w-[500px]"
              t={t}
            />
          {/* <Theme/> */}

          </div>

          <div className="flex items-center justify-between">
            <HeaderMenuRight lang={lang} />
          </div>
        </div>
      </StickyHeader>
    </AdminGuard>
  );
}
