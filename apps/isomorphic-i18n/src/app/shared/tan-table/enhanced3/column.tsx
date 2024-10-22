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
import { Benfit, InfoAccordion, MobileSection } from '@/types';
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

const columnHelper = createColumnHelper<InfoAccordion>();

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
  // columnHelper.accessor('imageUrl', {
  //   id: 'imageUrl',
  //   size: 240,
  //   header: 'image',
  //   cell: ({ row }) => (
  //     <Image 
  //       src={row.original.imageUrl} 
  //       alt="image"
  //       width={30}
  //       height={30} 
  //       className='ms-5'
  //     />
  //   ),
  //   enableSorting: false,
  // }),
  columnHelper.accessor('title', {
    id: 'title',
    size: 240,
    header: 'Title',
    cell: ({ row }) => row.original.title,
    enableSorting: true,
  }),
  columnHelper.accessor('content', {
    id: 'content',
    size: 240,
    header: 'Content',
    cell: ({ row }) => row.original.content,
    enableSorting: true,
  }),
  columnHelper.accessor('titleAr', {
    id: 'titleAr',
    size: 240,
    header: 'العنوان',
    cell: ({ row }) => row.original.titleAr,
    enableSorting: true,
  }),
  columnHelper.accessor('contentAr', {
    id: 'contentAr',
    size: 240,
    header: 'المحتوي',
    cell: ({ row }) => row.original.contentAr,
    enableSorting: true,
  }),
  columnHelper.accessor('sectionItems', {
    id: 'name',
    size: 240,
    header: 'SubTitle',
    cell: ({ row }) => (
      <ul>
        {row.original.sectionItems.map((item: any, index: number) => (
          <li key={index}>
            {item.name}
          </li>
        ))}
      </ul>
    ),
    enableSorting: true,
  }),
  columnHelper.accessor('sectionItems', {
    id: 'description',
    size: 240,
    header: 'Description',
    cell: ({ row }) => (
      <ul>
        {row.original.sectionItems.map((item: any, index: number) => (
          <li key={index}>
             {item.description}
          </li>
        ))}
      </ul>
    ),
    enableSorting: true,
  }),
  columnHelper.accessor('sectionItems', {
    id: 'name',
    size: 240,
    header: 'الاسم الفرعي',
    cell: ({ row }) => (
      <ul>
        {row.original.sectionItems.map((item: any, index: number) => (
          <li key={index}>
            {item.nameAr}
          </li>
        ))}
      </ul>
    ),
    enableSorting: true,
  }),
  columnHelper.accessor('sectionItems', {
    id: 'description',
    size: 240,
    header: 'العنوان الفرعي',
    cell: ({ row }) => (
      <ul>
        {row.original.sectionItems.map((item: any, index: number) => (
          <li key={index}>
             {item.descriptionAr}
          </li>
        ))}
      </ul>
    ),
    enableSorting: true,
  }),
  columnHelper.accessor('sectionItems', {
    id: 'videoUrl',
    size: 240,
    header: 'video',
    cell: ({ row }) => (
      <ul>
        {row.original.sectionItems.map((item: any, index: number) => (
            <video key={index} width="60" height="60" >
              <source src={item.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
        ))}
      </ul>
    ),
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
    initialTitle={row.original.title}
    initialTitleAr={row.original.titleAr}
    initialContentAr={row.original.contentAr}
    subItems={row.original.sectionItems} 
    initialContent={row.original.content}   
    deleteId={row.original.id}/>,
  }),
];
