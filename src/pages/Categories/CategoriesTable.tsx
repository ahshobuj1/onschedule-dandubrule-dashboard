import React from 'react';

import {DataTable} from '../DataTable';
import {columns} from './Column';
import {useGetAssignmentsQuery} from '@/features/assignment/assignmentApi';
import type {IAssessmentCategory} from './type';

export function CategoriesTable({
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

  const {data, isLoading} = useGetAssignmentsQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    search: searchQuery,
    sortBy: sortQuery,
    sortOrder,
  });

  // const categories = data?.data?.data.map((item: any) => item?.categories);

  const assignments = data?.data?.data ?? [];

  const allCategories = assignments.flatMap(
    (assignment: IAssessmentCategory) => assignment.categories ?? []
  );

  // console.log(allCategories);

  const totalRows = data?.meta?.pagination?.total ?? 0;
  const totalPages = data?.meta?.pagination?.totalPages ?? 1;

  return (
    <DataTable
      columns={columns}
      data={allCategories}
      totalRows={totalRows}
      totalPages={totalPages}
      pagination={pagination}
      onPaginationChange={setPagination}
      isLoading={isLoading}
    />
  );
}
