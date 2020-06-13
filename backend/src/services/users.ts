import usersDb from '../repositories/users';
import { User, UserInfo } from '../types/user';

async function listUsers(): Promise<User[]> {
  return await usersDb.list();
}

async function getUser(id: number): Promise<User> {
  return await usersDb.find(id);
}

async function createUser(userInfo: UserInfo): Promise<User> {
  return await usersDb.create(userInfo);
}

async function updateUser(id: number, userInfo: UserInfo): Promise<void> {
  return await usersDb.update(id, userInfo);
}

async function removeUser(id: number): Promise<void> {
  return await usersDb.remove(id);
}

export default {
  listUsers,
  getUser,
  createUser,
  updateUser,
  removeUser,
};
