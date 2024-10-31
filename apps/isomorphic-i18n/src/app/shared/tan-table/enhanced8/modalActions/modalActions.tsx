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
import { useTranslation } from '@/app/i18n/client';
import { deleteBenfit } from '@/lib/api/getBenfit';
import { deleteFeatureAccordion } from '@/lib/api/getFeature';
import { useAdminContext } from '@/app/components/context/adminContext';
import { deleteCategoryDetails } from '@/lib/api/getDoc';
// import { DocumentationSection } from '@/types';

interface DocumentationSection {
  title: string;
  content: string;
  titleAr: string;
  contentAr: string;
  id: string;
}

interface ActionsCellProps {
  row: { original: { id: string }; id: string };
  image?: string;
  Video?: string;
  title?: string;
  description?:string;
  titleAr?: string;
  descriptionAr?:string;
  DocumentationSubCategoryId?:string;
  videoDuration?:string;
  deleteId?: string;
  DocumentationSections?: DocumentationSection[]; 
}


  const ModalAction: React.FC<ActionsCellProps> = ({ row, image = '', title = '',titleAr='',descriptionAr='', DocumentationSubCategoryId='',videoDuration='', Video='', description='', deleteId = '', DocumentationSections = [] }, { lang }: { lang?: string }) => {
    // console.log("row: ",row);
    
  const { openModal } = useModal();
  const { t } = useTranslation( lang!,"admin");
  const { setIsUpdate } = useAdminContext();


  const handleOpenModal = () => {
    openModal({
      view: <ModalUpdate title={t("Modified")}
      
      initialTitleAr={titleAr}
      initialDescriptionAr={descriptionAr}
      initialDescription={description}
      DocumentationSubCategoryId={DocumentationSubCategoryId}
      initialVideo={Video}
      initialVideoDuration={videoDuration}
      modalBtnLabel={t("Modified")}
      DocumentationSections={DocumentationSections} 
      initialImg={image}
      featureId={row.original.id}
      initialTitle={title}
      closeModal={()=>{}} />,
      customSize: '480px',
    });
    console.log("update");
    console.log("DELETEid",deleteId);
    console.log("image:",image);
    console.log("title:",title);
    console.log("description:",description);
    console.log("descriptiondddd:",DocumentationSections);
    
    
  };
  const handleDelete = (deleteId: string) => {
    deleteCategoryDetails(deleteId,setIsUpdate); 
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
        }
        />
    </div>
  );
};

export default ModalAction;