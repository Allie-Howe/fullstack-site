import { Express, Request, Response } from 'express';
import { userRepo } from '../typeormUtils';

export function createUserRoutes(app: Express) {
  app.get("/api/users/:id", async function (req: Request, res: Response) {
    try {
        const user = await userRepo.findOneBy({
            id: parseInt(req.params.id)
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
  });
}
