'use client';

import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Users, Globe, Clock, Baby, FileText, Mail } from 'lucide-react';

export default function PolicySections() {
  const sections = [
    {
      id: 'information-collection',
      icon: Eye,
      title: 'Information We Collect',
      content: [
        {
          subtitle: 'Personal Information',
          text: 'We collect information you provide directly to us, such as when you create an account, book a tour, or contact us. This includes your name, email address, phone number, passport details, and payment information.'
        },
        {
          subtitle: 'Automatically Collected Information',
          text: 'We automatically collect certain information about your device and usage of our services, including IP address, browser type, operating system, and pages visited.'
        },
        {
          subtitle: 'Location Information',
          text: 'With your consent, we may collect precise location information to provide location-based services and improve your travel experience.'
        }
      ]
    },
    {
      id: 'how-we-use',
      icon: Shield,
      title: 'How We Use Your Information',
      content: [
        {
          subtitle: 'Service Provision',
          text: 'We use your information to provide, maintain, and improve our travel services, process bookings, and communicate with you about your trips.'
        },
        {
          subtitle: 'Personalization',
          text: 'We personalize your experience by recommending destinations and tours based on your preferences and travel history.'
        },
        {
          subtitle: 'Communication',
          text: 'We send you service-related communications, promotional materials (with your consent), and important updates about our services.'
        }
      ]
    },
    {
      id: 'information-sharing',
      icon: Users,
      title: 'Information Sharing and Disclosure',
      content: [
        {
          subtitle: 'Service Providers',
          text: 'We share information with trusted third-party service providers who assist us in operating our business, such as payment processors and tour operators.'
        },
        {
          subtitle: 'Legal Requirements',
          text: 'We may disclose information when required by law, to protect our rights, or to ensure the safety of our users and the public.'
        },
        {
          subtitle: 'Business Transfers',
          text: 'In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the business transaction.'
        }
      ]
    },
    {
      id: 'data-security',
      icon: Lock,
      title: 'Data Security',
      content: [
        {
          subtitle: 'Security Measures',
          text: 'We implement industry-standard security measures to protect your personal information, including encryption, secure servers, and regular security audits.'
        },
        {
          subtitle: 'Access Controls',
          text: 'Access to your personal information is restricted to authorized personnel who need it to perform their job functions.'
        },
        {
          subtitle: 'Incident Response',
          text: 'In the unlikely event of a data breach, we have procedures in place to respond quickly and notify affected users as required by law.'
        }
      ]
    },
    {
      id: 'cookies',
      icon: Globe,
      title: 'Cookies and Tracking Technologies',
      content: [
        {
          subtitle: 'Essential Cookies',
          text: 'We use essential cookies that are necessary for our website to function properly, such as maintaining your login session.'
        },
        {
          subtitle: 'Analytics Cookies',
          text: 'We use analytics cookies to understand how visitors interact with our website and improve our services.'
        },
        {
          subtitle: 'Marketing Cookies',
          text: 'With your consent, we use marketing cookies to show you relevant advertisements and measure their effectiveness.'
        }
      ]
    },
    {
      id: 'your-rights',
      icon: Shield,
      title: 'Your Privacy Rights',
      content: [
        {
          subtitle: 'Access and Portability',
          text: 'You have the right to access your personal information and request a copy of the data we hold about you in a portable format.'
        },
        {
          subtitle: 'Correction and Deletion',
          text: 'You can request corrections to inaccurate information or ask us to delete your personal information, subject to certain legal limitations.'
        },
        {
          subtitle: 'Opt-Out Rights',
          text: 'You can opt out of marketing communications at any time and withdraw consent for certain data processing activities.'
        }
      ]
    },
    {
      id: 'data-retention',
      icon: Clock,
      title: 'Data Retention',
      content: [
        {
          subtitle: 'Retention Periods',
          text: 'We retain your personal information for as long as necessary to provide our services and comply with legal obligations.'
        },
        {
          subtitle: 'Account Deletion',
          text: 'When you delete your account, we will delete or anonymize your personal information within 30 days, except where retention is required by law.'
        }
      ]
    },
    {
      id: 'international-transfers',
      icon: Globe,
      title: 'International Data Transfers',
      content: [
        {
          subtitle: 'Cross-Border Transfers',
          text: 'Your information may be transferred to and processed in countries other than your country of residence, including Bangladesh and other countries where our service providers operate.'
        },
        {
          subtitle: 'Safeguards',
          text: 'We ensure appropriate safeguards are in place for international transfers, including standard contractual clauses and adequacy decisions.'
        }
      ]
    },
    {
      id: 'children-privacy',
      icon: Baby,
      title: 'Children\'s Privacy',
      content: [
        {
          subtitle: 'Age Restrictions',
          text: 'Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.'
        },
        {
          subtitle: 'Parental Consent',
          text: 'If we learn that we have collected information from a child under 13, we will delete that information promptly.'
        }
      ]
    },
    {
      id: 'policy-changes',
      icon: FileText,
      title: 'Changes to This Policy',
      content: [
        {
          subtitle: 'Updates',
          text: 'We may update this privacy policy from time to time. We will notify you of any material changes by posting the new policy on our website and sending you an email notification.'
        },
        {
          subtitle: 'Effective Date',
          text: 'Any changes to this policy will be effective immediately upon posting, unless otherwise specified.'
        }
      ]
    }
  ];

  return (
    <div className="space-y-12">
      {sections.map((section, index) => (
        <motion.section
          key={section.id}
          id={section.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="professional-card p-8"
        >
          {/* Section Header */}
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
              <section.icon className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
              {section.title}
            </h2>
          </div>

          {/* Section Content */}
          <div className="space-y-6">
            {section.content.map((item, itemIndex) => (
              <motion.div
                key={itemIndex}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: itemIndex * 0.1 }}
                viewport={{ once: true }}
                className="border-l-4 border-emerald-200 pl-6"
              >
                <h3 className="text-lg font-semibold text-slate-800 mb-3">
                  {item.subtitle}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      ))}

      {/* Contact Section */}
      <motion.section
        id="contact-us"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="professional-card p-8 bg-gradient-to-r from-emerald-50 to-teal-50"
      >
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
            Contact Us About Privacy
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Privacy Questions?
            </h3>
            <p className="text-slate-600 mb-6">
              If you have any questions about this privacy policy or our data practices, 
              please don't hesitate to contact us.
            </p>
            <div className="space-y-3 text-slate-600">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-emerald-600" />
                <span>privacy@bdtravelspirit.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-emerald-600" />
                <span>www.bdtravelspirit.com/privacy</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Data Protection Officer
            </h3>
            <p className="text-slate-600 mb-4">
              For specific privacy concerns or to exercise your rights, 
              contact our Data Protection Officer:
            </p>
            <div className="bg-white p-4 rounded-lg">
              <div className="font-semibold text-slate-800">Fatima Khan</div>
              <div className="text-slate-600">Data Protection Officer</div>
              <div className="text-slate-600">dpo@bdtravelspirit.com</div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-emerald-200">
          <p className="text-sm text-slate-500 text-center">
            This privacy policy was last updated on January 15, 2024. 
            We review and update our privacy practices regularly to ensure your data remains protected.
          </p>
        </div>
      </motion.section>
    </div>
  );
}