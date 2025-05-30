import prisma from '@/lib/prisma';

async function seed() {
  await prisma.provincia.createMany({
    data: [
      { nombre: 'Buenos Aires' },
      { nombre: 'Catamarca' },
      { nombre: 'Chaco' },
      { nombre: 'Chubut' },
      { nombre: 'CABA' },
      { nombre: 'Córdoba' },
      { nombre: 'Corrientes' },
      { nombre: 'Entre Ríos' },
      { nombre: 'Formosa' },
      { nombre: 'Jujuy' },
      { nombre: 'La Pampa' },
      { nombre: 'La Rioja' },
      { nombre: 'Mendoza' },
      { nombre: 'Misiones' },
      { nombre: 'Neuquén' },
      { nombre: 'Río Negro' },
      { nombre: 'Salta' },
      { nombre: 'San Juan' },
      { nombre: 'San Luis' },
      { nombre: 'Santa Cruz' },
      { nombre: 'Santa Fe' },
      { nombre: 'Santiago del Estero' },
      { nombre: 'Tierra del Fuego' },
      { nombre: 'Tucumán' },
    ],
  });
  console.log('Base de datos cargada exitosamente!');
}

seed();
