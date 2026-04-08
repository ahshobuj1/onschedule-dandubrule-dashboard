import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useCreateFAQMutation, useUpdateFAQMutation, useDeleteFAQMutation } from '@/features/landing-page/landingPageApi';
import { toast } from 'sonner';
import type { TFAQ } from '@/features/landing-page/types';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface FaqsTabProps {
  faqs: TFAQ[];
}

export function FaqsTab({ faqs }: FaqsTabProps) {
  const [createFAQ, { isLoading: isCreating }] = useCreateFAQMutation();
  const [updateFAQ, { isLoading: isUpdating }] = useUpdateFAQMutation();
  const [deleteFAQ, { isLoading: isDeleting }] = useDeleteFAQMutation();
  
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<TFAQ | null>(null);
  
  // Form state for new FAQ
  const [newFAQ, setNewFAQ] = useState({
    question: '',
    answer: '',
    order: faqs.length + 1,
  });

  const handleCreate = async () => {
    try {
      await createFAQ(newFAQ).unwrap();
      toast.success('FAQ created successfully');
      setIsAddOpen(false);
      setNewFAQ({ question: '', answer: '', order: faqs.length + 2 });
    } catch (error) {
      toast.error('Failed to create FAQ');
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    if (!editingFaq) return;
    try {
      await updateFAQ({ 
        id: editingFaq.id, 
        data: {
          question: editingFaq.question,
          answer: editingFaq.answer,
          order: editingFaq.order
        } 
      }).unwrap();
      toast.success('FAQ updated successfully');
      setIsEditOpen(false);
      setEditingFaq(null);
    } catch (error) {
      toast.error('Failed to update FAQ');
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteFAQ(id).unwrap();
      toast.success('FAQ deleted successfully');
    } catch (error) {
      toast.error('Failed to delete FAQ');
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Manage FAQ</h3>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" /> Add FAQ</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New FAQ</DialogTitle>
              <DialogDescription>Add a new question and answer to the landing page.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="question">Question</Label>
                <Input 
                  id="question" 
                  value={newFAQ.question} 
                  onChange={(e) => setNewFAQ({ ...newFAQ, question: e.target.value })} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="answer">Answer</Label>
                <Textarea 
                  id="answer" 
                  value={newFAQ.answer} 
                  onChange={(e) => setNewFAQ({ ...newFAQ, answer: e.target.value })} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="order">Display Order</Label>
                <Input 
                  id="order" 
                  type="number" 
                  value={newFAQ.order} 
                  onChange={(e) => setNewFAQ({ ...newFAQ, order: parseInt(e.target.value) })} 
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
              <Button onClick={handleCreate} disabled={isCreating}>
                {isCreating ? 'Creating...' : 'Create FAQ'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit FAQ</DialogTitle>
            <DialogDescription>Update the question and answer.</DialogDescription>
          </DialogHeader>
          {editingFaq && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-question">Question</Label>
                <Input 
                  id="edit-question" 
                  value={editingFaq.question} 
                  onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-answer">Answer</Label>
                <Textarea 
                  id="edit-answer" 
                  value={editingFaq.answer} 
                  onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-order">Display Order</Label>
                <Input 
                  id="edit-order" 
                  type="number" 
                  value={editingFaq.order} 
                  onChange={(e) => setEditingFaq({ ...editingFaq, order: parseInt(e.target.value) })} 
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdate} disabled={isUpdating}>
              {isUpdating ? 'Updating...' : 'Update FAQ'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="space-y-4">
        {faqs.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No FAQs added yet.
            </CardContent>
          </Card>
        ) : (
          faqs.map((faq) => (
            <Card key={faq.id} className="relative group">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-semibold">{faq.question}</CardTitle>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <Button 
                     variant="ghost" 
                     size="icon" 
                     className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                     onClick={() => {
                       setEditingFaq(faq);
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
                           This action cannot be undone. This will permanently delete the FAQ.
                         </AlertDialogDescription>
                       </AlertDialogHeader>
                       <AlertDialogFooter>
                         <AlertDialogCancel>Cancel</AlertDialogCancel>
                         <AlertDialogAction 
                           onClick={() => handleDelete(faq.id)}
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
                <p className="text-xs text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
