'use client'
import { Tab } from '@headlessui/react'
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faCheck, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from '@/app/i18n/client';
import Footer from '@/app/components/footer/Footer';
import { getSubscribtionYear,getSubscribtionMonth } from '@/lib/api/getSubscription';
import Title from '@/app/components/ui/title/Title';

const Subscriptions: React.FC =({lang}: { lang?: string }) =>{
  const [expandedId, setExpandedId] = useState<number | null>(null); 

  const handleExpand = (index: number) => {
    setExpandedId(expandedId === index ? null : index);
  };
  const { t ,i18n} = useTranslation(lang!, 'subscriptions');
  const isArabic = i18n.language === 'ar'; 
  const [selectedIndex, setSelectedIndex] = useState(0); 
  const [subMonth, setSubMonth] = useState<any[]>([]);
  const [subYear, setSubYear] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
        const data = await getSubscribtionMonth();
        if (data) {
          setSubMonth(data);
        }
    };
    fetchData();
}, []);
  useEffect(() => {
    const fetchData = async () => {
        const data = await getSubscribtionYear();
        if (data) {
          setSubYear(data);
        }
    };
    fetchData();
}, []);


// const plans = [
//   {
//     name: "Plan 1",
//     price: 500,
//     discountPercentage: 20,
//     planBenefitDescription: "+1 month free",
//     billingCycle: "Month",
//     subscriptionFeatures: [
//       {
//         name: "3 month free",
//         description: "test",
//         id: "6580b129-3678-4984-1d5c-08dcd417db33"
//       }
//     ],
//     priceAfterDiscount: 400,
//     id: "9e7cb2a2-244c-42a3-7c48-08dcd41834d1"
//   },
//   {
//     name: "Plan 1",
//     price: 300,
//     discountPercentage: 40,
//     planBenefitDescription: "+3 month free",
//     billingCycle: "Month",
//     subscriptionFeatures: [
//       {
//         name: "3 month free",
//         description: "test",
//         id: "6580b129-3678-4984-1d5c-08dcd417db33"
//       },
//       {
//         name: "3 month free",
//         description: "test",
//         id: "6580b129-3678-4984-1d5c-08dcd417db33"
//       },
//       {
//         name: "3 month free",
//         description: "test",
//         id: "6580b129-3678-4984-1d5c-08dcd417db33"
//       },
//       {
//         name: "3 month free",
//         description: "test",
//         id: "6580b129-3678-4984-1d5c-08dcd417db33"
//       },
//       {
//         name: "3 month free",
//         description: "test",
//         id: "6580b129-3678-4984-1d5c-08dcd417db33"
//       },
//       {
//         name: "3 month free",
//         description: "test",
//         id: "6580b129-3678-4984-1d5c-08dcd417db33"
//       },
//       {
//         name: "3 month free",
//         description: "test",
//         id: "6580b129-3678-4984-1d5c-08dcd417db33"
//       },
//     ],
//     priceAfterDiscount: 180,
//     id: "6eaf79b9-2735-4e62-7c49-08dcd41834d1"
//   },
//   {
//     name: "Plan 3",
//     price: 200,
//     discountPercentage: 30,
//     planBenefitDescription: "+3 month free",
//     billingCycle: "Month",
//     subscriptionFeatures: [
//       {
//         name: "3 month free",
//         description: "test",
//         id: "6580b129-3678-4984-1d5c-08dcd417db33"
//       },
//       {
//         name: "3 month free",
//         description: "test",
//         id: "6580b129-3678-4984-1d5c-08dcd417db33"
//       },
//       {
//         name: "3 month free",
//         description: "test",
//         id: "6580b129-3678-4984-1d5c-08dcd417db33"
//       },
//       {
//         name: "3 month free",
//         description: "test",
//         id: "6580b129-3678-4984-1d5c-08dcd417db33"
//       },
//       {
//         name: "3 month free",
//         description: "test",
//         id: "6580b129-3678-4984-1d5c-08dcd417db33"
//       },
//       {
//         name: "3 month free",
//         description: "test",
//         id: "6580b129-3678-4984-1d5c-08dcd417db33"
//       },
//       {
//         name: "3 month free",
//         description: "test",
//         id: "6580b129-3678-4984-1d5c-08dcd417db33"
//       },
//     ],
//     priceAfterDiscount: 140,
//     id: "1f954366-8f7f-4769-7c4a-08dcd41834d1"
//   },
//   {
//     name: "Plan 4",
//     price: 100,
//     discountPercentage: 50,
//     planBenefitDescription: "+6 month free",
//     billingCycle: "Year",
//     subscriptionFeatures: [
//       {
//         name: "3 month free",
//         description: "test",
//         id: "6580b129-3678-4984-1d5c-08dcd417db33"
//       },
//       {
//         name: "3 month free",
//         description: "test",
//         id: "6580b129-3678-4984-1d5c-08dcd417db33"
//       },
//       {
//         name: "3 month free",
//         description: "test",
//         id: "6580b129-3678-4984-1d5c-08dcd417db33"
//       },
//       {
//         name: "3 month free",
//         description: "test",
//         id: "6580b129-3678-4984-1d5c-08dcd417db33"
//       },
//       {
//         name: "3 month free",
//         description: "test",
//         id: "6580b129-3678-4984-1d5c-08dcd417db33"
//       },
//       {
//         name: "3 month free",
//         description: "test",
//         id: "6580b129-3678-4984-1d5c-08dcd417db33"
//       },
//       {
//         name: "3 month free",
//         description: "test",
//         id: "6580b129-3678-4984-1d5c-08dcd417db33"
//       },
//     ],
//     priceAfterDiscount: 50,
//     id: "4e2f94ab-275a-4e61-a349-08dcd41834d2"
//   }
// ];

  return <>
    <section className='bg-[#F8FAFC] dark:bg-[#1C1C1C] min-h-screen font-montserrat'>
        <Title 
            title={t('title-sub')} 
            description={t('decs-sub')}
            />
      <div className="w-11/12 mx-auto pb-10 ">
        <div className="  flex gap-6 flex-col items-center pt-10">
          <Tab.Group>
            <div className="flex flex-col gap-6  justify-between  items-center">
              <Tab.List className="w-64 bg-white dark:bg-[#2F3133] 4xl:w-[500px] 4xl:h-20 md:w-96 flex rounded-full md:mb-5 md:h-16 h-14 justify-between text-white relative md:p-3 py-2 shadow-lg">
                <div className="tabs-container relative flex w-full">
                  <Tab
                    className={({ selected }) => {
                      if (selected) setSelectedIndex(0);
                      return selected
                        ? 'bg-transparent text-black  w-48 4xl:w-[400px] 4xl:text-2xl outline-0 h-full text-sm font-semibold rounded-full relative z-20 flex items-center justify-center'
                        : 'bg-transparent dark:bg-[#2F3133] dark:text-white text-black 4xl:text-2xl w-48 4xl:w-[400px] outline-0 text-sm  h-full rounded-full relative z-10 font-semibold flex items-center justify-center';
                    }}
                  >
                  {t('sub-year')}
                  </Tab>

                  <Tab
                    className={({ selected }) => {
                      if (selected) setSelectedIndex(1); 
                      return selected
                      ? 'bg-transparent text-black 4xl:text-2xl 4xl:w-[400px] w-48 outline-0 h-full text-sm rounded-full relative z-20 font-semibold flex items-center justify-center'
                      : 'bg-transparent dark:bg-[#2F3133] dark:text-white text-black 4xl:text-2xl 4xl:w-[400px] w-48 outline-0 text-sm  h-full rounded-full relative z-10 font-semibold flex items-center justify-center';
                    }}
                    >
                      {t('sub-month')}
                  </Tab>

                  <span
                    className="glider absolute bg-[#21E786] p-1 dark:bg-white rounded-full  h-full z-50 dark:z-10 transition-transform duration-300 ease-in-out"
                    style={{
                      transform: `translateX(${
                        isArabic ? -selectedIndex * 100 : selectedIndex * 100
                      }%)`,
                    }}          />

                </div>
              </Tab.List>
            </div>

            <Tab.Panels className=' mt-10'>
              <Tab.Panel className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4  '>
              {subYear.map((i ,index) =>
                <div
                key={i.id}
                className={`relative py-10    text-center mb-5 rounded-[30px] text-white w-[300px] sm:w-[300px] md:w-[300px] lg:w-[220px] xl:w-[280px] 2xl:w-[300px] 4xl:w-[380px]  ${
                  index === 2?  'dark:bg-[#004D40] bg-[#004D40]   shadow-[0_0_0_8px_rgba(0,77,64,.50)] dark:text-white md:-translate-y-10':' dark:bg-[#0D0C0C] bg-[#FFFFFF] dark:text-white'
                }`}
                >
                  {index === 2? <>
                    <div className='flex justify-between items-center'>
                  <h1 className='mb-1 text-white  4xl:text-3xl text-lg font-semibold text-start ms-5 md:ms-6'>{i.name}</h1>
                  <span className='mb-1 text-black  dark:bg-white bg-white py-1.5 px-3 rounded-lg 4xl:text-lg text-xs font-medium  text-start me-5 md:me-6'>{t("sub-plan-most-popular")}</span>

                    </div>
                    <div className="text-start my-5 ms-5 md:ms-6 text-white ">
                      <div className="flex gap-3 items-center ">
                        <p className='text-2xl xl:text-3xl text-white  2xl:text-4xl font-extrabold 4xl:text-2xl dark:text-white'>${i.priceAfterDiscount}</p>
                        <p className='dark:text-[#fff] text-white  font-regular text-xs '>per editor/month <p className='dark:text-[#fff] text-white  font-regular text-xs'>billed monthly</p></p>
                      </div>
                      {/* <p className='text-black text-4xl 4xl:text-6xl font-bold my-3 dark:text-white'><span className='text-sm 4xl:text-3xl dark:text-white'>$</span>{i.priceAfterDiscount}<span className='text-sm 4xl:text-2xl dark:text-white'>/{t("sub-month")}</span></p> */}
                      {/* <span className='text-[#21e786] font-bold 4xl:text-2xl'>{i.planBenefitDescription}</span> */}
                    </div>
                    <div className={`mb-10 ms-5 4xl:mb-8 md:ms-6 transition-all duration-300 ${expandedId == null ? 'h-auto' : 'h-auto pb-5 '}`}>
                      {i.subscriptionFeatures.map((subItem: {
                        name: string;
                        description: string;
                        id: string;}) =>
                          <div key={subItem.id} className="flex items-center  gap-3 ms-2   relative w-fit subIndex-main">
                        <FontAwesomeIcon  icon={faCircleCheck}  className=" dark:text-white text-[#EBEFF0] text-lg 4xl:text-2xl "  />
                        <p className='inline-block text-black  dark:text-white subIndex-main'>{subItem.name}</p>
                        <span className='subIndex 4xl:text-2xl dark:text-black text-black  '>{subItem?.description}</span>
                      </div>
                      )}
                    </div>
                    <div className="w-full flex justify-center mx-auto absolute bottom-4">
                      <button  className="bg-[#DFF7E9] w-11/12 md:w-9/12 4xl:w-10/12 4xl:h-16  font-medium  h-10 text-black  text-base flex justify-center items-center mx-auto rounded-lg">
                          {t("sub-choose-plan")}                       
                      </button>
                    </div>
                  
                  </>
                  :
                  <>
                  <h1 className='mb-1 text-black 4xl:text-3xl text-lg font-semibold  text-start ms-5 md:ms-6'>{i.name}</h1>
                  <div className="text-start my-5 ms-5 md:ms-6 text-black">
                      <div className="flex gap-3 items-center ">
                        <p className='text-2xl xl:text-3xl 2xl:text-4xl font-extrabold 4xl:text-2xl dark:text-white'>${i.priceAfterDiscount}</p>
                        <p className='dark:text-[#868C92] text-[#4e4e4e] font-regular text-xs '>per editor/month <p className='dark:text-[#868C92] text-[#4e4e4e] font-regular text-xs'>billed monthly</p></p>
                      </div>
                      {/* <p className='text-black text-4xl 4xl:text-6xl font-bold my-3 dark:text-white'><span className='text-sm 4xl:text-4xl dark:text-white'>$</span>{i.priceAfterDiscount}<span className='text-sm 4xl:text-2xl dark:text-white'>/{t("sub-month")}</span></p> */}
                      {/* <span className='text-[#21e786] font-bold 4xl:text-2xl'>{i.planBenefitDescription}</span> */}
                    </div>
                    <div className={`mb-10 ms-5 4xl:mb-8 md:ms-6 transition-all duration-300 ${expandedId == null ? 'h-auto' : 'h-auto pb-5 '}`}>
                      {i.subscriptionFeatures.map((subItem: {
                        name: string;
                        description: string;
                        id: string;}) =>
                        <div key={subItem.id} className="flex items-center  gap-3 ms-2   relative w-fit sub-main">
                          <FontAwesomeIcon  icon={faCircleCheck}  className=" dark:text-[#575757] text-[#979797] text-lg 4xl:text-2xl "  />
                          <p className='inline-block  text-black  dark:text-[#D2D7D9] sub-main'>{subItem.name}</p>
                          <span className='sub 4xl:text-sm dark:text-black text-black  '>{subItem?.description}</span>
                        </div>
                      )}
                    </div>
                    <div className="bottom-4 absolute w-full flex justify-center mx-auto">

                       <button className={`dark:text-[#C6C2FF] bg-[#DFF7E9] dark:bg-[#3A3A3D]  text-[#4A5957] w-11/12 md:w-9/12 4xl:w-10/12 4xl:h-16  font-medium  h-10  text-base flex justify-center items-center mx-auto rounded-lg`}>{t("sub-choose-plan")}</button>
                    </div>

                  </>
                }
                </div>
             
                )}
              </Tab.Panel>  
              <Tab.Panel className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4  '>
              {subMonth.map((i ,index) =>
                <div
                key={i.id}
                className={`relative py-10    text-center mb-5 rounded-[30px] text-white w-[300px] sm:w-[300px] md:w-[300px] lg:w-[220px] xl:w-[280px] 2xl:w-[300px] 4xl:w-[380px]  ${
                  index === 2?  'dark:bg-[rgb(33,231,134)] bg-[#21E786]   shadow-[0_0_0_8px_rgba(33,231,134,.50)] dark:text-white md:-translate-y-10':' dark:bg-[#0D0C0C] bg-[#FFFFFF] dark:text-white'
                }`}
                >
                  {index === 2  ? <>
                    <div className='flex justify-between items-center'>
                  <h1 className='mb-1 text-white  4xl:text-3xl text-lg font-semibold text-start ms-5 md:ms-6'>{i.name}</h1>
                  <span className='mb-1 text-black  dark:bg-white bg-white py-1.5 px-3 rounded-lg 4xl:text-lg text-xs font-medium  text-start me-5 md:me-6'>{t("sub-plan-most-popular")}</span>

                    </div>
                    <div className="text-start my-5 ms-5 md:ms-6 text-white ">
                      <div className="flex gap-3 items-center ">
                        <p className='text-2xl xl:text-3xl text-white  2xl:text-4xl font-extrabold 4xl:text-2xl dark:text-white'>${i.priceAfterDiscount}</p>
                        <p className='dark:text-[#fff] text-white  font-regular text-xs '>per editor/month <p className='dark:text-[#fff] text-white  font-regular text-xs'>billed monthly</p></p>
                      </div>
                      {/* <p className='text-black text-4xl 4xl:text-6xl font-bold my-3 dark:text-white'><span className='text-sm 4xl:text-3xl dark:text-white'>$</span>{i.priceAfterDiscount}<span className='text-sm 4xl:text-2xl dark:text-white'>/{t("sub-month")}</span></p> */}
                      {/* <span className='text-[#21e786] font-bold 4xl:text-2xl'>{i.planBenefitDescription}</span> */}
                    </div>
                    <div className={`mb-10 ms-5 4xl:mb-8 md:ms-6 transition-all duration-300 ${expandedId == null ? 'h-auto' : 'h-auto pb-5 '}`}>
                      {i.subscriptionFeatures.map((subItem: {
                        name: string;
                        description: string;
                        id: string;}) =>
                          <div key={subItem.id} className="flex items-center  gap-3 ms-2   relative w-fit subIndex-main">
                        <FontAwesomeIcon  icon={faCircleCheck}  className=" dark:text-white text-[#EBEFF0] text-lg 4xl:text-2xl "  />
                        <p className='inline-block text-black  dark:text-white subIndex-main'>{subItem.name}</p>
                        <span className='subIndex 4xl:text-sm dark:text-black text-black  '>{subItem?.description}</span>
                      </div>
                      )}
                    </div>
                    <div className="w-full flex justify-center mx-auto absolute bottom-4">
                      <button  className="bg-[#CFFFE8] w-11/12 md:w-9/12 4xl:w-10/12 4xl:h-16  font-medium  h-10 text-black  text-base flex justify-center items-center mx-auto rounded-lg">
                          {t("sub-choose-plan")}                       
                      </button>
                    </div>
                  
                  </>
                  :
                  <>
                  <h1 className='mb-1 text-black 4xl:text-3xl text-lg font-semibold  text-start ms-5 md:ms-6'>{i.name}</h1>
                  <div className="text-start my-5 ms-5 md:ms-6 text-black">
                      <div className="flex gap-3 items-center ">
                        <p className='text-2xl xl:text-3xl 2xl:text-4xl font-extrabold 4xl:text-2xl dark:text-white'>${i.priceAfterDiscount}</p>
                        <p className='dark:text-[#868C92] text-[#B9BEC1] font-regular text-xs '>per editor/month <p className='dark:text-[#868C92] text-[#B9BEC1] font-regular text-xs'>billed monthly</p></p>
                      </div>
                      {/* <p className='text-black text-4xl 4xl:text-6xl font-bold my-3 dark:text-white'><span className='text-sm 4xl:text-4xl dark:text-white'>$</span>{i.priceAfterDiscount}<span className='text-sm 4xl:text-2xl dark:text-white'>/{t("sub-month")}</span></p> */}
                      {/* <span className='text-[#21e786] font-bold 4xl:text-2xl'>{i.planBenefitDescription}</span> */}
                    </div>
                    <div className={`mb-10 ms-5 4xl:mb-8 md:ms-6 transition-all duration-300 ${expandedId == null ? 'h-auto' : 'h-auto pb-5 '}`}>
                      {i.subscriptionFeatures.map((subItem: {
                        name: string;
                        description: string;
                        id: string;}) =>
                          <div key={subItem.id} className="flex items-center  gap-3 ms-2   relative w-fit sub-main">
                        <FontAwesomeIcon  icon={faCircleCheck}  className=" dark:text-[#575757] text-[#EBEFF0] text-lg 4xl:text-2xl "  />
                        <p className='inline-block   text-black dark:text-[#D2D7D9] sub-main'>{subItem.name}</p>
                        <span className='sub 4xl:text-2xl dark:text-black text-black  '>{subItem?.description}</span>
                      </div>
                      )}
                    </div>
                    <div className="bottom-4 absolute w-full flex justify-center mx-auto">

                       <button className={`dark:text-[#C6C2FF] bg-[#CFFFE8] dark:bg-[#3A3A3D]  text-[#4A5957] w-11/12 md:w-9/12 4xl:w-10/12 4xl:h-16  font-medium  h-10  text-base flex justify-center items-center mx-auto rounded-lg`}>{t("sub-choose-plan")}</button>
                    </div>

                  </>
                }
                </div>
             
                )}
              </Tab.Panel>  
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
      <Footer/>
    </section>
  </>
  
}

export default Subscriptions;
