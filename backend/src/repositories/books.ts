import pool from '../config/database';
import { Book } from '../types/book';
import usersService from '../services/users';

async function list(): Promise<Book[]> {
  try {
    const preBooks = (await pool.query<Book>('SELECT * FROM book ORDER BY id')).rows;
    const finalBooks: Book[] = [];

    for await (const book of preBooks) {
      const currAuthor = await usersService.getUser(book.author_id!);

      finalBooks.push(<Book>{
        id: book.id,
        title: book.title,
        year: book.year,
        author: { ...currAuthor },
      });
    }

    return finalBooks;
  } catch (error) {
    throw error;
  }
}

async function find(id: number): Promise<Book> {
  try {
    const bookRes = await pool.query<Book>('SELECT * FROM book WHERE id = $1', [id]);
    const book = bookRes.rows[0];
    const author = await usersService.getUser(book.author_id!);

    return <Book>{
      id: book.id,
      title: book.title,
      year: book.year,
      author: { ...author },
    };
  } catch (error) {
    throw error;
  }
}

async function create(bookInfo: Book): Promise<Book> {
  try {
    const { rows } = await pool.query<Book>(
      'INSERT INTO book (title, year, author_id) VALUES ($1, $2, $3) RETURNING *',
      [bookInfo.title, bookInfo.year, bookInfo.author_id]
    );

    return rows[0];
  } catch (error) {
    throw error;
  }
}

async function update(id: number, book: Book): Promise<Book> {
  try {
    const bookRes = await pool.query(
      'UPDATE book SET title = $1, year = $2, author_id = $3 WHERE id = $4 RETURNING *',
      [book.title, book.year, book.author_id, id]
    );

    const updatedBook = bookRes.rows[0];

    return updatedBook;
  } catch (error) {
    throw error;
  }
}

async function remove(id: number): Promise<void> {
  try {
    await pool.query('DELETE FROM book WHERE id = $1', [id]);
  } catch (error) {
    throw error;
  }
}

export default {
  list,
  find,
  create,
  update,
  remove,
};
