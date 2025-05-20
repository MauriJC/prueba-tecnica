'use server';

import prisma from '@/lib/prisma';

export const getContact = async (id: string) => {
  const contact = await prisma.contacto.findUnique({
    where: { id: id },
    include: { provincia: true },
  });

  return contact;
};
