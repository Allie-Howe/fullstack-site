import { Express, Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { JWT_SECRET } from '..';
import { User } from '../entity/User';
import { AppDataSource, userRepo } from '../typeormUtils';

export function createAuthRoutes(app: Express) {
  app.post("/api/auth/register", async function (req: Request, res: Response) {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const userRepo = AppDataSource.getRepository(User);

    try {
        const existingUser = await userRepo.findOneBy({ email: email });

        if (existingUser) return res.status(409).json({ message: "Email already exists" });

        const user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.password = password;

        await userRepo.save(user);

        const { password: _, ...userWithoutPassword } = user;
        res.status(201).json({ message: "User created successfully", user: userWithoutPassword });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.post("/api/auth/login", async function (req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }


    try {
        const user = await userRepo.createQueryBuilder("user")
            .addSelect("user.password")
            .where("user.email = :email", { email })
            .getOne();

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const tokenPayload = { id: user.id, email: user.email, firstName: user.firstName };
        const token = sign(tokenPayload, JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: "Login successful", token });

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
}
