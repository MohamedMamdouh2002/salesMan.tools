'use client'
import React, { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTable } from '@hooks/use-table';
import { useColumn } from '@hooks/use-column';
import { Button } from 'rizzui';
import ControlledTable from '@/app/shared/controlled-table/index';
import { getColumns } from '@/app/shared/invoice/invoice-list/columns';
import cn from "@utils/class-names";
import Link from 'next/link';

const FilterElement = dynamic(
  () => import('@/app/shared/invoice/invoice-list/filter-element'),
  { ssr: false }
);
const TableFooter = dynamic(() => import('@/app/shared/table-footer'), {
  ssr: false,
});

const filterState = {
  amount: ['', ''],
  createdAt: [null, null],
  dueDate: [null, null],
  status: '',
};

interface InvoiceTableProps {
  data: any[];
  className?: string; // إضافة className
  rowClassName?: (record: any, index: number) => string; // إضافة rowClassName
}

export default function InvoiceTable({ data = [], className = '', rowClassName }: InvoiceTableProps) {
  const [pageSize, setPageSize] = useState(10);

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = useCallback((id: string) => {
    handleDelete(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    isLoading,
    isFiltered,
    tableData,
    currentPage,
    totalItems,
    handlePaginate,
    filters,
    updateFilter,
    searchTerm,
    handleSearch,
    sortConfig,
    handleSort,
    selectedRowKeys,
    setSelectedRowKeys,
    handleRowSelect,
    handleSelectAll,
    handleDelete,
    handleReset,
  } = useTable(data, pageSize, filterState);

  const columns = React.useMemo(
    () =>
      getColumns({
        data,
        // sortConfig,
        checkedItems: selectedRowKeys,
        onHeaderCellClick,
        onDeleteItem,
        onChecked: handleRowSelect,
        handleSelectAll,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      selectedRowKeys,
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      onDeleteItem,
      handleRowSelect,
      handleSelectAll,
    ]
  );

  const { visibleColumns, checkedColumns, setCheckedColumns } =
    useColumn(columns);

  return (
    <>
      <div className="relative bg-white dark:bg-white dark:hover:bg-slate-200 text-black dark:text-black overflow-hidden">
        <ControlledTable
          variant="modern"
          data={tableData}
          isLoading={isLoading}
          showLoadingText={true}
          // @ts-ignore
          columns={visibleColumns}
          paginatorOptions={{
            pageSize,
            setPageSize,
            total: totalItems,
            current: currentPage,
            onChange: (page: number) => handlePaginate(page),
          }}
          className={`rounded-md border relative text-black dark:hover:bg-white border-muted text-sm shadow-sm ${className}`} // تطبيق className
          rowClassName={(record, index) =>
            rowClassName ? rowClassName(record, index) : cn({
              'hover:bg-red-500': true, // أضف هذه الفئة لتغيير اللون عند التحويم
              'blur-effect': index >= tableData.length - 4,
            })
          } // تطبيق rowClassName
        >
        </ControlledTable>
        
        <Link href='/subscriptions'>
          <button className='bttn z-50 md:w-[400px] w-11/12 md:text-lg px-2 text-sm 4xl:left-[25%] md:left-[32%] left-2 bottom-[5%] md:bottom-[5%]' >
            Subscribe with us to see all the features
          </button>
        </Link>
      </div>
    </>
  );
}
