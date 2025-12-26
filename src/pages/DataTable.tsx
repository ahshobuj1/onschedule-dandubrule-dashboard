import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import {Button} from '@/components/ui/button';
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from '@tabler/icons-react';
import {Label} from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DataTableProps<T> {
  columns: ColumnDef<T, unknown>[]; // ✅ replaced `any` with `unknown`
  data: T[];
  totalRows: number;
  totalPages: number;
  pagination: {pageIndex: number; pageSize: number};
  onPaginationChange: React.Dispatch<
    React.SetStateAction<{pageIndex: number; pageSize: number}>
  >;

  isLoading?: boolean;
}

export function DataTable<T extends object>({
  columns,
  data,
  totalPages,
  pagination,
  onPaginationChange,
  isLoading,
}: DataTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: totalPages,
    state: {pagination},
    onPaginationChange: (updater) => {
      if (typeof updater === 'function') {
        onPaginationChange(updater(pagination));
      } else {
        onPaginationChange(updater);
      }
    },
  });

  // console.log(table);

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : data.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                No data found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="text-sm text-muted-foreground hidden lg:block">
          Showing page {pagination.pageIndex + 1} of {totalPages}
        </div>
        <div className="flex items-center gap-3">
          <Label htmlFor="rows-per-page" className="text-sm">
            Rows per page
          </Label>
          <Select
            value={`${pagination.pageSize}`}
            onValueChange={(v) =>
              onPaginationChange({...pagination, pageSize: +v})
            }>
            <SelectTrigger className="w-20">
              <SelectValue placeholder={pagination.pageSize} />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 30, 50].map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="h-8 w-8"
              onClick={() => onPaginationChange({...pagination, pageIndex: 0})}
              disabled={pagination.pageIndex === 0}>
              <IconChevronsLeft size={16} />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8"
              onClick={() =>
                onPaginationChange({
                  ...pagination,
                  pageIndex: pagination.pageIndex - 1,
                })
              }
              disabled={pagination.pageIndex === 0}>
              <IconChevronLeft size={16} />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8"
              onClick={() =>
                onPaginationChange({
                  ...pagination,
                  pageIndex: pagination.pageIndex + 1,
                })
              }
              disabled={pagination.pageIndex >= totalPages - 1}>
              <IconChevronRight size={16} />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8"
              onClick={() =>
                onPaginationChange({...pagination, pageIndex: totalPages - 1})
              }
              disabled={pagination.pageIndex >= totalPages - 1}>
              <IconChevronsRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
