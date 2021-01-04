import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const authConfig = "cd68e1f361caa050df6bc0c5260c44ca";

module.exports = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if(!authHeader)
    return res.status(401).send({ error: 'No Token Provided'});

  const parts = authHeader.split(' ');

  if(parts.length !== 2)
    return res.status(401).send({ error: 'Token error' });

  const [ scheme, token ] = parts;
  
  if(!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: 'Token malformatted' });
  }

  jwt.verify(token, authConfig, (err, decoded) => {
    if(err) return res.status(401).send({ error: 'Token invalid' });

    req.userId = decoded.id;

    next();
  })

};