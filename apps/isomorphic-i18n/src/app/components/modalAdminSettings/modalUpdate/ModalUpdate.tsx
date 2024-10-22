'use client';

import { PiXBold, PiArrowsClockwiseBold } from 'react-icons/pi';
import React, { useState } from 'react';
import { ActionIcon, Title, Button, Input } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import toast from 'react-hot-toast';
import { BASE_URL } from '@/config/site.config';
import { useAdminContext } from '../../context/adminContext';
import { useTranslation } from '@/app/i18n/client';

type UpdateGuestFormProps = {
  title?: string;
  lang?:string;
  modalBtnLabel?: string;
  faqId: string;
  initialQuestion?: string;
  initialAnswer?: string;
  initialQuestionAr?: string;
  initialAnswerAr?: string;
};

export default function ModalUpdate({
  title,
  modalBtnLabel = "تعديل",
  faqId,
  lang,
  initialQuestion = '',
  initialAnswer = '',
  initialQuestionAr='',
  initialAnswerAr='',
}: UpdateGuestFormProps) {
  const { closeModal } = useModal();
  const [question, setQuestion] = useState(initialQuestion);
  const [answer, setAnswer] = useState(initialAnswer);
  const [questionAr, setQuestionAr] = useState(initialQuestionAr);
  const [answerAr, setAnswerAr] = useState(initialAnswerAr);
  const [loading, setLoading] = useState(false);
  const {isUpdate,setIsUpdate} =useAdminContext()
  const { t } = useTranslation( lang!,"home");


  const handleSubmit = async () => {
    console.log('submit');
    
    const UpdatefaqData = {
      question,answer,answerAr,questionAr};

    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/FAQ/Update/${faqId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(UpdatefaqData),
      });

      if (response.ok) {
        setLoading(false);
        toast.success(t('ModifiedSuccessfully'));
        setIsUpdate(true)
        closeModal();
        
      } else {
        const errorData = await response.json();
        setIsUpdate(true)
        toast.error(errorData.message || t('AdditionFailed'));
        setLoading(false);
        console.log("errorData: ",errorData);
        
      }
    } catch (error) {
      setLoading(false);
      toast.error('حدث خطأ يرجى المحاولة مرة أخرى.');
      console.log("error: ",error);
      
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
        className="mb-4 "

      />
      <Input
        label="السؤال"
        placeholder="أدخل السؤال"
        value={questionAr}
        onChange={(e) => setQuestionAr(e.target.value)}
        className="mb-4 text-right"
        style={{ textAlign: 'right', direction: 'rtl' }}

      />
      <Input
        label="الإجابة"
        placeholder="أدخل الإجابة"
        value={answerAr}
        onChange={(e) => setAnswerAr(e.target.value)}
        className="mb-4 text-right"
        style={{ textAlign: 'right', direction: 'rtl' }}
      />

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
