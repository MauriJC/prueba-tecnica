'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../../components/ui/command';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { getProvinces } from '@/actions/get-provinces';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { getContact } from '@/actions/get-contact';
import { Contacto } from '../../../../generated/prisma';
import { editContact } from '@/actions/edit-contact';

const formSchema = z.object({
  id: z.string(),
  nombre: z.string().min(2, {
    message: 'El nombre debe tener al menos 2 letras.',
  }),
  apellido: z.string().min(2, {
    message: 'El apellido debe tener al menos 2 letras.',
  }),
  telefono: z.string().min(6, {
    message: 'El telefono debe tener al menos 6 dígitos.',
  }),
  provincia: z.string(),
});

export default function EditContactPage() {
  const [open, setOpen] = useState(false);
  const [provinces, setProvinces] = useState<{ nombre: string; id: string }[]>([]);
  const [contact, setContact] = useState<Contacto>();
  const params = useParams();
  const id = params.id as string; // Necesario para que lo tome la server action por el tipo string
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: '',
      apellido: '',
      telefono: '',
      provincia: '',
    },
  });

  useEffect(() => {
    const fetchProvincias = async () => {
      const data = await getProvinces();
      setProvinces(data);
    };

    const fetchContact = async () => {
      const data = await getContact(id);
      setContact(data);
      if (data) {
        form.reset({
          id: data.id,
          nombre: data.nombre,
          apellido: data.apellido,
          telefono: data.telefono.toString(),
          provincia: data.idProvincia,
        });
      }
    };

    fetchProvincias();
    fetchContact();
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast.promise(editContact(values), {
      loading: 'Cargando',
      success: () => {
        router.push('/');
        return 'Contacto editado exitosamente';
      },
      error: 'Ocurrió un error',
    });
  }

  if (!contact) return <h1>Cargando...</h1>;

  return (
    <div className="flex min-h-screen items-center justify-center py-12">
      <div className="w-full max-w-[425px]">
        <div className="flex flex-col items-center gap-6">
          <h1 className="mb-8 text-2xl font-semibold tracking-tight">Editar contacto</h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="apellido"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <Input placeholder="Apellido" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="telefono"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Teléfono"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, '');
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {provinces && (
              <FormField
                control={form.control}
                name="provincia"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Provincia</FormLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between"
                          >
                            {field.value
                              ? provinces.find((province) => province.id === field.value)?.nombre
                              : 'Seleccione provincia...'}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full opacity-100">
                        <Command>
                          <CommandInput placeholder="Buscar provincia..." />
                          <CommandList>
                            <CommandEmpty>No se encontró la provincia.</CommandEmpty>
                            <CommandGroup className="border opacity-100">
                              {provinces.map((province) => (
                                <CommandItem
                                  key={province.id}
                                  value={province.id}
                                  onSelect={(currentValue) => {
                                    field.onChange(currentValue);
                                    setOpen(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      field.value === province.id ? 'opacity-100' : 'opacity-0',
                                    )}
                                  />
                                  {province.nombre}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="flex w-full justify-around">
              <Button type="submit" variant="outline" className="cursor-pointer">
                Confirmar
              </Button>
              <Link href={'/'}>
                <Button variant="outline" className="cursor-pointer">
                  Volver
                </Button>
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
