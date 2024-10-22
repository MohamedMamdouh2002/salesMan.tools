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
import { useAdminContext } from '../../context/adminContext';


interface ActionsCellProps {
  row: { original: { id: string }; id: string };
  initialQuestion?: string;
  initialAnswer?: string;
  initialQuestionAr?: string;
  initialAnswerAr?: string;
  deleteId?: string;
}

const ModalAction: React.FC<ActionsCellProps> = ({ row,initialQuestion = '', initialAnswer = '', initialQuestionAr = '', initialAnswerAr = '', deleteId='' }) => {
    // console.log("row: ",row);
    const { setIsUpdate } = useAdminContext();

  const { openModal } = useModal();

  const handleOpenModal = () => {
    openModal({
      view: <ModalUpdate title=" Update Question" modalBtnLabel="Update" faqId={row.original.id} initialAnswerAr={initialAnswerAr} initialQuestionAr={initialQuestionAr}  initialQuestion={initialQuestion} initialAnswer={initialAnswer} />,
      customSize: '480px',
    });
    console.log("update");
    console.log("question:",initialQuestion);
    console.log("answer:",initialAnswer);
    
    
  };
  const handleDelete = (deleteId: string) => {
    
    deleteFAQ(deleteId,setIsUpdate); // Call the delete function here
  };

  return (
    <div className="flex items-center justify-end gap-3 pe-3">
      <Tooltip size="sm" content="تعديل " placement="top" color="invert">
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
            // console.log("de: ",deleteId)
        }
        />
    </div>
  );
};

export default ModalAction;