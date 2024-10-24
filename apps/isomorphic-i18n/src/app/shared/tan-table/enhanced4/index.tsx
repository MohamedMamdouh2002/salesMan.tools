'use client';

import React, { useEffect, useState } from 'react';
import { defaultColumns } from './column';
import TableToolbar from '@/app/shared/tan-table/table-toolbar';
import MainTable from '@/app/shared/table/main-table';
import WidgetCard from '@components/cards/widget-card';
import TablePagination from '@/app/shared/table/table-pagination';
import { useTanStackTable } from '@/app/shared/tan-table/custom-table-components/use-TanStack-Table';
import { BASE_URL } from '@/config/site.config';
import { Benfit, sub } from '@/types';
import ImportButton from './import-button';
import { useAdminContext } from '@/app/components/context/adminContext';



const fetchInvitations = async (): Promise<sub[]> => {
  const accessToken = localStorage.getItem('accessToken');
  const response = await fetch(`${BASE_URL}/api/SubscriptionPlan/GetAllWithArabic`,{
    headers:{
      'Authorization': `Bearer ${accessToken}`,
    }
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json() as Promise<sub[]>;
};
export default function EnhancedTanTable4() {
  const [invitations, setInvitations] = useState<sub[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const {isUpdate,setIsUpdate} =useAdminContext()
  const { table, setData } = useTanStackTable<sub>({
    tableData: invitations,
    columnConfig: defaultColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 5,
        },
      },
      filterFns: {
        statusFilter: (row, columnId, value) => {
          if (!value) return false;
          let status =
            row.original[columnId].toLowerCase() === value.toLowerCase()
              ? true
              : false;
          return status;
        },
        priceFilter: (row, columnId, value) => {
          if (!value) return false;
          // console.log('custom filter conditions', row, columnId, value);
          return true;
        },
        createdDate: (row, columnId, value) => {
          if (!value) return false;
          // console.log('custom filter conditions', row, columnId, value);
          return true;
        },
        dueDate: (row, columnId, value) => {
          if (!value) return false;
          // console.log('custom filter conditions', row, columnId, value);
          return true;
        },
      },
      meta: {
        handleDeleteRow: (row: { id: string; }) => {
          setData((prev) => prev.filter((r) => r.id !== row.id));
        },
        handleMultipleDelete: (rows: string | string[]) => {
          setData((prev) => prev.filter((r) => !rows.includes(r.id)));
          table.resetRowSelection();
        },
      },
      enableColumnResizing: false,
    },
  });
  // Fetch data inside useEffect
  const loadInvitations = async () => {
    try {
      const data = await fetchInvitations();
      console.log("data:",data);
      
      const formattedData: sub[] = data.map((invitation: sub) => ({
        id: invitation.id,
        name:invitation.name,
        nameAr:invitation.nameAr,
        price:invitation.price,
        discountPercentage: invitation.discountPercentage,
        billingCycle: invitation.billingCycle,
        planBenefitDescription: invitation.planBenefitDescription,
        priceAfterDiscount: invitation.priceAfterDiscount,
        subscriptionFeatures: invitation.subscriptionFeatures,
        avatar:"",
        userName:""
   
      }));
      console.log("data: ",data);
      
      setInvitations(formattedData);
      setData(formattedData);
    } catch (error) {
      console.error('Failed to fetch invitations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInvitations();
    if(isUpdate === true){
      loadInvitations();

      setIsUpdate(false)
    }
  }, [isUpdate]);
  // function handleDragEnd(event: DragEndEvent) {
  //   const isRow = dataIds.includes(event.active.id);
  //   if (isRow) {
  //     handleDragEndRow(event);
  //   } else {
  //     handleDragEndColumn(event);
  //   }
  // }

  return (
    <>
      <WidgetCard title={'Sub Year Table'} className="flex flex-col gap-4">
        <div className="flex justify-end items-center">
            <ImportButton title={'Add'} />
        </div>
        <TableToolbar table={table} />
        <MainTable table={table} variant={'modern'} />
        <TablePagination table={table} />
      </WidgetCard>
    </>
  );
}