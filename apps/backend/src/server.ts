import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import * as Sentry from '@sentry/node';

import eventsRouter from './routes/events.routes.js';
import userRouter from './routes/user.routes.js';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'OK' });
});

app.use('/api/events', eventsRouter);
app.use('/api/users', userRouter);


app.get('/debug-sentry', () => {
  throw new Error('My first Sentry error!');
});

Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

