import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Star } from 'lucide-react';
import { useCreateTestimonialMutation } from '@/features/landing-page/landingPageApi';
import { toast } from 'sonner';
import type { TTestimonial } from '@/features/landing-page/types';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface TestimonialsTabProps {
  testimonials: TTestimonial[];
}

export function TestimonialsTab({ testimonials }: TestimonialsTabProps) {
  const [createTestimonial, { isLoading }] = useCreateTestimonialMutation();
  const [isOpen, setIsOpen] = useState(false);
  
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
      setIsOpen(false);
      setNewTestimonial({ name: '', designation: '', content: '', rating: 5, avatarUrl: '' });
    } catch (error) {
      toast.error('Failed to create testimonial');
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Manage Testimonials</h3>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
              <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button onClick={handleCreate} disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Testimonial'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="h-full flex flex-col">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar>
                <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} />
                <AvatarFallback>{testimonial.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <CardTitle className="text-sm font-semibold">{testimonial.name}</CardTitle>
                <CardDescription className="text-xs">{testimonial.designation}</CardDescription>
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
