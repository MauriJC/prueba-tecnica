# Guía de instalación

Se requiere de pnpm para instalar este proyecto, en caso de no tenerlo correr el siguiente comando:

```
npm install -g pnpm@latest-10
```

Luego de esto, podremos instalar el proyecto.

---

### Pasos a seguir

1. Ejecutar en la raíz del proyecto:

```
    pnpm install
```

2. Renombrar el archivo `.env.template` a `.env`

3. Migrar la base de datos para sincronizarla con el modelo establecido en el schema de Prisma.

```
    pnpm prisma migrate dev
```

3. Poblar la base de datos utilizando el seeder con el siguiente comando:

```
    pnpm dlx tsx prisma/seed.ts
```

4. Correr la aplicación con:

```
    pnpm dev
```

## Guía de utilización de la aplicación

Home page:
Es la pantalla inicial de la app, se encuentra en la ruta `/` y en ella se te recibirá con un saludo, la lista de contactos (que al principio está vacía) y diferentes opciones como:

- Agregar contacto
- Editar contacto (en el ícono del lápiz)
- Eliminar contacto (en el ícono del basurero)

## Decisiones técnicas tomadas:

### 1. Este proyecto fue creado con Next.js, Prisma y SQLite.

Por qué Next?

Porque permite el desarrollo rápido de aplicaciones gracias a su integración de backend + frontend en un solo lugar, a su con un manejador de rutas preconfigurado (App router) y su facilidad de acoplamiento con TailwindCSS. Además, es una de las tecnologías con la que más me he relacionado el último tiempo, por lo que el desarrollo será mas fluido.

Por qué Prisma?

Es un ORM de facil configuración e implementación en el ecosistema de Next.js. También cuenta con una aplicación para manejar fácilmente los datos cargados en la DB.

Por qué SQLite?

Porque viene integrado con Prisma, y no requiere configuración adicional como podrían ser otros DBMS.

2. Se utilizaron server actions.

Agregar explicacion de por que se hizo la estructura de carpetas como esta
