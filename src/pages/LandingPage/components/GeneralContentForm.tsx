import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useUpdateLandingPageContentMutation } from '@/features/landing-page/landingPageApi';
import type { TLandingPageContent } from '@/features/landing-page/types';

const contentSchema = z.object({
  heroTitle: z.string().min(1, 'Required'),
  heroSubtitle: z.string().min(1, 'Required'),
  heroCtaText: z.string().min(1, 'Required'),
  heroCtaLink: z.string().min(1, 'Required'),
  // heroBackgroundImage: z.string().url('Must be a valid URL'),
  statsTitle: z.string().min(1, 'Required'),
  stat1Value: z.string().min(1, 'Required'),
  stat1Label: z.string().min(1, 'Required'),
  stat2Value: z.string().min(1, 'Required'),
  stat2Label: z.string().min(1, 'Required'),
  stat3Value: z.string().min(1, 'Required'),
  stat3Label: z.string().min(1, 'Required'),
  featureSectionTitle: z.string().min(1, 'Required'),
  featureSectionSubtitle: z.string().min(1, 'Required'),
  howItWorksTitle: z.string().min(1, 'Required'),
  howItWorksSubtitle: z.string().min(1, 'Required'),
  testimonialTitle: z.string().min(1, 'Required'),
  testimonialSubtitle: z.string().min(1, 'Required'),
  faqTitle: z.string().min(1, 'Required'),
  faqSubtitle: z.string().min(1, 'Required'),
  ctaTitle: z.string().min(1, 'Required'),
  ctaSubtitle: z.string().min(1, 'Required'),
  ctaButtonText: z.string().min(1, 'Required'),
  ctaButtonLink: z.string().min(1, 'Required'),
  // ctaBackgroundImage: z.string().url('Must be a valid URL'),
  footerText: z.string().min(1, 'Required'),
  facebookLink: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  twitterLink: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

interface GeneralContentFormProps {
  initialData: TLandingPageContent;
}

export function GeneralContentForm({ initialData }: GeneralContentFormProps) {
  const [updateContent, { isLoading }] = useUpdateLandingPageContentMutation();

  const form = useForm<z.infer<typeof contentSchema>>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      heroTitle: initialData.heroTitle || '',
      heroSubtitle: initialData.heroSubtitle || '',
      heroCtaText: initialData.heroCtaText || '',
      heroCtaLink: initialData.heroCtaLink || '',
      // heroBackgroundImage: initialData.heroBackgroundImage || '',
      statsTitle: initialData.statsTitle || '',
      stat1Value: initialData.stat1Value || '',
      stat1Label: initialData.stat1Label || '',
      stat2Value: initialData.stat2Value || '',
      stat2Label: initialData.stat2Label || '',
      stat3Value: initialData.stat3Value || '',
      stat3Label: initialData.stat3Label || '',
      featureSectionTitle: initialData.featureSectionTitle || '',
      featureSectionSubtitle: initialData.featureSectionSubtitle || '',
      howItWorksTitle: initialData.howItWorksTitle || '',
      howItWorksSubtitle: initialData.howItWorksSubtitle || '',
      testimonialTitle: initialData.testimonialTitle || '',
      testimonialSubtitle: initialData.testimonialSubtitle || '',
      faqTitle: initialData.faqTitle || '',
      faqSubtitle: initialData.faqSubtitle || '',
      ctaTitle: initialData.ctaTitle || '',
      ctaSubtitle: initialData.ctaSubtitle || '',
      ctaButtonText: initialData.ctaButtonText || '',
      ctaButtonLink: initialData.ctaButtonLink || '',
      // ctaBackgroundImage: initialData.ctaBackgroundImage || '',
      footerText: initialData.footerText || '',
      facebookLink: initialData.facebookLink || '',
      twitterLink: initialData.twitterLink || '',
    },
  });

  async function onSubmit(values: z.infer<typeof contentSchema>) {
    try {
      await updateContent(values).unwrap();
      toast.success('Landing page content updated successfully');
    } catch (error) {
      toast.error('Failed to update content');
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Hero Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Hero Section</h3>
            <FormField
              control={form.control}
              name="heroTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hero Title</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="heroSubtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hero Subtitle</FormLabel>
                  <FormControl><Textarea {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="heroCtaText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CTA Text</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="heroCtaLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CTA Link</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* <FormField
              control={form.control}
              name="heroBackgroundImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hero Background Image URL</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>

          {/* Stats Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Stats Section</h3>
            <FormField
              control={form.control}
              name="statsTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stats Section Title</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <FormField control={form.control} name="stat1Value" render={({ field }) => (<FormItem><FormLabel>Stat 1 Value</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="stat1Label" render={({ field }) => (<FormItem><FormLabel>Stat 1 Label</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="stat2Value" render={({ field }) => (<FormItem><FormLabel>Stat 2 Value</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="stat2Label" render={({ field }) => (<FormItem><FormLabel>Stat 2 Label</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="stat3Value" render={({ field }) => (<FormItem><FormLabel>Stat 3 Value</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="stat3Label" render={({ field }) => (<FormItem><FormLabel>Stat 3 Label</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            </div>
          </div>

          {/* Section Titles */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Section Headings</h3>
            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="featureSectionTitle" render={({ field }) => (<FormItem><FormLabel>Features Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="featureSectionSubtitle" render={({ field }) => (<FormItem><FormLabel>Features Subtitle</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="howItWorksTitle" render={({ field }) => (<FormItem><FormLabel>How It Works Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="howItWorksSubtitle" render={({ field }) => (<FormItem><FormLabel>How It Works Subtitle</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="testimonialTitle" render={({ field }) => (<FormItem><FormLabel>Testimonials Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="testimonialSubtitle" render={({ field }) => (<FormItem><FormLabel>Testimonials Subtitle</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="faqTitle" render={({ field }) => (<FormItem><FormLabel>FAQ Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="faqSubtitle" render={({ field }) => (<FormItem><FormLabel>FAQ Subtitle</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            </div>
          </div>

          {/* CTA & Footer */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Call to Action & Footer</h3>
            <FormField control={form.control} name="ctaTitle" render={({ field }) => (<FormItem><FormLabel>CTA Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="ctaSubtitle" render={({ field }) => (<FormItem><FormLabel>CTA Subtitle</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="ctaButtonText" render={({ field }) => (<FormItem><FormLabel>CTA Button Text</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="ctaButtonLink" render={({ field }) => (<FormItem><FormLabel>CTA Button Link</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            </div>
            {/* <FormField control={form.control} name="ctaBackgroundImage" render={({ field }) => (<FormItem><FormLabel>CTA Background URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} /> */}
            <FormField control={form.control} name="footerText" render={({ field }) => (<FormItem><FormLabel>Footer Text</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="facebookLink" render={({ field }) => (<FormItem><FormLabel>Facebook Link</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="twitterLink" render={({ field }) => (<FormItem><FormLabel>Twitter Link</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <Button type="submit" size="lg" disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Save All Changes'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
