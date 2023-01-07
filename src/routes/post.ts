import { Request, Response } from "express";
import { Habit } from "../schemas/Habits";
import { Publication } from "../schemas/Publication";
import { User } from "../schemas/User";
import { findHabit, findUser } from "./helpers/find";

const postRoutes = {
    publication: async (req: Request, res: Response) => {
        const habit = await findHabit(req.body.habitId);
        const user = await findUser(req.body.userId);
     try{ 
        /* 
         body = {
            title: string,
            description: string,
            customProperties: [
                {
                    key: string;
                    value: string;
                }
            ],
            rate: number,
            habitId: string,
            userId: string
         }
        */
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
        const publication = new Publication({
            title: req.body.title,
            description: req.body.description,
            customProperties: req.body.customProperties.map((customProperty: {key: string; value: string}) => {
                return {
                    key: customProperty.key,
                    value: customProperty.value
                }
            }),
            rate: req.body.rate,
            habitId: req.body.habitId,
            userId: req.body.userId
        });
        await publication.save();
        habit.publicationIds.push(publication.id);
        await habit.save();
        user.publicationIds.push(publication.id);
        await user.save();
        res.json(publication);
    }catch(error){
        return error
    }
    },
    user: async (req: Request, res: Response) => {
       try{ 
        /* 
         body = {
            name: string,
            email: string,
            password: string            
         }
        */
        const user = new User({
            name: req.body.name,
            email: req.body.email
        });
        await user.save();
        res.json(user);
    }catch(error){
        return error
    }
    },
    habit: async (req: Request, res: Response) => {
        
        /* 
         body = {
            title: string,
            description: string,
            userId: string
         }
        */
        if(!findUser(req.body.userId)) return;
        const habit = new Habit({
            title: req.body.title,
            description: req.body.description,
            userId: req.body.userId
        });
        await habit.save();
        res.json(habit);
    }

}



export default postRoutes;