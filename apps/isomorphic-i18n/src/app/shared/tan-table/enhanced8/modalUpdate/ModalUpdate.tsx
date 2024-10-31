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

interface DocumentationSection {
  title: string;
  content: string;
  titleAr: string;
  contentAr: string;
  id: string;
}

type UpdateGuestFormProps = {
  title?: string;
  modalBtnLabel?: string;
  featureId: string;
  initialTitle: string;
  initialDescription: string;
  initialTitleAr: string;
  initialDescriptionAr: string;
  initialImg: string;
  initialVideo: string;
  initialVideoDuration: string;
  DocumentationSubCategoryId: string;
  DocumentationSections: DocumentationSection[];
  closeModal: () => void;
};
type lang ={

  lang:string;
};

export default function ModalUpdate({
  title ='Update',
  modalBtnLabel = "Update",
  featureId,
  initialTitle,
  initialDescription,
  initialTitleAr,
  initialDescriptionAr,
  initialImg,
  initialVideo,
  initialVideoDuration,
  DocumentationSubCategoryId,
  DocumentationSections: initialDocumentationSections,
}: UpdateGuestFormProps,{lang}:lang) {
  const { closeModal } = useModal();

  const [benTitle, setBenTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [benTitleAr, setBenTitleAr] = useState(initialTitleAr);
  const [descriptionAr, setDescriptionAr] = useState(initialDescriptionAr);
  const [videoDuration, setvideoDuration] = useState(initialVideoDuration);
  const [imagePreview, setImagePreview] = useState(initialImg);
  const [DocumentationSubId, setDocumentationSubId] = useState(DocumentationSubCategoryId);
  const [featureImg, setFeatureImg] = useState<File | null>(null);
  const [featureVideo, setFeatureVideo] = useState<File | null>(null);
  const [DocumentationSections, setDocumentationSections] = useState<DocumentationSection[]>(initialDocumentationSections);
  const [loading, setLoading] = useState(false);
  const { setIsUpdate } = useAdminContext();
  const { t } = useTranslation( lang!,"admin");

  const handleSubFeatureChange = (index: number, key: string, value: string | File) => {
    setDocumentationSections(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [key]: value };
      return updated;
    });
  };

  const handleSubmit = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append('Name', benTitle);
    formData.append('Description', description);
    formData.append('NameAr', benTitleAr);
    formData.append('DescriptionAr', descriptionAr);
    formData.append('VideoDuration',videoDuration);
    formData.append('DocumentationSubCategoryId',DocumentationSubId);
    if (featureImg) {
      formData.append('Image', featureImg);
    }
    if (featureVideo) {
      formData.append('Video', featureVideo);
    }
    DocumentationSections.forEach((subFeature, index) => {
      if (subFeature.id) {
        formData.append(`DocumentationSections[${index}].id`, subFeature.id);
      }
      if (subFeature.title) {
        formData.append(`DocumentationSections[${index}].title`, subFeature.title);
      }
      if (subFeature.content) {
        formData.append(`DocumentationSections[${index}].content`, subFeature.content);
      }
      if (subFeature.titleAr) {
        formData.append(`DocumentationSections[${index}].titleAr`, subFeature.titleAr);
      }
      if (subFeature.contentAr) {
        formData.append(`DocumentationSections[${index}].contentAr`, subFeature.contentAr);
      }
    });

    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(`${BASE_URL}/api/Documentatoin/Update/${featureId}`, {
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
        <input type="file" accept="video/*" onChange={(e) => setFeatureVideo(e.target.files?.[0] || null)} className="mb-4" />
        {/* {imagePreview && (
          <Image width={100} height={50} src={imagePreview} alt="Image Preview" className="mb-4" style={{ maxWidth: '100%', height: 'auto' }} />
        )} */}
        <Input label="Title" placeholder="Title" value={benTitle} onChange={(e) => setBenTitle(e.target.value)} className="mb-4" />        
        <Input label="العنوان" placeholder="العنوان" value={benTitleAr} onChange={(e) => setBenTitleAr(e.target.value)} className="mb-4 text-right" style={{ textAlign: 'right', direction: 'rtl' }}  />        
        <Input label="desc" placeholder="desc"  value={description} onChange={(e) => setDescription(e.target.value)} className="mb-4" />        
        <Input label="الوصف" placeholder=" الوصف"   value={descriptionAr} onChange={(e) => setDescriptionAr(e.target.value)} className="mb-4 text-right" style={{ textAlign: 'right', direction: 'rtl' }}  />        
        <Input label="videoDuration" placeholder="videoDuration"  value={videoDuration} onChange={(e) => setvideoDuration(e.target.value)} className="mb-4" />
       { DocumentationSections.map((subFeature, index) => {
        return (
          <div key={index} className="mb-4 border p-4">
            <Input
                label="Doc Feature Title"
              placeholder="Doc Feature Title"
              value={subFeature.title}
              onChange={(e) => handleSubFeatureChange(index, 'title', e.target.value)}
              className="mb-4"
            />
            <Input
               label="Doc Feature Content"
              placeholder="Doc Feature Content"
              value={subFeature.content}
              onChange={(e) => handleSubFeatureChange(index, 'content', e.target.value)}
              className="mb-4"
            />
            <Input
              label="اسم الميزة الفرعية"
              placeholder="اسم الميزة الفرعية"
              value={subFeature.titleAr}
              onChange={(e) => handleSubFeatureChange(index, 'titleAr', e.target.value)}
              className="mb-4 text-right"
              style={{ textAlign: 'right', direction: 'rtl' }} 
            />
            <Input
              label="محتوى الميزة الفرعية"
              placeholder=" محتوى الميزة الفرعية"
              value={subFeature.contentAr}
              onChange={(e) => handleSubFeatureChange(index, 'contentAr', e.target.value)}
              className="mb-4 text-right"
              style={{ textAlign: 'right', direction: 'rtl' }} 
            />
          </div>
        );
      })}
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
