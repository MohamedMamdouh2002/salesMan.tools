'use client'
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass } from "@fortawesome/free-solid-svg-icons";
import style from './MobileSection.module.css';
import photo2 from '@public/mobile/fixedImg.svg';
import photo3 from '@public/mobile/mob.svg';
import photo4 from '@public/assets/hero.svg';
import mobile1 from '@public/assets/hero1.jpg';
import { motion } from "framer-motion";
import Button from '../ui/Button';
import Image from "next/image";
import { getMobile } from "@/lib/api/getMobileSec";
import { useTranslation } from "@/app/i18n/client";

// const images = [photo4, photo2, mobile1, photo3]; // Array of images
// const data = [
//   {
//     name: "Getting Started",
//     content: "Some of the features offered by our program",
//     description: "Increase authorization rates, optimize your checkout conversion, and offer local payment methods in every market.",
//     imageUrl:photo4 ,
//     descriptionPoints: [
//       "test"
//     ],
//     id: "2997d438-94c3-4d91-37a9-08dcd5ae452b"
//   },
//   {
//     name: "getContact",
//     content: "fff",
//     description: "ff",
//     imageUrl: photo4,
//     descriptionPoints: [],
//     id: "3df361dd-152c-49d3-a739-08dcdf4281dc"
//   },
//   {
//     name: "mmm",
//     content: "mmm",
//     description: "mmm",
//     imageUrl:photo4,
//     descriptionPoints: [],
//     id: "79690cd9-640b-45c1-5a93-08dcdf444520"
//   }
// ]
function MobileSection({lang}:{lang:string}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobile, setMobile] = useState<any[]>([]);
  const { t } = useTranslation(lang!, 'home');


  useEffect(() => {
    const scrollElements = document.querySelectorAll('.scroll');

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? 'down' : 'up';
      setLastScrollY(currentScrollY);

      scrollElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const elementHeight = rect.height;

        if (currentScrollY >= elementTop - elementHeight / 2 && currentScrollY < elementTop + elementHeight / 2) {
          if (direction === 'down') {
            setCurrentImageIndex(index);
          } else if (direction === 'up') {
            setCurrentImageIndex(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);



  useEffect(() => {
    const fetchData = async () => {
            const data = await getMobile({lang});
            if (data) {
              setMobile(data);
            }
     
    };
    fetchData();
}, []);
  return <>
  <div className="bg-[#F8FAFC] relative dark:bg-[#1C1C1C] pt-5 md:pt-20">

  <motion.div
        className={`text-darkGreenColor dark:text-white text-center md:text-4xl 4xl:text-5xl font-monbold`}
        initial={{ translateY: 40, opacity: 0 }}
        whileInView={{ translateY: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        {t('Some-of-the-features')} 
      </motion.div>
    <div className="w-9/12 mx-auto hidden lg:grid grid-cols-7 4xl:grid-cols-12 gap-14 pt-32  font-montserrat scroll-smooth">
      <div className="col-span-3 4xl:col-span-6">
          {mobile.map((i)=>
          <div key={i.id} className="">
            
             <div  className="h-[700px] 4xl:h-[1000px] scroll">
            <div className="md:text-lg 4xl:text-3xl mb-2 font-medium dark:text-white text-black">
              <FontAwesomeIcon icon={faCompass}  className="dark:text-greenColor text-greenColor" color="#21e786"/> {i.name}
            </div>
            <h2 className="my-2 4xl:my-4 text-4xl 4xl:text-6xl font-medium text-black dark:text-white"> 
              {i.content}         
            </h2>
            <p className="text-base 4xl:text-3xl font-light mb-2 text-black dark:text-white">
            {i.description}         
            </p>
          
              {/* <ul className="text-sm 4xl:text-2xl mt-3 4xl:mt-5 dark:text-white">
                {i.descriptionPoints.map((item: string ,index: any)=>
                  <li key={index}>{item}</li>
                )}
      
              </ul> */}
              <Button className={`${style.Link} dark:hover:bg-white  lg:mx-0 mx-auto my-5 font-medium text-sm rounded-xl w-52 h-12 4xl:h-20 group 4xl:w-[400px]`} width="sm:200px" height="sm:40px">
                <p className={`${style.linkP}  text-base 4xl:text-3xl dark:text-secondaryText group-hover:dark:text-black group-hover:text-secondaryBg`}>Expolre it now</p>
              </Button>
            </div>
          </div>
          )}   
      </div>
      {mobile.length > 0 && (
        <div className={`${style.mobileSticky}  sticky col-span-4 4xl:col-span-6 h-[400px] flex  justify-end`}>
          <Image
            width={500}
            height={100}
            className="4xl:w-full w-fit"
            src={mobile[currentImageIndex].imageUrl}
            alt=""
          />
        </div>
      )}
    </div>
    <div className="absolute left-0 top-[600px]">
      <Image width={400} height={200} className="w-32 md:w-48" src={photo2} alt=''/> 
    </div>
    <div className="md:w-9/12 w-11/12 lg:hidden mx-auto pt-5  gap-14  pb-10 font-montserrat scroll-smooth">
      <div className="">
        {mobile.map((i)=>
        <div key={i.id} className="mt-3">
            <div className="text-sm font-medium dark:text-white text-black">
              <FontAwesomeIcon icon={faCompass} color="#21e786" /> {i.name}
            </div>
            <h2 className="my-2 text-lg font-monbold text-darkGreenColor"> {i.content}  </h2>
            <p className="text-darkGreenColor">  {i.description}    </p>
            {/* {i.descriptionPoints.map((index: Key | null | undefined,i: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | Iterable<ReactNode> | null | undefined)=>
                <li key={index}>{i}</li>
              )} */}
              <Button className={`${style.Link}  my-5 font-medium text-sm rounded-xl dark:hover:bg-white group`} width="200px" height="40px">
              <p className={` ${style.linkP}   dark:text-secondaryText group-hover:dark:text-black group-hover:text-secondaryBg`}>Expolre it now</p>
            </Button>
            <Image
              width={500}
              height={100}
              className="w-full h-auto"
              src={i.imageUrl} 
              alt={'Feature Image'}
            />

        </div>
        )}     
      </div>
    </div>
  </div>
  </>
  
};

export default MobileSection;