'use client';

import React, { useEffect, useState } from 'react';
import { defaultColumns } from './column';
import TableToolbar from '@/app/shared/tan-table/table-toolbar';
import MainTable from '@/app/shared/table/main-table';
import WidgetCard from '@components/cards/widget-card';
import TablePagination from '@/app/shared/table/table-pagination';
import { useTanStackTable } from '@/app/shared/tan-table/custom-table-components/use-TanStack-Table';
import { BASE_URL } from '@/config/site.config';
import { Benfit, AccordionFeature, Doc, DocType } from '@/types';
import ImportButton from './import-button';
import { useAdminContext } from '@/app/components/context/adminContext';



const fetchInvitations = async (): Promise<DocType[]> => {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${BASE_URL}/api/DocumentationCategory/GetAllWithArabic`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json() as Promise<DocType[]>;
};
export default function EnhancedTanTable7() {
  const [invitations, setInvitations] = useState<DocType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const {isUpdate,setIsUpdate} =useAdminContext()
  const { table, setData } = useTanStackTable<DocType>({
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
      // console.log("data:",data);
      
      const formattedData: DocType[] = data.map((invitation: DocType) => ({
        id: invitation.id,
        name:invitation.name,
        nameAr:invitation.nameAr,
        // description:invitation.,
        imageUrl:invitation.imageUrl,
        documentationSubCategories:invitation.documentationSubCategories,
        avatar:"",
        userName:"",   
        
      }));
      // console.log("data: ",data);
      
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
      <WidgetCard title={'Category and SubCategory'} className="flex flex-col gap-4">
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