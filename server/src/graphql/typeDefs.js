import { gql } from "graphql-tag";

export const typeDefs = gql`
    type Query {
        hello: String

        projects: [Project]
        project(_id: ID!): Project

        tasks: [Task]
        task(_id: ID!): Task
    }

    type Mutation {
        createProject(name: String!, description: String): Project
        updateProject(_id: ID!, name: String!, description: String): Project
        deleteProject(_id: ID!): String

        createTask(title: String!, project: ID!): Task
        updateTask(_id: ID!, title: String!, project: ID!): Task
        deleteTask(_id: ID!): String
    }

    type Project {
        _id: ID!
        name: String!
        description: String
        tasks: [Task]
        createdAt: String
        updatedAt: String
    }

    type Task {
        _id: ID!
        title: String!
        project: Project!
        createdAt: String
        updatedAt: String
    }
`;
