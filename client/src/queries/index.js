import gql from 'graphql-tag';

//create your GraphQL query and wrap them in gql
export const GET_TASKS = gql`
    query {
        tasks{
            id
            name
            isDone
        }
    }
`;

//could add queries for showing specific items ie:a=show all items where isDone==false