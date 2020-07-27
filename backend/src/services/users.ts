import usersRepo from '../repositories/users';
import { User } from '../types/user';
import { NotFound } from '../utils/error';
import { Book } from '../types/book';
import { mountBook } from '../utils/bookHelper';

async function listUsers(): Promise<User[]> {
  try {
    const users = await usersRepo.list();
    return users ?? [];
  } catch (error) {
    throw error;
  }
}

async function getUser(id: number): Promise<User> {
  try {
    const user = await usersRepo.find(id);

    if (!user) {
      throw new NotFound(`Couldn't find user with ID ${id}`);
    }

    return user;
  } catch (error) {
    throw error;
  }
}

async function createUser(userInfo: User): Promise<User> {
  try {
    return await usersRepo.create(userInfo);
  } catch (error) {
    throw error;
  }
}

async function updateUser(id: number, userInfo: User): Promise<void> {
  try {
    return await usersRepo.update(id, userInfo);
  } catch (error) {
    throw error;
  }
}

async function removeUser(id: number): Promise<void> {
  try {
    return await usersRepo.remove(id);
  } catch (error) {
    throw error;
  }
}

async function getUserBooks(id: number): Promise<Book[]> {
  try {
    const user = await getUser(id); 
    const books = await usersRepo.findBooks(id);

    return books.map(book => mountBook(book, user));
  } catch (error) {
    throw error;
  }
}

export default {
  listUsers,
  getUser,
  createUser,
  updateUser,
  removeUser,
  getUserBooks
};
