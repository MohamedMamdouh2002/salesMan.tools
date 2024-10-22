'use client';

import { PiXBold, PiArrowsClockwiseBold } from 'react-icons/pi';
import React, { useState } from 'react';
import { ActionIcon, Title, Button, Input } from 'rizzui';
import toast from 'react-hot-toast';
import { BASE_URL } from '@/config/site.config';
import Image from 'next/image';
import { useAdminContext } from '@/app/components/context/adminContext';
import { useTranslation } from '@/app/i18n/client';
import { useModal } from '@/app/shared/modal-views/use-modal';

interface Sub {
  name: string;
  nameAr: string;
  id:string
}

type UpdateGuestFormProps = {
  title?: string;
  modalBtnLabel?: string;
  featureId: string;
  initialTitle: string;
  initialTitleAr: string;
  // initialDescription: string;
  initialImg: string;
  subFeatures: Sub[];
  closeModal: () => void;
};
type lang ={

  lang:string;
};
export default function ModalUpdate({
  title='Update',
  modalBtnLabel = "Update",
  featureId,
  initialTitle,
  initialTitleAr,
  initialImg,
  subFeatures: initialSubFeatures,
}: UpdateGuestFormProps,{lang}:lang) {
  const { closeModal } = useModal();
  const [DocTitle, setDocTitle] = useState(initialTitle);
  const [DocTitleAr, setDocTitleAr] = useState(initialTitleAr);
  const [imagePreview, setImagePreview] = useState(initialImg);
  const [featureImg, setFeatureImg] = useState<File | null>(null);
  const [subFeatures, setSubFeatures] = useState<Sub[]>(initialSubFeatures);
  const [loading, setLoading] = useState(false);
  const { setIsUpdate } = useAdminContext();
  const { t } = useTranslation( lang!,"home");

  const handleSubFeatureChange = (index: number, key: string, value: string | File) => {
    setSubFeatures(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [key]: value };
      return updated;
    });
  };

  const handleSubmit = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append('Name', DocTitle);
    formData.append('NameAr', DocTitleAr);
    // formData.append('Description', description);
    if (featureImg) {
      formData.append('Image', featureImg);
    }
    subFeatures.forEach((subFeature, index) => {
      if (subFeature.name) {
        formData.append(`DocumentationSubCategories[${index}].name`, subFeature.name);
      }
      if (subFeature.nameAr) {
        formData.append(`DocumentationSubCategories[${index}].nameAr`, subFeature.nameAr);
      }
      if (subFeature.id) {
        formData.append(`DocumentationSubCategories[${index}].id`, subFeature.id);
      }
    });

    try {
      const response = await fetch(`${BASE_URL}/api/DocumentationCategory/Update/${featureId}`, {
        method: 'PUT',
        headers: { 'accept': 'text/plain' },
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
        <Title as="h3" className="text-lg IBM-Plex-sans">{title}</Title>
        <ActionIcon
          size="sm"
          variant="text"
          onClick={closeModal}
          className="p-0 text-gray-500 hover:!text-gray-900"
        >
          <PiXBold className="h-[18px] w-[18px]" />
        </ActionIcon>
      </div>

      <div className="mb-6">
        <input type="file" accept="image/*" onChange={(e) => setFeatureImg(e.target.files?.[0] || null)} className="mb-4" />
        {imagePreview && (
          <Image width={100} height={50} src={imagePreview} alt="Image Preview" className="mb-4" style={{ maxWidth: '100%', height: 'auto' }} />
        )}
        <Input label="Title" placeholder="Enter Title" value={DocTitle} onChange={(e) => setDocTitle(e.target.value)} className="mb-4" />        
        <Input label="العنوان" placeholder="أدخل العنوان" value={DocTitleAr} onChange={(e) => setDocTitleAr(e.target.value)} className="mb-4 text-right" style={{ textAlign: 'right', direction: 'rtl' }}  />        
        {subFeatures.map((subFeature, index) => (
          <div key={index} className="mb-4 border p-4">
            <Input
              label="SubDoc Title"
              placeholder="SubDoc Title"
              value={subFeature.name}
              onChange={(e) => handleSubFeatureChange(index, 'name', e.target.value)}
              className="mb-4"
            />
            <Input
              label="اسم الميزة الفرعية"
              placeholder="أدخل اسم الميزة الفرعية"
              value={subFeature.nameAr}
              onChange={(e) => handleSubFeatureChange(index, 'nameAr', e.target.value)}
              className="mb-4 text-right"
              style={{ textAlign: 'right', direction: 'rtl' }} 
            />
          </div>
        ))}
      </div>

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
