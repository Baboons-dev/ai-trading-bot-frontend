'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import Image from 'next/image';
import Link from 'next/link';
import { showError, showSuccess } from '@/hooks/useToastMessages';
import { PostUser } from '@/api/apiCalls/user';
import { useAuthStore } from '@/lib/store/use-store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const formSchema = z.object({
  ref_code: z.string(),
});

export default function ReferPage() {
  const { user } = useAuth();
  const { setUser } = useAuthStore();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ref_code: '',
    },
  });
  useEffect(() => {
    console.log(user);
    if (user?.refer_by) {
      router.push('/profile');
    }
  }, [user?.refer_by]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await PostUser(values?.ref_code);
      setUser(res);
      showSuccess('Profile updated successfully');
    } catch (error: any) {
      showError(error.response?.data?.message || 'Failed to update profile');
    }
  };

  return (
    <main className="container mx-auto px-4 min-h-screen py-24">
      <Card className="max-w-2xl mx-auto p-6 bg-secondary/50 backdrop-blur border-primary/20">
        <div className="flex items-center gap-2 mb-6">
          <Image src="/logo.svg" alt="logo" width={28} height={28} />
          <h1 className="text-2xl font-bold">Profile Settings</h1>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="ref_code">Refer Code</Label>
            <Input
              id="ref_code"
              placeholder=""
              {...form.register('ref_code')}
            />
            {form.formState.errors.ref_code && (
              <p className="text-sm text-red-500">
                {form.formState.errors.ref_code.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between pt-4">
            {/*<Link href="/dashboard">*/}
            {/*  <Button variant="ghost">*/}
            {/*    <ArrowLeft className="w-4 h-4 mr-2" />*/}
            {/*    Back to Dashboard*/}
            {/*  </Button>*/}
            {/*</Link>*/}
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </div>
        </form>
      </Card>
    </main>
  );
}
