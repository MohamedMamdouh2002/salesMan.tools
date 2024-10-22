import { Column } from '@tanstack/react-table';

interface CustomColumnMeta {
  isColumnDraggable?: boolean;
}

export function getColumnOptions<TData extends Record<string, any>>(
  column: Column<TData>
) {
  const isColumnDraggable = (column.columnDef.meta as CustomColumnMeta)?.isColumnDraggable ?? true;
  const canResize = column.getCanResize();
  const canPin = column.getCanPin();
  const isPinned = column.getIsPinned();
  const isLeftPinned = isPinned === 'left' && column.getIsLastColumn('left');
  const isRightPinned = isPinned === 'right' && column.getIsFirstColumn('right');

  return {
    canPin,
    isPinned,
    canResize,
    isLeftPinned,
    isRightPinned,
    isColumnDraggable,
  };
}
