'use client';

import { PiXBold, PiArrowsClockwiseBold } from 'react-icons/pi';
import React, { useState } from 'react';
import { ActionIcon, Title, Button, Input } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import toast from 'react-hot-toast';
import { BASE_URL } from '@/config/site.config';
import Image from 'next/image';
import { useAdminContext } from '@/app/components/context/adminContext';
import { useTranslation } from '@/app/i18n/client';

interface Sub {
  id: string;
  name: string;
  description: string;
  nameAr: string;
  descriptionAr: string;
  Video?: File | null;
  VideoUrl?: string;   
}
type lang ={

  lang:string;
};
type UpdateGuestFormProps = {
  title?: string;
  modalBtnLabel?: string;
  mobId: string;
  initialTitle: string;
  initialContent: string;
  initialTitleAr?: string;
  initialContentAr?: string;
  sectionItem: Sub[]; 
};

export default function ModalUpdate({
  title,
  modalBtnLabel = "Update",
  mobId,
  initialTitle,
  initialContent,
  initialTitleAr,
  initialContentAr,
  sectionItem,
}: UpdateGuestFormProps ,{lang}:lang) {
  const { closeModal } = useModal();

  const [videoTitle, setVideoTitle] = useState(initialTitle);
  const [videoContent, setVideoContent] = useState(initialContent);
  const [videoTitleAr, setVideoTitleAr] = useState(initialTitleAr);
  const [videoContentAr, setVideoContentAr] = useState(initialContentAr);
  const [sectionItems, setSectionItems] = useState<Sub[]>(sectionItem);
  const [loading, setLoading] = useState(false);
  const { setIsUpdate } = useAdminContext();
  const { t } = useTranslation( lang!,"home");
  
  const handleSubFeatureChange = (index: number, key: string, value: string | File | null) => {
    setSectionItems(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [key]: value };
      return updated;
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('Title', videoTitle);
    formData.append('Content', videoContent);
    if (videoTitleAr) {
      formData.append('TitleAr', videoTitleAr);
    }
    
    if (videoContentAr) {
      formData.append('ContentAr', videoContentAr);
    }
    sectionItems.forEach((group, index) => {
      if (group.name) {
        formData.append(`SectionItems[${index}].name`, group.name);
      }
      if (group.id) {
        formData.append(`SectionItems[${index}].id`, group.id);
      }
      if (group.description) {
        formData.append(`SectionItems[${index}].Description`, group.description);
      }
      if (group.nameAr) {
        formData.append(`SectionItems[${index}].nameAr`, group.nameAr);  
      }
      if (group.descriptionAr) {
        formData.append(`SectionItems[${index}].DescriptionAr`, group.descriptionAr);  
      }
      if (group.Video) {
        formData.append(`SectionItems[${index}].Video`, group.Video);
      }
    });
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(`${BASE_URL}/api/Section/Update/${mobId}`, {
        method: 'PUT',
        headers: {
          'accept': 'text/plain',
          'Authorization': `Bearer ${accessToken}`,

        },
        body: formData,
      });

      if (response.ok) {
        toast.success(t('ModifiedSuccessfully'));
        setIsUpdate(true)
        closeModal();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || t('AdditionFailed'));
      }
    } catch (error) {
      toast.error('حدث خطأ يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="m-auto px-5 pb-8 pt-5 rtl IBM-Plex-sans">
      <div className="mb-6 flex items-center justify-between">
        <Title as="h3" className="text-lg IBM-Plex-sans">
          {title}
        </Title>
        <ActionIcon
          size="sm"
          variant="text"
          onClick={() => closeModal()}
          className="p-0 text-gray-500 hover:!text-gray-900"
        >
          <PiXBold className="h-[18px] w-[18px]" />
        </ActionIcon>
      </div>

      <div className="mb-6">
        <Input
          label="Title"
          placeholder="Enter Title"
          value={videoTitle}
          onChange={(e) => setVideoTitle(e.target.value)}
          className="mb-4"
        />
    
        <Input
          label="Description"
          placeholder="Enter Description"
          value={videoContent}
          onChange={(e) => setVideoContent(e.target.value)}
          className="mb-4"
        />
        <Input
          label="العنوان"
          placeholder="اضافه العنوان"
          value={videoTitleAr}
          onChange={(e) => setVideoTitleAr(e.target.value)}
          className="mb-4 text-right"
          style={{ textAlign: 'right', direction: 'rtl' }}
        />
    
        <Input
          label="الوصف"
          placeholder="اضافة الوصف"
          value={videoContentAr}
          onChange={(e) => setVideoContentAr(e.target.value)}
          className="mb-4 text-right"
          style={{ textAlign: 'right', direction: 'rtl' }}
        />
      </div>

      {/* عرض كل عناصر sectionItems في قائمة */}
      {sectionItems.map((item, index) => (
        <div key={item.id} className="mb-4">
          <Input
            label={`subTitle ${index + 1}`}
            placeholder="Enter subTitle"
            value={item.name}
            onChange={(e) => handleSubFeatureChange(index, 'name', e.target.value)}
            className="mb-4"
          />
          <Input
            label={`subDescription ${index + 1}`}
            placeholder="Enter subDescription"
            value={item.description}
            onChange={(e) => handleSubFeatureChange(index, 'description', e.target.value)}
            className="mb-4"
          />
          <Input
            label={`العنوان الفرعي ${index + 1}`}
            placeholder="تعديل العنوان الفرعي"
            value={item.name}
            onChange={(e) => handleSubFeatureChange(index, 'name Ar', e.target.value)}
            className="mb-4 text-right"
            style={{ textAlign: 'right', direction: 'rtl' }}
          />
          <Input
            label={`الوصف الفرعي ${index + 1}`}
            placeholder="تعديل الوصف الفرعي"
            value={item.description}
            onChange={(e) => handleSubFeatureChange(index, 'descriptionAr', e.target.value)}
            className="mb-4 text-right"
            style={{ textAlign: 'right', direction: 'rtl' }}
          />
          
          {/* عرض الفيديو القديم إذا كان موجودًا */}
          {item.VideoUrl && (
            <div className="mb-4">
              <p>Video:</p>
              <video controls width="100%">
                <source src={item.VideoUrl} type="video/mp4" />
                المتصفح الخاص بك لا يدعم تشغيل الفيديو.
              </video>
            </div>
          )}

          {/* رفع فيديو جديد */}
          <input
            type="file"
            // label={`فيديو الفرع ${index + 1}`}
            onChange={(e) => handleSubFeatureChange(index, 'Video', e.target.files?.[0] || null)}
            className="mb-4"
          />
        </div>
      ))}

      <div className="flex justify-end gap-3">
        <Button onClick={handleSubmit} disabled={loading} className="w-full">
          {loading ? 'loading...' : (
            <>
              {modalBtnLabel}
              <PiArrowsClockwiseBold className="ms-1.5 h-[17px] w-[17px]" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
