'use client';
import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/app/i18n/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import Footer from '@/app/components/footer/Footer';
import Card from '@/app/components/ui/card/Card';
import { getFeatureAccordion, getFeatureCard } from '@/lib/api/getFeature';
import subIcon from '@public/feature/subIcon.svg'
import flashing from '@public/faq/flashing.svg'
import Image from 'next/image';
import Title from '@/app/components/ui/title/Title';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

const Features: React.FC = ({ lang }: { lang?: string }) => {
    const { t } = useTranslation(lang!, "feature");
    const [openMainAccordions, setOpenMainAccordions] = useState<number[]>([]);
    const [openSubAccordions, setOpenSubAccordions] = useState<{ [key: number]: number[] }>({});
    const [featureCard, setFeatureCard] = useState<any[]>([]);
    const [featureAccordion, setFeatureAccordion] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getFeatureCard();
            if (data) {
                setFeatureCard(data);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getFeatureAccordion();
            if (data) {
                setFeatureAccordion(data);
            }
        };
        fetchData();
    }, []);

    const toggleMainAccordion = (index: number) => {
        if (openMainAccordions.includes(index)) {
            setOpenMainAccordions(openMainAccordions.filter((item) => item !== index));
            setOpenSubAccordions((prev) => {
                const { [index]: _, ...rest } = prev;
                return rest;
            });
        } else {
            setOpenMainAccordions([...openMainAccordions, index]);
        }
    };

    const toggleSubAccordion = (mainIndex: number, subIndex: number) => {
        setOpenSubAccordions((prev) => {
            const newState = { ...prev };
            // إذا كان الساب فيتشر مفتوحًا، قم بإغلاقه
            if (newState[mainIndex]?.includes(subIndex)) {
                newState[mainIndex] = newState[mainIndex].filter((item) => item !== subIndex);
            } else {
                // افتح الساب فيتشر الحالي وأغلق الآخرين
                newState[mainIndex] = [subIndex]; // احتفظ بالساب فيتشر الحالي فقط
            }
            return newState;
        });
    };
    
    

    return (
        <section className='dark:bg-[#1C1C1C] relative bg-[#F6FAFB]   z-10 text-[#020710] font-montserrat'>
            <Image
                width={300}
                height={150}
                src={flashing}
                className="absolute md:bottom-52  bottom-[500px] right-2 md:w-2/3 w-full h-full z-0 "
                alt='flash'
            />
            <Title 
                title={t('title-feature')} 
                description={t('decs-feature')}
            />
            <div className="md:w-9/12 w-11/12 min-h-screen mx-auto mt-10 mb-20">
                <div className='py-10'>
                    <div className="text-center mb-10">
                        <h3 className='text-black text-3xl font-semibold dark:text-white'>{t("main-feature")}</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 md:gap-3 2xl:gap-5">
                        {featureCard.map((i) =>    
                            <Card   key={i.id} sectionTitle={i.name} content={i.description} />
                        )}
                    </div>
                </div>

                {featureAccordion.map((feature, index) =>
                    <div key={feature.id} className="mb-8 secShadow rounded-xl">
                        <button
                            onClick={() => toggleMainAccordion(index)}
                            className={`relative flex z-10 justify-between items-center  w-full 4xl:h-32 p-[25px] dark:text-white dark:bg-secDark bg-[#fff]  rounded-xl h-auto md:h-[90px] dark:border dark:border-[#3C3C3C] dark:border-b-0 border border-[#fff] border-b-0  ${openMainAccordions.includes(index) ? 'rounded-b-none border-b-0' : ''}`}
                        >
                            <div className="flex justify-start items-center">
                                <Image src={feature.imageUrl} width={30} height={30} alt='feature-icon' />
                                <h2 className='md:text-xl font-bold 4xl:text-2xl text-lg  ps-4 4xl:ps-12 dark:text-white text-black'>{feature.name}</h2>
                            </div>
                            {openMainAccordions.includes(index) ? (
                                <FontAwesomeIcon className='4xl:text-2xl dark:text-white' icon={faAngleUp} />
                            ) : (
                                <FontAwesomeIcon className='dark:text-white 4xl:text-2xl' icon={faAngleDown} />
                            )}
                        </button>

                        {openMainAccordions.includes(index) && (
                            <div
                                className={`grid overflow-hidden z-50 relative transition-all duration-300 ease-in-out text-md dark:bg-secDark ${openMainAccordions.includes(index) ? 'grid-rows-[1fr] opacity-100 rounded-b-xl  dark:bg-secDark  dark:border dark:border-[#3C3C3C] dark:border-t-0 border border-[#fff] border-t-0' : 'grid-rows-[0fr] opacity-0'}`}
                            >
                                {feature.subFeatures?.map((item: { id: React.Key | null | undefined; imageUrl: string | StaticImport; name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | Iterable<React.ReactNode> | null | undefined; description: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | Iterable<React.ReactNode> | null | undefined; }, subIndex: number) => (
                                    <div key={item.id}>
                                        <button
                                            onClick={() => toggleSubAccordion(index, subIndex)} // استخدام subIndex بدلاً من item.index
                                            className={`relative flex justify-between z-50 dark:z-50 items-center w-full p-[25px] h-auto md:h-[60px] dark:border dark:border-[#3C3C3C] dark:border-b-0 border border-b-0 border-[#fff] border-t-0 ${subIndex % 2 === 0 ?   'dark:bg-secDark dark:text-white bg-[#f9fefb]':'dark:bg-secDark dark:text-white bg-mainText' }`}
                                        >
                                            <div className="flex justify-start items-center">
                                                <Image src={item.imageUrl} width={30} height={30} className='w-4' alt='feature-icon' />
                                                <h3 className="md:text-[16px]  font-semibold ps-4 text-[#747794] dark:text-white">
                                                    {item.name}
                                                </h3>
                                            </div>
                                            {openSubAccordions[index] && openSubAccordions[index].includes(subIndex) ? (
                                                <FontAwesomeIcon className='4xl:text-2xl text-[#1C7466] dark:text-white' icon={faMinus} />
                                            ) : (
                                                <FontAwesomeIcon className='4xl:text-2xl text-[#1C7466] dark:text-white' icon={faPlus} />
                                            )}
                                        </button>

                                        {openSubAccordions[index] && openSubAccordions[index].includes(subIndex) && (
                                            <div
                                                className={`grid overflow-hidden z-50 dark:z-50 relative transition-all duration-300 ease-in-out text-md 4xl:text-2xl text-[#1C7466] ${openSubAccordions[index] && openSubAccordions[index].includes(subIndex) ? `grid-rows-[1fr] opacity-100 px-6 dark:border dark:border-[#3C3C3C] dark:border-t-0 border border-[#fff] border-t-0 pb-5` : 'grid-rows-[0fr] opacity-0'}  ${subIndex % 2 === 0 ?   'dark:bg-secDark bg-[#f9fefb]':'dark:bg-secDark dark:text-white bg-mainText' }`}
                                            >
                                                <div className="overflow-hidden  px-8 ">
                                                    <p className='text-[#747794] text-sm dark:text-white mt-2'>
                                                        {item.description}
                                                    </p> 
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}

                            </div>
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </section>
    );
};

export default Features;
