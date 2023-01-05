import { Request, Response } from "express";
import { Habit, habitAvailableQueries } from "../schemas/Habits";
import { User, userAvailableQueries } from "../schemas/User";
import { Publication } from "../schemas/Publication";
import { createQueriesObject } from '../utils/createQueriesObject';

const getRoutes = {
    home: async (req: Request, res: Response) => {
        const queries = req.query as { [key: string]: string; }
        const query = createQueriesObject(queries, habitAvailableQueries)
        if (req.query._id) { query["_id"] = req.query._id }        
        const user_habits = await Habit.find({...query, userId: req.query.userId }).populate('publicationIds');
        res.json(user_habits);
    },
    userByQuery:async (req: Request, res: Response) => {
        const queries = req.query as { [key: string]: string; }
        const  query = createQueriesObject(queries, userAvailableQueries)
        if (req.query._id) { query["_id"] = req.query._id }   
        const user = await User.findOne(query);
        res.json(user)
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