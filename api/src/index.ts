import * as dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

// Create a new DataSource instance using environment variables
const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "", // Be cautious with default passwords in production
    database: process.env.DB_NAME || "test",
    entities: [User],
    synchronize: process.env.NODE_ENV === 'development', // Synchronize only in development
    logging: process.env.NODE_ENV === 'development', // Log only in development
})

const app = express();
// Use environment variable for port, default to 3001
const port = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// Define JWT secret from environment variable
// It's critical this is set in a production environment
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    console.error("FATAL ERROR: JWT_SECRET is not defined in .env file");
    process.exit(1); // Exit if JWT_SECRET is not set
}

// Initialize TypeORM connection
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

app.get('/hello', (req: Request, res: Response) => {
    res.json({ message: 'Hello from the API!' });
});

// Endpoint to get user by ID
app.get("/api/users/:id", async function (req: Request, res: Response) {
    const userRepository = AppDataSource.getRepository(User)
    try {
        const user = await userRepository.findOneBy({
            id: parseInt(req.params.id)
        })
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user)
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})

// --- Authentication Endpoints ---

// Register Endpoint
app.post("/api/auth/register", async function (req: Request, res: Response) {
    const { firstName, lastName, email, password } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const userRepository = AppDataSource.getRepository(User);

    try {
        // Check if user already exists
        const existingUser = await userRepository.findOneBy({ email: email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already exists" });
        }

        // Create new user instance
        const user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.password = password; // Password will be hashed by @BeforeInsert hook

        // Save the user (password gets hashed automatically)
        await userRepository.save(user);

        // Don't send password back
        const { password: _, ...userWithoutPassword } = user;
        res.status(201).json({ message: "User created successfully", user: userWithoutPassword });

    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Login Endpoint
app.post("/api/auth/login", async function (req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const userRepository = AppDataSource.getRepository(User);

    try {
        // Find user by email, explicitly selecting the password
        const user = await userRepository.createQueryBuilder("user")
            .addSelect("user.password")
            .where("user.email = :email", { email })
            .getOne();

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" }); // User not found
        }

        // Compare provided password with stored hash
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" }); // Incorrect password
        }

        // Generate JWT - Include firstName in the payload
        const tokenPayload = { id: user.id, email: user.email, firstName: user.firstName };
        const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour

        res.json({ message: "Login successful", token });

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// --- End Authentication Endpoints ---

app.listen(port, () => {
    console.log(`API server listening at http://localhost:${port} in ${process.env.NODE_ENV || 'development'} mode`);
});
