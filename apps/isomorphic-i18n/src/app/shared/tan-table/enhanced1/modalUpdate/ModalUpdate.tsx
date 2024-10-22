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
  benfitId: string;
  initialTitle?: string;
  initialDescription?: string;
  initialTitleAr?: string;
  initialDescriptionAr?: string;
  initialImg: string;
};

export default function ModalUpdate({
  title,
  modalBtnLabel = "Update",
  benfitId,
 
  initialTitle = '',
  initialDescription = '',
  initialTitleAr='',
  initialDescriptionAr='',
  initialImg = ""
}: UpdateGuestFormProps , {lang}:lang) {
  const { closeModal } = useModal();
  const [benTitle, setBenTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [benTitleAr, setBenTitleAr] = useState(initialTitleAr);
  const [descriptionAr, setDescriptionAr] = useState(initialDescriptionAr);
  const [benfitImg, setBenfitImg] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(initialImg);
  const [loading, setLoading] = useState(false);
  const { setIsUpdate } = useAdminContext();
  const { t } = useTranslation( lang!,"home");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBenfitImg(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    // إنشاء FormData
    const formData = new FormData();
    formData.append('Name', benTitle);
    formData.append('Description', description);
    formData.append('NameAr', benTitleAr);
    formData.append('DescriptionAr', descriptionAr);

    if (benfitImg) {
      formData.append('Image', benfitImg); // إضافة الصورة إذا تم اختيارها
    }

    try {
      const response = await fetch(`${BASE_URL}/api/Benefit/Update/${benfitId}`, {
        method: 'PUT',
        headers: {
          'accept': 'text/plain', 
        },
        body: formData, 
      });

      if (response.ok) {
        toast.success(t('ModifiedSuccessfully'));
        setIsUpdate(true)
        closeModal();
      } else {
        const errorData = await response.json();
        closeModal();

        toast.error(errorData.message || t('AdditionFailed'));
      }
    } catch (error) {
      toast.error('Failed');
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
          value={benTitle}
          onChange={(e) => setBenTitle(e.target.value)}
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
          value={benTitleAr}
          onChange={(e) => setBenTitleAr(e.target.value)}
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
