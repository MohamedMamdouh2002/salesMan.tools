'use client'
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import style from './DemoTable.module.css';
import { routes } from '@/config/routes';
import { invoiceData } from '../../../data/invoice-data';
import InvoiceTable from '@/app/shared/invoice/invoice-list/table';
import TableLayout from '../../[lang]/(hydrogen)/tables/table-layout';
import { metaObject } from '@/config/site.config';
import { getCategory, getLocation, getPlatform, getTableSearch } from '@/lib/api/getTableData';
import { showData } from '@/types';
import Image from 'next/image';
import rocket from '@public/table/rocket.svg'
import flash from '@public/table/flash.svg'
import lightFlash from '@public/table/lightFlash.svg'
export const metadata = {
  ...metaObject('Enhanced Table'),
};

const pageHeader = {
  title: 'Enhanced Table',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      name: 'Tables',
    },
    {
      name: 'Enhanced',
    },
  ],
};

function DemoTable() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [pageSize, setPageSize] = useState(6);
  const [tabsData, setTabsData] = useState<any[]>([]);
  const [city, setCity] = useState<any[]>([]);
  const [category, setCategory] = useState<any[]>([]);
  const [showTable, setShowTable] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<showData[] | null>(null);
  
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<any>(null);
  
  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // منع إعادة تحميل الصفحة عند إرسال النموذج
  
    // افترض أنك حصلت على القيم من حالة أو من مدخلات المستخدم
    const socialMediaPlatformId = selectedPlatform || '';
    const cityId = selectedCity?.value || '';
    const categoryId = selectedCategory?.value || '';
  
    console.log('====================================');
    console.log("socialMediaPlatformId: ", socialMediaPlatformId);
    console.log("cityId: ", cityId);
    console.log("categoryId: ", categoryId);
    console.log('====================================');
    
    // استدعاء الدالة للبحث
    const results = await getTableSearch({ categoryId, cityId, socialMediaPlatformId});
    
    // تعيين النتائج في الحالة
    setSearchResults(results);
  
    // يمكنك التعامل مع النتائج هنا، مثل تحديث الواجهة أو عرض رسالة
    console.log("Results: ", results);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPlatform();
      if (data) {
        setTabsData(data);
        setSelectedPlatform(data[0].id)
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getLocation();
      if (data) {
        const formattedOptions = data.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        setCity(formattedOptions);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCategory();
      if (data) {
        const formattedOptions = data.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        setCategory(formattedOptions);
      }
    };
    fetchData();
  }, []);
  
  return (
    <div className="relative dark:bg-[#1C1C1C] bg-[#F8FAFC]">
      <div className="w-full scale-150 -top-32 -right-52 absolute 2xl:flex 4xl:hidden hidden">
        <Image width={500} height={250} src={rocket} className='w-full md:h-[800px]' alt=''/>
      </div>
      <div className="w-9/11 mx-auto w-full flex flex-col items-center justify-center">
        <div className="text-center pt-10">
          <h2 className='pb-2 font-bold dark:text-white text-black'>Try it Now</h2>
          <h3 className='dark:text-white text-black'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi, voluptatibus!</h3>
        </div>
        {/* <div className="tabsContainer pt-12">
          <div className="tabs w-full">
            {tabsData?.map((tab, index) => (
              <div key={tab.id}>
                <input
                  value={tab.name.toLowerCase()}
                  name="fav_language"
                  id={tab.id}
                  type="radio"
                  className="input"
                  defaultChecked={index === 0}
                  onChange={() => setSelectedPlatform(tab.id)}
                />
                <label htmlFor={tab.id} className="label">
                  {tab.name}
                </label>
              </div>
            ))}
          </div>
        </div>
  
        <form onSubmit={handleSearch} className="xl:flex gap-5 mb-5 pt-5">
          <div className="lg:w-[430px] md:w-[400px] w-[300px] mx-auto">
            <Select
              required
              placeholder="Select Location"
              value={selectedCity}
              onChange={setSelectedCity}
              options={city}
              className='text-black'
              styles={{
                option: (provided: any, state: { isFocused: any; }) => ({
                  ...provided,
                  backgroundColor: state.isFocused ? '#21E786' : 'white',
                  color: state.isFocused ? 'white' : 'black',
                }),
                control: (provided) => ({
                  ...provided,
                  backgroundColor: 'white',
                  borderColor: '#21E786',
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: 'black',
                }),
              }}
            />
          </div>
          <div className="lg:w-[430px] md:w-[400px] w-[300px] mx-auto my-6 xl:my-0">
            <Select
              required
              placeholder="Select Category"
              value={selectedCategory}
              onChange={setSelectedCategory}
              options={category}
              styles={{
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isFocused ? '#21E786' : 'white',
                  color: state.isFocused ? 'white' : 'black',
                }),
                control: (provided) => ({
                  ...provided,
                  backgroundColor: 'white',
                  borderColor: '#21E786',
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: 'black',
                }),
              }}
            />
          </div>
          <div className="lg:w-[250px] md:w-[400px] w-[300px]">
            <button 
              type="submit" 
              className={`${style.btn1} rounded-lg md:m-0 mx-auto block xl:w-[250px] md:w-[400px] w-[300px] h-9 text-center text-secondaryText mb-2`} 
            >
              Search
            </button>
          </div>
        </form>
        
        {searchResults && (
          <div className="bg-white my-6 w-11/12 md:w-9/12 2xl:w-[1135px] 3xl:w-[1135px] 4xl:w-[1135px] rounded-2xl custom-scrollbar-x grid grid-flow-col gap-0 overflow-x-auto scroll-smooth">
            <TableLayout
              title={pageHeader.title}
              breadcrumb={pageHeader.breadcrumb}
              data={searchResults}
              fileName="invoice_data"
              header="ID,Name,Username,Avatar,Email,Due Date,Phone,Status,Created At"
              className='my-5 w-full overflow-hidden text-black dark:text-black'
            >
              <InvoiceTable 
                key={searchResults ? searchResults.length : 0}
                className="table-auto w-full text-black dark:text-black"
                data={searchResults} 
              />
            </TableLayout>
          </div>
        )} */}
      </div>
      <Image width={500} height={250} className='w-full h-32' src={flash} alt='' />
    </div>
  );
  
}

export default DemoTable;
