import { model, Schema } from "mongoose";

export const availableQueries = ["title", "description"]

const HabitSchema = new Schema(
{
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500
    },
    publicationIds: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Publication'
        }
    ],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    versionKey: false,
    timestamps: true,
    collection: 'habits',
    minimize: true,
    strict: true // The strict option, (enabled by default), ensures that values passed to our model constructor that were not specified in our schema do not get saved to the db
});

export const Habit = model('Habit', HabitSchema);
