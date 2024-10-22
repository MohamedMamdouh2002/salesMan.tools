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

type SubDoc = {
  title: string;
  content: string;
  titleAr: string;
  contentAr: string;
};

export default function Modal({
  title,
  lang,
  modalBtnLabel = 'إضافة',
}: ModalProps) {
  const { closeModal } = useModal();
  const [featureTitle, setFeatureTitle] = useState('');
  const [featureTitleAr, setFeatureTitleAr] = useState('');
  const [videoDuration, setVideoDuration] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionAr, setDescriptionAr] = useState('');
  const [category, setCategory] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<{ label: string; value: string } | null>(null);
  const [docImg, setdocImg] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [documentationSubCategories, setDocumentationSubCategories] = useState<{ label: string; value: string }[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<{ label: string; value: string } | null>(null);
  const [documentationSections, setDocumentationSections] = useState<SubDoc[]>([]);
  const [loading, setLoading] = useState(false);
  const [additionalSections, setAdditionalSections] = useState<{ title: string; content: string,titleAr: string; contentAr: string }[]>([]);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<string | null>(null);
  const {isUpdate,setIsUpdate} =useAdminContext()
  const { t } = useTranslation( lang!,"home");
  // Fetch categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDocumentationCategory();
        if (data) {
          const formattedOptions = data.map((item: any) => ({
            label: item.name,
            value: item.id,
          }));
          setCategory(formattedOptions);
        }
      } catch (error) {
        console.error('Error fetching documentation categories:', error);
      }
    };
    fetchData();
  }, []);

  // Fetch subcategories
  useEffect(() => {
    const fetchSubCategories = async () => {
      if (selectedCategory) {
        const CategoryId = selectedCategory.value;
        try {
          const response = await fetch(`${BASE_URL}/api/DocumentationSubCategory/GetDocumentationSubCategoriesByCategoryId/${CategoryId}`);
          const data = await response.json();
          if (data) {
            const formattedSubFeatures = data.map((item: any) => ({
              label: item.name,
              value: item.id,
            }));
            setDocumentationSubCategories(formattedSubFeatures);
          }
        } catch (error) {
          console.error('Error fetching documentation subcategories:', error);
        }
      } else {
        setDocumentationSubCategories([]);
      }
    };
    fetchSubCategories();
  }, [selectedCategory]);
  
  // تحديث الحالة عند اختيار الساب كاتيجوري
  const handleSubCategoryChange = (option: { label: string; value: string } | null) => {
    setSelectedSubCategory(option);
    setSelectedSubCategoryId(option ? option.value : null); // تخزين ID الساب كاتيجوري
  };
  // Handle submit
  const handleSubmitBenefit = async () => {
    const formData = new FormData();
    formData.append('Name', featureTitle);
    formData.append('NameAr', featureTitleAr);
    formData.append('VideoDuration', videoDuration);
    formData.append('Description', description);
    formData.append('DescriptionAr', descriptionAr);
    if (docImg) {
      formData.append('Image', docImg);
    }
    if (videoFile) {
      formData.append('Video', videoFile); // Add video file
    }
    if (selectedSubCategoryId) {
      formData.append('DocumentationSubCategoryId', selectedSubCategoryId);
    }

    // documentationSections.forEach((section, index) => {
    //   formData.append(`DocumentationSections[${index}].title`, section.title);
    //   formData.append(`DocumentationSections[${index}].content`, section.content);
    //   formData.append(`DocumentationSections[${index}].titleAr`, section.titleAr);
    //   formData.append(`DocumentationSections[${index}].contentAr`, section.contentAr);
    // });

    additionalSections.forEach((section, index) => {
      formData.append(`DocumentationSections[${documentationSections.length + index}].title`, section.title);
      formData.append(`DocumentationSections[${documentationSections.length + index}].content`, section.content);
      formData.append(`DocumentationSections[${documentationSections.length + index}].titleAr`, section.titleAr);
      formData.append(`DocumentationSections[${documentationSections.length + index}].contentAr`, section.contentAr);
    });

    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/Documentatoin/Create`, {
        method: 'POST',
        headers: {
          'Accept': 'text/plain',
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
        toast.error(errorData.message || 'There was a problem');
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error('حدث خطأ، يرجى المحاولة مرة أخرى.');
    }
  };

  // Add additional section
  const handleAddSection = () => {
    setAdditionalSections([...additionalSections, { title: '', content: '',titleAr: '', contentAr: '' }]);
  };

  // Handle change for additional sections
  const handleAdditionalSectionChange = (index: number, field: 'title' | 'content' |'titleAr' | 'contentAr', value: string) => {
    const updatedSections = [...additionalSections];
    updatedSections[index][field] = value;
    setAdditionalSections(updatedSections);
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
        aria-required={true}
        placeholder="Select Category"
        value={selectedCategory}
        onChange={setSelectedCategory} 
        options={category}
        className='relative z-[999] mb-5'
        dropdownClassName='z-[555555555]'
      />
        
      {documentationSubCategories.length > 0 && (
        <div className="mb-4">
          <Title as="h4" className="text-md">Subcategories:</Title>
          <Select
            placeholder="Select Subcategory"
            value={selectedSubCategory}
            onChange={handleSubCategoryChange}
            options={documentationSubCategories}
            className='relative z-[999] mb-5'
            dropdownClassName='z-[555555555]'
          />
        </div>
      )}
      
      <div className="mb-6">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setdocImg(e.target.files?.[0] || null)}
          className="mb-2"
        />
        <Input 
          label="Title"
          placeholder="Title" 
          value={featureTitle} 
          onChange={(e) => setFeatureTitle(e.target.value)} 
          className="mb-4" 
        />
        <Input 
          label="العنوان"
          placeholder="ادخل العنوان" 
          value={featureTitleAr} 
          onChange={(e) => setFeatureTitleAr(e.target.value)} 
          className="mb-4 text-right"
          style={{ textAlign: 'right', direction: 'rtl' }}  
        />
        <Input 
          label='Description'
          placeholder="Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          className="mb-4" 
        />
        <Input 
          label='الوصف'
          placeholder="الوصف" 
          value={descriptionAr} 
          onChange={(e) => setDescriptionAr(e.target.value)} 
          className="mb-4" 
        />
          <Input 
          label='videoDuration'
          placeholder="Enter videoDuration" 
          value={videoDuration} 
          onChange={(e) => setVideoDuration(e.target.value)} 
          className="mb-4" 
        />  
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
          className="mb-2"
        />

        {/* عرض الحقول الإضافية */}
        {additionalSections.map((section, index) => (
          <div key={index} className="mb-4">
            <Input 
              label="Doc Feature Title"
              placeholder="Doc Feature Title"
              value={section.title}
              onChange={(e) => handleAdditionalSectionChange(index, 'title', e.target.value)}
              className="mb-2"
            />
            <Input 
              label="Doc Feature Content"
              placeholder="Doc Feature Content"
              value={section.content}
              onChange={(e) => handleAdditionalSectionChange(index, 'content', e.target.value)}
              className="mb-2"
            />
            <Input 
              label="العنوان"
              placeholder="العنوان"
              value={section.titleAr}
              onChange={(e) => handleAdditionalSectionChange(index, 'titleAr', e.target.value)}
              className="mb-4 text-right"
              style={{ textAlign: 'right', direction: 'rtl' }} 
            />
            <Input 
              label="المحتوي"
              placeholder="المحتوي"
              value={section.contentAr}
              onChange={(e) => handleAdditionalSectionChange(index, 'contentAr', e.target.value)}
              className="mb-4 text-right"
              style={{ textAlign: 'right', direction: 'rtl' }} 
            />
          </div>
        ))}

        <Button onClick={handleAddSection} className="mb-4">
          Add Doc Feature
        </Button>
        
        <Button onClick={handleSubmitBenefit} disabled={loading} className="w-full">
          {loading ? 'تحميل...' : modalBtnLabel}
        </Button>
      </div>
    </div>
  );
}
