// components/ActionsCell.tsx
import React from 'react';
import Link from 'next/link';
import { routes } from '@/config/routes';
import { ActionIcon, Tooltip } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import PencilIcon from '@components/icons/pencil';
import EyeIcon from '@components/icons/eye';
// import GuestForm from '@/app/components/guestForm/GuestForm';
// import UpdateGuestForm from '../updateGuestForm/UpdateGuestForm';
// import GuestDetailsModal from '../guestDetailsModal/GuestDetailsModal';
import DeletePopover from '@/app/shared/delete-popover';
import { deleteFAQ } from '@/lib/api/getFaq';
import ModalUpdate from '../modalUpdate/ModalUpdate';
import { deleteMobSec } from '@/lib/api/getMobileSec';
import { deleteInfoAccordion } from '@/lib/api/getInfoAccordion';
import { useAdminContext } from '@/app/components/context/adminContext';
import { useTranslation } from '@/app/i18n/client';
interface Sub {
  id: string;
  name: string;
  description: string;
  nameAr: string;
  descriptionAr: string;
  video?: File| null;
}

interface ActionsCellProps {
  row: { original: { id: string }; id: string };
  // image?: string;
  initialTitle?: string;
  initialContent?: string;
  initialTitleAr?: string;
  initialContentAr?: string;
  subItems?: Sub[]; // تعديل ليكون مصفوفة
  // initialDescription?: string;
  deleteId?: string;
  lang?:string;
}

const ModalAction: React.FC<ActionsCellProps> = ({ lang,row,initialTitle = '',initialTitleAr = '',initialContentAr = '' , subItems=[], initialContent = '' , deleteId='' }) => {
    // console.log("row: ",row);
    
  const { openModal } = useModal();
  const { setIsUpdate } = useAdminContext();
  const { t } = useTranslation( lang!,"admin");

  const handleOpenModal = () => {
    openModal({
      view: <ModalUpdate 
      title={t("Modified")}
      modalBtnLabel={t("Modified")}
      mobId={row.original.id}
      sectionItem={subItems}
      initialTitle={initialTitle}
      initialTitleAr={initialTitleAr}
      initialContentAr={initialContentAr}
      initialContent={initialContent}  />,
      customSize: '480px',
    });
    console.log("update");
    console.log("title:",initialTitle);
    console.log("cont:",initialContent);
    console.log("subitems",subItems);
    console.log(deleteId);
  };
  const handleDelete = (deleteId: string) => {
    
    deleteInfoAccordion(deleteId,setIsUpdate);
    // console.log(deleteId);
  };

  return (
    <div className="flex items-center justify-end gap-3 pe-3">
      <Tooltip size="sm" content="Update " placement="top" color="invert">
        <ActionIcon
          as="span"
          size="sm"
          variant="outline"
          className="cursor-pointer hover:!border-gray-900 hover:text-gray-700"
          onClick={handleOpenModal}
        >
          <PencilIcon className="h-4 w-4" />
        </ActionIcon>
      </Tooltip>
      <DeletePopover
     title={t('deleteTitle')}
     description={`${t(`delete`)} #${row.id} ?`}
        onDelete={() =>
            handleDelete(deleteId)
            // console.log("de: ",deleteId)
        }
        />
    </div>
  );
};

export default ModalAction;