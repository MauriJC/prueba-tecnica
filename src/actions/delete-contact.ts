'use server';

import prisma from '@/lib/prisma';

export const deleteContact = async (id: string) => {
  try {
    await prisma.contacto.delete({ where: { id: id } });
  } catch (error) {
    console.error(error);
    throw new Error('Error del servidor');
  }
};
