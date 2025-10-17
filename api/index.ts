import serverless from 'serverless-http';
import app from '../src/app.ts';

export default serverless(app);