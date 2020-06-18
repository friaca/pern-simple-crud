import pool from '../config/database';
import { Book } from '../types/book';
import usersService from '../services/users';
import { User } from '../types/user';

async function list(): Promise<Book[]> {
  try {
    const preBooks = (await pool.query<Book>('SELECT * FROM book ORDER BY id')).rows;

    return preBooks;
  } catch (error) {
    throw error;
  }
}

async function find(id: number): Promise<Book> {
  try {
    const bookRes = await pool.query<Book>('SELECT * FROM book WHERE id = $1', [id]);
    const book = bookRes.rows[0];

    return book;
  } catch (error) {
    throw error;
  }
}

async function create(bookInfo: Book): Promise<Book> {
  try {
    const bookRes = await pool.query<Book>(
      'INSERT INTO book (title, year, author_id) VALUES ($1, $2, $3) RETURNING *',
      [bookInfo.title, bookInfo.year, bookInfo.author_id]
    );
    const book = bookRes.rows[0];

    return book;
  } catch (error) {
    throw error;
  }
}

async function update(id: number, book: Book): Promise<Book> {
  try {
    const bookRes = await pool.query(
      'UPDATE book SET title = $1, year = $2, author_id = $3 WHERE id = $4 RETURNING *',
      [book.title, book.year, book.author_id ?? book.author.id, id]
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
