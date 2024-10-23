'use client'
import { useEffect, useState } from 'react';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown, faClock } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { Input } from 'rizzui';
import { getDocumentationCategory, getDocumentatoin } from '@/lib/api/getDoc';
import { Doc } from '@/types';
import Link from 'next/link';
import pen from "@public/assets/pen.svg"
import globe from "@public/assets/globeDoc.svg"
import Title from '@/app/components/ui/title/Title';
import { useTranslation } from '@/app/i18n/client';
import Footer from '@/app/components/footer/Footer';

interface SubItem {
  id: string;
  name: string;
}

interface Item {
  id: string;
  imageUrl: string;
  name: string;
  documentationSubCategories: SubItem[];
}

interface Props {
  docFilter: Item[];
}

const Documentation:React.FC=({ lang }: { lang?: string })=>{
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openMainAccordions, setOpenMainAccordions] = useState<string[]>([]);
  const [selectedSubItemId, setSelectedSubItemId] = useState<string | null>(null);
  const [docFilter, setDocFilter] = useState<Item[]>([]);
  const [doc, setDoc] = useState<any[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<any | null>(null);
  const { t } = useTranslation(lang!, "title");

  const toggleMainAccordion = (id: string) => {
    setOpenMainAccordions(prev =>
      prev.includes(id)
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const handleSubItemClick = (id: string) => {
    setSelectedSubItemId(id);

    // Filter documentation data based on selected sub-item ID
    const filteredDocs = doc.filter(document => document.documentationSubCategoryId === id);
    setSelectedDoc(filteredDocs.length > 0 ? filteredDocs[0] : null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDocumentationCategory();
        if (data) {
          const formattedData = data.map((doc) => ({
            ...doc,
            imageUrl: typeof doc.imageUrl === 'string' ? doc.imageUrl : '',
          })) as Item[];
          
          setDocFilter(formattedData);

          if (formattedData.length > 0) {
            setOpenMainAccordions([formattedData[0].id]);
          }
        }
      } catch (error) {
        console.error('Error fetching documentation categories:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDocumentatoin();
        if (data && Array.isArray(data)) {
          const validatedData = data.map(item => ({
            ...item,
            documentationSubCategories: Array.isArray(item.documentationSubCategories) ? item.documentationSubCategories : []
          }));
          setDoc(validatedData);
  
          // تعيين العنصر الأول افتراضيًا إذا لم يكن هناك `selectedSubItemId`
          if (validatedData.length > 0 && !selectedSubItemId) {
            const firstItem = validatedData[0]; // الحصول على العنصر الأول
            setSelectedSubItemId(firstItem.documentationSubCategories[0]?.id || null); // تعيين معرف الفئة الفرعية الأولى
            setSelectedDoc(firstItem); // تعيين أول عنصر كالمستند المختار
          }
        }
      } catch (error) {
        console.error('Error fetching documentation data:', error);
      }
    };
    fetchData();
  }, [selectedSubItemId]);

  const filteredItems = docFilter.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.documentationSubCategories.some(subItem =>
      subItem.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="bg-white dark:bg-mainBg min-h-screen font-montserrat">
      <Title
        title={t('title-doc')}
        description={t('decs-doc')}
      />
      <div className="md:w-9/12 w-11/12 mx-auto mt-10">
        <div className="lg:grid grid-cols-12 xl:gap-24 gap-10">
        <div className="xl:col-span-4 md:col-span-4 mb-12 dark:bg-secDark secShadow h-auto bg-white text-black docBorder rounded-xl pb-10 pt-12 lg:sticky top-[20%]">
          <div className="w-10/12 mx-auto  mb-5">
              <Input
                type="search"
                placeholder="search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className=' '
                prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
              />
              <div>
                {filteredItems.map((item) => (
                  <div key={item.id}>
                    <button
                      onClick={() => toggleMainAccordion(item.id)}
                      className={`relative flex justify-between items-center w-full rounded-xl h-auto md:h-auto mt-5 ${openMainAccordions.includes(item.id) ? 'rounded-b-none' : 'h-[50px] mb-1'}`}
                    >
                      <div className="flex justify-start items-center">
                      <Image
                        src={item.imageUrl}
                        width={30}
                        height={30}
                        className={`bg-[#F7F7FF] border-white dark:bg-[#262626] dark:border dark:border-[#3B3B3B]  w-10 h-10  3xl:w-10 4xl:w-10 4xl:h-10 p-2 rounded-md`}
                        alt="icon"
                      />                
                      <span className='text-[14px] 4xl:text-2xl font-monsemibold ps-3 4xl:ps-7 dark:text-white'>{item.name}</span>
                      </div>
                      {openMainAccordions.includes(item.id) ? 
                        <FontAwesomeIcon className='4xl:text-2xl dark:text-white' icon={faAngleUp} /> : 
                        <FontAwesomeIcon className='4xl:text-2xl dark:text-white' icon={faAngleDown} />
                      }
                    </button>
                    <div
                      className={`grid overflow-hidden transition-all duration-300 ease-in-out ${openMainAccordions.includes(item.id) ? 'grid-rows-auto' : 'h-0'}`}
                    >
                      {item.documentationSubCategories.map((subItem) => (
                        <div key={subItem.id}>
                          <button
                            onClick={() => handleSubItemClick(subItem.id)}
                            className="relative flex  items-center w-full rounded-xl h-auto md:h-auto mt-4"
                          >
                             <Image
                              src={pen}
                              width={10}
                              height={5}
                              className={` border w-3 h-3  3xl:w-[70px] 4xl:w-6 4xl:h-6 p-2 rounded-md`}
                              alt="icon"
                              />     
                            <span className='text-[16px] 4xl:text-xl text-left font-monsemibold ps-3 dark:text-white'>{subItem.name}</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="xl:col-span-8 md:col-span-8 relative w-full mt-3">
  <Image
    src={globe}
    width={30}
    height={30}
    className={`w-28 h-28 3xl:w-[70px] 4xl:w-20 4xl:h-20 absolute -top-16 -start-5`}
    alt="icon"
  />
  {selectedSubItemId ? (
    doc
      .filter(document => document.documentationSubCategoryId === selectedSubItemId)
      .map((filteredDoc) => (
        <div key={filteredDoc.id} className="mb-4 group 4xl:mb-10 h-auto 4xl:pb-0 relative md:flex rounded-xl docshadow dark:border dark:border-[#D6D6D6] bg-white dark:bg-secDark">
          {filteredDoc.imageUrl && (
            <Image
              src={filteredDoc.imageUrl}
              width="500"
              height="200"
              alt="Menu"
              className="kk rounded-t-xl md:rounded-e-none md:rounded-s-xl md:w-1/3 h-[240px] object-cover"
            />
          )}
          <div className="px-5 pt-5 min-h-[240px]">
            <p className='font-medium'>Business</p>
            <h2 className="text-black group-hover:text-[#21E786] duration-200 lg:my-4 my-2 text-base lg:text-2xl 4xl:text-2xl dark:text-white">
              {filteredDoc.name}
            </h2>
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5">
                <FontAwesomeIcon icon={faClock} className='dark:text-[#B9B9B9]' />
                <span className='dark:text-[#B9B9B9]'>{filteredDoc.videoDuration}{t('doc-min')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FontAwesomeIcon icon={faClock} className='dark:text-[#B9B9B9]'/>
                <span className='dark:text-[#B9B9B9]'>62,404 {t('doc-learners')}</span>
              </div>
            </div>
            <div className="flex justify-end gap-4 absolute bottom-2 end-2">
              <Link href={`/documentation/${filteredDoc.id}`}>
                <button className='mt-5 py-2 px-4 4xl:py-5 4xl:px-10 rounded-lg border  border-[#D6D6D6] text-black dark:text-white 4xl:text-3xl font-monmedium text-base'>
                  {t('More-Info')}
                </button>
              </Link>
              {/* <Link href={`/documentation/${filteredDoc.id}`}>
                <button className='mt-5 py-2 px-4 4xl:py-5 4xl:px-10 rounded-lg bg-greenColor dark:bg-greenColor dark:text-black text-black 4xl:text-3xl font-medium text-base'>
                  Start watch
                </button>
              </Link> */}
            </div>
          </div>
        </div>
      ))
  ) : (
    <p className="text-center text-gray-500">{t('doc-select')}</p>
  )}
</div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Documentation;
