"use client";

import Header from "@/layouts/beryllium/beryllium-header";
import BerylliumLeftSidebarFixed from "@/layouts/beryllium/beryllium-left-sidebar-fixed";
import cn from "@utils/class-names";
import SidebarExpandable from "@/layouts/beryllium/beryllium-sidebar-expanded";
import { useBerylliumSidebars } from "@/layouts/beryllium/beryllium-utils";
import AdminGuard from "@/app/components/AdminGuard";

export default function BerylliumLayout({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang?: string;
}) {
  const { expandedLeft } = useBerylliumSidebars();

  return (
    <AdminGuard>
      <main className={cn("flex min-h-screen flex-grow")}>
        <BerylliumLeftSidebarFixed lang={lang} />
        <SidebarExpandable lang={lang} />
        <div className="flex w-full flex-col ">
          <Header className="xl:ms-[88px]" lang={lang} />
          <div
            className={cn(
              "flex flex-grow flex-col gap-4 px-4 pb-6 duration-200 md:px-5 lg:pb-8  xl:pe-8 ",
              expandedLeft ? "xl:ps-[414px]" : "xl:ps-[110px]"
            )}
          >
            <div className="grow xl:mt-4">{children}</div>
          </div>
        </div>
      </main>
    </AdminGuard>
  );
}
