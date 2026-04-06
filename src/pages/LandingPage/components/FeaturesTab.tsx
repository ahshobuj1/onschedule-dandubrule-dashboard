import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { useCreateFeatureMutation } from '@/features/landing-page/landingPageApi';
import { toast } from 'sonner';
import type { TFeature } from '@/features/landing-page/types';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

interface FeaturesTabProps {
  features: TFeature[];
}

export function FeaturesTab({ features }: FeaturesTabProps) {
  const [createFeature, { isLoading }] = useCreateFeatureMutation();
  const [isOpen, setIsOpen] = useState(false);
  
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
      setIsOpen(false);
      setNewFeature({ title: '', description: '', order: features.length + 2 });
    } catch (error) {
      toast.error('Failed to create feature');
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Manage Features</h3>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
              <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button onClick={handleCreate} disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Feature'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature) => (
          <Card key={feature.id} className="relative group">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{feature.title}</CardTitle>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                 {/* Placeholder for Edit/Delete */}
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
