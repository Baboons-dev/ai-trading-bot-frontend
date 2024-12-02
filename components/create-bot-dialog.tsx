"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TwitterBot } from "@/types/bot";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(10).max(200),
});

interface CreateBotDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (data: z.infer<typeof formSchema>) => void;
  editBot?: TwitterBot;
}

export function CreateBotDialog({
  open,
  onOpenChange,
  onCreate,
  editBot,
}: CreateBotDialogProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: editBot?.name || "",
      description: editBot?.description || "",
    },
  });

  useEffect(() => {
    if (editBot) {
      form.reset({
        name: editBot.name,
        description: editBot.description,
      });
    }
  }, [editBot, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      await onCreate(values);
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to create bot:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{editBot ? "Edit Bot" : "Create New Bot"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bot Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Price Alert Bot" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe what your bot will do..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading
                ? editBot
                  ? "Updating..."
                  : "Creating..."
                : editBot
                ? "Update Bot"
                : "Create Bot"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
