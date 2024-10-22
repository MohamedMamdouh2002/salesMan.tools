import React, { useState } from 'react';
import { Button, Input } from 'rizzui';
import toast from 'react-hot-toast';
import { BASE_URL } from '@/config/site.config';
import { useAdminContext } from '@/app/components/context/adminContext';
import { useTranslation } from '@/app/i18n/client';
import { useModal } from '../../modal-views/use-modal';

type ModalProps = {
  title?: string;
  lang?:string;
  modalBtnLabel?: string;
};

export default function Modal({ title, lang, modalBtnLabel = 'إضافة' }: ModalProps) {
  const { closeModal } = useModal();

  const [videoTitle, setVideoTitle] = useState('');
  const [videoContent, setVideoContent] = useState('');
  const [videoTitleAr, setVideoTitleAr] = useState('');
  const [videoContentAr, setVideoContentAr] = useState('');
  const [sectionItems, setSectionItems] = useState<{ name: string; description: string; nameAr: string; descriptionAr: string; video: File | null }[]>([]); 
  const [loadingBenefit, setLoadingBenefit] = useState(false);
  const {isUpdate,setIsUpdate} =useAdminContext()
  const { t } = useTranslation( lang!,"home");
  
  const handleButtonClick = () => {
    setSectionItems([...sectionItems, { name: '', description: '', nameAr: '', descriptionAr: '', video: null }]);
  };
  // console.log('====================================');
  // console.log(sectionItems,"sssss");
  // console.log('====================================');


  const handleInputChange = (groupIndex: number, field: 'name' | 'description' |'nameAr'|'descriptionAr', value: string) => {
    const newGroups = [...sectionItems];
    newGroups[groupIndex][field] = value;
    setSectionItems(newGroups);
  };


  const handleVideoChange = (groupIndex: number, file: File | null) => {
    const newGroups = [...sectionItems];
    newGroups[groupIndex].video = file;
    setSectionItems(newGroups);
  };

  const handleSubmitBenefit = async () => {
    const formData = new FormData();
    formData.append('Title', videoTitle);
    formData.append('Content', videoContent);
    formData.append('TitleAr', videoTitleAr);
    formData.append('ContentAr', videoContentAr);

    sectionItems.forEach((group, index) => {
      if (group.name) {
        formData.append(`SectionItems[${index}].name`, group.name);  
      }
      if (group.description) {
        formData.append(`SectionItems[${index}].Description`, group.description);  
      }
      if (group.nameAr) {
        formData.append(`SectionItems[${index}].nameAr`, group.nameAr);  
      }
      if (group.descriptionAr) {
        formData.append(`SectionItems[${index}].DescriptionAr`, group.descriptionAr);  
      }
      if (group.video) {
        formData.append(`SectionItems[${index}].Video`, group.video); 
      }
    });

    try {
      setLoadingBenefit(true);
      const response = await fetch(`${BASE_URL}/api/Section/Create`, {
        method: 'POST',
        headers: {
          'Accept': 'text/plain',
        },
        body: formData,
      });

      if (response.ok) {
        setLoadingBenefit(false);
        setIsUpdate(true);
        toast.success(t('AddedSuccessfully'));
        closeModal()
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || t('AdditionFailed'));
        setLoadingBenefit(false);
      }
    } catch (error) {
      setLoadingBenefit(false);
      toast.error('حدث خطأ، يرجى المحاولة مرة أخرى.');
    }
  };

  return (
    <div className="m-auto px-5 pb-8 pt-5 rtl">
      <div className="mb-6">
        <h3>{title}</h3>
        <Input
          label="Title"
          placeholder="Enter Title"
          value={videoTitle}
          onChange={(e) => setVideoTitle(e.target.value)}
          className="mb-4"
        />
        <Input
          label="Content"
          placeholder="Enter Content"
          value={videoContent}
          onChange={(e) => setVideoContent(e.target.value)}
          className="mb-4"
        />
        <Input
          label="العنوان"
          placeholder="اضافة العنوان"
          value={videoTitleAr}
          onChange={(e) => setVideoTitleAr(e.target.value)}
          className="mb-4"
        />
        <Input
          label="المحتوي"
          placeholder="اضافة المحتوي"
          value={videoContentAr}
          onChange={(e) => setVideoContentAr(e.target.value)}
          className="mb-4"
        />

        {sectionItems.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-2">
            <Input
              label="subTitle"
              placeholder=" Enter subTitle"
              value={group.name}
              onChange={(e) => handleInputChange(groupIndex, 'name', e.target.value)}
              className="mb-2"
            />
            <Input
              label="subDescription"
              placeholder="Enter subDescription"
              value={group.description}
              onChange={(e) => handleInputChange(groupIndex, 'description', e.target.value)}
              className="mb-2"
            />
            <Input
              label="subTitle"
              placeholder=" Enter subTitle"
              value={group.nameAr}
              onChange={(e) => handleInputChange(groupIndex, 'nameAr', e.target.value)}
              className="mb-2"
            />
            <Input
              label="subDescription"
              placeholder="Enter subDescription"
              value={group.descriptionAr}
              onChange={(e) => handleInputChange(groupIndex, 'descriptionAr', e.target.value)}
              className="mb-2"
            />
            <input
              type="file"
              accept="video/*"
              onChange={(e) => handleVideoChange(groupIndex, e.target.files?.[0] || null)}
              className="mb-2"
            />
          </div>
        ))}

        <button onClick={handleButtonClick} className="mb-4 px-4 py-3 bg-blue-600 text-white rounded-lg">
          Add Object
        </button>

        <Button onClick={handleSubmitBenefit} disabled={loadingBenefit} className="w-full">
          {loadingBenefit ? 'Loading...' : 'Add Feature'}
        </Button>
      </div>
    </div>
  );
}
