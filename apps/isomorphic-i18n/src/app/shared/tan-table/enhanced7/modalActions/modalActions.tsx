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
import { deleteCategory } from '@/lib/api/getDoc';
import { useAdminContext } from '@/app/components/context/adminContext';

interface Sub {
  name: string;
  nameAr: string;
  id:string ;
}

interface ActionsCellProps {
  row: { original: { id: string }; id: string };
  image?: string;
  title?: string;
  titleAr?: string;
  deleteId?: string;
  DocumentationSubCategories?: Sub[]; // تعديل ليكون مصفوفة
}
  const ModalAction: React.FC<ActionsCellProps> = ({ row, image = '', title = '',titleAr='', deleteId = '', DocumentationSubCategories = [] }, { lang }: { lang?: string }) => {
    // console.log("row: ",row);
    
  const { openModal } = useModal();
  const { t } = useTranslation( lang!,"home");
  const { setIsUpdate } = useAdminContext();


  const handleOpenModal = () => {
    openModal({
      view: <ModalUpdate title="Update "
      modalBtnLabel={t("Update")}
      initialTitleAr={titleAr}
      subFeatures={DocumentationSubCategories} // تمرير subFeatures كمصفوفة
      initialImg={image}
      featureId={row.original.id}
      initialTitle={title}
      closeModal={()=>{}} />,
      customSize: '480px',
    });
    // console.log("update");
    // console.log("updateid",deleteId);
    // console.log("image:",image);
    // console.log("title:",title);
    // // console.log("description:",description);
    // console.log("descriptiondddd:",DocumentationSubCategories);
    
    
  };
  const handleDelete = (deleteId: string) => {
    deleteCategory(deleteId,setIsUpdate); // Call the delete function here
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
        title={`Delete `}
        description={`Are you sure you want to delete this #${row.id} row?`}
        onDelete={() =>
            handleDelete(deleteId)
        }
        />
    </div>
  );
};

export default ModalAction;