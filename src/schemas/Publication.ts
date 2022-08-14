import { model, Schema } from "mongoose";

const PublicationSchema = new Schema({
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
    customProperties: [
        {
            key: {
                type: String,
                required: true
            },
            value: {
                type: String,
                required: true
            }
        }
    ],
    rate: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    habitId: {
        type: Schema.Types.ObjectId,
        ref: 'Habit'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    versionKey: false,
    timestamps: true,
    collection: 'publications',
    minimize: true,
    strict: true // The strict option, (enabled by default), ensures that values passed to our model constructor that were not specified in our schema do not get saved to the db
});

interface IPublication {
    title: string;
    description: string;
    customProperties: [
        {
            key: string;
            value: string;
        }
    ];
    rate: number;
    habitId: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

export const Publication = model<IPublication>('Publication', PublicationSchema);
