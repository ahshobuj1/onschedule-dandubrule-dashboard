import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { useCreateFAQMutation } from '@/features/landing-page/landingPageApi';
import { toast } from 'sonner';
import type { TFAQ } from '@/features/landing-page/types';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

interface FaqsTabProps {
  faqs: TFAQ[];
}

export function FaqsTab({ faqs }: FaqsTabProps) {
  const [createFAQ, { isLoading }] = useCreateFAQMutation();
  const [isOpen, setIsOpen] = useState(false);
  
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
      setIsOpen(false);
      setNewFAQ({ question: '', answer: '', order: faqs.length + 2 });
    } catch (error) {
      toast.error('Failed to create FAQ');
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Manage FAQ</h3>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
              <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button onClick={handleCreate} disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create FAQ'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {faqs.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No FAQs added yet.
            </CardContent>
          </Card>
        ) : (
          faqs.map((faq) => (
            <Card key={faq.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">{faq.question}</CardTitle>
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
