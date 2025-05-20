import { getContacts } from '@/actions/get-contacts';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './components/ui/table';
import { Pencil, Trash } from 'lucide-react';
import Link from 'next/link';
import { Button } from './components/ui/button';

export default async function HomePage() {
  const contacts = await getContacts();

  return (
    <div className="grid min-h-screen items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <h1>Bienvenido a la agenda!</h1>
      <Link href={'/add-contact'}>
        <Button>Agregar contactos</Button>
      </Link>

      <Table>
        <TableCaption>Listado de contactos.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Apellido</TableHead>
            <TableHead>Telefono</TableHead>
            <TableHead className="">Provincia</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell className="font-medium">{contact.nombre}</TableCell>
              <TableCell>{contact.apellido}</TableCell>
              <TableCell>{contact.telefono}</TableCell>
              <TableCell>{contact.provincia.nombre}</TableCell>
              <TableCell className="flex justify-end">
                <Link href={`/edit-contact/${contact.id}`}>
                  <Pencil />
                </Link>
                <Link href={`/delete-contact/${contact.id}`}>
                  <Trash className="ml-2" />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
