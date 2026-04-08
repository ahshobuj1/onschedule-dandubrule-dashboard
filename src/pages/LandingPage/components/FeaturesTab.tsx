import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useCreateFeatureMutation, useUpdateFeatureMutation, useDeleteFeatureMutation } from '@/features/landing-page/landingPageApi';
import { toast } from 'sonner';
import type { TFeature } from '@/features/landing-page/types';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface FeaturesTabProps {
  features: TFeature[];
}

export function FeaturesTab({ features }: FeaturesTabProps) {
  const [createFeature, { isLoading: isCreating }] = useCreateFeatureMutation();
  const [updateFeature, { isLoading: isUpdating }] = useUpdateFeatureMutation();
  const [deleteFeature, { isLoading: isDeleting }] = useDeleteFeatureMutation();
  
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingFeature, setEditingFeature] = useState<TFeature | null>(null);
  
  // Form state for new feature
  const [newFeature, setNewFeature] = useState({
    title: '',
    description: '',
    order: features.length + 1,
  });

  const handleCreate = async () => {
    try {
      await createFeature(newFeature).unwrap();
      toast.success('Feature created successfully');
      setIsAddOpen(false);
      setNewFeature({ title: '', description: '', order: features.length + 2 });
    } catch (error) {
      toast.error('Failed to create feature');
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    if (!editingFeature) return;
    try {
      await updateFeature({ 
        id: editingFeature.id, 
        data: {
          title: editingFeature.title,
          description: editingFeature.description,
          order: editingFeature.order,
          icon: editingFeature.icon || 'vibrate' // Providing a default icon as requested in payload example
        } 
      }).unwrap();
      toast.success('Feature updated successfully');
      setIsEditOpen(false);
      setEditingFeature(null);
    } catch (error) {
      toast.error('Failed to update feature');
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteFeature(id).unwrap();
      toast.success('Feature deleted successfully');
    } catch (error) {
      toast.error('Failed to delete feature');
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Manage Features</h3>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" /> Add Feature</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Feature</DialogTitle>
              <DialogDescription>Add a new feature to the landing page.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  value={newFeature.title} 
                  onChange={(e) => setNewFeature({ ...newFeature, title: e.target.value })} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={newFeature.description} 
                  onChange={(e) => setNewFeature({ ...newFeature, description: e.target.value })} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="order">Display Order</Label>
                <Input 
                  id="order" 
                  type="number" 
                  value={newFeature.order} 
                  onChange={(e) => setNewFeature({ ...newFeature, order: parseInt(e.target.value) })} 
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
              <Button onClick={handleCreate} disabled={isCreating}>
                {isCreating ? 'Creating...' : 'Create Feature'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Feature</DialogTitle>
            <DialogDescription>Update the feature details.</DialogDescription>
          </DialogHeader>
          {editingFeature && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input 
                  id="edit-title" 
                  value={editingFeature.title} 
                  onChange={(e) => setEditingFeature({ ...editingFeature, title: e.target.value })} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea 
                  id="edit-description" 
                  value={editingFeature.description} 
                  onChange={(e) => setEditingFeature({ ...editingFeature, description: e.target.value })} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-order">Display Order</Label>
                <Input 
                  id="edit-order" 
                  type="number" 
                  value={editingFeature.order} 
                  onChange={(e) => setEditingFeature({ ...editingFeature, order: parseInt(e.target.value) })} 
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdate} disabled={isUpdating}>
              {isUpdating ? 'Updating...' : 'Update Feature'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature) => (
          <Card key={feature.id} className="relative group">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{feature.title}</CardTitle>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                 <Button 
                   variant="ghost" 
                   size="icon" 
                   className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                   onClick={() => {
                     setEditingFeature(feature);
                     setIsEditOpen(true);
                   }}
                 >
                   <Pencil className="h-4 h-4" />
                 </Button>
                 
                 <AlertDialog>
                   <AlertDialogTrigger asChild>
                     <Button 
                       variant="ghost" 
                       size="icon" 
                       className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                     >
                       <Trash2 className="h-4 h-4" />
                     </Button>
                   </AlertDialogTrigger>
                   <AlertDialogContent>
                     <AlertDialogHeader>
                       <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                       <AlertDialogDescription>
                         This action cannot be undone. This will permanently delete the feature.
                       </AlertDialogDescription>
                     </AlertDialogHeader>
                     <AlertDialogFooter>
                       <AlertDialogCancel>Cancel</AlertDialogCancel>
                       <AlertDialogAction 
                         onClick={() => handleDelete(feature.id)}
                         className="bg-red-600 hover:bg-red-700"
                       >
                         {isDeleting ? 'Deleting...' : 'Delete'}
                       </AlertDialogAction>
                     </AlertDialogFooter>
                   </AlertDialogContent>
                 </AlertDialog>
                 
                 <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">#{feature.order}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
