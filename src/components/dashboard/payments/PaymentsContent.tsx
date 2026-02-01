'use client';

import { motion } from 'framer-motion';
import { CreditCard, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaymentsContentProps {
  userId: string;
}

export default function PaymentsContent({ userId }: PaymentsContentProps) {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Payments & Billing
          </h1>
          <p className="text-gray-600 mt-2">Manage your payments and financial transactions</p>
        </div>
        <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
          <Plus className="w-4 h-4 mr-2" />
          Add Payment Method
        </Button>
      </motion.div>
      
      <div className="text-center py-16">
        <p className="text-gray-600">Payments content for user: {userId}</p>
      </div>
    </div>
  );
}