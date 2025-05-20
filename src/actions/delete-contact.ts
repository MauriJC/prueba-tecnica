'use server';

import prisma from '@/lib/prisma';

export const deleteContact = async (id: string) => {
  await prisma.contacto.delete({ where: { id: id } });
};
