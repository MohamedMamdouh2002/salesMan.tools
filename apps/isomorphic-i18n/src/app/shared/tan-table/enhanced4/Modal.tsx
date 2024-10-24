import { PiXBold } from 'react-icons/pi';
import React, { useEffect, useState } from 'react';
import { ActionIcon, Title, Button, Input } from 'rizzui';
import Select from 'react-select';

import { useModal } from '@/app/shared/modal-views/use-modal';
import toast from 'react-hot-toast';
import { BASE_URL } from '@/config/site.config';
import { getBillingCycle, getSubscriptionFeature } from '@/lib/api/getSubscription';
import { useAdminContext } from '@/app/components/context/adminContext';
import { useTranslation } from '@/app/i18n/client';

type ModalProps = {
  title?: string;
  lang?:string;
  modalBtnLabel?: string;
};

type SubDoc = {
  title: string;
  content: string;
};

export default function Modal({
  title,
  lang,
  modalBtnLabel = 'Add',
}: ModalProps) {
  const { closeModal } = useModal();
  const [featureTitle, setFeatureTitle] = useState('');
  const [featureTitleAr, setFeatureTitleAr] = useState('');
  const [price, setprice] = useState('');
  const [description, setDescription] = useState('');
  const [BillingCycle, setBillingCycle] = useState<any[]>([]);
  const [SubscriptionFeature, setSubscriptionFeature] = useState<any[]>([]);
  const [selectedBillingCycle, setSelectedBillingCycle] = useState<{ label: string; value: string } | null>(null);
  const [selectedSubscriptionFeature, setSelectedSubscriptionFeature] = useState<{ label: string; value: string }[]>([]);
  const [planBenefitDescription, setplanBenefitDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const {isUpdate,setIsUpdate} =useAdminContext()
  const { t } = useTranslation( lang!,"home");

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

  // Submit form data as JSON
  const handleSubmitBenefit = async () => {
    const requestData = {
      Name: featureTitle,
      NameAr: featureTitleAr,
      price: price,
      planBenefitDescription: description,
      billingCycleId: selectedBillingCycle ? selectedBillingCycle.value : null,
      featureIds: selectedSubscriptionFeature
      ? selectedSubscriptionFeature.map((feature) => feature.value) // Send featureIds as a list
      : [],
    };

    try {
      setLoading(true);
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(`${BASE_URL}/api/SubscriptionPlan/Create`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,

        },
        body: JSON.stringify(requestData),
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

      <div className="mb-6">
        <Input
          label='Plan-Title'
          placeholder="Plan-Title"
          value={featureTitle}
          onChange={(e) => setFeatureTitle(e.target.value)}
          className="mb-4"
        />
        <Input
          label='اسم الباقه'
          placeholder="اضافة اسم الباقه"
          value={featureTitleAr}
          onChange={(e) => setFeatureTitleAr(e.target.value)}
          className="mb-4"
        />
        <Input
          label='Price'
          placeholder="Price"
          value={price}
          onChange={(e) => setprice(e.target.value)}
          className="mb-4"
        />

        {/* <p>description:</p>
        <Input
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-4"
        /> */}

        <Button onClick={handleSubmitBenefit} disabled={loading} className="w-full">
          {loading ? 'loading...' : modalBtnLabel}
        </Button>
      </div>
    </div>
  );
}

