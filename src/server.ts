import express from 'express';
import './database/connection';
import cors from 'cors';

import routes from './routes/users.routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(3333);