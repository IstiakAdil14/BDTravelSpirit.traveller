import { Metadata } from 'next';
import PolicyHero from '@/components/privacy/PolicyHero';
import TableOfContents from '@/components/privacy/TableOfContents';
import PolicySections from '@/components/privacy/PolicySections';
import ContactSection from '@/components/privacy/ContactSection';

export const metadata: Metadata = {
  title: 'Privacy Policy - BD Travel Spirit | Your Data Protection',
  description: 'Read BD Travel Spirit\'s comprehensive privacy policy. Learn how we collect, use, and protect your personal information.',
  keywords: 'privacy policy, data protection, BD Travel Spirit, user privacy, GDPR compliance',
  openGraph: {
    title: 'Privacy Policy - BD Travel Spirit',
    description: 'Your privacy matters to us. Learn about our data protection practices.',
    type: 'website',
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <PolicyHero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <TableOfContents />
          </div>
          <div className="lg:col-span-3">
            <PolicySections />
          </div>
        </div>
      </div>
      <ContactSection />
    </main>
  );
}