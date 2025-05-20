'use client';

import { deleteContact } from '@/actions/delete-contact';
import { Button } from '@/app/components/ui/button';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function DeleteContactPage() {
  const { id } = useParams();
  const router = useRouter();

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex h-[30%] flex-col items-center justify-center border">
        <h1 className="mx-4">Está seguro que desea eliminar este contacto?</h1>
        <div className="mt-4 flex w-full justify-around">
          <Button
            onClick={() => {
              toast.promise(deleteContact(id), {
                loading: 'Procesando eliminación del contacto',
                success: () => {
                  router.push('/');
                  return 'Contacto eliminado exitosamente!';
                },
                error: 'Ocurrrió un error!',
              });
            }}
          >
            Aceptar
          </Button>
          <Link href={'/'}>
            <Button>Cancelar</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
