import React from 'react';

import {DataTable} from '../DataTable';
import {columns} from './Column';
import {useGetAssignmentsQuery} from '@/features/assignment/assignmentApi';
import type {IAssignment} from '../Assignment/type';

export function QuestionsTable({
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

  const allQuestions =
    data?.data?.data?.flatMap((assignment: IAssignment) =>
      assignment.categories.flatMap((category: any) => category.questions)
    ) ?? [];

  console.log(allQuestions);

  const totalRows = data?.meta?.pagination?.total ?? 0;
  const totalPages = data?.meta?.pagination?.totalPages ?? 1;

  return (
    <DataTable
      columns={columns}
      data={allQuestions ?? []}
      totalRows={totalRows}
      totalPages={totalPages}
      pagination={pagination}
      onPaginationChange={setPagination}
      isLoading={isLoading}
    />
  );
}
