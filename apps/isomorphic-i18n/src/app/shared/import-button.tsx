'use client';

import dynamic from 'next/dynamic';
import { Button } from 'rizzui';
import cn from '@utils/class-names';
import { PiArrowLineDownBold } from 'react-icons/pi';
import { PiPlusBold } from 'react-icons/pi';
import { useModal } from '@/app/shared/modal-views/use-modal';
import Modal from '../components/modalAdminSettings/modal/Modal';
import ModalMobileSection from '../components/modalAdminSettings/modalMobileSection/ModalMobileSection';
import { useTranslation } from '../i18n/client';
const FileUpload = dynamic(() => import('@/app/shared/file-upload'), {
  ssr: false,
});
type FaqData = {
  id: string;
  question: string;
  answer: string;
};
type ImportButtonProps = {
  title?: string;
  lang?:string;
  modalBtnLabel?: string;
  className?: string;
  buttonLabel?: string;
  mobileSection?:boolean;
  onAdd?: (newFaq: FaqData) => Promise<void>; // إضافة خاصية onAdd
};

export default function ImportButton({
  lang,
  title,
  modalBtnLabel = 'Add',
  className,
  buttonLabel = 'Add',
  onAdd, // استخدم onAdd هنا
  mobileSection=false,
}: React.PropsWithChildren<ImportButtonProps>) {
  const { t } = useTranslation( lang!,"home");
  const { openModal } = useModal();

  return (
    <Button
      onClick={() =>
        openModal({
          view: (
              <Modal
                title={title}
                modalBtnLabel={modalBtnLabel}
              />
          ),
          customSize: '480px',
        })
      }
      className={cn('w-auto', className)}
    >
      <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
      {buttonLabel}
    </Button>
  );
}