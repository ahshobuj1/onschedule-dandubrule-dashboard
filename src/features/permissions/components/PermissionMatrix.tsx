import { useState, useEffect } from 'react';
import {
  useGetPermissionMatrixQuery,
  useGetUserEffectiveMatrixQuery,
  useGetUserPermissionsQuery,
  useGetRolePermissionMatrixQuery,
  useSyncRolePermissionsMutation,
  useSyncUserPermissionsMutation
} from '../permissionApi';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { IconDeviceFloppy, IconReload } from '@tabler/icons-react';

interface PermissionMatrixProps {
  roleId?: string;
  userId?: string;
  isEffectiveView?: boolean;
  onSaveSuccess?: () => void;
}

interface MatrixItem {
  module: string;
  action: string;
  status: boolean;
}

const ACTIONS = ['VIEW', 'CREATE', 'EDIT', 'DELETE', 'REPORT'];

export const PermissionMatrix = ({
  roleId,
  userId,
  isEffectiveView = false,
  onSaveSuccess
}: PermissionMatrixProps) => {
  // If it's effective view (computed)
  const { data: effectiveMatrix, isLoading: isLoadingEffective, refetch: refetchEffective } = useGetUserEffectiveMatrixQuery(
    userId!, { skip: !userId || !isEffectiveView }
  );

  // If it's role editing
  const { data: roleMatrix, isLoading: isLoadingRole, refetch: refetchRole } = useGetRolePermissionMatrixQuery(
    roleId!, { skip: !roleId || isEffectiveView }
  );

  // If it's user direct permission editing
  const { data: userDirectMatrix, isLoading: isLoadingDirect, refetch: refetchDirect } = useGetUserPermissionsQuery(
    userId!, { skip: !userId || isEffectiveView }
  );

  const [syncRole] = useSyncRolePermissionsMutation();
  const [syncUser] = useSyncUserPermissionsMutation();

  const [localMatrix, setLocalMatrix] = useState<MatrixItem[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  // Sync local state when any data source changes
  useEffect(() => {
    if (isEffectiveView && effectiveMatrix) setLocalMatrix(effectiveMatrix);
    else if (roleId && roleMatrix) setLocalMatrix(roleMatrix);
    else if (userId && !isEffectiveView && userDirectMatrix) setLocalMatrix(userDirectMatrix);
  }, [effectiveMatrix, roleMatrix, userDirectMatrix, roleId, userId, isEffectiveView]);

  const handleToggle = (module: string, action: string) => {
    if (isEffectiveView) return; // Read-only

    setLocalMatrix(prev =>
      prev.map(item =>
        (item.module === module && item.action === action)
          ? { ...item, status: !item.status }
          : item
      )
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const permissionIds = localMatrix
        .filter(item => item.status)
        .map(item => (item as any).id)
        .filter(Boolean);

      if (roleId) {
        await syncRole({ roleId, permissionIds }).unwrap();
      } else if (userId) {
        await syncUser({ userId, permissionIds }).unwrap();
      }

      toast.success('Permissions updated successfully');
      if (onSaveSuccess) onSaveSuccess();
    } catch (err) {
      toast.error('Failed to update permissions');
    } finally {
      setIsSaving(false);
    }
  };

  const isLoading = isLoadingEffective || isLoadingRole || isLoadingDirect;

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!roleId && !userId) {
    return <div className="text-muted-foreground p-8 text-center bg-accent/20 rounded-lg border-2 border-dashed">Select a role or user to manage permissions</div>;
  }

  const modules = Array.from(new Set(localMatrix.map(m => m.module)));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">
            {isEffectiveView ? 'Effective Permissions' : 'Permission Matrix'}
          </h3>
          <p className="text-sm text-muted-foreground">
            {isEffectiveView
              ? 'Computed access based on Role + Direct Overrides'
              : 'Edit granular access for this specific entity'}
          </p>
        </div>
        {!isEffectiveView && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => roleId ? refetchRole() : refetchDirect()}>
              <IconReload className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button size="sm" onClick={handleSave} disabled={isSaving}>
              <IconDeviceFloppy className="mr-2 h-4 w-4" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        )}
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Module</th>
                {ACTIONS.map(action => (
                  <th key={action} className="px-4 py-3 text-center font-medium text-muted-foreground">
                    {action}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {modules.map(module => (
                <tr key={module} className="hover:bg-accent/5 transition-colors">
                  <td className="px-4 py-4 font-medium">{module}</td>
                  {ACTIONS.map(action => {
                    const item = localMatrix.find(m => m.module === module && m.action === action);
                    return (
                      <td key={action} className="px-4 py-4 text-center">
                        {item ? (
                          <div className="flex justify-center">
                            <Checkbox
                              checked={item.status}
                              onCheckedChange={() => handleToggle(module, action)}
                              disabled={isEffectiveView}
                              className={isEffectiveView ? "opacity-70 pointer-events-none" : "data-[state=checked]:bg-primary"}
                            />
                          </div>
                        ) : (
                          <span className="text-muted-foreground/30">—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
