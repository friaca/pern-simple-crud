import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user';

function createApp({ port } = { port: 1957 }) {
  console.log('Iniciando servidor...');
  const app = express();
  
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use('/', userRoutes);
  
  app.listen(port);
  console.log(`Servidor iniciado na porta ${port}!`);

  return app;
}

export default createApp;
