import { Schema, model } from "mongoose";

const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },
        state: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export default model("Task", taskSchema);
