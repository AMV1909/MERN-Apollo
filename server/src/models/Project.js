import { Schema, model } from "mongoose";

const projectSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export default model("Project", projectSchema);
