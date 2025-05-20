'use server';

import prisma from '@/lib/prisma';

export const getContacts = async () => {
  const contacts = await prisma.contacto.findMany({ include: { provincia: true } });
  return contacts;
};
