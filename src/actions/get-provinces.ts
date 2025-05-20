'use server';

import prisma from '@/lib/prisma';
import { error } from 'console';

export const getProvinces = async () => {
  try {
    const provinces = await prisma.provincia.findMany();
    return provinces;
  } catch (error) {
    console.error(error);
    throw new Error('Error obteniendo provincias');
  }
};
