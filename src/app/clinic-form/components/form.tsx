'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Router } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

import { createClinic } from '@/actions/create-clinic';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const clinicSchema = z.object({
  name: z
    .string()
    .trim()
    .min(5, { message: 'Nome da clínica deve ter pelo menos 5 caracteres' }),
});

const ClinicForm = () => {
  const router = useRouter();

  // 1. Create a form instance with validation schema.
  const form = useForm<z.infer<typeof clinicSchema>>({
    resolver: zodResolver(clinicSchema),
    defaultValues: {
      name: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof clinicSchema>) {
    try {
      await createClinic(values.name);
      toast.success('Clínica criada com sucesso!');
      router.push('/dashboard');
    } catch (err) {
      toast.error('Erro ao criar clínica. Tente novamente.');
      console.error('Erro ao criar clínica:', err);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder='Digite o nome da clínica' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button
              type='submit'
              className='mt-4 w-full'
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              ) : (
                'Criar Clínica'
              )}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};

export default ClinicForm;
