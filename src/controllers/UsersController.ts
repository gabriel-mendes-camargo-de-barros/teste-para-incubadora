import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/user';

import bcrypt from 'bcryptjs';

export default {
  async create(req: Request, res: Response) {
    const {
      name,
      user,
    } = req.body;

    const userRepository = getRepository(User);

    bcrypt.hash(req.body.pass, 10,async function (err, hash) {
      const password = hash;

      const userData = {
        name,
        user,
        password,
      };

      const userResgistred = userRepository.create(userData);

      await userRepository.save(userResgistred);

      userResgistred.password = undefined;

      return res.status(201).json(userResgistred);
    });
  },
};