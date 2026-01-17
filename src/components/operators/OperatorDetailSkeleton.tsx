'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

export default function OperatorDetailSkeleton() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 mt-40">
            {/* Hero Header Skeleton */}
            <section className="relative bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-12">
                    <div className="flex flex-col lg:flex-row items-start gap-8">
                        {/* Logo Skeleton */}
                        <div className="flex-shrink-0">
                            <div className="w-24 h-24 rounded-2xl bg-gray-200 animate-pulse border-2 border-emerald-100 shadow-md" />
                        </div>

                        {/* Main Info Skeleton */}
                        <div className="flex-1 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-64 bg-gray-200 rounded animate-pulse" />
                                <div className="h-6 w-24 bg-gray-100 rounded-full animate-pulse" />
                            </div>
                            <div className="h-6 w-96 bg-gray-100 rounded animate-pulse" />
                            <div className="flex items-center gap-6">
                                <div className="h-5 w-32 bg-gray-100 rounded animate-pulse" />
                                <div className="h-5 w-48 bg-gray-100 rounded animate-pulse" />
                            </div>
                            <div className="flex gap-4 pt-2">
                                <div className="h-12 w-36 bg-gray-200 rounded animate-pulse" />
                                <div className="h-12 w-40 bg-gray-100 rounded animate-pulse border border-gray-200" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12 space-y-16">
                {/* Stats Skeleton */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <Card key={i} className="border-none shadow-sm bg-white/50">
                            <CardContent className="p-6 text-center space-y-2">
                                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mx-auto" />
                                <div className="h-4 w-24 bg-gray-100 rounded animate-pulse mx-auto" />
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Section Title Skeleton */}
                <div className="space-y-8">
                    <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <Card key={i} className="overflow-hidden border-gray-100">
                                <div className="aspect-video bg-gray-200 animate-pulse" />
                                <CardContent className="p-6 space-y-4">
                                    <div className="h-6 w-full bg-gray-200 rounded animate-pulse" />
                                    <div className="flex justify-between">
                                        <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
                                        <div className="h-4 w-12 bg-gray-100 rounded animate-pulse" />
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
                                        <div className="h-8 w-24 bg-emerald-100 rounded animate-pulse" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* About Section Skeleton */}
                <div className="space-y-4">
                    <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
                    <div className="space-y-2">
                        <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
                        <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
                        <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse" />
                    </div>
                </div>

                {/* Gallery Preview Skeleton */}
                <div className="space-y-8">
                    <div className="h-8 w-40 bg-gray-200 rounded animate-pulse" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="aspect-video bg-gray-200 rounded-xl animate-pulse shadow-sm" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
