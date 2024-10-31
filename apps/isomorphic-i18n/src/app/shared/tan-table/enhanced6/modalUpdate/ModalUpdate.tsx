'use client';

import { PiXBold, PiArrowsClockwiseBold } from 'react-icons/pi';
import React, { useState } from 'react';
import { ActionIcon, Title, Button, Input } from 'rizzui';
import toast from 'react-hot-toast';
import { BASE_URL } from '@/config/base-url';
;
import Image from 'next/image';
import { useAdminContext } from '@/app/components/context/adminContext';
import { useTranslation } from '@/app/i18n/client';
import { useModal } from '@/app/shared/modal-views/use-modal';

type subFeatures = {
  id: string;
  name?: string;
  description?: string;
  nameAr?: string;
  descriptionAr?: string;
  image?: File | null; // Keep the type as File | null
};
type lang ={

  lang:string;
};
type UpdateGuestFormProps = {
  title?: string;
  modalBtnLabel?: string;
  featureId: string;
  initialTitle: string;
  initialDescription: string;
  initialTitleAr: string;
  initialDescriptionAr: string;
  initialImg: string;
  subFeatures: subFeatures[];
  closeModal: () => void;
};

export default function ModalUpdate({
  title='Update',
  modalBtnLabel = "Update",
  featureId,
  initialTitle,
  initialDescription,
  initialTitleAr,
  initialDescriptionAr,
  initialImg,
  subFeatures: initialSubFeatures,
}: UpdateGuestFormProps,{lang}:lang) {
  const { closeModal } = useModal();
  const [featureTitle, setFeatureTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [featureTitleAr, setFeatureTitleAr] = useState(initialTitleAr);
  const [descriptionAr, setDescriptionAr] = useState(initialDescriptionAr);
  const [imagePreview, setImagePreview] = useState(initialImg);
  const [featureImg, setFeatureImg] = useState<File | null>(null);
  const [subFeatures, setSubFeatures] = useState<subFeatures[]>(initialSubFeatures);
  const [loading, setLoading] = useState(false);
  const { setIsUpdate } = useAdminContext();
  const { t } = useTranslation( lang!,"home");

  const handleImageChange = (index: number, file: File | null) => {
    const newSubFeatures = [...subFeatures];
    newSubFeatures[index].image = file;
    setSubFeatures(newSubFeatures);
  };

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
    formData.append('Name', featureTitle);
    formData.append('Description', description);
    formData.append('NameAr', featureTitleAr);
    formData.append('DescriptionAr', descriptionAr);
    if (featureImg) {
      formData.append('Image', featureImg);
    }
    subFeatures.forEach((subFeature, index) => {
      if (subFeature.id) {
        formData.append(`SubFeatures[${index}].id`, subFeature.id);
      }
      if (subFeature.name) {
        formData.append(`SubFeatures[${index}].name`, subFeature.name);
      }
      if (subFeature.description) {
        formData.append(`SubFeatures[${index}].description`, subFeature.description);
      }
      if (subFeature.nameAr) {
        formData.append(`SubFeatures[${index}].nameAr`, subFeature.nameAr);
      }
      if (subFeature.descriptionAr) {
        formData.append(`SubFeatures[${index}].descriptionAr`, subFeature.descriptionAr);
      }
      if (subFeature.image) {
        formData.append(`SubFeatures[${index}].image`, subFeature.image);
      }
    });

    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(`${BASE_URL}/api/Feature/Update/${featureId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'accept': 'text/plain'
         },
        body: formData,
      });

      if (response.ok) {
        toast.success(t('ModifiedSuccessfully'));
        setIsUpdate(true)
        closeModal();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'حدث خطأ أثناء التحديث.');
      }
    } catch (error) {
        toast.error(t('AdditionFailed'));
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
        <Input label="Title" placeholder="ُEnter Title" 
        value={featureTitle} 
        onChange={(e) => setFeatureTitle(e.target.value)} 
        className="mb-4" 
        />
        <Input label="Description" placeholder="Enter Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mb-4" 
        />
        <Input label="العنوان"
        placeholder="تعديل العنوان" 
        value={featureTitleAr} 
        onChange={(e) => setFeatureTitleAr(e.target.value)} 
        className="mb-4 text-right"
        style={{ textAlign: 'right', direction: 'rtl' }} 
        />
        <Input label="الوصف" 
        placeholder="تعديل الوصف"
        value={descriptionAr}
        onChange={(e) => setDescriptionAr(e.target.value)}
        className="mb-4 text-right"
        style={{ textAlign: 'right', direction: 'rtl' }} 
        />
     
        {subFeatures.map((subFeature, index) => (
          <div key={subFeature.id} className="mb-4 border p-4">
            <Input
              label="SubFeature Title"
              placeholder="SubFeature Title"
              value={subFeature.name}
              onChange={(e) => handleSubFeatureChange(index, 'name', e.target.value)}
              className="mb-4"
            />
            <Input
              label="SubFeature Description"
              placeholder="SubFeature Description"
              value={subFeature.description}
              onChange={(e) => handleSubFeatureChange(index, 'description', e.target.value)}
              className="mb-4"
            />
            <Input
              label="اسم الميزة الفرعية"
              placeholder="تعديل اسم الميزة الفرعية"
              value={subFeature.nameAr}
              onChange={(e) => handleSubFeatureChange(index, 'nameAr', e.target.value)}
              className="mb-4 text-right"
              style={{ textAlign: 'right', direction: 'rtl' }} 
            />
            <Input
              label="وصف الميزة الفرعية"
              placeholder="تعديل وصف الميزة الفرعية"
              value={subFeature.descriptionAr}
              onChange={(e) => handleSubFeatureChange(index, 'descriptionAr', e.target.value)}
              className="mb-4 text-right"
              style={{ textAlign: 'right', direction: 'rtl' }} 
            />
            
            {subFeature.image && (
              <div className="mb-4">
                <Image
                  width={100}
                  height={50}
                  src={URL.createObjectURL(subFeature.image)} // Create URL for file
                  alt={`صورة الميزة الفرعية - ${subFeature.name}`}
                  className="mb-4"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </div>
            )}
            
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleImageChange(index, file); // Update the image for the subFeature
                }
              }}
              className="mb-4"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-3">
        <Button onClick={handleSubmit} disabled={loading} className="w-full">
          {loading ? 'تحميل...' : (
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
