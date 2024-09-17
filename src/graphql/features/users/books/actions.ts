import {gql} from "@apollo/client";

export const CREATE_BOOK = gql`
    mutation createBook($name: String!, $userId: ID!) {
        createBook(name: $name, userId: $userId) {
            id
            name
        }
    }
`;

export const EDIT_BOOK = gql`
    mutation updateBook($id: ID!, $name: String!) {
        updateBook(id: $id,  name: $name) {
            id
            name
        }
    }
`;

export const DELETE_BOOK = gql`
    mutation deleteBook($id: ID!) {
        deleteBook(id: $id) {
            message
        }
    }
`;