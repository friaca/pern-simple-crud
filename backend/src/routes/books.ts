import { Router } from 'express';
import { BadRequest } from '../utils/error';
import booksServices from '../services/books';

const routes = Router();

routes.param('id', (req, res, next) => {
  try {
    if (isNaN(Number(req.params.id))) {
      throw new BadRequest('ID must be a number');
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
});

routes.get('/books', async (req, res, next) => {
  try {
    const books = await booksServices.listBooks();

    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
});

routes.get('/books/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const book = await booksServices.getBook(Number(id));

    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
});

routes.post('/books', async (req, res, next) => {
  try {
    const newBook = await booksServices.createBook(req.body);

    res.status(200).json(newBook);
  } catch (error) {
    next(error);
  }
});

routes.put('/books/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const updatedBook = await booksServices.updateBook(Number(id), req.body);

    res.status(200).json(updatedBook);
  } catch (error) {
    next(error);
  }
});

routes.delete('/books/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    booksServices.removeBook(Number(id));

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

export default routes;
