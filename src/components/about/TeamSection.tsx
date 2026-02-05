'use client';

import { motion } from 'framer-motion';
import { Linkedin, Twitter, Mail, MapPin } from 'lucide-react';
import { showProductionNotification } from '@/components/shared/ProductionNotification';

export default function TeamSection() {
  const team = [
    {
      name: 'Rashid Ahmed',
      role: 'Founder & CEO',
      bio: 'Passionate about showcasing Bangladesh\'s beauty to the world. 10+ years in tourism industry.',
      image: '/images/team/rashid.jpg',
      location: 'Dhaka, Bangladesh',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'rashid@bdtravelspirit.com'
      }
    },
    {
      name: 'Fatima Khan',
      role: 'Head of Operations',
      bio: 'Expert in sustainable tourism practices with deep knowledge of local communities.',
      image: '/images/team/fatima.jpg',
      location: 'Chittagong, Bangladesh',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'fatima@bdtravelspirit.com'
      }
    },
    {
      name: 'Karim Hassan',
      role: 'Lead Tour Guide',
      bio: 'Born and raised in Sylhet, specializes in eco-tourism and cultural heritage tours.',
      image: '/images/team/karim.jpg',
      location: 'Sylhet, Bangladesh',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'karim@bdtravelspirit.com'
      }
    },
    {
      name: 'Nadia Rahman',
      role: 'Customer Experience Manager',
      bio: 'Ensures every traveler has an unforgettable experience with personalized service.',
      image: '/images/team/nadia.jpg',
      location: 'Sylhet, Bangladesh',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'nadia@bdtravelspirit.com'
      }
    },
    {
      name: 'Mahmud Ali',
      role: 'Cultural Heritage Specialist',
      bio: 'Historian and cultural expert dedicated to preserving Bangladesh\'s rich traditions.',
      image: '/images/team/mahmud.jpg',
      location: 'Rajshahi, Bangladesh',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'mahmud@bdtravelspirit.com'
      }
    },
    {
      name: 'Sabrina Begum',
      role: 'Sustainability Coordinator',
      bio: 'Environmental scientist focused on promoting eco-friendly travel practices.',
      image: '/images/team/sabrina.jpg',
      location: 'Khulna, Bangladesh',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'sabrina@bdtravelspirit.com'
      }
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Meet Our Team
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Our passionate team of local experts, guides, and travel enthusiasts 
            are dedicated to creating extraordinary experiences for every traveler.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="professional-card p-6 text-center hover:scale-105 transition-all duration-300 relative overflow-hidden">
                {/* Profile Image */}
                <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 p-1 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <div className="w-full h-full rounded-full bg-slate-200 flex items-center justify-center text-4xl font-bold text-slate-600">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  {/* Online indicator */}
                  <div className="absolute bottom-2 right-1/2 transform translate-x-16 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>

                {/* Member Info */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    {member.name}
                  </h3>
                  <div className="text-emerald-600 font-semibold mb-3">
                    {member.role}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    {member.bio}
                  </p>
                  <div className="flex items-center justify-center text-slate-500 text-sm mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    {member.location}
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={showProductionNotification}
                    className="w-10 h-10 bg-blue-100 hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors duration-200"
                  >
                    <Linkedin className="w-5 h-5 text-blue-600" />
                  </button>
                  <button
                    onClick={showProductionNotification}
                    className="w-10 h-10 bg-sky-100 hover:bg-sky-200 rounded-full flex items-center justify-center transition-colors duration-200"
                  >
                    <Twitter className="w-5 h-5 text-sky-600" />
                  </button>
                  <button
                    onClick={showProductionNotification}
                    className="w-10 h-10 bg-emerald-100 hover:bg-emerald-200 rounded-full flex items-center justify-center transition-colors duration-200"
                  >
                    <Mail className="w-5 h-5 text-emerald-600" />
                  </button>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Join Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="professional-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Join Our Growing Team
            </h3>
            <p className="text-slate-600 mb-6">
              Are you passionate about Bangladesh's tourism industry? 
              We're always looking for talented individuals to join our mission.
            </p>
            <button 
              onClick={showProductionNotification}
              className="gradient-button px-8 py-4 text-lg">
              View Open Positions
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}