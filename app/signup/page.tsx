'use client';
import dynamic from 'next/dynamic';

const SignUpPage = dynamic(() => import('@/components/signup-page'), {
  ssr: false,
});

export default function Login() {
  return <SignUpPage />;
}
