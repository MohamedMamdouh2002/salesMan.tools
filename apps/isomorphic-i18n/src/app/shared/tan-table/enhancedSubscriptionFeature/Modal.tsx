import { PiXBold } from 'react-icons/pi';
import React, { useEffect, useState } from 'react';
import { ActionIcon, Title, Button, Input, Select } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import toast from 'react-hot-toast';
import { BASE_URL } from '@/config/site.config';
import { getDocumentationCategory } from '@/lib/api/getDoc';
import { useAdminContext } from '@/app/components/context/adminContext';
import { useTranslation } from '@/app/i18n/client';

type ModalProps = {
  title?: string;
  lang?:string;
  modalBtnLabel?: string;
};


// type SubDoc = {
//   title: string;
//   content: string;
// };

export default function Modal({
  title,
  lang,
  modalBtnLabel = 'إضافة',
}: ModalProps) {
  const { closeModal } = useModal();
  const [subscriptionFeatureTitle,setSubscriptionFeatureTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subscriptionFeatureTitleAr,setSubscriptionFeatureTitleAr] = useState('');
  const [descriptionAr, setDescriptionAr] = useState('');
  const [loading, setLoading] = useState(false);
  const {isUpdate,setIsUpdate} =useAdminContext()
  const { t } = useTranslation( lang!,"home");

  const handleSubmitBenefit = async () => {
    const formData = new FormData();
    const data = {
      name: subscriptionFeatureTitle,
      description,
      nameAr: subscriptionFeatureTitleAr,
      descriptionAr,
    };
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/subscriptionFeature/Create`, {
        method: 'POST',
        headers: {
          'Accept': 'text/plain',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),  // Convert the data object to a JSON string
      });

      if (response.ok) {
        setIsUpdate(true);
        toast.success(t('AddedSuccessfully'));
        setLoading(false);
        closeModal();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || t('AdditionFailed'));
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error('حدث خطأ، يرجى المحاولة مرة أخرى.');
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
        <Input 
          label="Title"
          placeholder='Enter Title'
          value={subscriptionFeatureTitle} 
          onChange={(e) => setSubscriptionFeatureTitle(e.target.value)} 
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
          placeholder='اضافه العنوان'
          value={subscriptionFeatureTitleAr} 
          onChange={(e) => setSubscriptionFeatureTitleAr(e.target.value)} 
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
        <Button onClick={handleSubmitBenefit} disabled={loading} className="w-full">
          {loading ? 'تحميل...' : modalBtnLabel}
        </Button>
      </div>
  );
}
