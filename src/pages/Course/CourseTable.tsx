import React from 'react';
import {useGetCoursesQuery} from '@/features/courses/coursesApi';
import {columns} from './Columns';
import {DataTable} from '../DataTable';

export function CourseTable({
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

  const {data, isLoading} = useGetCoursesQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    search: searchQuery,
    sortBy: sortQuery,
    sortOrder,
  });

  const totalRows = data?.meta?.pagination?.total ?? 0;
  const totalPages = data?.meta?.pagination?.totalPages ?? 1;

  return (
    <DataTable
      columns={columns}
      data={data?.data ?? []}
      totalRows={totalRows}
      totalPages={totalPages}
      pagination={pagination}
      onPaginationChange={setPagination}
      isLoading={isLoading}
    />
  );
}
