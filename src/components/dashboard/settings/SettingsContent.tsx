'use client';

import { motion } from 'framer-motion';
import { Settings, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SettingsContentProps {
  userId: string;
}

export default function SettingsContent({ userId }: SettingsContentProps) {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-600 to-gray-600 bg-clip-text text-transparent">
            Account Settings
          </h1>
          <p className="text-gray-600 mt-2">Manage your account preferences and security</p>
        </div>
        <Button className="bg-gradient-to-r from-slate-500 to-gray-500 hover:from-slate-600 hover:to-gray-600">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </motion.div>
      
      <div className="text-center py-16">
        <p className="text-gray-600">Settings content for user: {userId}</p>
      </div>
    </div>
  );
}