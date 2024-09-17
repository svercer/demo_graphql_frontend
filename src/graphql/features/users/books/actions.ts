import {gql} from "@apollo/client";

export const CREATE_BOOK = gql`
    mutation createBook($name: String!, $userId: ID!, $price: String!) {
        createBook(name: $name, userId: $userId, price: $price) {
            id
            name
        }
    }
`;

export const EDIT_BOOK = gql`
    mutation updateBook($id: ID!, $name: String!, $price: String!) {
        updateBook(id: $id,  name: $name, price: $price) {
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