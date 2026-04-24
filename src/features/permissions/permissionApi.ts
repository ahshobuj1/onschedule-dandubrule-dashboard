import { axiosBaseQuery } from '@/app/axiosBaseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const permissionApi = createApi({
  reducerPath: 'permissionApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['PermissionMatrix', 'Role', 'Permission', 'User'],
  endpoints: (builder) => ({
    // 1. Matrix logic (Roles or Users - View only)
    getPermissionMatrix: builder.query<any, void>({
      query: () => ({
        url: '/permissions/matrix',
        method: 'GET',
      }),
      transformResponse: (response: any) => flattenMatrix(response.data),
      providesTags: ['PermissionMatrix'],
    }),

    getUserEffectiveMatrix: builder.query({
      query: (userId) => ({
        url: `/permissions/matrix/${userId}`,
        method: 'GET',
      }),
      transformResponse: (response: any) => flattenMatrix(response.data),
      providesTags: ['PermissionMatrix'],
    }),

    // 2. Roles Management
    getRoles: builder.query<any, void>({
      query: () => ({
        url: '/permissions/roles',
        method: 'GET',
      }),
      transformResponse: (response: any) => response.data,
      providesTags: ['Role'],
    }),

    getRoleById: builder.query({
      query: (id) => ({
        url: `/permissions/roles/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: any) => response.data,
      providesTags: ['Role'],
    }),

    getRolePermissionMatrix: builder.query({
      query: (roleId) => ({
        url: `/permissions/roles/${roleId}/matrix`,
        method: 'GET',
      }),
      transformResponse: (response: any) => flattenMatrix(response.data),
      providesTags: ['PermissionMatrix'],
    }),

    createRole: builder.mutation({
      query: (data) => ({
        url: '/permissions/roles',
        method: 'POST',
        data,
      }),
      transformResponse: (response: any) => response.data,
      invalidatesTags: ['Role'],
    }),

    updateRole: builder.mutation({
      query: (data) => ({
        url: '/permissions/roles',
        method: 'POST', // Backend uses upsert in createCustomRole
        data,
      }),
      transformResponse: (response: any) => response.data,
      invalidatesTags: ['Role'],
    }),

    // 3. Sync Permissions (Split as per backend)
    syncRolePermissions: builder.mutation({
      query: (data) => ({
        url: '/permissions/roles/permissions',
        method: 'POST',
        data,
      }),
      transformResponse: (response: any) => response.data,
      invalidatesTags: ['PermissionMatrix', 'Role'],
    }),

    syncUserPermissions: builder.mutation({
      query: (data) => ({
        url: '/permissions/user-permissions',
        method: 'POST',
        data,
      }),
      transformResponse: (response: any) => response.data,
      invalidatesTags: ['PermissionMatrix', 'User'],
    }),

    // 4. User Direct Actions
    getUserPermissions: builder.query({
      query: (userId) => ({
        url: `/permissions/user-permissions/${userId}`,
        method: 'GET',
      }),
      transformResponse: (response: any) => flattenMatrix(response.data),
      providesTags: ['PermissionMatrix'],
    }),

    assignRoleToUser: builder.mutation({
      query: (data) => ({
        url: '/permissions/assign-role',
        method: 'POST',
        data,
      }),
      transformResponse: (response: any) => response.data,
      invalidatesTags: ['User', 'Role'],
    }),
    
    // Extra: If needed for UI helper
    getPermissions: builder.query({
      query: () => ({
        url: '/permissions',
        method: 'GET',
      }),
      transformResponse: (response: any) => response.data,
      providesTags: ['Permission'],
    }),

    deleteRole: builder.mutation({
      query: (id) => ({
        url: `/permissions/roles/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response: any) => response.data,
      invalidatesTags: ['Role'],
    }),
  }),
});

/**
 * Helper to flatten grouped matrix data from backend into UI-friendly MatrixItem[]
 */
function flattenMatrix(matrix: Record<string, any[]>): any[] {
  if (!matrix || typeof matrix !== 'object' || Array.isArray(matrix)) return matrix;
  
  const flatArray: any[] = [];
  Object.entries(matrix).forEach(([module, perms]) => {
    perms.forEach((p: any) => {
      flatArray.push({
        module,
        action: p.action,
        status: p.granted ?? false,
        id: p.id,
        slug: p.slug,
        description: p.description
      });
    });
  });
  return flatArray;
}

export const {
  useGetPermissionMatrixQuery,
  useGetUserEffectiveMatrixQuery,
  useGetRolesQuery,
  useGetRoleByIdQuery,
  useGetRolePermissionMatrixQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useSyncRolePermissionsMutation,
  useSyncUserPermissionsMutation,
  useGetUserPermissionsQuery,
  useAssignRoleToUserMutation,
  useGetPermissionsQuery,
  useDeleteRoleMutation,
} = permissionApi;
