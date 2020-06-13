import { Router } from 'express';
import usersServices from '../services/users';
import { BadRequest } from '../utils/error';

const routes = Router();

routes.param('id', (req, res, next) => {
  try {
    console.log(req.params.id);
    if (isNaN(Number(req.params.id))) {
      throw new BadRequest('ID must be a number');
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
});

routes.get('/users', async (req, res, next) => {
  try {
    const users = await usersServices.listUsers();
    await res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

routes.get('/users/:id', async (req, res, next) => {
  let { id } = req.params;

  try {
    const user = await usersServices.getUser(Number(id));

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

routes.post('/users', async (req, res, next) => {
  try {
    const newUser = await usersServices.createUser(req.body);

    res.status(200).json(newUser);
  } catch (err) {
    next(err);
  }
});

routes.put('/users/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const updatedUser = usersServices.updateUser(Number(id), req.body);

    res.sendStatus(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
});

routes.delete('/users/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    usersServices.removeUser(Number(id));

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

export default routes;
