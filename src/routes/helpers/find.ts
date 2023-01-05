import { Habit } from "../../schemas/Habits";
import { Publication } from "../../schemas/Publication";
import { User } from "../../schemas/User";

export const findUser = async (userId: string) => {
    return await User.findById(userId);
}
export const findHabit = async (habitId: string) => {
    return await Habit.findById(habitId).populate("publicationIds");
}
export const findPublication = async (publicationId: string) => {
    return await Publication.findById(publicationId);
}
