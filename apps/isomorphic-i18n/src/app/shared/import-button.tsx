'use client';

import dynamic from 'next/dynamic';
import { Button } from 'rizzui';
import cn from '@utils/class-names';
import { PiArrowLineDownBold, PiPlusBold } from 'react-icons/pi';
import { useModal } from '@/app/shared/modal-views/use-modal';
import Modal from '../components/modalAdminSettings/modal/Modal';
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
  lang?: string;
  modalBtnLabel?: string;
  className?: string;
  buttonLabel?: string;
  mobileSection?: boolean;
  onAdd?: (newFaq: FaqData) => Promise<void>; 
};

export default function ImportButton({
  lang,
  title,
  modalBtnLabel,
  className,
  buttonLabel,
  onAdd,
  mobileSection = false,
}: React.PropsWithChildren<ImportButtonProps>) {
  const { t } = useTranslation(lang!, "admin");
  const { openModal } = useModal();

  const translatedTitle = title || t('add'); // Set default translated title if `title` is not provided
  const translatedmodalBtnLabel = modalBtnLabel || t('add'); // Set default translated title if `title` is not provided

  return (
    <Button
      onClick={() =>
        openModal({
          view: (
            <Modal
              title={translatedTitle} 
              modalBtnLabel={translatedmodalBtnLabel}
            />
          ),
          customSize: '480px',
        })
      }
      className={cn('w-auto', className)}
    >
      <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
      {buttonLabel || translatedTitle} {/* Display the button label or translated title */}
    </Button>
  );
}
