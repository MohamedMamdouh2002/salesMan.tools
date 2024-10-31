import Link from 'next/link';
import { routes } from '@/config/routes';
import EyeIcon from '@components/icons/eye';
import { Person } from '@/data/tan-table-data';
import DateCell from '@ui/date-cell';
import PencilIcon from '@components/icons/pencil';
import AvatarCard from '@ui/avatar-card';
import DeletePopover from '@/app/shared/delete-popover';
import { createColumnHelper } from '@tanstack/react-table';
import { ActionIcon, Badge, Checkbox, Text, Tooltip } from 'rizzui';
import { Faq } from '@/types';
import ModalAction from '@/app/components/modalAdminSettings/modalActions/modalActions';

function getStatusBadge(status: string) {
  switch (status?.toLowerCase()) {
    case 'pending':
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">{status}</Text>
        </div>
      );
    case 'paid':
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">{status}</Text>
        </div>
      );
    case 'overdue':
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium text-red-dark">{status}</Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium text-gray-600">{status}</Text>
        </div>
      );
  }
}

const columnHelper = createColumnHelper<Faq>();

export const defaultColumns = [
  // columnHelper.accessor('id', {
  //   id: 'id',
  //   size: 60,
  //   header: ({ table }) => (
  //     <Checkbox
  //       aria-label="Select all rows"
  //       checked={table.getIsAllPageRowsSelected()}
  //       onChange={() => table.toggleAllPageRowsSelected()}
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       aria-label="Select row"
  //       checked={row.getIsSelected()}
  //       onChange={() => row.toggleSelected()}
  //     />
  //   ),
  //   enableSorting: false,
  // }),
  columnHelper.accessor('question', {
    id: 'question',
    size: 240,
    header: 'question',
    cell: ({ row }) => row.original.question,
    enableSorting: true,
  }),
  columnHelper.accessor('answer', {
    id: 'answer',
    size: 240,
    header: 'answer',
    cell: ({ row }) => row.original.answer,
    enableSorting: true,
  }),
  columnHelper.accessor('questionAr', {
    id: 'questionAr',
    size: 240,
    header: 'السؤال',
    cell: ({ row }) => row.original.questionAr,
    enableSorting: true,
  }),
  columnHelper.accessor('answerAr', {
    id: 'answerAr',
    size: 240,
    header: 'الاجابة',
    cell: ({ row }) => row.original.answerAr,
    enableSorting: true,
  }),
 
  // columnHelper.accessor('email', {
  //   id: 'email',
  //   size: 240,
  //   header: 'Email',
  //   cell: (info) => info.renderValue()?.toLowerCase(),
  // }),
  // columnHelper.accessor('createdAt', {
  //   id: 'createdAt',
  //   size: 200,
  //   header: 'Created At',
  //   filterFn: 'createdDate' as any,
  //   cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  // }),
  // columnHelper.accessor('dueDate', {
  //   id: 'dueDate',
  //   size: 200,
  //   header: 'Due Date',
  //   filterFn: 'dueDate' as any,
  //   cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  // }),
  // columnHelper.accessor('amount', {
  //   id: 'amount',
  //   size: 140,
  //   header: 'Amount',
  //   filterFn: 'priceFilter' as any,
  //   cell: ({ row }) => (
  //     <Text className="font-medium text-gray-700 dark:text-gray-600">
  //       ${row.original.amount}
  //     </Text>
  //   ),
  // }),
  // columnHelper.accessor('status', {
  //   id: 'status',
  //   size: 140,
  //   header: 'Status',
  //   filterFn: 'statusFilter' as any,
  //   cell: (info) => getStatusBadge(info.renderValue()!),
  // }),
  columnHelper.accessor('userName', {
    id: 'userName',
    size: 160,
    header: '',
    enablePinning: true,
    enableSorting: false,
    cell:({ row }) => <ModalAction row={row}
     initialQuestion={row.original.question}
    initialAnswer={row.original.answer}
    initialAnswerAr={row.original.answerAr}
    initialQuestionAr={row.original.questionAr}
     deleteId={row.original.id}/>,
  }),
];
