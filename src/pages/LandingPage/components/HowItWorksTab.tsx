import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { useCreateHowItWorksMutation } from '@/features/landing-page/landingPageApi';
import { toast } from 'sonner';
import type { THowItWorks } from '@/features/landing-page/types';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

interface HowItWorksTabProps {
  steps: THowItWorks[];
}

export function HowItWorksTab({ steps }: HowItWorksTabProps) {
  const [createStep, { isLoading }] = useCreateHowItWorksMutation();
  const [isOpen, setIsOpen] = useState(false);
  
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
      setIsOpen(false);
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Manage Process Steps</h3>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
                <Label htmlFor="icon">Icon URL</Label>
                <Input 
                  id="icon" 
                  value={newStep.icon} 
                  onChange={(e) => setNewStep({ ...newStep, icon: e.target.value })} 
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button onClick={handleCreate} disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Step'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((step) => (
          <Card key={step.id}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                   {step.stepNumber}
                 </div>
                 <CardTitle className="text-sm font-semibold">{step.title}</CardTitle>
              </div>
              {step.icon && (
                <div className="w-6 h-6 text-muted-foreground">
                  <img src={step.icon} alt="icon" className="w-full h-full object-contain" />
                </div>
              )}
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
