'use client';

import { PiXBold, PiArrowsClockwiseBold } from 'react-icons/pi';
import React, { useEffect, useState } from 'react';
import { ActionIcon, Title, Button, Input } from 'rizzui';
import toast from 'react-hot-toast';
import Select from 'react-select';

import { BASE_URL } from '@/config/site.config';
import Image from 'next/image';
import { getBillingCycle, getSubscriptionFeature } from '@/lib/api/getSubscription';
import { useAdminContext } from '@/app/components/context/adminContext';
import { useTranslation } from '@/app/i18n/client';
import { useModal } from '@/app/shared/modal-views/use-modal';

interface Sub {
  name: string;
}

type UpdateGuestFormProps = {
  title?: string;
  modalBtnLabel?: string;
  featureId: string;
  initialTitle: string;
  initialTitleAr: string;
  initialPrice: string;
  planBenefitDescription: string;
  initialImg: string;
  billingCycleId:string;

  subFeatures: Sub[];
  closeModal: () => void;
};
type lang ={
  lang:string;
};
export default function ModalUpdate({
  title,
  modalBtnLabel = "تعديل",
  featureId,
  initialTitle,
  initialTitleAr,
  initialImg,
  initialPrice,
  planBenefitDescription,
  billingCycleId,
  subFeatures: initialSubFeatures,
}: UpdateGuestFormProps,{lang}:lang) {
  const { closeModal } = useModal();
  const [benTitle, setBenTitle] = useState(initialTitle);
  const [benTitleAr, setBenTitleAr] = useState(initialTitleAr);
  const [price, setPrice] = useState(initialPrice);
  const [BillingCycle, setBillingCycle] = useState<any[]>([]);
  const [SubscriptionFeature, setSubscriptionFeature] = useState<any[]>([]);
  const [planDescription, setplanDescription] = useState(planBenefitDescription);
  // const [description, setDescription] = useState(initialDescription);
  // const [imagePreview, setImagePreview] = useState(initialImg);
  // const [featureImg, setFeatureImg] = useState<File | null>(null);
  const [subFeatures, setSubFeatures] = useState<Sub[]>(initialSubFeatures);
  const [loading, setLoading] = useState(false);
  const [selectedBillingCycle, setSelectedBillingCycle] = useState<{ label: string; value: string } | null>(null);
  const [selectedSubscriptionFeature, setSelectedSubscriptionFeature] = useState<{ label: string; value: string }[]>([]);
  const { setIsUpdate } = useAdminContext();
  const { t } = useTranslation( lang!,"home");

  const handleSubFeatureChange = (index: number, key: string, value: string | File) => {
    setSubFeatures(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [key]: value };
      return updated;
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const billingCycleData = await getBillingCycle();
        const subscriptionFeatureData = await getSubscriptionFeature();

        if (billingCycleData) {
          const formattedBillingCycle = billingCycleData.map((item: any) => ({
            label: item.name,
            value: item.id,
          }));
          setBillingCycle(formattedBillingCycle);
        }

        if (subscriptionFeatureData) {
          const formattedSubscriptionFeature = subscriptionFeatureData.map((item: any) => ({
            label: item.name,
            value: item.id,
          }));
          setSubscriptionFeature(formattedSubscriptionFeature);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  const handleSubmit = async () => {
    setLoading(true);

     const featureIds = selectedSubscriptionFeature
      ? selectedSubscriptionFeature.map((feature) => feature.value) 
      : [];

    const data = {
      name: benTitle,
      nameAr: benTitleAr,
      price,
      billingCycleId: selectedBillingCycle?.value,
      planBenefitDescription: planDescription,
      featureIds, 
    };
   

    try {
      const response = await fetch(`${BASE_URL}/api/SubscriptionPlan/Update/${featureId}`, {
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
        <Input label="Plan-Title" placeholder="Plan-Title" value={benTitle} onChange={(e) => setBenTitle(e.target.value)} className="mb-4" />        
        <Input label="اسم الباقه" placeholder="اسم الباقه" value={benTitleAr} onChange={(e) => setBenTitleAr(e.target.value)} className="mb-4" />        
        <Input label="price" placeholder="أدخل العنوان" value={price} onChange={(e) => setPrice(e.target.value)} className="mb-4" />        
        <Select
          placeholder="Select Billing Cycle"
          value={selectedBillingCycle}
          onChange={setSelectedBillingCycle}
          options={BillingCycle}
          className="relative z-[999] mb-5"
          
        />
        <Select
          placeholder="Select Subscription Feature"
          value={selectedSubscriptionFeature}
          isMulti
          onChange={(options) => setSelectedSubscriptionFeature([...options] as { label: string; value: string }[])} // No need for fallback
          options={SubscriptionFeature}
          className="relative  mb-5"
        />
        {subFeatures.map((subFeature, index) => (
          <div key={index} className="mb-4 border p-4">
            <Input
              label="اسم الميزة الفرعية"
              placeholder="أدخل اسم الميزة الفرعية"
              value={subFeature.name}
              onChange={(e) => handleSubFeatureChange(index, 'name', e.target.value)}
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
