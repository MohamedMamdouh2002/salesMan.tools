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
import { Benfit, MobileSection } from '@/types';
import Image from 'next/image';
import ModalAction from './modalActions/modalActions';

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

const columnHelper = createColumnHelper<MobileSection>();

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
  columnHelper.accessor('imageUrl', {
    id: 'imageUrl',
    size: 240,
    header: 'image',
    cell: ({ row }) => (
      <Image 
        src={row.original.imageUrl} 
        alt="image"
        width={30}
        height={30} 
        className='ms-5'
      />
    ),
    enableSorting: false,
  }),
  columnHelper.accessor('name', {
    id: 'name',
    size: 240,
    header: 'Title',
    cell: ({ row }) => row.original.name,
    enableSorting: true,
  }),
  columnHelper.accessor('content', {
    id: 'content',
    size: 240,
    header: 'ContentName',
    cell: ({ row }) => row.original.content,
    enableSorting: true,
  }),
  columnHelper.accessor('description', {
    id: 'description',
    size: 240,
    header: 'Description',
    cell: ({ row }) => row.original.description,
    enableSorting: true,
  }),
  columnHelper.accessor('nameAr', {
    id: 'NameAr',
    size: 240,
    header: 'العنوان',
    cell: ({ row }) => row.original.nameAr,
    enableSorting: true,
  }),
  columnHelper.accessor('contentAr', {
    id: 'ContentAr',
    size: 240,
    header: 'المحتوي',
    cell: ({ row }) => row.original.contentAr,
    enableSorting: true,
  }),
  columnHelper.accessor('descriptionAr', {
    id: 'description',
    size: 240,
    header: 'الوصف',
    cell: ({ row }) => row.original.descriptionAr,
    enableSorting: true,
  }),
  // columnHelper.accessor('descriptionPoints', {
  //   id: 'descriptionPoints',
  //   size: 240,
  //   header: 'descriptionPoints',
  //   cell: ({ row }) => (
  //     <ul className=''>
  //       {row.original.descriptionPoints.map((point: string, index: number) => (
  //         <li key={index}>{point}</li>
  //       ))}
  //     </ul>
  //   ),
  //   enableSorting: true,
  // }),

 
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
    image={row.original.imageUrl} 
    initialTitle={row.original.name} 
    initialContent={row.original.content} 
    initialDescription={row.original.description}
    initialTitleAr={row.original.nameAr}
    initialContentAr={row.original.contentAr}
    initialDescriptionAr={row.original.descriptionAr}
    deleteId={row.original.id}/>,
  
  }),
];
