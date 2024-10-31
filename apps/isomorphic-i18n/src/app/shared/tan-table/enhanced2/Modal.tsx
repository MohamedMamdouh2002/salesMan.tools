import { PiXBold } from 'react-icons/pi';
import React, { useState } from 'react';
import { ActionIcon, Title, Button, Input } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import toast from 'react-hot-toast';
import { BASE_URL } from '@/config/base-url';
;
import { useAdminContext } from '@/app/components/context/adminContext';
import { useTranslation } from '@/app/i18n/client';

type ModalProps = {
  title?: string;
  lang?:string;
  modalBtnLabel?: string;
};

export default function Modal({
  title,
  lang,
  modalBtnLabel = 'Add',
}: ModalProps) {
  const { closeModal } = useModal();
  const [mobTitle, setMobTitle] = useState(''); 
  const [content, setContent] = useState(''); 
  const [description, setDescription] = useState(''); 
  const [mobTitleAr, setMobTitleAr] = useState(''); 
  const [contentAr, setContentAr] = useState(''); 
  const [descriptionAr, setDescriptionAr] = useState(''); 
  const [mobImg, setMobImg] = useState<File | null>(null); 
  const [loadingBenefit, setLoadingBenefit] = useState(false); // لتحميل Benefit
  const {isUpdate,setIsUpdate} =useAdminContext()
  const { t } = useTranslation( lang!,"admin");
  
  const handleSubmitBenefit = async () => {
    const formData = new FormData();
    formData.append('Name', mobTitle);
    formData.append('content', content);
    formData.append('Description', description);
    formData.append('NameAr', mobTitleAr);
    formData.append('ContentAr', contentAr);
    formData.append('DescriptionAr', descriptionAr);
    
    
    if (mobImg) {
      formData.append('Image', mobImg); // إضافة الصورة إلى النموذج
    }
    
    try {
      setLoadingBenefit(true);
      const accessToken = localStorage.getItem('accessToken');

      const response = await fetch(`${BASE_URL}/api/AdditionalFeature/Create`, {
        method: 'POST',
        headers: {
          'Accept': 'text/plain',
          'Authorization': `Bearer ${accessToken}`,
 
        },
        body: formData, // استخدام FormData بدلاً من JSON
      });
      
      if (response.ok) {
        const responseData = await response.text(); 
        // console.log(responseData);
        setIsUpdate(true);
        toast.success(t('AddedSuccessfully'));
        setLoadingBenefit(false);
        closeModal()
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || t('AdditionFailed'));
        setLoadingBenefit(false);
      }
    } catch (error) {
      setLoadingBenefit(false);
      toast.error("Failed");
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
        <input
          type="file" 
          accept="image/*" 
          onChange={(e) => setMobImg(e.target.files?.[0] || null)} // التعامل مع تغيير الصورة
          className="mb-4"
        />
        <Input
          label="Title"
          placeholder="Enter Title"
          value={mobTitle}
          onChange={(e) => setMobTitle(e.target.value)}
          className="mb-4"
        />
        <Input
          label="Content"
          placeholder="Enter Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mb-4"
        />
        <Input
          label="Description"
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-4"
        />
        <Input
          label="العنوان"
          placeholder="اضافة العنوان"
          value={mobTitleAr}
          onChange={(e) => setMobTitleAr(e.target.value)}
          className="mb-4 text-right"
          style={{ textAlign: 'right', direction: 'rtl' }}
        />
        <Input
          label="المحتوي"
          placeholder="اضافة المحتوي"
          value={contentAr}
          onChange={(e) => setContentAr(e.target.value)}
          className="mb-4 text-right"
          style={{ textAlign: 'right', direction: 'rtl' }}
        />
        <Input
          label="الوصف"
          placeholder="اضافة الوصف"
          value={descriptionAr}
          onChange={(e) => setDescriptionAr(e.target.value)}
          className="mb-4 text-right"
          style={{ textAlign: 'right', direction: 'rtl' }}
        />
        <Button onClick={handleSubmitBenefit} disabled={loadingBenefit} className="w-full">
          {loadingBenefit ? t('loadind...') : t('add') }
        </Button>
      </div>
    </div>
  );
}
