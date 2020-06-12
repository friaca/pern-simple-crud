import { Router } from 'express';
import usersServices from '../services/users';

const routes = Router();

routes.get('/users', async (req, res) => {
  try {
    const users = await usersServices.listUsers();
    await res.status(200).json(users);
  } catch (err) {
    console.error(err.message);
  }
});

routes.get('/users/:id', async (req, res) => {
  try {
    let { id } = req.params;

    if (isNaN(Number(id))) {
      throw new Error('id is not number');
    }

    const user = await usersServices.getUser(Number(id));

    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
  }
});

routes.post('/users', async (req, res) => {
  try {
    const { name, age, email, phone } = req.body;
    const newUser = await usersServices.createUser({ name, age, email, phone });

    res.status(200).json(newUser);
  } catch (err) {
    console.error(err.message);
  }
});

routes.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, email, phone } = req.body;

    if (isNaN(Number(id))) {
      throw new Error('id is not number');
    }

    const updatedUser = usersServices.updateUser(Number(id), { name, age, email, phone });

    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
  }
});

routes.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      throw new Error('id is not number');
    }

    usersServices.removeUser(Number(id));

    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
  }
});

export default routes;
