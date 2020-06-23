import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import errorHandler from './middlewares/handleErrors';
import userRoutes from './routes/users';
import booksRoutes from './routes/books';

function createApp({ port } = { port: 1957 }) {
  console.log('Iniciando servidor...');
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use('/', userRoutes);
  app.use('/', booksRoutes);

  app.use(errorHandler);

  app.listen(port);
  console.log(`Servidor iniciado na porta ${port}!`);

  return app;
}

export default createApp;
