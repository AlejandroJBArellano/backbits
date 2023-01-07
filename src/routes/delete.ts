import { Request, Response } from "express";
import { findHabit, findPublication, findUser } from "./helpers/find";

const deleteRoutes = {
    publication: async (req: Request, res: Response) => {
        const { id } = req.params;
        try{
            const publication = await findPublication(id);
            if (!publication) {
                res.status(404).json({
                    message: "Publication not found"
                });
                return;
            } else {
                await publication.remove();
                res.status(200).json({
                    message: "Publication deleted"
                });
            }
    

        }catch(error){
          return error
          

        }
           },
    user: async (req: Request, res: Response) => {
        const { id } = req.params;
    try{ 
        const user = await findUser(id);
        if(!user) {
            res.status(400).json({
                message: "User not found"
            });
            return;
        };
        await user.remove();
        res.status(200).json({
            message: "User deleted"
        });
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
            return;
        };
        await habit.remove();
        res.status(200).json({
            message: "Habit deleted"
        });
    },

    
}
