import dotenv from 'dotenv';

dotenv.config();

// En entorno de test, cargar .env.test y forzar el uso de TEST_DATABASE_URL
if (process.env.NODE_ENV === 'test') {
  // Cargar .env.test
  dotenv.config({ path: '.env.test' });

  // Requerir explícitamente una URL de BD de testing para evitar borrar la BD real
  if (!process.env.TEST_DATABASE_URL) {
    throw new Error('\nFATAL: para ejecutar tests se requiere configurar .env.test con TEST_DATABASE_URL.\nNo se ha encontrado TEST_DATABASE_URL, deteniendo tests para evitar borrar la BD en Neon.\n');
  }

  // Forzar que Prisma use la URL de testing durante los tests
  process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;
}

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL debe estar configurada para ejecutar tests');
}

console.log('Configuración de tests cargada (NODE_ENV=' + process.env.NODE_ENV + ')');