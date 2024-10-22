import { PiXBold, PiPlusBold } from 'react-icons/pi';
import React, { useState } from 'react';
import { ActionIcon, Title, Button, Input } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import toast from 'react-hot-toast';
import { BASE_URL } from '@/config/site.config';

type ModalProps = {
  title?: string;
  modalBtnLabel?: string;
};

export default function ModalMobileSection({
  title,
  modalBtnLabel = 'إضافة ضيف',
}: ModalProps) {
  const { closeModal } = useModal();
  const [subTitle, setSubTitle] = useState(''); // لحقل الاسم
  const [titleName, setTitleName] = useState(''); // لحقل العنوان
  const [description, setDescription] = useState(''); // لحقل الوصف
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [faq, setFaq] = useState<{ titleName: string; subTitle: string; description: string; imageFile: File | null } | null>(null);
  const [loadingFAQ, setLoadingFAQ] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmitFAQ = async () => {
    const formData = new FormData();
    formData.append('Name', titleName);
    formData.append('Content', subTitle);
    formData.append('Description', description);
    if (imageFile) {
      formData.append('Image', imageFile); // إضافة الصورة
    }
    formData.append('AdditionalFeatureDescriptions', "");

    try {
      setLoadingFAQ(true);
      const response = await fetch(`${BASE_URL}/api/AdditionalFeature/Create`, {
        method: 'POST',
        body: formData, // استخدام FormData
      });
      console.log('====================================');
      console.log("response: ",response);
      console.log('====================================');
      if (response.ok) {
        toast.success('تم إضافة MobileSec بنجاح!');
        setLoadingFAQ(false);
        setFaq({ titleName, subTitle, description, imageFile });
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'فشل في إضافة MobileSec.');
        setLoadingFAQ(false);
      }
    } catch (error) {
      setLoadingFAQ(false);
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
      
      {/* نموذج لـ FAQ */}
      <div className="mb-6">
        {/* <Title as="h4" className="text-md mb-2">إضافة FAQ</Title> */}
        <Input
          label="العنوان"
          placeholder="أدخل العنوان"
          value={titleName}
          onChange={(e) => setTitleName(e.target.value)}
          className="mb-4"
        />
        <Input
          label="الاسم"
          placeholder="أدخل الاسم"
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          className="mb-4"
        />
        <Input
          label="الوصف"
          placeholder="أدخل الوصف"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-4"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4"
        />
        <Button onClick={handleSubmitFAQ} disabled={loadingFAQ} className="w-full">
          {loadingFAQ ? 'تحميل...' : 'إضافة Mobile section'}
        </Button>
      </div>
    </div>
  );
}
