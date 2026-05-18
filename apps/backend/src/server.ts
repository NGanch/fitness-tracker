import 'dotenv/config';
import * as Sentry from '@sentry/node';
import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';


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

Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
