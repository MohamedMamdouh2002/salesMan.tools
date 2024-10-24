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

type lang ={

  lang:string;
};
type UpdateGuestFormProps = {
  title?: string;
  modalBtnLabel?: string;
  mobId: string;
  initialTitle?: string;
  initialContent?: string;
  initialDescription?: string;
  initialTitleAr?: string;
  initialContentAr?: string;
  initialDescriptionAr?: string;
  initialImg?: string;

};

export default function ModalUpdate({
  title,
  modalBtnLabel = "Update",
  mobId,
  initialTitle = '',
  initialContent = '',
  initialDescription = '',
  initialTitleAr = '',
  initialContentAr = '',
  initialDescriptionAr = '',
  initialImg = ""
}: UpdateGuestFormProps ,{lang}:lang) {
  const { closeModal } = useModal();
  const [mobTitle, setMobTitle] = useState(initialTitle);
  const [mobSupTitle, setMobSupTitle] = useState(initialContent);
  const [description, setDescription] = useState(initialDescription);
  const [mobTitleAr, setMobTitleAr] = useState(initialTitleAr);
  const [contentAr, setContentAr] = useState(initialContentAr);
  const [descriptionAr, setDescriptionAr] = useState(initialDescriptionAr);
  const [mobImg, setMobImg] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(initialImg);
  const [loading, setLoading] = useState(false);
  const { setIsUpdate } = useAdminContext();
  const { t } = useTranslation( lang!,"home");
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMobImg(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append('Name', mobTitle);
    formData.append('Content', mobSupTitle); 
    formData.append('Description', description);
    formData.append('NameAr', mobTitleAr);
    formData.append('ContentAr', contentAr);
    formData.append('DescriptionAr', descriptionAr);
  
    if (mobImg) {
      formData.append('Image', mobImg); 
    }
    try {  
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(`${BASE_URL}/api/AdditionalFeature/Update/${mobId}`, {
        method: 'PUT',
        headers: {
          'accept': 'text/plain', 
          'Authorization': `Bearer ${accessToken}`,
        },
        body: formData,
      });
    
      // console.log("Response status:", response.status); 
    
      if (response.ok) {
        toast.success(t('ModifiedSuccessfully'));
        setIsUpdate(true)
        closeModal();
      } else {
        const errorData = await response.json();
        console.log("Error data:", errorData); 
        toast.error(errorData.message || t('AdditionFailed'));
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('حدث خطأ يرجى المحاولة مرة أخرى.');
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
          onChange={handleImageChange}
          className="mb-4"
        />
        {imagePreview && (
          <Image width={100} height={50} src={imagePreview} alt="Image Preview" className="mb-4" style={{ maxWidth: '100%', height: 'auto' }} />
        )}
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
          value={mobSupTitle}
          onChange={(e) => setMobSupTitle(e.target.value)}
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
      </div>

      <div className="flex justify-end gap-3">
        <Button onClick={handleSubmit} disabled={loading} className="w-full">
          {loading ? 'Loading...' : (
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
