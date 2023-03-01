import projectSchema from "../models/Project.js";
import taskSchema from "../models/Task.js";

export const resolvers = {
    Query: {
        // Projects
        projects: async () => {
            return await projectSchema
                .find()
                .then((projects) => projects)
                .catch((err) => err);
        },

        project: async (_, { _id }) => {
            return await projectSchema
                .findById(_id)
                .then((project) => project)
                .catch((err) => err);
        },

        // Tasks
        tasks: async (_, { project }) => {
            return await taskSchema
                .find({ project })
                .then((tasks) => tasks)
                .catch((err) => err);
        },
    },

    Mutation: {
        // Projects
        createProject: async (_, { name, description }) => {
            return await projectSchema
                .create({ name, description })
                .then((project) => project)
                .catch((err) => err);
        },

        deleteProject: async (_, { _id }) => {
            return await projectSchema
                .findByIdAndDelete(_id)
                .then(async () => {
                    return await taskSchema
                        .deleteMany({ project: _id })
                        .then(() => "Project deleted")
                        .catch((err) => err);
                })
                .catch((err) => err);
        },

        // Tasks
        createTask: async (_, { title, project }) => {
            return await projectSchema
                .findById(project)
                .then(async (project) => {
                    if (!project) throw new Error("Project not found");

                    return await taskSchema
                        .create({ title, project })
                        .then((task) => task)
                        .catch((err) => err);
                })
                .catch((err) => err);
        },

        changeStateTask: async (_, { _id, state }) => {
            return await taskSchema
                .findByIdAndUpdate(_id, { state })
                .then((task) => task)
                .catch((err) => err);
        },

        deleteTask: async (_, { _id }) => {
            return await taskSchema
                .findByIdAndDelete(_id)
                .then(() => "Task deleted")
                .catch((err) => err);
        },
    },

    Project: {
        tasks: async ({ _id }) => {
            return await taskSchema
                .find({ project: _id })
                .then((tasks) => tasks)
                .catch((err) => err);
        },
    },

    Task: {
        project: async ({ project }) => {
            return await projectSchema
                .findById(project)
                .then((project) => project)
                .catch((err) => err);
        },
    },
};
