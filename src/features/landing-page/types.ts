export interface TLandingPageContent {
  id: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroCtaLink: string;
  heroBackgroundImage: string;
  statsTitle: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
  featureSectionTitle: string;
  featureSectionSubtitle: string;
  howItWorksTitle: string;
  howItWorksSubtitle: string;
  testimonialTitle: string;
  testimonialSubtitle: string;
  faqTitle: string;
  faqSubtitle: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButtonText: string;
  ctaButtonLink: string;
  ctaBackgroundImage: string;
  footerText: string;
  copyrightText?: string | null;
  facebookLink?: string | null;
  twitterLink?: string | null;
  linkedinLink?: string | null;
  instagramLink?: string | null;
  youtubeLink?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TFeature {
  id: string;
  icon?: string | null;
  title: string;
  description: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface THowItWorks {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
}

export interface TTestimonial {
  id: string;
  name: string;
  designation: string;
  content: string;
  avatarUrl: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface TFAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface TLandingPageData {
  content: TLandingPageContent;
  features: TFeature[];
  howItWorks: THowItWorks[];
  testimonials: TTestimonial[];
  faqs: TFAQ[];
}

export interface TLandingPageResponse {
  success: boolean;
  message: string;
  data: TLandingPageData;
}
