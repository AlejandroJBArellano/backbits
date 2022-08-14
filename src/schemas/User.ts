import { model, Schema } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    habitIds: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Habit'
        }
    ],
    publicationIds: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Publication'
        }
    ]
}, {
    versionKey: false,
    timestamps: true,
    collection: 'users',
    minimize: true,
    strict: true // The strict option, (enabled by default), ensures that values passed to our model constructor that were not specified in our schema do not get saved to the db
});

export const User = model('User', UserSchema);