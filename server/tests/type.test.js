import task from '../graphql/types/task';

describe('Testing task type ...', () => {
    test('fields integrity when it is used as \'todoType\'.', () => {
        let taskFields = task.todoType.getFields();

        expect(taskFields).toHaveProperty('id');
        expect(taskFields.id.type).toMatchObject(new graphql.GraphQLNonNull(graphql.GraphQLID));
        /*expect(taskFields).toHaveProperty('description');
        expect(taskFields.description.type).toMatchObject(graphql.GraphQLString);*/
    });
});