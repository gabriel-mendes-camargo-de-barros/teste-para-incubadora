import { Request, Response } from 'express'; 
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
const authConfig = "cd68e1f361caa050df6bc0c5260c44ca";
import jwt from 'jsonwebtoken';

import User from '../models/user';

export default {
  async create(req: Request, res: Response){
    const { user, pass } = req.body;

    const userRepository = getRepository(User);

    const userData = await userRepository.findOne({
      select: ['id', 'name', 'user', 'password'],
      where: { user }
    });

    if(!userData)
      return res.status(400).send({ error: 'user not found'});

    if (!await bcrypt.compare(pass, userData.password))
      return res.status(400).send({ error: 'Invalid password'});

    userData.password = undefined;

    const token = jwt.sign({ id: userData.id }, authConfig, {
      expiresIn: 1800,
    });

    return res.status(201).json({ userData, token });
  }
};