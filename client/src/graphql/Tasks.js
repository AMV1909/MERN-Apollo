import { gql } from "@apollo/client";

export const GET_TASKS = gql`
    query getTasks($project: ID!) {
        tasks(project: $project) {
            _id
            title
            state
        }
    }
`;

export const CREATE_TASK = gql`
    mutation createTask($title: String!, $project: ID!) {
        createTask(title: $title, project: $project) {
            _id
            title
            state
        }
    }
`;

export const CHANGE_STATE_TASK = gql`
    mutation changeStateTask($id: ID!, $state: Boolean!) {
        changeStateTask(_id: $id, state: $state) {
            _id
            title
            state
        }
    }
`;

export const DELETE_TASK = gql`
    mutation deleteTask($id: ID!) {
        deleteTask(_id: $id)
    }
`;
