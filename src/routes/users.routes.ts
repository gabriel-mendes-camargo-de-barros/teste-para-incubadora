import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import AuthenticationController from '../controllers/AuthenticationController';
import ProjectController from '../controllers/ProjectController';
import authMiddleware from '../middlawares/auth';



const routes = Router();

routes.post('/register-user', UsersController.create);
routes.post('/authenticate', AuthenticationController.create);
routes.get('/projects', authMiddleware, ProjectController.index);

export default routes;  