'use client';
import { useParams } from 'next/navigation'; // استخدام useParams لجلب المعلمات
import Title from '@/app/components/ui/title/Title';
import { getDocumentatoinId } from '@/lib/api/getDoc';
import React, { useEffect, useState } from 'react';

function Doc() {
  const { id } = useParams(); 

  const [doc, setDoc] = useState<any | null>(null);

  useEffect(() => {
    if (id) {  
      const fetchData = async () => {
        const data = await getDocumentatoinId(id as string);
        if (data) {
          setDoc(data); 
          console.log('====================================');
          console.log("doc",data);
          console.log('====================================');
        }
      };
      fetchData();
    }
  }, [id]); 



  return (
    <>
      <div className="bg-secondaryBg dark:bg-mainBg font-montserrat">
        <Title 
          title={doc?.name}  
          description={doc?.description} 
        />
        
        <div className="md:w-9/12 w-11/12 mx-auto min-h-screen pt-10 -translate-y-20 md:-translate-y-40">
          <video 
            loop 
            muted 
            controls 
            playsInline 
            className="w-full max-h-[600px] object-cover rounded-2xl " 
            width="100%" 
            height="100%"
          >
            {doc?.videoUrl ? (
                <source src={doc.videoUrl} type="video/mp4" />
              ) : (
                <p className="text-red-500">Video URL is not available</p>
              )}
          </video>

          <div className=" mt-6">
            <h2 className="font-monbold md:text-2xl text-lg 4xl:text-4xl dark:text-white">
              Documentation Sections
            </h2>
            {doc?.documentationSections.map((section: { id: React.Key | null | undefined; title: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | Iterable<React.ReactNode> | null | undefined; content: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | Iterable<React.ReactNode> | null | undefined; }) => (
              <div key={section.id} className="my-4">
                <h3 className="font-monbold text-xl dark:text-white">{section?.title}</h3>
                <p className="font-monmedium text-base dark:text-gray-400">{section?.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Doc;
