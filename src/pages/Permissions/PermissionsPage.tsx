import { useState } from 'react';
import { useGetRolesQuery, useDeleteRoleMutation } from '@/features/permissions/permissionApi';
import { PermissionMatrix } from '@/features/permissions/components/PermissionMatrix';
import { RoleDialog } from '@/features/permissions/components/RoleDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  IconPlus, 
  IconShieldLock, 
  IconTrash, 
  IconEdit, 
  IconUserShield 
} from '@tabler/icons-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function PermissionsPage() {
  const { data: roles, isLoading } = useGetRolesQuery();
  const [deleteRole] = useDeleteRoleMutation();
  
  const [selectedRole, setSelectedRole] = useState<{ id: string; name: string; description?: string } | null>(null);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [roleToEdit, setRoleToEdit] = useState<{ id: string; name: string; description?: string } | null>(null);
  const [roleToDelete, setRoleToDelete] = useState<any>(null);

  const handleDelete = async () => {
    if (!roleToDelete) return;
    try {
      await deleteRole(roleToDelete.id).unwrap();
      toast.success('Role deleted');
      if (selectedRole?.id === roleToDelete.id) setSelectedRole(null);
    } catch (err) {
      toast.error('Failed to delete role');
    } finally {
      setRoleToDelete(null);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <IconShieldLock size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Access Control</h1>
            <p className="text-muted-foreground">Manage system roles, custom roles, and granular module permissions.</p>
          </div>
        </div>
        <Button onClick={() => { setRoleToEdit(null); setIsRoleDialogOpen(true); }}>
          <IconPlus className="mr-2 h-4 w-4" />
          Create Custom Role
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Sidebar: Roles List */}
        <div className="md:col-span-4 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground px-2">System & Custom Roles</h2>
          <div className="space-y-2">
            {isLoading ? (
              [1, 2, 3].map(i => <div key={i} className="h-14 w-full animate-pulse bg-muted rounded-xl" />)
            ) : (
              roles?.map((role: any) => {
                const isSelected = selectedRole?.id === role.id;
                const isSystem = role.name.startsWith('SYSTEM_');
                
                return (
                  <Card 
                    key={role.id}
                    className={cn(
                      "cursor-pointer transition-all border-2 group relative overflow-hidden",
                      isSelected 
                        ? "border-primary bg-primary/5 shadow-md" 
                        : "border-transparent hover:border-muted hover:bg-accent/50"
                    )}
                    onClick={() => setSelectedRole(role)}
                  >
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "p-2 rounded-md",
                          isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        )}>
                          <IconUserShield size={18} />
                        </div>
                        <div>
                          <div className="font-semibold flex items-center gap-2">
                            {role.name.replace('SYSTEM_', '')}
                            {isSystem && (
                              <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-bold uppercase">System</span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-1">{role.description || 'No description'}</p>
                        </div>
                      </div>
                      
                      {!isSystem && (
                        <div className={cn(
                          "flex items-center gap-1 transition-opacity",
                          isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        )}>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={(e) => {
                              e.stopPropagation();
                              setRoleToEdit(role);
                              setIsRoleDialogOpen(true);
                            }}
                          >
                            <IconEdit size={16} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={(e) => {
                              e.stopPropagation();
                              setRoleToDelete(role);
                            }}
                          >
                            <IconTrash size={16} />
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </div>

        {/* Content: Matrix */}
        <div className="md:col-span-8">
          <div className="bg-background rounded-xl border-2 border-dashed p-1 min-h-[500px]">
            {selectedRole ? (
              <div className="animate-in slide-in-from-right-4 duration-300">
                <PermissionMatrix roleId={selectedRole.id} />
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 space-y-4">
                <div className="p-4 bg-muted rounded-full">
                  <IconShieldLock size={48} className="text-muted-foreground/50" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Select a Role</h3>
                  <p className="text-muted-foreground max-w-xs">Select a system or custom role from the left to manage its specific module access.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <RoleDialog 
        open={isRoleDialogOpen} 
        onOpenChange={setIsRoleDialogOpen} 
        role={roleToEdit} 
      />

      <AlertDialog open={!!roleToDelete} onOpenChange={(open) => !open && setRoleToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <IconTrash size={20} />
              Delete Custom Role?
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-3" asChild>
              <div className="text-sm text-muted-foreground">
                <p>
                  This will permanently remove the role <strong>"{roleToDelete?.name}"</strong> and all its permission links.
                </p>
                {roleToDelete?._count?.users > 0 && (
                  <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive flex items-start gap-2">
                    <div className="mt-0.5 font-bold">⚠️ Warning:</div>
                    <div className="text-sm text-destructive">
                      This role is currently assigned to <strong>{roleToDelete._count.users} user(s)</strong>. 
                      If you delete it, these users will revert to their base system permissions.
                    </div>
                  </div>
                )}
                <p className="text-xs italic">
                  Note: This action cannot be undone.
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Role</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete} 
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Forever
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
