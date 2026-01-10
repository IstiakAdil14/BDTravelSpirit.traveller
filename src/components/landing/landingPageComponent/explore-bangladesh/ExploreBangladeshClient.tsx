'use client';

import dynamic from 'next/dynamic';

const ExploreBangladeshUI = dynamic(() => import('./ExploreBangladeshUI'), { ssr: false });

const destinations = [
  {
    id: 1,
    name: 'Barisal',
    image: '/images/division_imgs/barisal.jpg',
    tourPlaces: 25
  },
  {
    id: 2,
    name: 'Chittagong',
    image: '/images/division_imgs/chittagong.jpg',
    tourPlaces: 42
  },
  {
    id: 3,
    name: 'Dhaka',
    image: '/images/division_imgs/dhaka.jpg',
    tourPlaces: 38
  },
  {
    id: 4,
    name: 'Khulna',
    image: '/images/division_imgs/khulna.jpg',
    tourPlaces: 31
  },
  {
    id: 5,
    name: 'Mymensingh',
    image: '/images/division_imgs/mymensingh.jpg',
    tourPlaces: 29
  },
  {
    id: 6,
    name: 'Rajshahi',
    image: '/images/division_imgs/rajshahi.jpg',
    tourPlaces: 35
  },
  {
    id: 7,
    name: 'Rangpur',
    image: '/images/division_imgs/rangpur.jpg',
    tourPlaces: 27
  },
  {
    id: 8,
    name: 'Sylhet',
    image: '/images/division_imgs/sylhet.jpg',
    tourPlaces: 33
  },
];

export default function ExploreBangladeshClient() {
  return <ExploreBangladeshUI destinations={destinations} />;
}
