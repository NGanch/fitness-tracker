import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as Sentry from '@sentry/node';

const app = express();
const PORT = 3000;

// --- Sentry ---
Sentry.init({
    dsn: 'https://твій_DSN@sentry.io/PROJECT_ID', // вставити свій DSN
    tracesSampleRate: 1.0,
});

// --- Middleware ---
app.use(Sentry.Handlers.requestHandler() as any);
app.use(cors());
app.use(express.json());

// --- Routes ---
app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'OK' });
});

// --- Error handler ---
app.use(Sentry.Handlers.errorHandler() as any);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});