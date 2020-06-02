import { Router } from 'express';
import pool from '../database/index';

const routes = Router();

routes.get('/users', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM user_info ORDER BY id');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err.message);
  }
});

routes.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM user_info WHERE id = $1', [id]);

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

routes.post('/users', async (req, res) => {
  try {
    const { name, age, email, phone } = req.body;
    const {
      rows,
    } = await pool.query(
      'INSERT INTO user_info (name, age, email, phone) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, age, email, phone]
    );

    res.status(200).json(rows);
  } catch (err) {
    console.error(err.message);
  }
});

routes.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, email, phone } = req.body;

    const {
      rows,
    } = await pool.query(
      'UPDATE user_info SET name = $1, age = $2, email = $3, phone = $4 WHERE id = $5',
      [name, age, email, phone, id]
    );

    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
  }
});

routes.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM user_info WHERE id = $1', [id]);

    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
  }
});

export default routes;
