'use server';

import prisma from '@/lib/prisma';
import { z } from 'zod';

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

export const editContact = async (data: z.infer<typeof formSchema>) => {
  const cleanedData = formSchema.parse(data);
  const { id, nombre, apellido, provincia } = cleanedData;
  const telefono = parseInt(cleanedData.telefono);

  await prisma.contacto.update({
    data: {
      nombre: nombre,
      apellido: apellido,
      telefono: telefono,
      idProvincia: provincia,
    },
    where: {
      id: id,
    },
  });
};
