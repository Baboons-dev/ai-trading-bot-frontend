'use client';
import dynamic from 'next/dynamic';

const ProfilePage = dynamic(() => import('@/components/home/profile'), {
  ssr: false,
});
export default function Profile() {
  return <ProfilePage />;
}
