import gql from "graphql-tag";

//create your GraphQL mutation, wrap it in gql
export const ADD_TASK = gql`
  mutation AddTask($name: String!){
    addTask(name: $name, isDone: false){
      id
      name
      isDone
    }
  }
`;

export const COMPLETE_TASK = gql`
mutation completeTask($id: ID!, $isDone: Boolean!) {
    completeTask(id: $id, isDone: $isDone){
        id
        name
        isDone
    }
}
`;


export const DELETE_TASK = gql`
    mutation removeTask($id: ID!){
        removeTask(id:$id){
            id
            name
            isDone
        }
    }`;

export const UPDATE_TASK = gql`
    mutation updateTask($id: ID!, $name: String){
        updateTask(id:$id, name: $name){
            id
            name
            isDone
        }
    }`;