'use client';

import { PiXBold, PiArrowsClockwiseBold } from 'react-icons/pi';
import React, { useState } from 'react';
import { ActionIcon, Title, Button, Input } from 'rizzui';
import toast from 'react-hot-toast';
import { BASE_URL } from '@/config/site.config';
import Image from 'next/image';
import { useTranslation } from '@/app/i18n/client';
import { useAdminContext } from '@/app/components/context/adminContext';
import { useModal } from '@/app/shared/modal-views/use-modal';

interface Sub {
  name: string;
}
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
  closeModal: () => void;
};

export default function ModalUpdate({
  title,
  modalBtnLabel = "update",
  initialTitle,
  initialDescription,
  initialTitleAr,
  initialDescriptionAr,
  featureId,
}: UpdateGuestFormProps,{lang}:lang) {
  const { closeModal } = useModal();

  const [benTitle, setBenTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [benTitleAr, setBenTitleAr] = useState(initialTitleAr);
  const [descriptionAr, setDescriptionAr] = useState(initialDescriptionAr);
  const [loading, setLoading] = useState(false);
  const { setIsUpdate } = useAdminContext();
  const { t } = useTranslation( lang!,"home");

  const handleSubmit = async () => {
    setLoading(true);
  
    const data = {
      name: benTitle,
      description,
      nameAr: benTitleAr,
      descriptionAr,
    };
  
    try {
      const response = await fetch(`${BASE_URL}/api/SubscriptionFeature/Update/${featureId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain'
        },
        body: JSON.stringify(data),
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
      console.error("Update failed:", error);
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
       
        <Input label="Title" placeholder="Title" value={benTitle} onChange={(e) => setBenTitle(e.target.value)} className="mb-4" />        
        <Input label="Description" placeholder=" Description" value={description} onChange={(e) => setDescription(e.target.value)} className="mb-4" />        
        <Input label="العنوان" 
        placeholder="العنوان" 
        value={benTitleAr} 
        onChange={(e) => setBenTitleAr(e.target.value)} 
        className="mb-4 text-right"
        style={{ textAlign: 'right', direction: 'rtl' }}  />        
        <Input label="الوصف" placeholder="الوصف" value={descriptionAr} onChange={(e) => setDescriptionAr(e.target.value)}
        className="mb-4 text-right"
        style={{ textAlign: 'right', direction: 'rtl' }}  />        
      
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
