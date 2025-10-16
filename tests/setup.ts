import 'dotenv/config';

// Configurar variables de entorno para testing
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL debe estar configurada para ejecutar tests');
}

console.log('Configuración de tests cargada');