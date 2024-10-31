import { PiXBold } from 'react-icons/pi';
import React, { useState } from 'react';
import { ActionIcon, Title, Button, Input } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import toast from 'react-hot-toast';
import { BASE_URL } from '@/config/base-url';
;
import { useAdminContext } from '@/app/components/context/adminContext';
import { useTranslation } from '@/app/i18n/client';

type ModalProps = {
  title?: string;
  lang?:string;
  modalBtnLabel?: string;
};

type SubFDoc = {
  name: string;
  nameAr: string;
};

export default function Modal({
  title,
  lang,
  modalBtnLabel = 'إضافة',
}: ModalProps) {
  const { closeModal } = useModal();
  const [docTitle, setDocTitle] = useState('');
  const [docTitleAr, setDocTitleAr] = useState('');
  const [DocImg, setDocImg] = useState<File | null>(null);
  const [documentationSubCategories, setDocumentationSubCategories] = useState<SubFDoc[]>([]);
  const [loading, setLoading] = useState(false);
  const {isUpdate,setIsUpdate} =useAdminContext()
  const { t } = useTranslation( lang!,"admin");


  const handleAddSubFeature = () => {
    setDocumentationSubCategories([...documentationSubCategories, { name: '',nameAr:'' }]);
  };

  const handleSubFeatureChange = (index: number, field: 'name'|'nameAr' , value: string) => {
    const newSubFeatures = [...documentationSubCategories];
    newSubFeatures[index][field] = value;
    setDocumentationSubCategories(newSubFeatures);
  };

  const handleSubmitBenefit = async () => {
    const formData = new FormData();
    formData.append('Name', docTitle);
    formData.append('NameAr', docTitleAr);
    if (DocImg) {
      formData.append('Image', DocImg); 
    }
    
    // إضافة الـ SubFeatures إلى FormData
    documentationSubCategories.forEach((subFeature, index) => {
      if (subFeature.name) {
        formData.append(`documentationSubCategories[${index}].name`, subFeature.name);
      }
      if (subFeature.nameAr) {
        formData.append(`documentationSubCategories[${index}].nameAr`, subFeature.nameAr);
      }
    });

    try {
      setLoading(true);
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(`${BASE_URL}/api/DocumentationCategory/Create`, {
        method: 'POST',
        headers: {
          'Accept': 'text/plain',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: formData,
      });
      if (response.ok) {
        setIsUpdate(true);
        toast.success(t('AddedSuccessfully'));
        setLoading(false);
        closeModal()
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
      
      <div className="mb-6">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setDocImg(e.target.files?.[0] || null)}
          className="mb-2"
        />
        <Input
          label="Title"
          placeholder="Enter Title"
          value={docTitle}
          onChange={(e) => setDocTitle(e.target.value)}
          className="mb-4"
        />
        <Input
          label="العنوان"
          placeholder="أدخل العنوان"
          value={docTitleAr}
          onChange={(e) => setDocTitleAr(e.target.value)}
          className="mb-4 text-right"
          style={{ textAlign: 'right', direction: 'rtl' }} 
        />
        
        {documentationSubCategories.map((subFeature, index) => (
          <div key={index} className="mb-4">
            <Input
              label="SubDoc Title"
              placeholder="Enter SubDoc Title"
              value={subFeature.name}
              onChange={(e) => handleSubFeatureChange(index, 'name', e.target.value)}
              className="mb-2"
            />
            <Input
              label="عنوان القسم الفرعي"
              placeholder="ادخل عنوان القسم الفرعي"
              value={subFeature.nameAr}
              onChange={(e) => handleSubFeatureChange(index, 'nameAr', e.target.value)}
              className="mb-4 text-right"
              style={{ textAlign: 'right', direction: 'rtl' }} 
            />
          </div>
        ))}
        <Button onClick={handleAddSubFeature} className="mb-4">
        {t('Add-Object')}
        </Button>

        <Button onClick={handleSubmitBenefit} disabled={loading} className="w-full">
          {loading ? t('loading...') : t('add')}
        </Button>
      </div>
    </div>
  );
}
