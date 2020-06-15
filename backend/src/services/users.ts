import usersDb from '../repositories/users';
import { User, UserInfo } from '../types/user';
import { NotFound } from '../utils/error';

async function listUsers(): Promise<User[]> {
  try {
    const users = await usersDb.list();
    return users ?? [];
  } catch (error) {
    throw error;
  }
}

async function getUser(id: number): Promise<User> {
  try {
    const user = await usersDb.find(id);

    if (!user) {
      throw new NotFound(`Couldn't find user with ID ${id}`);
    }

    return user;
  } catch (error) {
    throw error;
  }
}

async function createUser(userInfo: UserInfo): Promise<User> {
  try {
    return await usersDb.create(userInfo);
  } catch (error) {
    throw error;
  }
}

async function updateUser(id: number, userInfo: UserInfo): Promise<void> {
  try {
    return await usersDb.update(id, userInfo);
  } catch (error) {
    throw error;
  }
}

async function removeUser(id: number): Promise<void> {
  try {
    return await usersDb.remove(id);
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
};
