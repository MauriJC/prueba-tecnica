'use server';

import prisma from '@/lib/prisma';

export const getContact = async (id: string) => {
  try {
    const contact = await prisma.contacto.findUnique({
      where: { id: id },
      include: { provincia: true },
    });

    return contact;
  } catch {
    // DEberia agregar un console.error para mostrar en el backend?
    throw new Error('Error obteniendo contacto');
  }
};
