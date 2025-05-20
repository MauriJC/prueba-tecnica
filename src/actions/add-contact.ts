'use server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const formSchema = z.object({
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

export const addContact = async (data: z.infer<typeof formSchema>) => {
  try {
    const cleanedData = formSchema.parse(data);
    const { nombre, apellido, provincia } = cleanedData;
    const telefono = parseInt(cleanedData.telefono);

    await prisma.contacto.create({
      data: {
        nombre: nombre,
        apellido: apellido,
        telefono: telefono,
        idProvincia: provincia,
      },
    });
  } catch (error) {
    throw new Error(error instanceof z.ZodError ? 'Datos invalidos' : 'Fallo del servidor');
  }
};
