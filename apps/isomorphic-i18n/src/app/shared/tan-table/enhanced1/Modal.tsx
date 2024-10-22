import { PiXBold } from 'react-icons/pi';
import React, { useState } from 'react';
import { ActionIcon, Title, Button, Input } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import toast from 'react-hot-toast';
import { BASE_URL } from '@/config/site.config';
import { useAdminContext } from '@/app/components/context/adminContext';

type ModalProps = {
  title?: string;
  modalBtnLabel?: string;
};

export default function Modal({
  title,
  modalBtnLabel = 'إضافة',
}: ModalProps) {
  const { closeModal } = useModal();
  const [benfitTitle, setBenfitTitle] = useState(''); 
  const [description, setDescription] = useState(''); 
  const [benfitTitleAr, setBenfitTitleAr] = useState(''); 
  const [descriptionAr, setDescriptionAr] = useState(''); 
  const [benfitImg, setBenfitImg] = useState<File | null>(null); // استخدام نوع `File` للتعامل مع الملفات
  const [loadingBenefit, setLoadingBenefit] = useState(false); // لتحميل Benefit
  const {isUpdate,setIsUpdate} =useAdminContext()

  // دالة لإضافة Benefit
  const handleSubmitBenefit = async () => {
    const formData = new FormData();
    formData.append('Name', benfitTitle);
    formData.append('Description', description);
    formData.append('NameAr', benfitTitleAr);
    formData.append('DescriptionAR', descriptionAr);

    if (benfitImg) {
      formData.append('Image', benfitImg); 
    }

    try {
      setLoadingBenefit(true);
      const response = await fetch(`${BASE_URL}/api/Benefit/Create`, {
        method: 'POST',
        headers: {
          'Accept': 'text/plain', 
        },
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.text(); // استجابة نصية
        toast.success(`تم إضافة Benefit بنجاح!`);
        setIsUpdate(true)
        closeModal();
        setLoadingBenefit(false);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'فشل في إضافة Benefit.');
        setIsUpdate(true)
        setLoadingBenefit(false);
      }
    } catch (error) {
      setLoadingBenefit(false);
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
      
      {/* نموذج لـ Benefit */}
      <div className="mb-6">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setBenfitImg(e.target.files?.[0] || null)} 
          className="mb-4"
        />
        <Input
          label="Title"
          placeholder="Add Title"
          value={benfitTitle}
          onChange={(e) => setBenfitTitle(e.target.value)}
          className="mb-4"
        />
        <Input
          label="Add Description"
          placeholder="Enter description "
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-4"
        />
        <Input
          label=" السؤال"
          placeholder="اضافة سؤال"
          value={benfitTitleAr}
          onChange={(e) => setBenfitTitleAr(e.target.value)}
          className="mb-4 text-right"
          style={{ textAlign: 'right', direction: 'rtl' }}
        />
        <Input
          label=" الوصف"
          placeholder="اضافة وصف"
          value={descriptionAr}
          onChange={(e) => setDescriptionAr(e.target.value)}
          className="mb-4 text-right"
          style={{ textAlign: 'right', direction: 'rtl' }}
        />
        <Button onClick={handleSubmitBenefit} disabled={loadingBenefit} className="w-full">
          {loadingBenefit ? 'loading...' : 'Add Benefit'}
        </Button>
      </div>
    </div>
  );
}
