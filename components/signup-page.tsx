'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { signup } from '@/api/apiCalls/user';
import { useAuthStore } from '@/lib/store/use-store';
import { WalletButton } from '@/components/ui/wallet-button';
import { useClickRef } from '@make-software/csprclick-ui';
import useWalletLogin from '@/hooks/useWalletLogin';
import Icons from '@/config/icon';
import { showError } from '@/hooks/useToastMessages';
import { ReferralModal } from '@/components/ui/referral-modal';

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  referral_code: z.string().optional(),
});

export default function SignUp() {
  const { setToken } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [walletLoading, setWalletLoading] = useState(false);
  const [showReferralModal, setShowReferralModal] = useState(false);
  const router = useRouter();
  const clickRef = useClickRef();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      referral_code: '',
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await signup({
        email: values.email,
        full_name: values.name,
        password: values.password,
        referral_code: values.referral_code,
      });

      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
      document.cookie = `token=${response.data.access_token}; path=/`;
      setToken(response.data.access_token);

      router.push('/setup');
    } catch (error: any) {
      showError(error.response?.data?.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const handleWalletConnect = () => {
    setShowReferralModal(true);
  };

  const handleReferralSubmit = async (referralCode: string) => {
    try {
      setWalletLoading(true);
      localStorage.setItem('referral_code', referralCode);
      clickRef.signIn();
      localStorage.setItem('messagedSigned', 'false');
      setShowReferralModal(false);
    } catch (error) {
      showError('Failed to connect wallet');
    } finally {
      setWalletLoading(false);
    }
  };

  const { canUseCspr } = useWalletLogin('/setup');

  return (
    <main className="SignUpPage mx-auto min-h-screen flex justify-center items-center md:px-[40px] px-[20px] py-[60px]">
      <div className="inner-wrap flex justify-center items-center flex-col w-full max-w-[600px]">
        <div
          className="card-wrap flex justify-center items-center flex-col w-full bg-[#101010] sm:px-[30px] px-[20px] py-[40px]"
          style={{
            boxShadow: '0px 0px 30px 0px rgba(0, 0, 0, 0.75)',
            border: '1px solid #222223',
          }}
        >
          <h1 className="font-tektur md:text-[36px] text-[24px] text-[#ffffff] font-[600] leading-[normal] tracking-[normal] text-center">
            Create Account
          </h1>

          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full mt-[40px]"
          >
            <div className="input-wrap space-y-[5px]">
              <Label
                htmlFor="name"
                className="font-roboto text-[14px] text-[#ffffff66] font-[300] leading-[normal] tracking-[normal]"
              >
                Full Name
              </Label>
              <Input
                id="name"
                placeholder="John Doe"
                className="font-roboto"
                {...form.register('name')}
              />
              {form.formState.errors.name && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div className="input-wrap space-y-[5px] mt-[20px]">
              <Label
                htmlFor="email"
                className="font-roboto text-[14px] text-[#ffffff66] font-[300] leading-[normal] tracking-[normal]"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                className="font-roboto"
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

            <div className="input-wrap space-y-[5px] mt-[20px]">
              <Label
                htmlFor="referral_code"
                className="font-roboto text-[14px] text-[#ffffff66] font-[300] leading-[normal] tracking-[normal]"
              >
                Referral Code (Optional)
              </Label>
              <Input
                id="referral_code"
                placeholder="Enter referral code"
                className="font-roboto"
                {...form.register('referral_code')}
              />
            </div>

            <div className="action-btn min-w-[100%] mt-[40px]">
              <button className="w-full" type="submit" disabled={loading}>
                <Icons name="btnL" className="shrink-0" />
                <div className="inner px-[20px] flex-1 justify-center">
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      <p className="font-tektur text-[14px] text-[#ffffff] font-[400] leading-[normal] tracking-[normal]">
                        Creating...
                      </p>
                    </>
                  ) : (
                    <p className="font-tektur text-[14px] text-[#ffffff] font-[400] leading-[normal] tracking-[normal]">
                      Continue
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

            <div className="flex items-center justify-between pt-[40px] gap-[20px]">
              <Link className="action-btn px-[20px]" href="/">
                <button className="gap-[10px]">
                  <Icons name="arrow-left" />
                  <p className="font-tektur text-[14px] text-[#ffffff] font-[400] leading-[normal] tracking-[normal]">
                    Back
                  </p>
                </button>
              </Link>

              <p className="text-sm text-muted-foreground text-right">
                Already have an account?{' '}
                <Link href="/login" className="text-primary hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      <ReferralModal
        isOpen={showReferralModal}
        onClose={() => setShowReferralModal(false)}
        onSubmit={handleReferralSubmit}
        loading={walletLoading}
      />
    </main>
  );
}