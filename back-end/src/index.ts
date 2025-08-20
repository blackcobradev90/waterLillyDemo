import express, { Request, Response } from 'express';
import authRoutes from './routes/auth.routes';
import userFormRoutes from './routes/userform.routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('getting started');
});

app.use('/api/auth', authRoutes);
app.use('/api/userform', userFormRoutes);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
