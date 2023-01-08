import { Request, Response } from "express";
import { Habit } from "../schemas/Habits";
import { Publication } from "../schemas/Publication";
import { User } from "../schemas/User";
import { findHabit } from "./helpers/find";

const getRoutes = {
    
    home: async (req: Request, res: Response) => {
        try{ 
        const user_habits = await Habit.find({ userId: req.query.userId }).populate('publicationIds');
        res.json(user_habits);
    }catch(error) {
        res.status(500).json(error)
        return;
      }
        },
    userByQuery:async (req: Request, res: Response) => {
        try{ 
        const user = await User.findOne(req.query);
        res.json(user)
    }catch(error) {
        res.status(500).json(error)
        return;
      }
    },
    userPublications: async (req: Request, res: Response) => {
        try{ 
        const user_publications = await Publication.find({ userId: req.query.userId }).populate('publications');
        res.json(user_publications);
    }catch(error) {
        res.status(500).json(error)
        return;
      }    },
    userPublication: async (req: Request, res: Response) => {
        try{ 
        const user_publication = await Publication.findById(req.query.pid);
        res.json(user_publication);
    }catch(error) {
        res.status(500).json(error)
        return;
      }
    },
    userPublicationsByHabit: async (req: Request, res: Response) => {
        try{ 
        const user_publications = await Publication.find({ habitId: req.query.hid });
        res.json(user_publications);
    }catch(error) {
        res.status(500).json(error)
        return;
      }
    },
    graphicsRating: async (req: Request, res: Response) => {
        try{ 
        const user_publications = await Publication.find({ userId: req.query.userId, habitId: req.query.habitId });
        res.json({
            user_rating: user_publications.map(publication => ({
                publicationId: publication._id,
                rate: publication.rate,
                createdAt: publication.createdAt
            })),
        });
    }catch(error) {
        res.status(500).json(error)
        return;
      }
    },
    findHabit: async (req: Request, res: Response) => {
        
        const habit = await findHabit(req.query._id as string)
        res.json(habit)
    },


}

export default getRoutes;