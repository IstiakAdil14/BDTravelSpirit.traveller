'use client';

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

/**
 * High-fidelity Tour Details Skeleton with Enhanced Visibility
 * Uses bg-gray-200/300 to ensure skeletons are clearly visible ("deep")
 */

const HeroSectionSkeleton = () => (
    <Card className="rounded-lg shadow-sm overflow-hidden border-none bg-white">
        {/* Image Carousel Area */}
        <Skeleton className="h-96 md:h-[500px] w-full rounded-none bg-gray-200" />

        {/* Hero Info Area */}
        <div className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1 min-w-0 space-y-4">
                    <div className="flex gap-2">
                        <Skeleton className="h-6 w-20 rounded-full bg-gray-200" />
                        <Skeleton className="h-6 w-24 rounded-full bg-gray-200" />
                    </div>
                    <Skeleton className="h-10 w-3/4 bg-gray-300" />
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-5 w-32 bg-gray-200" />
                        <Skeleton className="h-5 w-24 bg-gray-200" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Skeleton className="h-6 w-40 bg-gray-200" />
                        <Skeleton className="h-6 w-36 bg-gray-200" />
                        <Skeleton className="h-6 w-44 bg-gray-200" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full bg-gray-200" />
                        <Skeleton className="h-4 w-full bg-gray-200" />
                        <Skeleton className="h-4 w-2/3 bg-gray-200" />
                    </div>
                </div>
                <div className="text-right space-y-2">
                    <Skeleton className="h-10 w-32 ml-auto bg-gray-300" />
                    <Skeleton className="h-4 w-20 ml-auto bg-gray-200" />
                </div>
            </div>
        </div>
    </Card>
);

const QuickFactsSkeleton = () => (
    <Card>
        <CardHeader>
            <Skeleton className="h-6 w-32 bg-gray-300" />
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <Skeleton className="h-10 w-10 rounded-lg bg-gray-200" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-16 bg-gray-200" />
                            <Skeleton className="h-3 w-24 bg-gray-200" />
                        </div>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
);

const BookingWidgetSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-slate-900 px-6 py-8">
            <Skeleton className="h-12 w-48 bg-slate-700" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
            <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-3 gap-3">
                    <Skeleton className="h-24 w-full rounded-lg bg-gray-200" />
                    <Skeleton className="h-24 w-full rounded-lg bg-gray-200" />
                    <Skeleton className="h-24 w-full rounded-lg bg-gray-200" />
                </div>
                <div className="space-y-3">
                    <Skeleton className="h-5 w-40 bg-gray-300" />
                    <Skeleton className="h-12 w-full rounded-lg bg-gray-200" />
                </div>
                <div className="space-y-3">
                    <Skeleton className="h-5 w-40 bg-gray-300" />
                    <Skeleton className="h-10 w-32 rounded-lg bg-gray-200" />
                </div>
                <div className="bg-slate-50 p-6 rounded-lg space-y-4 border border-slate-100">
                    <div className="space-y-2">
                        <div className="flex justify-between"><Skeleton className="h-4 w-32 bg-gray-200" /><Skeleton className="h-4 w-20 bg-gray-200" /></div>
                        <div className="flex justify-between"><Skeleton className="h-4 w-24 bg-gray-200" /><Skeleton className="h-4 w-20 bg-gray-200" /></div>
                    </div>
                    <div className="pt-4 border-t border-gray-200 flex justify-between">
                        <Skeleton className="h-6 w-32 bg-gray-300" />
                        <Skeleton className="h-8 w-40 bg-gray-300" />
                    </div>
                </div>
                <div className="space-y-3 pt-4">
                    <Skeleton className="h-14 w-full rounded-xl bg-gray-300" />
                    <Skeleton className="h-12 w-full rounded-xl bg-gray-200" />
                </div>
            </div>
            <div className="lg:col-span-1 space-y-6">
                <Skeleton className="h-6 w-40 bg-gray-300" />
                <div className="space-y-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="flex gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                            <Skeleton className="h-5 w-5 rounded-full bg-gray-200" />
                            <div className="space-y-2 flex-1">
                                <Skeleton className="h-4 w-24 bg-gray-200" />
                                <Skeleton className="h-3 w-32 bg-gray-200" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

export default function TourDetailsSkeleton() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-0 animate-pulse">
            <HeroSectionSkeleton />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-8 mb-4">
                    {/* Tab Navigation */}
                    <div className="border-b border-gray-200">
                        <div className="flex space-x-8 pb-4">
                            {['Overview', 'Itinerary', 'Inclusions', 'Gallery', 'Reviews'].map((tab) => (
                                <Skeleton key={tab} className="h-5 w-20 bg-gray-200" />
                            ))}
                        </div>
                    </div>

                    {/* Tab Content Area */}
                    <div className="space-y-8">
                        <QuickFactsSkeleton />
                        <Card>
                            <CardHeader><Skeleton className="h-6 w-40 bg-gray-300" /></CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    {Array.from({ length: 6 }).map((_, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <Skeleton className="h-2.5 w-2.5 rounded-full bg-blue-200" />
                                            <Skeleton className="h-4 w-48 bg-gray-200" />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader><Skeleton className="h-6 w-48 bg-gray-300" /></CardHeader>
                            <CardContent className="space-y-3">
                                <Skeleton className="h-4 w-full bg-gray-200" />
                                <Skeleton className="h-4 w-full bg-gray-200" />
                                <Skeleton className="h-4 w-3/4 bg-gray-200" />
                            </CardContent>
                        </Card>
                    </div>

                    <BookingWidgetSkeleton />

                    {/* Guide Info Skeleton */}
                    <Card className="h-64">
                        <CardHeader className="flex flex-row justify-between items-center">
                            <Skeleton className="h-6 w-32 bg-gray-300" />
                            <Skeleton className="h-6 w-20 rounded-full bg-green-200" />
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Skeleton className="h-7 w-64 bg-gray-300" />
                                <Skeleton className="h-4 w-40 bg-gray-200" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full bg-gray-200" />
                                <Skeleton className="h-4 w-5/6 bg-gray-200" />
                            </div>
                            <div className="flex gap-4">
                                <Skeleton className="h-10 w-full rounded-md bg-gray-200" />
                                <Skeleton className="h-10 w-full rounded-md bg-blue-200" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Sticky Area */}
                <div className="lg:col-span-1 border rounded-2xl overflow-hidden bg-white shadow-sm self-start">
                    <div className="p-8 space-y-8">
                        <div className="text-center space-y-4">
                            <Skeleton className="h-8 w-3/4 mx-auto bg-gray-300" />
                            <Skeleton className="h-4 w-2/3 mx-auto bg-gray-200" />
                        </div>
                        <div className="space-y-4">
                            <Skeleton className="h-6 w-48 bg-gray-300" />
                            <div className="space-y-4">
                                <Skeleton className="h-24 w-full rounded-xl bg-gray-200" />
                                <Skeleton className="h-24 w-full rounded-xl bg-gray-200" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <Skeleton className="h-6 w-48 bg-gray-300" />
                            <div className="grid grid-cols-2 gap-3">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <Skeleton key={i} className="h-10 w-full rounded-lg bg-gray-200" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
