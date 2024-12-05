'use client';

import {
  getSignatureMessage,
  login,
  loginWithWallet,
} from '@/api/apiCalls/user';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { WalletButton } from '@/components/ui/wallet-button';
import { useAuthStore } from '@/lib/store/use-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useClickRef } from '@make-software/csprclick-ui';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function Login() {
  const { toast } = useToast();
  const { setToken } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [walletLoading, setWalletLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await login(values);

      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
      document.cookie = `token=${response.data.access_token}; path=/`;
      setToken(response.data.access_token);

      router.push('/dashboard');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.response?.data?.message || 'Invalid credentials',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleWalletConnect = async () => {
    try {
      setWalletLoading(true);
      clickRef.signIn();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to connect wallet',
      });
    } finally {
      setWalletLoading(false);
    }
  };

  const clickRef = useClickRef();

  useEffect(() => {
    clickRef?.on('csprclick:signed_in', async (evt) => {
      try {
        setWalletLoading(true);
        const loginMessage = await getSignatureMessage(evt.account.public_key);
        const signed = await clickRef.signMessage(
          loginMessage.message,
          evt.account.public_key,
        );

        const response = await loginWithWallet({
          publicKey: evt.account.public_key,
          message: loginMessage.message,
          signedMessage: signed?.signatureHex || '',
        });

        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);
        document.cookie = `token=${response.data.access_token}; path=/`;
        setToken(response.data.access_token);

        router.push('/dashboard');
      } catch (e) {
        console.log(e);
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        document.cookie = ``;
        setToken('');
      } finally {
        setWalletLoading(false);
      }
    });
  }, [clickRef?.on]);

  return (
    <main className="container mx-auto px-4 min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md p-6 bg-secondary/50 backdrop-blur border-primary/20">
        <div className="flex items-center gap-2 mb-6">
          <Image src={'/logo.svg'} alt={'logo'} width={28} height={28} />
          <h1 className="text-2xl font-bold">Welcome Back</h1>
        </div>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
                Logging in...
              </>
            ) : (
              'Login'
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

          <WalletButton onClick={handleWalletConnect} loading={walletLoading} />

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
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </Card>
    </main>
  );
}
