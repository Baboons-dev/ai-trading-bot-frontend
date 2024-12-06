'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter, useParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Image from 'next/image';
import Link from 'next/link';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState } from 'react';
import { TwitterBot } from '@/types/bot';
import { getBots, updateBot } from '@/api/apiCalls/bot';
import Icons from '@/config/icon';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

export default function BotSettingsPage() {
  const { id } = useParams();
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [bot, setBot] = useState<TwitterBot | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  useEffect(() => {
    const fetchBot = async () => {
      try {
        const bots = await getBots();
        const currentBot = bots.find((b) => b.id === parseInt(id as string));
        if (currentBot) {
          setBot(currentBot);
          form.reset({
            name: currentBot.name,
            description: currentBot.description,
          });
        }
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to fetch bot details',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBot();
  }, [id, form, toast]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!bot) return;

      await updateBot(bot.id, {
        name: values.name,
        description: values.description,
      });

      toast({
        title: 'Success',
        description: 'Bot settings updated successfully',
      });

      router.push('/dashboard');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          error.response?.data?.message || 'Failed to update bot settings',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!bot) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Bot not found</h1>
        <Link href="/dashboard">
          <Button variant="ghost">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <main className="BotSettingsPage mx-auto min-h-screen flex justify-center items-center md:px-[40px] px-[20px] py-[60px]">
      <div className="inner-wrap flex justify-center items-center flex-col w-full max-w-[600px]">
        <h1 className="font-tektur md:text-[36px] text-[24px] text-[#ffffff] font-[600] leading-[normal] tracking-[normal] text-center">
          Bot Settings
        </h1>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full mt-[40px] bg-[#101010] px-[30px] py-[40px]"
          style={{
            boxShadow: '0px 0px 30px 0px rgba(0, 0, 0, 0.75)',
            border: '1px solid #222223',
          }}
        >
          <div className="input-wrap space-y-[5px]">
            <Label
              htmlFor="name"
              className="font-roboto text-[14px] text-[#ffffff66] font-[300] leading-[normal] tracking-[normal]"
            >
              Bot Name
            </Label>
            <Input
              id="name"
              className="font-roboto"
              placeholder="Insert a name"
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
              htmlFor="description"
              className="font-roboto text-[14px] text-[#ffffff66] font-[300] leading-[normal] tracking-[normal]"
            >
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Description"
              className="h-[120px] font-roboto"
              {...form.register('description')}
            />
            {form.formState.errors.description && (
              <p className="text-sm text-red-500">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>

          <div className="flex justify-between pt-[40px] sm:flex-row flex-col-reverse gap-[20px]">
            <Link className="action-btn px-[20px]" href="/dashboard">
              <button className="gap-[10px]">
                <Icons name="arrow-left" />
                <p className="font-tektur text-[14px] text-[#ffffff] font-[400] leading-[normal] tracking-[normal]">
                  Back to Dashboard
                </p>
              </button>
            </Link>

            <div className="action-btn">
              <button type="submit" disabled={form.formState.isSubmitting}>
                <Icons name="btnL" />
                <div className="inner px-[20px] min-w-[140px]">
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      <p className="font-tektur text-[14px] text-[#ffffff] font-[400] leading-[normal] tracking-[normal]">
                        Saving...
                      </p>
                    </>
                  ) : (
                    <p className="font-tektur text-[14px] text-[#ffffff] font-[400] leading-[normal] tracking-[normal]">
                      Submit
                    </p>
                  )}
                </div>
                <Icons name="btnR" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
