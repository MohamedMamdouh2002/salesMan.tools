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
import { Benfit, InfoAccordion, MobileSection, sub } from '@/types';
import Image from 'next/image';

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

const columnHelper = createColumnHelper<sub>();

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
  columnHelper.accessor('name', {
    id: 'name',
    size: 240,
    header: 'name',
    cell: ({ row }) => row.original.name,
    enableSorting: true,
  }),
  columnHelper.accessor('price', {
    id: 'price',
    size: 240,
    header: 'price',
    cell: ({ row }) => row.original.price,
    enableSorting: true,
  }),
  columnHelper.accessor('discountPercentage', {
    id: 'discountPercentage',
    size: 240,
    header: 'discountPercentage',
    cell: ({ row }) => row.original.discountPercentage,
    enableSorting: true,
  }),
  columnHelper.accessor('billingCycle', {
    id: 'billingCycle',
    size: 240,
    header: 'billingCycle',
    cell: ({ row }) => row.original.billingCycle,
    enableSorting: true,
  }),
  columnHelper.accessor('planBenefitDescription', {
    id: 'planBenefitDescription',
    size: 240,
    header: 'planBenefitDescription',
    cell: ({ row }) => row.original.planBenefitDescription,
    enableSorting: true,
  }),
  columnHelper.accessor('priceAfterDiscount', {
    id: 'priceAfterDiscount',
    size: 240,
    header: 'priceAfterDiscount',
    cell: ({ row }) => row.original.priceAfterDiscount,
    enableSorting: true,
  }),

  columnHelper.accessor('subscriptionFeatures', {
    id: 'name',
    size: 240,
    header: 'subscriptionFeaturesName',
    cell: ({ row }) => (
      <ul>
        {row.original.subscriptionFeatures.map((item: any, index: number) => (
          <li key={index}>
            {item.name}
          </li>
        ))}
      </ul>
    ),
    enableSorting: true,
  }),
  columnHelper.accessor('subscriptionFeatures', {
    id: 'planHover',
    size: 240,
    header: 'subscriptionFeaturesplanHover',
    cell: ({ row }) => (
      <ul>
        {row.original.subscriptionFeatures.map((item: any, index: number) => (
          <li key={index}>
            {item.planHover}
          </li>
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
    cell: ({
      row,
      table: {
        options: { meta },
      },
    }) => (
      <>
        <div className="flex items-center justify-end gap-3 pe-3">
          <Tooltip
            size="sm"
            content={'Edit Invoice'}
            placement="top"
            color="invert"
          >
            <Link
              href={routes.invoice.edit(row.original.id)}
              aria-label="go to invoice edit"
            >
              <ActionIcon
                as="span"
                size="sm"
                variant="outline"
                className="hover:!border-gray-900 hover:text-gray-700"
              >
                <PencilIcon className="h-4 w-4" />
              </ActionIcon>
            </Link>
          </Tooltip>
          <Tooltip
            size="sm"
            content={'View Invoice'}
            placement="top"
            color="invert"
          >
            <Link
              href={routes.invoice.details(row.original.id)}
              aria-label="go to invoice details"
            >
              <ActionIcon
                as="span"
                size="sm"
                variant="outline"
                className="hover:!border-gray-900 hover:text-gray-700"
              >
                <EyeIcon className="h-4 w-4" />
              </ActionIcon>
            </Link>
          </Tooltip>
          <DeletePopover
            title={`Delete the invoice`}
            description={`Are you sure you want to delete this #${row.id} invoice?`}
            onDelete={() =>
              console.log("de")
            }
          />
        </div>
      </>
    ),
  }),
];
