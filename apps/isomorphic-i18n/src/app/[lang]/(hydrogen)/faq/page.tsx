'use client';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import Lottie from 'lottie-react';
import Footer from '@/app/components/footer/Footer';
import faqAnimation from "@public/faq/wEYd81upSi.json";
import flash from "@public/faq/flashing.svg";
import faq from "@public/faq/photo.svg";
import { getFaq } from '@/lib/api/getFaq'; 
import Title from '@/app/components/ui/title/Title';
import { useTranslation } from "@/app/i18n/client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import Head from 'next/head';

const Faq:React.FC=({ lang }: { lang?: string }) =>{
    const { t } = useTranslation(lang!, "title");
    const [openAccordion, setOpenAccordion] = useState<string | null>(null);
    const [faqs, setFaqs] = useState<any[]>([]);

    const toggleAccordion = (id: string) => {
        setOpenAccordion((prev) => (prev === id ? null : id));
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await getFaq();
            if (data) {
                setFaqs(data);
                console.log(data); 

            }
        };
        fetchData();
    }, []);

    // Generate FAQ Schema (JSON-LD)
    const generateFAQSchema = () => {
        if (faqs.length === 0) return null;

        const faqSchema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map((faq: any) => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            }))
        };

        return (
            <script 
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
        );
    };

    return (
        <section className="bg-white dark:bg-mainBg relative text-[#020710] min-h-screen font-montserrat">
            <Head>
                {generateFAQSchema()}
            </Head>
            <Image
                width={300}
                height={150}
                src={flash}
                className="absolute md:bottom-52 bottom-28 right-2 md:w-2/3 w-full h-full z-0 "
                alt='flash'
            />
            <Title 
                title={t('title-faq')} 
                description={t('decs-faq')}
            />
            <div className="md:w-9/12 w-11/12  md:grid grid-cols-12 mb-10 justify-center items-start gap-10 lg:gap-20 mx-auto">
                <div className="lg:col-span-4 col-span-5 mt-3 flex flex-col justify-between">
                    <h2 className="mb-5 font-monbold text-[22px] md:text-3xl 4xl:text-4xl text-black dark:text-white tracking-[3px]">
                        WE ARE HERE TO <br /> SUPPORT YOU EVERY <h2 className='text-greenColor dark:text-greenColor'>STEP OF THE WAY</h2>
                    </h2>
                    <h3 className="2xl:text-[22px] text-[18px]  font-medium dark:text-[#AEAEAE] text-[#5B5B5C] 4xl:text-2xl leading-[30px]">
                        If you have any questions about the <span className="text-[#5B5B5C] dark:text-[#AEAEAE]">features of Sales Man</span> or how to make the <span className="text-[#5B5B5C] dark:text-[#AEAEAE]">most of our services,</span> we have compiled the <span className="text-[#5B5B5C] dark:text-[#AEAEAE]">most frequently asked questions</span> and <span className="text-[#5B5B5C] dark:text-[#AEAEAE]">provided clear, straightforward answers.</span> Feel free to browse through these questions.
                    </h3>
                    <div className="flex justify-center mt-5">
                        <Image src={faq} width={200} height={100} alt=''/>
                    </div>
                </div>
                <div className="lg:col-span-8 col-span-7 relative z-50 grid grid-cols-1 lg:grid-cols-2 md:gap-3">
                    {faqs.map((faq) => (
                        <div key={faq.id} className="mb-2 relative w-full h-fit rounded-2xl secShadow z-10">
                        <button
                        aria-expanded={openAccordion === faq.id}
                        onClick={() => toggleAccordion(faq.id)}
                        className={`relative 4xl:h-32 bg-white dark:bg-secDark dark:text-white font-monbold flex justify-between items-center border border-b-0 border-white dark:border dark:border-b-0 dark:border-[#3C3C3C] w-full ps-0 p-[25px] rounded-2xl h-auto md:h-min-[90px] ${openAccordion === faq.id ? 'rounded-b-none rounded-xl' : ''}`}
                        >
                            <h2 className={`2xl:text-[22px] text-[18px] font-medium text-start ps-5 leading-[1.25] ${openAccordion === faq.id ? "text-greenColor dark:text-greenColor" : "dark:text-white"}`}>
                                {faq.question}
                            </h2>
                            <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ rotate: openAccordion === faq.id ? 180 : 0 }}  
                            transition={{ duration: 0.3 }} 
                            >
                                <FontAwesomeIcon
                                    className={`4xl:text-2xl px-2 py-2 rounded-md ${openAccordion === faq.id ? 'text-white bg-greenColor' : 'bg-[#F7F7FF] text-black dark:bg-[#262626] dark:text-white'}`}
                                    icon={openAccordion === faq.id ? faMinus : faPlus}
                                />
                            </motion.div>
                        </button>

                            <div className={`top-0 end-0 grid overflow-hidden 4xl:text-2xl transition-all text-md dark:bg-secDark ${openAccordion === faq.id ? 'rounded-t-0 border border-b-0 border-t-0 border-white  dark:border dark:border-b-0 dark:border-t-0 dark:border-[#3C3C3C] ps-5 px-10 bg-white grid-rows-[1fr] opacity-100 rounded-b-2xl pb-5' : 'grid-rows-[0fr] opacity-0'}`}>
                                <h3 className="overflow-hidden text-base font-regular text-[#5D5D5D] dark:text-[#B9B9B9]">{faq.answer}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </section>
    );
}

export default Faq;