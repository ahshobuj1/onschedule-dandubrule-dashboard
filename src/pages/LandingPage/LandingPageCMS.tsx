import { useGetLandingPageQuery } from '@/features/landing-page/landingPageApi';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GeneralContentForm } from '@/pages/LandingPage/components/GeneralContentForm';
import { FeaturesTab } from '@/pages/LandingPage/components/FeaturesTab';
import { TestimonialsTab } from '@/pages/LandingPage/components/TestimonialsTab';
import { HowItWorksTab } from '@/pages/LandingPage/components/HowItWorksTab';
import { FaqsTab } from '@/pages/LandingPage/components/FaqsTab';
import { Skeleton } from '@/components/ui/skeleton';

export default function LandingPageCMS() {
  const { data, isLoading } = useGetLandingPageQuery();

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-10 w-1/4" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  const landingData = data?.data;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Landing Page CMS</h1>
          <p className="text-muted-foreground">Manage your landing page content and sections.</p>
        </div>
      </div>

      <Tabs defaultValue="content" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full md:w-auto h-auto gap-2">
          <TabsTrigger value="content">General Content</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="how-it-works">How It Works</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Content</CardTitle>
              <CardDescription>Update hero section, stats, and overall page titles.</CardDescription>
            </CardHeader>
            <CardContent>
              {landingData?.content && <GeneralContentForm initialData={landingData.content} />}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features">
          <FeaturesTab features={landingData?.features || []} />
        </TabsContent>

        <TabsContent value="testimonials">
          <TestimonialsTab testimonials={landingData?.testimonials || []} />
        </TabsContent>

        <TabsContent value="how-it-works">
          <HowItWorksTab steps={landingData?.howItWorks || []} />
        </TabsContent>

        <TabsContent value="faqs">
          <FaqsTab faqs={landingData?.faqs || []} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
