# API REST TAREAS

> **Ejercicio 1**

Se desarrolla en Node.js + TypeScript, utilizando Express y Prisma para persistencia en PostgreSQL.

Permite: crear, listar y actualizar tareas, incluye validación con Zod. Las pruebas automáticas se realizan con Vitest.

## Instalación y configuración local

### Clonar repositorio

```bash
git clone https://github.com/JhonatanFriz/api-task
```

### Instalar dependencias

En carpeta raíz ejecutar:

```bash
npm ci
```

### Configurar variables de entorno

(En este caso se utiliza NeonDB, se debe reemplazar con la conexión de la base de datos)

```env
DATABASE_URL="postgresql://usuario:contraseña@ep-xxxx.neon.tech/nombre_db?sslmode=require"
PORT=3000
```

### Generar el cliente Prisma y migrar la DB

```bash
npx prisma generate
npm run prisma:migrate
```

### Iniciar servidor de desarrollo

```bash
npm run dev
```

API disponible en `http://localhost:3000`

## Endpoints disponibles

### GET /health
Verifica el estado del servicio

### GET /tasks
Obtiene lista de tareas

### POST /tasks
Crea una tarea nueva

### PATCH /tasks/:id
Actualiza el estado de una tarea

## Ejecución de pruebas automáticas

```bash
npm test
```

## Estructura del Proyecto

```
api-task/
├── src/
│   ├── app.ts           # Configuración de Express
│   ├── index.ts         # Punto de entrada
│   └── routes/
│       └── tasks.ts     # Rutas de tareas
├── tests/
│   ├── setup.ts         # Configuración de tests
│   └── tasks.test.ts    # Pruebas de la API
├── prisma/
│   └── schema.prisma    # Schema de base de datos
├── package.json
├── tsconfig.json
├── vitest.config.ts
└── .env
```