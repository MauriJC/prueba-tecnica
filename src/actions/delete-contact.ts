'use server';

import prisma from '@/lib/prisma';

export const deleteContact = async (id: string) => {
  try {
    await prisma.contacto.delete({ where: { id: id } });
  } catch {
    throw new Error('Error del servidor');
  }
};
