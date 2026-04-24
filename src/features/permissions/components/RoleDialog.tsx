import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCreateRoleMutation, useUpdateRoleMutation } from '../permissionApi';
import { toast } from 'sonner';

interface RoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role?: { id: string; name: string; description?: string } | null;
}

export const RoleDialog: React.FC<RoleDialogProps> = ({ open, onOpenChange, role }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  
  const [createRole, { isLoading: isCreating }] = useCreateRoleMutation();
  const [updateRole, { isLoading: isUpdating }] = useUpdateRoleMutation();

  useEffect(() => {
    if (role) {
      setName(role.name);
      setDescription(role.description || '');
    } else {
      setName('');
      setDescription('');
    }
  }, [role, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error('Role name is required');
      return;
    }

    try {
      if (role) {
        await updateRole({ id: role.id, name, description }).unwrap();
        toast.success('Role updated successfully');
      } else {
        await createRole({ name, description }).unwrap();
        toast.success('Role created successfully');
      }
      onOpenChange(false);
    } catch (err: any) {
      toast.error(err?.data?.message || 'Something went wrong');
    }
  };

  const isSystemRole = role?.name.startsWith('SYSTEM_');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{role ? 'Edit Role' : 'Create Custom Role'}</DialogTitle>
            <DialogDescription>
              {role 
                ? 'Update role details. Note that system roles have restricted name editing.' 
                : 'Define a new role for your team.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Role Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Regional Manager"
                disabled={isSystemRole}
                className={isSystemRole ? "bg-muted font-mono" : ""}
              />
              {isSystemRole && (
                <p className="text-[10px] text-muted-foreground italic">
                  * System role names cannot be modified.
                </p>
              )}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What can this role do?"
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isCreating || isUpdating}>
              {role ? 'Save Changes' : 'Create Role'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
