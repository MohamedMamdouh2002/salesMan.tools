'use client';

import React, { useEffect, useState } from 'react';
import { defaultColumns } from './column';
import TableToolbar from '@/app/shared/tan-table/table-toolbar';
import MainTable from '@/app/shared/table/main-table';
import WidgetCard from '@components/cards/widget-card';
import TablePagination from '@/app/shared/table/table-pagination';
import { useTanStackTable } from '@/app/shared/tan-table/custom-table-components/use-TanStack-Table';
import { BASE_URL } from '@/config/site.config';
import { Benfit } from '@/types';
import ImportButton from './import-button';
import { useAdminContext } from '@/app/components/context/adminContext';

const fetchBenfit = async (): Promise<Benfit[]> => {
  const accessToken = localStorage.getItem('accessToken');
  const response = await fetch(`${BASE_URL}/api/Benefit/GetAllWithArabic`,{
    headers:{
      'Authorization': `Bearer ${accessToken}`,
    }
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json() as Promise<Benfit[]>;
};
export default function EnhancedTanTable() {
  const [benfitsData, setBenfitsData] = useState<Benfit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const {isUpdate,setIsUpdate} =useAdminContext()

  const { table, setData } = useTanStackTable<Benfit>({
    tableData: benfitsData,
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
  const loadBenfits = async () => {
    try {
      const data = await fetchBenfit();
      console.log("data benfit:",data);
      
      const formattedData: Benfit[] = data.map((Benfits: Benfit) => ({
        id: Benfits.id,
        name: Benfits.name,
        description: Benfits.description,
        nameAr: Benfits.nameAr,
        descriptionAr: Benfits.descriptionAr,
        imageUrl: Benfits.imageUrl,
        avatar:"",
        userName:""
   
      }));
      console.log("data: ",data);
      
      setBenfitsData(formattedData);
      setData(formattedData);
    } catch (error) {
      console.error('Failed to fetch benfit', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBenfits();
    if(isUpdate ===true){
      loadBenfits();
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
      <WidgetCard title={'Benfits Table'} className="flex flex-col gap-4">
        <div className="flex justify-end items-center">
            <ImportButton title={'Add Benfit'} />
        </div>
        <TableToolbar table={table} />
        <MainTable table={table} variant={'modern'} />
        <TablePagination table={table} />
      </WidgetCard>
    </>
  );
}