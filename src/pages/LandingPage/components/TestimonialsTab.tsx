import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Star, Pencil, Trash2 } from 'lucide-react';
import { useCreateTestimonialMutation, useUpdateTestimonialMutation, useDeleteTestimonialMutation } from '@/features/landing-page/landingPageApi';
import { toast } from 'sonner';
import type { TTestimonial } from '@/features/landing-page/types';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface TestimonialsTabProps {
  testimonials: TTestimonial[];
}

export function TestimonialsTab({ testimonials }: TestimonialsTabProps) {
  const [createTestimonial, { isLoading: isCreating }] = useCreateTestimonialMutation();
  const [updateTestimonial, { isLoading: isUpdating }] = useUpdateTestimonialMutation();
  const [deleteTestimonial, { isLoading: isDeleting }] = useDeleteTestimonialMutation();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<TTestimonial | null>(null);

  // Form state for new testimonial
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    designation: '',
    content: '',
    rating: 5,
    avatarUrl: '',
  });

  const handleCreate = async () => {
    try {
      await createTestimonial(newTestimonial).unwrap();
      toast.success('Testimonial created successfully');
      setIsAddOpen(false);
      setNewTestimonial({ name: '', designation: '', content: '', rating: 5, avatarUrl: '' });
    } catch (error) {
      toast.error('Failed to create testimonial');
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    if (!editingTestimonial) return;
    try {
      await updateTestimonial({
        id: editingTestimonial.id,
        data: {
          name: editingTestimonial.name,
          designation: editingTestimonial.designation,
          content: editingTestimonial.content,
          avatarUrl: editingTestimonial.avatarUrl,
          rating: editingTestimonial.rating
        }
      }).unwrap();
      toast.success('Testimonial updated successfully');
      setIsEditOpen(false);
      setEditingTestimonial(null);
    } catch (error) {
      toast.error('Failed to update testimonial');
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTestimonial(id).unwrap();
      toast.success('Testimonial deleted successfully');
    } catch (error) {
      toast.error('Failed to delete testimonial');
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Manage Testimonials</h3>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" /> Add Testimonial</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Testimonial</DialogTitle>
              <DialogDescription>Add a new testimonial to the landing page.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newTestimonial.name}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="designation">Designation</Label>
                  <Input
                    id="designation"
                    value={newTestimonial.designation}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, designation: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={newTestimonial.content}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, content: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="rating">Rating (1-5)</Label>
                  <Input
                    id="rating"
                    type="number"
                    min="1"
                    max="5"
                    value={newTestimonial.rating}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, rating: parseInt(e.target.value) })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="avatarUrl">Avatar URL</Label>
                  <Input
                    id="avatarUrl"
                    value={newTestimonial.avatarUrl}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, avatarUrl: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
              <Button onClick={handleCreate} disabled={isCreating}>
                {isCreating ? 'Creating...' : 'Create Testimonial'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Testimonial</DialogTitle>
            <DialogDescription>Update the testimonial details.</DialogDescription>
          </DialogHeader>
          {editingTestimonial && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Name</Label>
                  <Input
                    id="edit-name"
                    value={editingTestimonial.name}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-designation">Designation</Label>
                  <Input
                    id="edit-designation"
                    value={editingTestimonial.designation}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, designation: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-content">Content</Label>
                <Textarea
                  id="edit-content"
                  value={editingTestimonial.content}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, content: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-rating">Rating (1-5)</Label>
                  <Input
                    id="edit-rating"
                    type="number"
                    min="1"
                    max="5"
                    value={editingTestimonial.rating}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, rating: parseInt(e.target.value) })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-avatarUrl">Avatar URL</Label>
                  <Input
                    id="edit-avatarUrl"
                    value={editingTestimonial.avatarUrl}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, avatarUrl: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdate} disabled={isUpdating}>
              {isUpdating ? 'Updating...' : 'Update Testimonial'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="h-full flex flex-col relative group">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar>
                <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} className='object-cover bg-center' />
                <AvatarFallback>{testimonial.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col flex-grow">
                <CardTitle className="text-sm font-semibold">{testimonial.name}</CardTitle>
                <CardDescription className="text-xs">{testimonial.designation}</CardDescription>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  onClick={() => {
                    setEditingTestimonial(testimonial);
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
                        This action cannot be undone. This will permanently delete the testimonial.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(testimonial.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-xs text-muted-foreground italic">&quot;{testimonial.content}&quot;</p>
            </CardContent>
            <CardFooter className="pt-0 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} />
              ))}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
