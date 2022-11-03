import { Request, Response } from "express";
import { Habit } from "../schemas/Habits";
import { Publication } from "../schemas/Publication";

const getRoutes = {
    home: async (req: Request, res: Response) => {
        const user_habits = await Habit.find({ userId: req.query.userId }).populate('publicationIds');
        res.json(user_habits);
    },
    userPublications: async (req: Request, res: Response) => {
        const user_publications = await Publication.find({ userId: req.query.userId }).populate('publications');
        res.json(user_publications);
    },
    userPublication: async (req: Request, res: Response) => {
        const user_publication = await Publication.findById(req.query.pid);
        res.json(user_publication);
    },
    userPublicationsByHabit: async (req: Request, res: Response) => {
        const user_publications = await Publication.find({ habitId: req.query.hid });
        res.json(user_publications);
    },
    graphicsRating: async (req: Request, res: Response) => {
        const user_publications = await Publication.find({ userId: req.query.userId, habitId: req.query.habitId });
        res.json({
            user_rating: user_publications.map(publication => ({
                publicationId: publication._id,
                rate: publication.rate,
                createdAt: publication.createdAt
            })),
        });
    }
}

export default getRoutes;