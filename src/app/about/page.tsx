import { Metadata } from 'next';
import HeroSection from '@/components/about/HeroSection';
import StorySection from '@/components/about/StorySection';
import TeamSection from '@/components/about/TeamSection';
import ValuesSection from '@/components/about/ValuesSection';
import StatsSection from '@/components/about/StatsSection';
import TestimonialsSection from '@/components/about/TestimonialsSection';

export const metadata: Metadata = {
  title: 'About Us - BD Travel Spirit | Discover Bangladesh\'s Beauty',
  description: 'Learn about BD Travel Spirit\'s mission to showcase Bangladesh\'s hidden gems, our passionate team, and our commitment to sustainable tourism.',
  keywords: 'about BD Travel Spirit, Bangladesh tourism, travel company, sustainable tourism, local guides',
  openGraph: {
    title: 'About BD Travel Spirit - Your Gateway to Bangladesh',
    description: 'Discover our story, meet our team, and learn how we\'re transforming travel experiences in Bangladesh.',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <StorySection />
      <ValuesSection />
      <StatsSection />
      <TeamSection />
      <TestimonialsSection />
    </main>
  );
}