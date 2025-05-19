'use server';

import prisma from '@/lib/prisma';

export const getProvinces = async () => {
  const provinces = await prisma.provincia.findMany();
  return provinces;
};
