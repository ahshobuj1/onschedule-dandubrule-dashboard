import { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetRolesQuery, useAssignRoleToUserMutation } from '../permissionApi';
import { PermissionMatrix } from './PermissionMatrix';
import { toast } from 'sonner';

interface UserPermissionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: { id: string; displayName: string; role: string; customRoleId?: string | null } | null;
}

export const UserPermissionDialog: React.FC<UserPermissionDialogProps> = ({ 
  open, 
  onOpenChange, 
  user 
}) => {
  const { data: roles } = useGetRolesQuery(undefined, { skip: !open });
  const [assignRole, { isLoading: isAssigning }] = useAssignRoleToUserMutation();
  const [selectedRoleId, setSelectedRoleId] = useState<string>('none');

  useEffect(() => {
    if (user) {
      setSelectedRoleId(user.customRoleId || 'none');
    }
  }, [user, open]);

  const handleRoleChange = async (roleId: string) => {
    if (!user) return;
    
    try {
      const roleValue = roleId === 'none' ? null : roleId;
      await assignRole({ 
        userId: user.id, 
        roleId: roleValue 
      }).unwrap();
      
      setSelectedRoleId(roleId);
      toast.success('User custom role updated');
    } catch (err) {
      toast.error('Failed to assign role');
    }
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Permissions: {user.displayName}</DialogTitle>
          <DialogDescription>
            View effective system access or manage custom role and direct overrides.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="effective" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="effective">Final Powers</TabsTrigger>
            <TabsTrigger value="role">Custom Role</TabsTrigger>
            <TabsTrigger value="direct">Direct Overrides</TabsTrigger>
          </TabsList>

          {/* 1. Final Powers View (Read-only) */}
          <TabsContent value="effective" className="py-2">
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 p-3 rounded-md mb-6 text-xs text-blue-800 dark:text-blue-200">
               This matrix shows the <strong>Computed Permissions</strong> for the user (Baseline + Custom Role + Direct Overrides).
            </div>
            <PermissionMatrix userId={user.id} isEffectiveView={true} />
          </TabsContent>

          {/* 2. Role Assignment */}
          <TabsContent value="role" className="py-6 space-y-6">
            <div className="bg-accent/20 p-4 rounded-lg border border-dashed text-sm">
              <p className="font-medium text-foreground">Current Baseline Role: <span className="uppercase text-primary font-mono">{user.role}</span></p>
              <p className="mt-1 text-muted-foreground italic">Baseline powers are fixed and cannot be removed here. Use the Permission Matrix for global baseline management.</p>
            </div>

            <div className="space-y-3">
              <Label>Assign Custom Role</Label>
              <Select value={selectedRoleId} onValueChange={handleRoleChange} disabled={isAssigning}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a custom role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Custom Role</SelectItem>
                  {roles && roles.map((role: any) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          {/* 3. Direct Overrides (Editable) */}
          <TabsContent value="direct" className="py-2">
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 p-3 rounded-md mb-6 text-xs text-amber-800 dark:text-amber-200">
               <strong>Warning:</strong> Direct overrides explicitly grant powers regardless of role.
            </div>
            <PermissionMatrix userId={user.id} isEffectiveView={false} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
