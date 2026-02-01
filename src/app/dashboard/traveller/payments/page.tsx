'use client';

import { motion } from 'framer-motion';
import { CreditCard, Download, Eye, Plus, Wallet, TrendingUp, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/layout/DashboardLayout';

const transactions = [
  {
    id: 'TXN001',
    type: 'payment',
    description: 'Cox\'s Bazar Beach Resort Package',
    amount: '৳45,000',
    date: '2024-11-15',
    status: 'completed',
    method: 'bKash',
    bookingId: 'BK001'
  },
  {
    id: 'TXN002',
    type: 'payment',
    description: 'Sundarbans Wildlife Safari (Partial)',
    amount: '৳14,000',
    date: '2024-11-10',
    status: 'completed',
    method: 'Nagad',
    bookingId: 'BK002'
  },
  {
    id: 'TXN003',
    type: 'refund',
    description: 'Refund - Cancelled Dhaka City Tour',
    amount: '৳8,500',
    date: '2024-11-05',
    status: 'processing',
    method: 'Bank Transfer',
    bookingId: 'BK004'
  },
  {
    id: 'TXN004',
    type: 'payment',
    description: 'Sylhet Tea Garden Experience',
    amount: '৳22,500',
    date: '2024-10-20',
    status: 'completed',
    method: 'Credit Card',
    bookingId: 'BK003'
  }
];

const paymentMethods = [
  { name: 'bKash', type: 'Mobile Banking', number: '**** **** 5678', default: true },
  { name: 'Nagad', type: 'Mobile Banking', number: '**** **** 9012', default: false },
  { name: 'VISA', type: 'Credit Card', number: '**** **** **** 3456', default: false }
];

const statusConfig = {
  completed: { color: 'bg-green-100 text-green-700', icon: CheckCircle, label: 'Completed' },
  processing: { color: 'bg-yellow-100 text-yellow-700', icon: Clock, label: 'Processing' },
  failed: { color: 'bg-red-100 text-red-700', icon: AlertCircle, label: 'Failed' },
  pending: { color: 'bg-blue-100 text-blue-700', icon: Clock, label: 'Pending' }
};

export default function PaymentsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
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

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {[
            { label: 'Total Spent', value: '৳1,25,000', icon: Wallet, color: 'from-green-500 to-emerald-500' },
            { label: 'This Month', value: '৳45,000', icon: TrendingUp, color: 'from-blue-500 to-indigo-500' },
            { label: 'Pending Payments', value: '৳14,000', icon: Clock, color: 'from-orange-500 to-amber-500' },
            { label: 'Saved Amount', value: '৳8,500', icon: CheckCircle, color: 'from-purple-500 to-violet-500' }
          ].map((stat, index) => (
            <Card key={stat.label} className="professional-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Transaction History */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="professional-card border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-green-600" />
                    Transaction History
                  </CardTitle>
                  <Button variant="outline" size="sm" className="border-green-200 text-green-700 hover:bg-green-50">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {transactions.map((transaction, index) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${
                        transaction.type === 'payment' ? 'from-green-500 to-emerald-500' : 'from-blue-500 to-indigo-500'
                      } flex items-center justify-center`}>
                        {transaction.type === 'payment' ? (
                          <CreditCard className="w-5 h-5 text-white" />
                        ) : (
                          <TrendingUp className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{transaction.description}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-sm text-gray-600">{transaction.method}</p>
                          <span className="text-gray-300">•</span>
                          <p className="text-sm text-gray-600">{new Date(transaction.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${
                        transaction.type === 'payment' ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {transaction.type === 'payment' ? '-' : '+'}{transaction.amount}
                      </p>
                      <Badge className={`${statusConfig[transaction.status as keyof typeof statusConfig].color} border-0 mt-1`}>
                        {statusConfig[transaction.status as keyof typeof statusConfig].label}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Payment Methods & Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Payment Methods */}
            <Card className="professional-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-green-600" />
                  Payment Methods
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentMethods.map((method, index) => (
                  <motion.div
                    key={method.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                      method.default 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200 bg-white hover:border-green-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{method.name}</h4>
                          <p className="text-sm text-gray-600">{method.number}</p>
                        </div>
                      </div>
                      {method.default && (
                        <Badge className="bg-green-100 text-green-700 border-0">
                          Default
                        </Badge>
                      )}
                    </div>
                  </motion.div>
                ))}
                <Button variant="outline" className="w-full border-green-200 text-green-700 hover:bg-green-50">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Method
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="professional-card border-0">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: 'Download Invoice', icon: Download, color: 'from-blue-500 to-indigo-500' },
                  { label: 'Payment History', icon: Eye, color: 'from-purple-500 to-violet-500' },
                  { label: 'Pending Payments', icon: Clock, color: 'from-orange-500 to-amber-500' },
                  { label: 'Refund Status', icon: TrendingUp, color: 'from-green-500 to-emerald-500' }
                ].map((action, index) => (
                  <motion.button
                    key={action.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                  >
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center`}>
                      <action.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-gray-900">{action.label}</span>
                  </motion.button>
                ))}
              </CardContent>
            </Card>

            {/* Monthly Summary */}
            <Card className="bg-gradient-to-r from-green-500 to-emerald-500 border-0 text-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-6 h-6" />
                  <h3 className="font-bold text-lg">November Summary</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-green-100">Total Spent</span>
                    <span className="font-bold">৳45,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-100">Transactions</span>
                    <span className="font-bold">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-100">Avg per booking</span>
                    <span className="font-bold">৳15,000</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}