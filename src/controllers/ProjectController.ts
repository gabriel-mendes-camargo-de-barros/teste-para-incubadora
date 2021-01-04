import { Request, Response} from 'express';


export default {
  async index(req: Request, res: Response){
    res.send({ message: 'ok', user: req.userId });
  }
};