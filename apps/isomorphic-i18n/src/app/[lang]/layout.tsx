import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import AuthProvider from "@/app/api/auth/[...nextauth]/auth-provider";
import GlobalDrawer from "@/app/shared/drawer-views/container";
import GlobalModal from "@/app/shared/modal-views/container";
import { ThemeProvider } from "@/app/shared/theme-provider";
import { siteConfig } from "@/config/site.config";
import { inter, lexendDeca, poppins } from "@/app/fonts";
import cn from "@utils/class-names";
import { dir } from "i18next";
import { languages } from "../i18n/settings";
import { LAYOUT_OPTIONS } from "@/config/enums";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { AdminProvider } from "../components/context/adminContext";

const NextProgress = dynamic(() => import("@components/next-progress"), {
  ssr: false,
});

config.autoAddCss = false;

export const metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  LAYOUT_OPTIONS: LAYOUT_OPTIONS.LITHIUM,
};

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

type RootLayoutProps = {
  children: React.ReactNode;
  params: {
    lang: string;
  };
};

export default async function RootLayout({ children, params: { lang } }: RootLayoutProps) {
  const session = await getServerSession(authOptions);
  return (
    <html lang={lang} dir={dir(lang)} suppressHydrationWarning>
      <head></head>
      <body
        suppressHydrationWarning
        className={cn(inter.variable, lexendDeca.variable, poppins.variable, "font-inter")}
      >
        <AdminProvider>
          <AuthProvider session={session}>
            <ThemeProvider>
              <NextProgress  /> 
              {children}
              <Toaster />
              <GlobalDrawer />
              <GlobalModal />
            </ThemeProvider>
          </AuthProvider>
        </AdminProvider>
      </body>
    </html>
  );
}
