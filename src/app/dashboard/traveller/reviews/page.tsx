'use client';

import { motion } from 'framer-motion';
import { Star, Camera, ThumbsUp, MessageCircle, Edit, Trash2, Plus, Award, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/layout/DashboardLayout';

const reviews = [
  {
    id: '1',
    tourName: 'Cox\'s Bazar Beach Resort Package',
    location: 'Cox\'s Bazar, Chittagong',
    rating: 5,
    date: '2024-11-20',
    review: 'Amazing experience! The beach was pristine and the resort facilities were top-notch. Our guide Rashid was very knowledgeable and friendly. Highly recommend this package for families.',
    photos: 3,
    likes: 12,
    helpful: 8,
    operatorResponse: 'Thank you for the wonderful review! We\'re delighted you enjoyed your stay.',
    status: 'published'
  },
  {
    id: '2',
    tourName: 'Sundarbans Wildlife Safari',
    location: 'Sundarbans, Khulna',
    rating: 4,
    date: '2024-11-18',
    review: 'Great wildlife experience! Saw Royal Bengal Tigers and many bird species. The boat ride was comfortable. Only downside was the weather, but that\'s not controllable.',
    photos: 5,
    likes: 8,
    helpful: 6,
    status: 'published'
  },
  {
    id: '3',
    tourName: 'Sylhet Tea Garden Experience',
    location: 'Srimangal, Sylhet',
    rating: 4,
    date: '2024-11-15',
    review: 'Beautiful tea gardens and peaceful environment. The tea tasting session was educational. Would love to visit again during different seasons.',
    photos: 2,
    likes: 15,
    helpful: 11,
    status: 'published'
  }
];

const pendingReviews = [
  {
    id: '4',
    tourName: 'Bandarban Hill Adventure',
    location: 'Bandarban, Chittagong',
    completedDate: '2024-11-25',
    daysAgo: 2
  },
  {
    id: '5',
    tourName: 'Rangamati Lake Cruise',
    location: 'Rangamati, Chittagong',
    completedDate: '2024-11-22',
    daysAgo: 5
  }
];

const achievements = [
  { title: 'Top Reviewer', description: 'Written 10+ reviews', earned: true, icon: Award },
  { title: 'Photo Contributor', description: 'Shared 25+ photos', earned: true, icon: Camera },
  { title: 'Helpful Reviewer', description: '50+ helpful votes', earned: false, icon: ThumbsUp },
  { title: 'Verified Traveler', description: 'Reviewed 15+ tours', earned: false, icon: Star }
];

export default function ReviewsPage() {
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
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              My Reviews
            </h1>
            <p className="text-gray-600 mt-2">Share your travel experiences and help other travelers</p>
          </div>
          <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
            <Plus className="w-4 h-4 mr-2" />
            Write Review
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
            { label: 'Total Reviews', value: '12', icon: Star, color: 'from-amber-500 to-orange-500' },
            { label: 'Average Rating', value: '4.6', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
            { label: 'Helpful Votes', value: '47', icon: ThumbsUp, color: 'from-blue-500 to-indigo-500' },
            { label: 'Photos Shared', value: '28', icon: Camera, color: 'from-purple-500 to-violet-500' }
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
          {/* Reviews List */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <h2 className="text-xl font-bold text-gray-900">Published Reviews</h2>
            
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="professional-card border-0">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">{review.tourName}</h3>
                          <p className="text-gray-600">{review.location}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? 'text-amber-500 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="border-gray-200 text-gray-600 hover:bg-gray-50">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Review Content */}
                      <p className="text-gray-700 leading-relaxed">{review.review}</p>

                      {/* Photos */}
                      {review.photos > 0 && (
                        <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
                          <Camera className="w-5 h-5 text-purple-600" />
                          <span className="text-sm text-purple-700">{review.photos} photos attached</span>
                        </div>
                      )}

                      {/* Engagement Stats */}
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{review.likes} likes</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{review.helpful} found helpful</span>
                        </div>
                        <Badge className="bg-green-100 text-green-700 border-0">
                          {review.status}
                        </Badge>
                      </div>

                      {/* Operator Response */}
                      {review.operatorResponse && (
                        <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">OP</span>
                            </div>
                            <span className="text-sm font-medium text-amber-700">Tour Operator Response</span>
                          </div>
                          <p className="text-sm text-amber-700">{review.operatorResponse}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Pending Reviews */}
            <Card className="professional-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-600" />
                  Pending Reviews
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {pendingReviews.map((pending, index) => (
                  <motion.div
                    key={pending.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="p-4 bg-amber-50 rounded-lg border border-amber-200"
                  >
                    <h4 className="font-semibold text-gray-900 mb-1">{pending.tourName}</h4>
                    <p className="text-sm text-gray-600 mb-3">{pending.location}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-amber-700">
                        Completed {pending.daysAgo} days ago
                      </span>
                      <Button size="sm" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                        Write Review
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="professional-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-600" />
                  Review Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                      achievement.earned 
                        ? 'bg-amber-50 border border-amber-200' 
                        : 'bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      achievement.earned 
                        ? 'bg-amber-500 text-white' 
                        : 'bg-gray-300 text-gray-500'
                    }`}>
                      <achievement.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className={`text-sm font-medium ${
                        achievement.earned ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {achievement.title}
                      </h4>
                      <p className="text-xs text-gray-500">{achievement.description}</p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Review Tips */}
            <Card className="bg-gradient-to-r from-amber-500 to-orange-500 border-0 text-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Star className="w-6 h-6" />
                  <h3 className="font-bold text-lg">Review Tips</h3>
                </div>
                <ul className="space-y-2 text-sm text-amber-100">
                  <li>• Be specific about your experience</li>
                  <li>• Include photos to help others</li>
                  <li>• Mention guide and service quality</li>
                  <li>• Share tips for future travelers</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}