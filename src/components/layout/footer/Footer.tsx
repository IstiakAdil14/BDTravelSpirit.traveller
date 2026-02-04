'use client';

import { useState, useEffect } from 'react';
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaPinterest,
  FaYoutube
} from 'react-icons/fa';
import {
  Globe,
  Users,
  Award,
  Shield
} from 'lucide-react';
import FooterUI from './FooterUI';

const impactStats = [
  { number: '10+', label: 'Happy Travelers' },
  { number: '50+', label: 'Expert Guides' },
  { number: '40+', label: 'Destinations' },
  { number: '50%', label: 'Satisfaction Rate' },
];

const linkColumns = [
  {
    title: 'Company',
    icon: Globe,
    color: 'text-blue-400',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Mission & Vision', href: '/mission-vision' },
      { name: 'Careers', href: '/careers' },
    ],
  },
  {
    title: 'For Guides',
    icon: Users,
    color: 'text-emerald-400',
    links: [
      { name: 'Become a Guide', href: '/become-guide' },
      { name: 'Guide Resources', href: '/guide-resources' },
      { name: 'Success Stories', href: '/success-stories' },
      { name: 'Training', href: '/training' },
    ],
  },
  {
    title: 'For Travelers',
    icon: Award,
    color: 'text-purple-400',
    links: [
      { name: 'Find Tours', href: '/tours' },
      { name: 'Travel Tips', href: '/tips' },
      { name: 'Reviews', href: '/reviews' },
      { name: 'Support', href: '/support' },
    ],
  },
  {
    title: 'Support',
    icon: Shield,
    color: 'text-orange-400',
    links: [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Safety', href: '/safety' },
      { name: 'Terms', href: '/terms' },
    ],
  },
];

const socialIcons = [
  { Icon: FaFacebook, href: 'https://facebook.com/bdtravelspirit', label: 'Facebook' },
  { Icon: FaInstagram, href: 'https://instagram.com/bdtravelspirit', label: 'Instagram' },
  { Icon: FaTwitter, href: 'https://twitter.com/bdtravelspirit', label: 'Twitter' },
  { Icon: FaPinterest, href: 'https://pinterest.com/bdtravelspirit', label: 'Pinterest' },
  { Icon: FaYoutube, href: 'https://youtube.com/bdtravelspirit', label: 'YouTube' },
];

const Footer = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await fetch('/api/payment-methods');
        if (response.ok) {
          const data = await response.json();
          setPaymentMethods(data);
        }
      } catch (error) {
        console.error('Error fetching payment methods:', error);
        // Fallback to static images
        
      }
    };

    fetchPaymentMethods();
  }, []);
  return (
    <FooterUI
      impactStats={impactStats}
      linkColumns={linkColumns}
      socialIcons={socialIcons}
      paymentMethods={paymentMethods}
    />
  );
};

export default Footer;
