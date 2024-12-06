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
import useWalletLogin from '@/hooks/useWalletLogin';
import Icons from '@/config/icon';

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
    }
  };

  const handleWalletConnect = async () => {
    try {
      setWalletLoading(true);
      clickRef.signIn();
      localStorage.setItem('messagedSigned', 'false');
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

  const { canUseCspr } = useWalletLogin();

  return (
    <main className="LoginPage mx-auto min-h-screen flex justify-center items-center md:px-[40px] px-[20px] py-[60px]">
      <div className="inner-wrap flex justify-center items-center flex-col w-full max-w-[600px]">
        <div
          className="card-wrap flex justify-center items-center flex-col w-full bg-[#101010] px-[30px] py-[40px]"
          style={{
            boxShadow: '0px 0px 30px 0px rgba(0, 0, 0, 0.75)',
            border: '1px solid #222223',
          }}
        >
          <h1 className="font-tektur md:text-[36px] text-[24px] text-[#ffffff] font-[600] leading-[normal] tracking-[normal] text-center">
            Welcome Back
          </h1>

          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full mt-[40px]"
          >
            <div className="input-wrap space-y-[5px]">
              <Label
                htmlFor="email"
                className="font-roboto text-[14px] text-[#ffffff66] font-[300] leading-[normal] tracking-[normal]"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                className="font-roboto"
                placeholder="john@example.com"
                {...form.register('email')}
              />
              {form.formState.errors.email && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="input-wrap space-y-[5px] mt-[20px]">
              <Label
                htmlFor="password"
                className="font-roboto text-[14px] text-[#ffffff66] font-[300] leading-[normal] tracking-[normal]"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                className="font-roboto"
                {...form.register('password')}
              />
              {form.formState.errors.password && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <div className="action-btn min-w-[100%] mt-[40px]">
              <button className="w-full" type="submit" disabled={loading}>
                <Icons name="btnL" className="shrink-0" />
                <div className="inner px-[20px] flex-1 justify-center">
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      <p className="font-tektur text-[14px] text-[#ffffff] font-[400] leading-[normal] tracking-[normal]">
                        Logging in...
                      </p>
                    </>
                  ) : (
                    <p className="font-tektur text-[14px] text-[#ffffff] font-[400] leading-[normal] tracking-[normal]">
                      Login
                    </p>
                  )}
                </div>
                <Icons name="btnR" className="shrink-0" />
              </button>
            </div>

            <div className="relative mt-[40px]">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#101010] px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-[40px]">
              <WalletButton
                onClick={handleWalletConnect}
                loading={walletLoading}
                disabled={canUseCspr}
              />
            </div>

            <div className="flex items-center justify-between pt-[40px]">
              <Link className="action-btn px-[20px]" href="/public">
                <button className="gap-[10px]">
                  <Icons name="arrow-left" />
                  <p className="font-tektur text-[14px] text-[#ffffff] font-[400] leading-[normal] tracking-[normal]">
                    Back
                  </p>
                </button>
              </Link>

              <p className="text-sm text-muted-foreground text-right">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
