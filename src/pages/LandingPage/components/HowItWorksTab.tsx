import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useCreateHowItWorksMutation, useUpdateHowItWorksMutation, useDeleteHowItWorksMutation } from '@/features/landing-page/landingPageApi';
import { toast } from 'sonner';
import type { THowItWorks } from '@/features/landing-page/types';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface HowItWorksTabProps {
  steps: THowItWorks[];
}

export function HowItWorksTab({ steps }: HowItWorksTabProps) {
  const [createStep, { isLoading: isCreating }] = useCreateHowItWorksMutation();
  const [updateStep, { isLoading: isUpdating }] = useUpdateHowItWorksMutation();
  const [deleteStep, { isLoading: isDeleting }] = useDeleteHowItWorksMutation();
  
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingStep, setEditingStep] = useState<THowItWorks | null>(null);
  
  // Form state for new step
  const [newStep, setNewStep] = useState({
    stepNumber: steps.length + 1,
    title: '',
    description: '',
    icon: '',
  });

  const handleCreate = async () => {
    try {
      await createStep(newStep).unwrap();
      toast.success('Step created successfully');
      setIsAddOpen(false);
      setNewStep({ 
        stepNumber: steps.length + 2, 
        title: '', 
        description: '', 
        icon: '' 
      });
    } catch (error) {
      toast.error('Failed to create step');
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    if (!editingStep) return;
    try {
      await updateStep({ 
        id: editingStep.id, 
        data: {
          stepNumber: editingStep.stepNumber,
          title: editingStep.title,
          description: editingStep.description,
          icon: editingStep.icon || 'settings'
        } 
      }).unwrap();
      toast.success('Step updated successfully');
      setIsEditOpen(false);
      setEditingStep(null);
    } catch (error) {
      toast.error('Failed to update step');
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteStep(id).unwrap();
      toast.success('Step deleted successfully');
    } catch (error) {
      toast.error('Failed to delete step');
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Manage Process Steps</h3>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" /> Add Step</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Step</DialogTitle>
              <DialogDescription>Add a new step to the &apos;How It Works&apos; section.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="stepNumber">Step Number</Label>
                  <Input 
                    id="stepNumber" 
                    type="number"
                    value={newStep.stepNumber} 
                    onChange={(e) => setNewStep({ ...newStep, stepNumber: parseInt(e.target.value) })} 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input 
                    id="title" 
                    value={newStep.title} 
                    onChange={(e) => setNewStep({ ...newStep, title: e.target.value })} 
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={newStep.description} 
                  onChange={(e) => setNewStep({ ...newStep, description: e.target.value })} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="icon">Icon Name (e.g., settings, star)</Label>
                <Input 
                  id="icon" 
                  value={newStep.icon} 
                  onChange={(e) => setNewStep({ ...newStep, icon: e.target.value })} 
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
              <Button onClick={handleCreate} disabled={isCreating}>
                {isCreating ? 'Creating...' : 'Create Step'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Step</DialogTitle>
            <DialogDescription>Update the step details.</DialogDescription>
          </DialogHeader>
          {editingStep && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-stepNumber">Step Number</Label>
                  <Input 
                    id="edit-stepNumber" 
                    type="number"
                    value={editingStep.stepNumber} 
                    onChange={(e) => setEditingStep({ ...editingStep, stepNumber: parseInt(e.target.value) })} 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-title">Title</Label>
                  <Input 
                    id="edit-title" 
                    value={editingStep.title} 
                    onChange={(e) => setEditingStep({ ...editingStep, title: e.target.value })} 
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea 
                  id="edit-description" 
                  value={editingStep.description} 
                  onChange={(e) => setEditingStep({ ...editingStep, description: e.target.value })} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-icon">Icon Name</Label>
                <Input 
                  id="edit-icon" 
                  value={editingStep.icon} 
                  onChange={(e) => setEditingStep({ ...editingStep, icon: e.target.value })} 
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdate} disabled={isUpdating}>
              {isUpdating ? 'Updating...' : 'Update Step'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((step) => (
          <Card key={step.id} className="relative group">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                   {step.stepNumber}
                 </div>
                 <CardTitle className="text-sm font-semibold">{step.title}</CardTitle>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                 <Button 
                   variant="ghost" 
                   size="icon" 
                   className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                   onClick={() => {
                     setEditingStep(step);
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
                         This action cannot be undone. This will permanently delete the step.
                       </AlertDialogDescription>
                     </AlertDialogHeader>
                     <AlertDialogFooter>
                       <AlertDialogCancel>Cancel</AlertDialogCancel>
                       <AlertDialogAction 
                         onClick={() => handleDelete(step.id)}
                         className="bg-red-600 hover:bg-red-700"
                       >
                         {isDeleting ? 'Deleting...' : 'Delete'}
                       </AlertDialogAction>
                     </AlertDialogFooter>
                   </AlertDialogContent>
                 </AlertDialog>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
