import { useState, useMemo } from 'react';
import { useGetRolesQuery, useDeleteRoleMutation } from '@/features/permissions/permissionApi';
import { PermissionMatrix } from '@/features/permissions/components/PermissionMatrix';
import { RoleDialog } from '@/features/permissions/components/RoleDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  IconPlus, 
  IconShieldLock, 
  IconTrash, 
  IconEdit, 
  IconUserShield,
  IconSearch,
  IconChecks
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
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredRoles = useMemo(() => {
    if (!roles) return [];
    const search = searchTerm.toLowerCase();
    return roles.filter((role: any) => 
      role.name.toLowerCase().includes(search) || 
      (role.description && role.description.toLowerCase().includes(search))
    );
  }, [roles, searchTerm]);

  const renderRoleItem = (role: any) => {
    const isSelected = selectedRole?.id === role.id;
    const isSystem = role.name.startsWith('SYSTEM_');
    
    return (
      <div 
        key={role.id}
        className={cn(
          "flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all mb-1 group",
          isSelected 
            ? "bg-primary text-primary-foreground shadow-sm" 
            : "hover:bg-accent hover:text-accent-foreground text-muted-foreground"
        )}
        onClick={() => setSelectedRole(role)}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <div className={cn(
            "p-1.5 rounded-md shrink-0",
            isSelected ? "bg-primary-foreground/20" : "bg-muted"
          )}>
            <IconUserShield size={14} />
          </div>
          <div className="overflow-hidden">
            <div className="text-sm font-medium flex items-center gap-1.5">
              <span className="truncate">{role.name.replace('SYSTEM_', '')}</span>
              {isSystem && (
                <IconChecks size={12} className={isSelected ? "text-primary-foreground" : "text-primary"} />
              )}
            </div>
            {!isSelected && (
               <p className="text-[10px] opacity-70 truncate max-w-[150px]">
                 {role.description || 'No description'}
               </p>
            )}
          </div>
        </div>
        
        {!isSystem && (
          <div className={cn(
            "flex items-center gap-0.5 shrink-0 transition-opacity",
            isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          )}>
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn("h-7 w-7", isSelected && "hover:bg-primary-foreground/10 hover:text-primary-foreground")}
              onClick={(e) => {
                e.stopPropagation();
                setRoleToEdit(role);
                setIsRoleDialogOpen(true);
              }}
            >
              <IconEdit size={14} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn(
                "h-7 w-7", 
                isSelected ? "hover:bg-destructive/20 text-primary-foreground" : "text-destructive hover:bg-destructive/10"
              )}
              onClick={(e) => {
                e.stopPropagation();
                setRoleToDelete(role);
              }}
            >
              <IconTrash size={14} />
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <IconShieldLock size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Access Control</h1>
            <p className="text-sm text-muted-foreground">Manage global roles and granular module permissions.</p>
          </div>
        </div>
        <Button onClick={() => { setRoleToEdit(null); setIsRoleDialogOpen(true); }}>
          <IconPlus className="mr-2 h-4 w-4" />
          Create Custom Role
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Sidebar: Roles List */}
        <div className="md:col-span-4 bg-muted/30 p-4 rounded-xl border space-y-4">
          <div className="relative">
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <Input 
              placeholder="Filter roles..." 
              className="pl-9 bg-background h-9 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between px-2 mb-2">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Global Roles</h2>
              <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground">{filteredRoles.length}</span>
            </div>
            
            <ScrollArea className="h-[calc(100vh-320px)] pr-3">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-10 w-full animate-pulse bg-muted/50 rounded-lg mb-2" />
                ))
              ) : (
                filteredRoles.map(renderRoleItem)
              )}
              {!isLoading && filteredRoles.length === 0 && (
                <div className="py-12 text-center">
                   <p className="text-xs text-muted-foreground italic">No roles match your search</p>
                </div>
              )}
            </ScrollArea>
          </div>
        </div>

        {/* Content: Matrix */}
        <div className="md:col-span-8">
          <div className="bg-background rounded-xl border border-dashed p-1 min-h-[500px] shadow-sm">
            {selectedRole ? (
              <div className="animate-in slide-in-from-right-4 duration-300">
                <PermissionMatrix roleId={selectedRole.id} />
              </div>
            ) : (
              <div className="h-[500px] flex flex-col items-center justify-center text-center p-12 space-y-4">
                <div className="p-4 bg-primary/5 rounded-full text-primary/30">
                  <IconShieldLock size={48} />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Role Selection</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">Select a role from the sidebar to manage its granular access permissions.</p>
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
              Delete Global Role?
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-3" asChild>
              <div className="text-sm text-muted-foreground">
                <p>
                  This will permanently remove the role <strong>"{roleToDelete?.name}"</strong>.
                </p>
                {roleToDelete?._count?.users > 0 && (
                  <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
                    This role is assigned to <strong>{roleToDelete._count.users} user(s)</strong>. 
                  </div>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
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
