import * as dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
import { AppDataSource } from './typeormUtils';
import { createAuthRoutes } from './routes/auth';
import { createUserRoutes } from './routes/user';

const app = express().use(express.json());

export const JWT_SECRET = process.env.JWT_SECRET ?? '';
if (!JWT_SECRET) {
    console.error("FATAL ERROR: JWT_SECRET is not defined in .env file");
    process.exit(1);
}

AppDataSource.initialize()
    .then(() => console.log("Data Source has been initialized!"))
    .catch(err => console.error("Error during Data Source initialization:", err));

app.get('/api/hello', (req: Request, res: Response) => {
    res.json({ message: 'Hello from the API!' });
});

createUserRoutes(app);
createAuthRoutes(app);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`API server listening at http://localhost:${port} in ${process.env.NODE_ENV || 'development'} mode`);
});
