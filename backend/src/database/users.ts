import pool from '../config/database';
import { User, UserInfo } from '../types/user';

async function list(): Promise<User[]> {
  try {
    const { rows } = await pool.query('SELECT * FROM user_info ORDER BY id');
    return rows;
  } catch (error) {
    throw error;
  }
}

async function find(id: number): Promise<User> {
  try {
    const { rows } = await pool.query('SELECT * FROM user_info WHERE id = $1', [id]);
    return rows[0];
  } catch (error) {
    throw error;
  }
}

async function create(userInfo: UserInfo): Promise<User> {
  try {
    const { rows } = await pool.query<User>(
      'INSERT INTO user_info (name, age, email, phone) VALUES ($1, $2, $3, $4) RETURNING *',
      [userInfo.name, userInfo.age, userInfo.email, userInfo.phone]
    );

    return rows[0];
  } catch (error) {
    throw error;
  }
}

async function update(id: number, user: UserInfo): Promise<void> {
  try {
    const {
      rows,
    } = await pool.query(
      'UPDATE user_info SET name = $1, age = $2, email = $3, phone = $4 WHERE id = $5',
      [user.name, user.age, user.email, user.phone, id]
    );
  } catch (error) {
    throw error;
  }
}

async function remove(id: number): Promise<void> {
  try {
    await pool.query('DELETE FROM user_info WHERE id = $1', [id]);
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
