import { PiXBold } from 'react-icons/pi';
import React, { useState } from 'react';
import { ActionIcon, Title, Button, Input } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import toast from 'react-hot-toast';
import { BASE_URL } from '@/config/base-url';
;
import { useTranslation } from '@/app/i18n/client';
import { useAdminContext } from '@/app/components/context/adminContext';

type ModalProps = {
  title?: string;
  lang?:string;
  modalBtnLabel?: string;
};

type SubFeature = {
  name: string;
  description: string;
  nameAr: string;
  descriptionAr: string;
  image: File | null;
};

export default function Modal({
  title,
  lang,
  modalBtnLabel = 'إضافة',
}: ModalProps) {
  const { closeModal } = useModal();
  const [featureTitle, setFeatureTitle] = useState('');
  const [description, setDescription] = useState('');
  const [featureTitleAr, setFeatureTitleAr] = useState('');
  const [descriptionAr, setDescriptionAr] = useState('');
  const [featureImg, setFeatureImg] = useState<File | null>(null);
  const [subFeatures, setSubFeatures] = useState<SubFeature[]>([]); // حالة لحفظ الـ SubFeatures
  const [loading, setLoading] = useState(false);
  const {isUpdate,setIsUpdate} =useAdminContext()
  const { t } = useTranslation( lang!,"admin");
  const handleAddSubFeature = () => {
    setSubFeatures([...subFeatures, { name: '', description: '', nameAr: '', descriptionAr: '', image: null }]);
  };

  const handleSubFeatureChange = (index: number, field: 'name' | 'description' |'nameAr'|'descriptionAr', value: string) => {
    const newSubFeatures = [...subFeatures];
    newSubFeatures[index][field] = value;
    setSubFeatures(newSubFeatures);
  };

  const handleImageChange = (index: number, file: File | null) => {
    const newSubFeatures = [...subFeatures];
    newSubFeatures[index].image = file;
    setSubFeatures(newSubFeatures);
  };

  const handleSubmitBenefit = async () => {
    const formData = new FormData();
    formData.append('Name', featureTitle);
    formData.append('Description', description);
    formData.append('NameAr', featureTitleAr);
    formData.append('DescriptionAr', descriptionAr);
    if (featureImg) {
      formData.append('Image', featureImg); 
    }
    subFeatures.forEach((subFeature, index) => {
      console.log("subFeature",subFeature);
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
      setLoading(true);
      const accessToken = localStorage.getItem('accessToken');

      const response = await fetch(`${BASE_URL}/api/Feature/Create`, {
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
          onChange={(e) => setFeatureImg(e.target.files?.[0] || null)}
          className="mb-2"
        />
        <Input
          label="Title"
          placeholder="Enter Title"
          value={featureTitle}
          onChange={(e) => setFeatureTitle(e.target.value)}
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
          placeholder="أدخل العنوان"
          value={featureTitleAr}
          onChange={(e) => setFeatureTitleAr(e.target.value)}
          className="mb-4 text-right"
          style={{ textAlign: 'right', direction: 'rtl' }}
        />
        <Input
          label="الوصف"
          placeholder="أدخل الوصف"
          value={descriptionAr}
          onChange={(e) => setDescriptionAr(e.target.value)}
          className="mb-4 text-right"
          style={{ textAlign: 'right', direction: 'rtl' }}
        />
  
        
        {subFeatures.map((subFeature, index) => (
          <div key={index} className="mb-4">
            <Input
              label="SubFeature Title"
              placeholder="Enter SubFeature Title"
              value={subFeature.name}
              onChange={(e) => handleSubFeatureChange(index, 'name', e.target.value)}
              className="mb-2"
            />
            <Input
              label="SubFeature Description"
              placeholder="Enter SubFeature Description"
              value={subFeature.description}
              onChange={(e) => handleSubFeatureChange(index, 'description', e.target.value)}
              className="mb-2"
            />
            <Input
              label="العنوان الفرعي"
              placeholder="اضافة عنوان فرعي"
              value={subFeature.nameAr}
              onChange={(e) => handleSubFeatureChange(index, 'nameAr', e.target.value)}
              className="mb-4 text-right"
              style={{ textAlign: 'right', direction: 'rtl' }}
            />
            <Input
              label="الوصف الفرعي"
              placeholder="اضافه الوصف الفرعي"
              value={subFeature.descriptionAr}
              onChange={(e) => handleSubFeatureChange(index, 'descriptionAr', e.target.value)}
              className="mb-4 text-right"
              style={{ textAlign: 'right', direction: 'rtl' }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(index, e.target.files?.[0] || null)}
              className="mb-2"
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
