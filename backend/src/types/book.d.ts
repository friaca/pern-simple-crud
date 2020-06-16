import { User } from './user';

export interface Book {
  id: number;
  title: string;
  year: number;
  author: User;
  author_id?: number;
}
