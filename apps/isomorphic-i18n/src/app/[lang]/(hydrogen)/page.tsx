import Header from "@/app/components/header/Header";
import { metaObject } from "@/config/site.config";
import InfoSticky from "@/app/components/infoSticky/InfoSticky";
import SocialPlatforms from "@/app/components/socialPlatform/SocialPlatform";
import InfoAccordion from "@/app/components/infoAccordion/InfoAccordion";
// import DemoTable from "@/app/components/demoTable/DemoTable";
import Footer from "@/app/components/footer/Footer";
import MobileSection from "@/app/components/mobileSection/MobileSection";
import SocialPlatformMobile1 from "@/app/components/socialPlatformMobile1/SocialPlatformMobile1";
import SocialPlatformMobile from "@/app/components/socialPlatformMobile/SocialPlatformMobile";
import Partners from "@/app/components/partners/partners";
import ScrollToTop from "@/app/components/ui/ScrollToTop";
import DemoTable from "@/app/components/demoTable/DemoTable";

export const metadata = {
  ...metaObject(),
};

export default function Home({
  params: { lang },
}: {
  params: {
    lang?: string;
  };
}) {
  return<>
  <main className="">
    {/* <ScrollToTop/> */}
    <Header lang={lang!}/>
    <InfoSticky/>
    <SocialPlatformMobile/>
    <SocialPlatforms/>
    <SocialPlatformMobile1/>
    <MobileSection />
    <InfoAccordion /> 
    <Partners/>
    <DemoTable/>
    <Footer/>
  </main>
  </> 

}