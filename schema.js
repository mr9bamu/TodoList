//not in use
exports.typeDefs = `
    type Task {
        _id: ID
        name: String!
        createDate: String
        isDone: Boolean
    }
    type Query {
        getTasks: [Task]

    type Mutation {
        addTask(name: String!):Task
    }

`;