import booksRepo from '../repositories/books';
import usersServices from '../services/users';
import { mountBook } from '../utils/bookHelper';
import { Book } from '../types/book';
import { NotFound } from '../utils/error';
import { User } from '../types/user';
import books from '../repositories/books';

async function listBooks(): Promise<Book[]> {
  try {
    const preBooks = await booksRepo.list();
    const uniqueAuthorIds = preBooks
      .map((book: Book) => book.author_id!)
      .reduce((acc, curr) => {
        if (!acc.includes(curr)) {
          acc.push(curr);
        }

        return acc;
      }, [] as number[]);

    let authors: User[] = [];
    for await (const authorId of uniqueAuthorIds) {
      authors.push(await usersServices.getUser(authorId));
    }

    const books = preBooks.map((book: Book) => {
      const currAuthor = authors.find(author => author.id === book.author_id);

      return mountBook(book, currAuthor!);
    });

    return books ?? [];
  } catch (error) {
    throw error;
  }
}

async function getBook(id: number): Promise<Book> {
  try {
    const preBook = await booksRepo.find(id);

    if (!preBook) {
      throw new NotFound(`Couldn't find book with ID ${id}`);
    }

    const author = await usersServices.getUser(preBook.author_id!);

    return mountBook(preBook, author);
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

    return mountBook(newBook, author);
  } catch (error) {
    throw error;
  }
}

async function updateBook(id: number, book: Book): Promise<Book> {
  try {
    let previousBook = await getBook(id);

    await booksRepo.update(id, { ...previousBook, ...book });

    return await getBook(id);
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
