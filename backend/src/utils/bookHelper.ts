import { Book } from '../types/book';
import { User } from '../types/user';

export function mountBook(preBook: Book, author: User): Book {
  return <Book>{
    id: preBook.id,
    title: preBook.title,
    year: preBook.year,
    author: { ...author },
  };
}
