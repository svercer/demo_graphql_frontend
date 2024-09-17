import { gql } from "@apollo/client";

export const GET_USERS = gql`
    query GetUsers($pageSize: String, $page: Int) {
        users(pageSize: $pageSize, page: $page) {
            data {
                email
                id
                name
                books {
                    id
                    name
                }
            }
            meta {
                currentPage
                totalItems
                pageSize
            }
        }
    }
`;

export const GET_USER = gql`
    query getUser($id: ID!) {
        user(id: $id) {
            id,
            name, 
            email, 
            books {
                id, 
                name
            }
        }
    }
`;


export const CREATE_USER = gql`
    mutation createUser($name: String!, $email: String!) {
        createUser(name: $name, email: $email) {
            id
            name
        }
    }
`;

export const EDIT_USER = gql`
    mutation updateUser($id: ID!, $name: String!, $email: String!) {
        updateUser(id: $id, name: $name, email: $email) {
            id
            name
        }
    }
`;

export const DELETE_USER = gql`
    mutation deleteUser($id: ID!) {
        deleteUser(id: $id) {
            message
        }
    }
`;