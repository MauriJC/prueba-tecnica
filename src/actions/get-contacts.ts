'use server';

import prisma from '@/lib/prisma';

export const getContacts = async () => {
  try {
    const contacts = await prisma.contacto.findMany({ include: { provincia: true } });
    return contacts;
  } catch (error) {
    console.error(error);
    throw new Error('Error obteniendo contactos');
  }
};
