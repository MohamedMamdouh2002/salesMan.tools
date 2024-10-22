import { PiXBold, PiPlusBold } from 'react-icons/pi';
import React, { useState } from 'react';
import { ActionIcon, Title, Button, Input } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import toast from 'react-hot-toast';
import { BASE_URL } from '@/config/site.config';
import { useAdminContext } from '../../context/adminContext';
import { useTranslation } from '@/app/i18n/client';

type ModalProps = {
  title?: string;
  lang?:string;
  modalBtnLabel?: string;
};

export default function Modal({
  title,
  lang,
  modalBtnLabel = 'Add',
}: ModalProps) {
  const { closeModal } = useModal();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState(''); 
  const [questionAr, setQuestionAr] = useState('');
  const [answerAr, setAnswerAr] = useState(''); 
  const [benefit, setBenefit] = useState('');
  const [faq, setFaq] = useState<{ question: string; answer: string } | null>(null); // لحفظ بيانات FAQ
  const [loadingFAQ, setLoadingFAQ] = useState(false);
  const [loadingBenefit, setLoadingBenefit] = useState(false); 
  const {isUpdate,setIsUpdate} =useAdminContext()
  const { t } = useTranslation( lang!,"home");
  
  
  const handleSubmitFAQ = async () => {
    const faqData = { question, answer ,questionAr, answerAr };

    try {
      setLoadingFAQ(true);
      const response1 = await fetch(`${BASE_URL}/api/FAQ/Create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(faqData),
      });

      if (response1.ok) {
        toast.success(t('AddedSuccessfully'));
        setLoadingFAQ(false);
        setIsUpdate(true);
        setFaq(faqData);
        closeModal()
      } else {
        setIsUpdate(true);
        const errorData = await response1.json();
        toast.error(errorData.message || t('AdditionFailed'));
        setLoadingFAQ(false);
      }
    } catch (error) {
      setLoadingFAQ(false);
      toast.error('Failed');
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
        {/* <Title as="h4" className="text-md mb-2">Add FAQ</Title> */}
        <Input
          label="Question	"
          placeholder="Enter Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="mb-4"
        />
        <Input
          label="Answer"
          placeholder="Enter Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="mb-4"
        />
        <Input
          label="السؤال"
          placeholder="ادخل السؤال"
          value={questionAr}
          onChange={(e) => setQuestionAr(e.target.value)}
          className="mb-4 text-right"
          aria-placeholder='text-right'
          style={{ textAlign: 'right', direction: 'rtl' }}

        />
        <Input
          label="الاجابة"
          placeholder="ادخل الاجابة"
          value={answerAr}
          onChange={(e) => setAnswerAr(e.target.value)}
          className="mb-4 text-right"
          style={{ textAlign: 'right', direction: 'rtl' }}
        />
        <Button onClick={handleSubmitFAQ} disabled={loadingFAQ} className="w-full">
          {loadingFAQ ? 'Loading...' : `${t('AddFAQ')}`}
        </Button>
      </div>
    </div>
  );
}
