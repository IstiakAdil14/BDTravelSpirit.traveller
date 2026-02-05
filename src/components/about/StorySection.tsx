'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Trophy } from 'lucide-react';

export default function StorySection() {
  const timeline = [
    {
      year: '2019',
      title: 'The Beginning',
      description: 'Founded with a vision to showcase Bangladesh\'s untold stories and hidden gems to the world.',
      icon: MapPin,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      year: '2020',
      title: 'First Milestone',
      description: 'Launched our first curated tours, focusing on sustainable and authentic travel experiences.',
      icon: Users,
      color: 'from-teal-500 to-blue-500'
    },
    {
      year: '2022',
      title: 'Community Impact',
      description: 'Partnered with local communities, creating employment opportunities and preserving cultural heritage.',
      icon: Trophy,
      color: 'from-blue-500 to-indigo-500'
    },
    {
      year: '2024',
      title: 'Digital Innovation',
      description: 'Launched our comprehensive digital platform, making Bangladesh tourism more accessible than ever.',
      icon: Calendar,
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Our Journey
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            From a passionate idea to Bangladesh's leading travel platform, 
            discover how we've grown while staying true to our core values.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-emerald-200 via-teal-200 to-indigo-200 rounded-full hidden md:block"></div>

          <div className="space-y-16">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:gap-16 gap-8`}
              >
                {/* Content */}
                <div className="flex-1 max-w-lg">
                  <div className={`professional-card p-8 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-center`}>
                    <div className="text-sm font-semibold text-emerald-600 mb-2">{item.year}</div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>

                {/* Timeline Node */}
                <div className="relative z-10">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center shadow-xl`}>
                    <item.icon className="w-10 h-10 text-white" />
                  </div>
                </div>

                {/* Spacer for alignment */}
                <div className="flex-1 max-w-lg hidden md:block"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Vision Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <div className="professional-card p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-slate-800 mb-6">Looking Forward</h3>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              As we continue to grow, our commitment remains unchanged: to be the bridge between 
              curious travelers and the incredible experiences that Bangladesh has to offer, 
              while ensuring every journey contributes positively to local communities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['Sustainable Tourism', 'Cultural Preservation', 'Community Empowerment', 'Digital Innovation'].map((value) => (
                <span key={value} className="px-6 py-3 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 rounded-full font-semibold">
                  {value}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}