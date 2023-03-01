import { gql } from "graphql-tag";

export const typeDefs = gql`
    type Query {
        projects: [Project]
        project(_id: ID!): Project

        tasks(project: ID!): [Task]
    }

    type Mutation {
        createProject(name: String!, description: String): Project
        deleteProject(_id: ID!): String

        createTask(title: String!, project: ID!): Task
        changeStateTask(_id: ID!, state: Boolean!): Task
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
        state: Boolean
        createdAt: String
        updatedAt: String
    }
`;
