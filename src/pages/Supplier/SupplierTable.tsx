// import React from 'react';
// import {DataTable} from '../DataTable';
// import {useParams} from 'react-router';
// import {useGetModulesQuery} from '@/features/modules/modulesApi';
// import {Columns} from './Column';

// export function SupplierTable({
//   searchQuery,
//   sortQuery,
//   sortOrder,
// }: {
//   searchQuery: string;
//   sortQuery: string;
//   sortOrder: string;
// }) {
//   const {courseId} = useParams();
//   const [pagination, setPagination] = React.useState({
//     pageIndex: 0,
//     pageSize: 10,
//   });

//   const {data, isLoading} = useGetModulesQuery({
//     page: pagination.pageIndex + 1,
//     limit: pagination.pageSize,
//     search: searchQuery,
//     sortBy: sortQuery,
//     courseId,
//     sortOrder,
//   });

//   const totalRows = data?.meta?.pagination?.total ?? 0;
//   const totalPages = data?.meta?.pagination?.totalPages ?? 1;

//   return (
//     <DataTable
//       columns={Columns}
//       data={data?.data ?? []}
//       totalRows={totalRows}
//       totalPages={totalPages}
//       pagination={pagination}
//       onPaginationChange={setPagination}
//       isLoading={isLoading}
//     />
//   );
// }

import {Columns} from './Column';
import {DataTable} from '../DataTable';
import {useParams} from 'react-router';
import {useGetModulesQuery} from '@/features/modules/modulesApi';
import {useState} from 'react';
import {dummyApiResponse} from './dummyData';
export function SupplierTable({
  searchQuery,
  sortQuery,
  sortOrder,
}: {
  searchQuery: string;
  sortQuery: string;
  sortOrder: string;
}) {
  const {courseId} = useParams();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // Keep the original structure EXACTLY the same
  const {data, isLoading} = useGetModulesQuery(
    {
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
      search: searchQuery,
      sortBy: sortQuery,
      courseId,
      sortOrder,
    },
    {skip: true} // API not ready yet
  );
  console.log(data, isLoading);

  // ---- USE DUMMY DATA BUT KEEP STRUCTURE SAME ----
  const apiData = dummyApiResponse;

  const totalRows = apiData.meta.pagination.total;
  const totalPages = apiData.meta.pagination.totalPages;

  return (
    <DataTable
      columns={Columns}
      data={apiData.data ?? []}
      totalRows={totalRows}
      totalPages={totalPages}
      pagination={pagination}
      onPaginationChange={setPagination}
      isLoading={false}
    />
  );
}
