import React from 'react';
import {DataTable} from '../DataTable';
import {columns} from './Columns';
import {usePlansQuery} from '@/features/plans/plansApi';

export default function PlanTable({
  searchQuery,
  sortQuery,
  sortOrder,
}: {
  searchQuery: string;
  sortQuery: string;
  sortOrder: string;
}) {
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const {data, isLoading} = usePlansQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    search: searchQuery,
    sortBy: sortQuery,
    sortOrder,
  });

  console.log('[plan data]', data?.data);

  //   console.log('from console:->', data);

  const totalRows = data?.meta?.pagination?.total ?? 0;
  const totalPages = Math.ceil(totalRows / pagination.pageSize);

  return (
    <div className="overflow-hidden rounded-md border">
      <DataTable
        columns={columns}
        data={data?.data ?? []}
        totalRows={totalRows}
        totalPages={totalPages}
        pagination={pagination}
        onPaginationChange={setPagination}
        isLoading={isLoading}
      />
    </div>
  );
}
