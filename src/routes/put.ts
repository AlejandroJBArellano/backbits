import { Request, Response } from "express";
import { findHabit, findPublication, findUser } from "./helpers/find";

export const putRoutes = {
    publication: async (req: Request, res: Response) => {
        const { id } = req.params;
        const publication = await findPublication(id);
        const user = await findUser(req.body.userId);
        const habit = await findHabit(req.body.habitId);
        try{ 
        if(!user) {
            res.status(400).json({
                message: "User not found"
            });
            return
        };
        if(!habit) {
            res.status(400).json({
                message: "Habit not found"
            });
            return
        };
        if (!publication) {
            res.status(404).send("Publication not found");
            return;
        } else {
            publication.title = req.body.title;
            publication.description = req.body.description;
            publication.customProperties = req.body.customProperties;
            publication.rate = req.body.rate;
            await publication.save();
            res.status(200).send(publication);
        }
    }catch(error){
        return error
    }
    },
    user: async (req: Request, res: Response) => {
        const { id } = req.params;
        const user = await findUser(id);
        try{ 
        if(!user) {
            res.status(400).json({
                message: "User not found"
            });
            return
        };
        user.name = req.body.name;
        user.email = req.body.email;
        await user.save();
        res.json(user);
    }catch(error){
        return error
    }
    },
    habit: async (req: Request, res: Response) => {
        const { id } = req.params;
        const habit = await findHabit(id);
        if(!habit) {
            res.status(400).json({
                message: "Habit not found"
            });
            return
        };
        habit.title = req.body.title;
        habit.description = req.body.description;
        await habit.save();
        res.json(habit);
    }

}