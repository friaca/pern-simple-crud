import booksRepo from '../repositories/books';
import usersServices from '../services/users';
import { Book } from '../types/book';
import { NotFound } from '../utils/error';

async function listBooks(): Promise<Book[]> {
  try {
    const books = booksRepo.list();
    return books ?? [];
  } catch (error) {
    throw error;
  }
}

async function getBook(id: number): Promise<Book> {
  try {
    const book = await booksRepo.find(id);

    if (!book) {
      throw new NotFound(`Couldn't find book with ID ${id}`);
    }

    return book;
  } catch (error) {
    throw error;
  }
}

async function createBook(book: Book): Promise<Book> {
  try {
    const author = await usersServices.getUser(book.author_id!);
    if (!author) {
      throw new NotFound(`Invalid Author ID ${book.author_id}`);
    }

    const newBook = await booksRepo.create(book);

    return <Book>{
      id: newBook.id,
      title: newBook.title,
      year: newBook.year,
      author: { ...author },
    };
  } catch (error) {
    throw error;
  }
}

async function updateBook(id: number, book: Book): Promise<Book> {
  try {
    let fullBook;
    if (!book.author_id || !book.title || !book.year) {
      fullBook = await getBook(id);
    }

    const updatedBook = await booksRepo.update(id, { ...fullBook, ...book });

    return updatedBook;
  } catch (error) {
    throw error;
  }
}

async function removeBook(id: number): Promise<void> {
  try {
    return await booksRepo.remove(id);
  } catch (error) {
    throw error;
  }
}

export default {
  listBooks,
  getBook,
  createBook,
  updateBook,
  removeBook,
};
