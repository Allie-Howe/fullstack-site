import * as dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';

const app = express().use(express.json());

export const JWT_SECRET = process.env.JWT_SECRET ?? '';
if (!JWT_SECRET) {
    console.error("FATAL ERROR: JWT_SECRET is not defined in .env file");
    process.exit(1);
}

app.get('/api/hello', (req: Request, res: Response) => {
    res.json({ message: 'Hello from the API!' });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`API server listening at http://localhost:${port} in ${process.env.NODE_ENV || 'development'} mode`);
});
