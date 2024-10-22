"use client";

import Link from "next/link";
import cn from "@utils/class-names";
import SimpleBar from "@ui/simplebar";
import Logo from "@components/logo";
import { SidebarMenu } from "./sidebar-menu";

export default function Sidebar({
  className,
  lang,
}: {
  className?: string;
  lang?: string;
}) {
  return (
    <aside
      className={cn(
        "absolute top-0 start-0 z-[555555] h-full w-[270px] border-e-2 border-gray-100    dark:bg-mainBg dark:text-white bg-secondaryBg  2xl:w-72",
        className
      )} 
    >
      <div className=" border-b-2 relative border-black dark:border-white dark:text-white top-0 z-40 bg-gray-0/10 px-6 pb-5 pt-5 dark:bg-gray-100/5 2xl:px-8 2xl:pt-6">
        <Link
          href={"/"}
          aria-label="Site Logo"
          className="text-black dark:text-white block "
        >
          <Logo className="max-w-[155px]" />
          
        </Link>
      </div>

      <SimpleBar className="h-[600px]  dark:text-white">
        <SidebarMenu lang={lang}  />
      </SimpleBar>
    </aside>
  );
}
