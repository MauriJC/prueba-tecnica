'use server';

import prisma from '@/lib/prisma';

export const getProvinces = async () => {
  try {
    const provinces = await prisma.provincia.findMany();
    return provinces;
  } catch {
    throw new Error('Error obteniendo provincias');
  }
};
