# Guía de instalación

Se requiere de pnpm para instalar este proyecto, en caso de no tenerlo correr el siguiente comando:

```
npm install -g pnpm@latest-10
```

Luego de esto, podremos instalar el proyecto.

---

### Pasos a seguir

1. Clonar el repo con el siguiente script:

```
   git clone https://github.com/MauriJC/prueba-tecnica.git
```

2. Ejecutar en la raíz del proyecto:

```
    pnpm install
```

3. Renombrar el archivo `.env.template` a `.env`

4. Migrar la base de datos para sincronizarla con el modelo establecido en el schema de Prisma.

```
    pnpm prisma migrate dev
```

5. Poblar la base de datos utilizando el seeder con el siguiente comando:

```
    pnpm dlx tsx prisma/seed.ts
```

6. Correr la aplicación con:

```
    pnpm dev
```

## Guía de utilización de la aplicación

### Home page:

Es la pantalla inicial de la app, se encuentra en la ruta `/` y en ella se te recibirá con un saludo, la lista de contactos (que al principio está vacía) y diferentes opciones como:

- Agregar contacto
- Editar contacto (en el ícono del lápiz)
- Eliminar contacto (en el ícono del basurero)

### Add contact page:

En esta página serás capaz de agregar la información de un contacto que quieras guardar. Se reciben datos como:

- Nombre
- Apellido
- Teléfono
- Provincia

Al presionar el botón `Agregar` se guardará la información en la base de datos, serás notificado por la aplicación y, luego redirigido a la Home page, donde podrás ver el nuevo contacto creado.

### Edit contact page:

En esta página serás capaz de editar la información del contacto que selecciones. Se pueden modificar todos los datos que hayas almacenado en la `Add-contact page`.
Al presionar el botón `Confirmar` se guardará la información en la base de datos, serás notificado por la aplicación y, luego redirigido a la Home page, donde podrás ver el contacto editado.

### Delete contact page:

En esta página serás capaz de eliminar el contacto que hayas seleccionado. Cuenta únicamente con dos botones, `Aceptar` (elimina el contacto permanentemente) y `Cancelar` (te redirige al listado de contactos).
Al presionar el botón `Aceptar` se guardará la información en la base de datos, serás notificado por la aplicación y, luego redirigido a la Home page, donde podrás ver el nuevo contacto creado.

## Decisiones técnicas tomadas:

### 1. Este proyecto fue creado con Next.js, Prisma, SQLite y Shadcn.

Por qué Next?

Porque permite el desarrollo rápido de aplicaciones gracias a su integración de backend + frontend en un solo lugar, a su con un manejador de rutas preconfigurado (App router) y su facilidad de acoplamiento con TailwindCSS. Además, es una de las tecnologías con la que más me he relacionado el último tiempo, por lo que el desarrollo será mas fluido.

Por qué Prisma?

Es un ORM de fácil configuración e implementación en el ecosistema de Next.js. También cuenta con una aplicación para manejar fácilmente los datos cargados en la DB.

Por qué SQLite?

Porque viene integrado con Prisma, y no requiere configuración adicional como podrían ser otros DBMS.

Por qué Shadcn?

Porque ofrece componentes prefabricados totalmente modificables y adaptables a cada situación que nos encontremos. También son compatibles con los temas del navegador de forma nativa.

### 2. Se utilizaron server actions.

Se decidió utilizar esta herramienta debido a que es una alternativa con tipado seguro (type safety), con una integración intuitiva en el código y excelente a la hora de ser integrada con Server Components debido a su gran velocidad (gracias al SSR).

### 3. Estructura de carpetas

A continuación se muestra la estructura de carpetas que fue elegida para este proyecto:

```
prueba-tecnica
│   README.md
│   /.../
└───prisma
|
└───src
    └────actions
    └───app
    |   │   /Rutas para otras páginas/
    |   └──components
    |       └────ui
    |       └──/no se implementaron más carpetas para diferentes secciones/
    │
    └───lib
        │  /archivos/
```

Ahora desestructuraremos un poco la finalidad de cada directorio:

1. `/prisma` : guarda lo concerniente al ORM Prisma, como las migraciones y, en este caso, el archivo de la base de datos SQLite.
2. `/src/actions`: guarda todas las server actions utilizadas en la aplicacion. No se optó por subdividirla de acuerdo a diferentes categorías ya que el tamaño del proyecto no lo ameritaba.
3. `src/app`: es el directorio principal de la app, a partir del cual el App router realiza el direccionamiento a cada una de las páginas.
4. `src/app/components/ui`: aloja componentes reutilizables a lo largo de toda la app.
5. `src/app/components`: destinada a guardar componentes pertenecientes a diferentes secciones de las páginas. No se subdividió en más carpetas porque no fue necesario.
6. `src/lib`: guarda funciones utilitarias que pueden ser reutilizadas, como el singleton prisma client y la función cn(vital de shadcn).
