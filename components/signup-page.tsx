'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Bot, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/components/ui/use-toast';
import {
  getSignatureMessage,
  loginWithWallet,
  signup,
} from '@/api/apiCalls/user';
import { useAuthStore } from '@/lib/store/use-store';
import { WalletButton } from '@/components/ui/wallet-button';
import { useClickRef } from '@make-software/csprclick-ui';
import useWalletLogin from '@/hooks/useWalletLogin';

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export default function SignUp() {
  const { toast } = useToast();
  const { setToken } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [walletLoading, setWalletLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await signup({
        email: values.email,
        full_name: values.name,
        password: values.password,
      });

      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
      document.cookie = `token=${response.data.access_token}; path=/`;
      setToken(response.data.access_token);

      router.push('/setup');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          error.response?.data?.message || 'Failed to create account',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleWalletConnect = async () => {
    try {
      setWalletLoading(true);
      // Simulate wallet connection delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: 'Not Implemented',
        description: 'Wallet connection will be implemented by you',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to connect wallet',
      });
    }
  };

  const { canUseCspr } = useWalletLogin();

  return (
    <main className="container mx-auto px-4 min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md p-6 bg-secondary/50 backdrop-blur border-primary/20">
        <div className="flex items-center gap-2 mb-6">
          <Image src={'/logo.svg'} alt={'logo'} width={28} height={28} />
          <h1 className="text-2xl font-bold">Create Account</h1>
        </div>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              {...form.register('name')}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...form.register('email')}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...form.register('password')}
            />
            {form.formState.errors.password && (
              <p className="text-sm text-red-500">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              'Continue'
            )}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <WalletButton
            onClick={handleWalletConnect}
            loading={walletLoading}
            disabled={!canUseCspr}
          />
          <div className="flex items-center justify-between pt-4">
            <Link href="/public">
              <Button variant="ghost">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
          </div>

          <div className="text-center pt-4">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </Card>
    </main>
  );
}
