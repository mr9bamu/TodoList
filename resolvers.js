//not in use
exports.resolvers = {
    Query: {
        getTasks: async (root,args, { Recipe}) => {
           
            const allTasks = await Task.find();
            return allTasks;

        }
    },

    Mutation: {
        addTask: async (root, {id,name,isDone},{Task}) => {
            
            const newTask = await new Task({
                id,
                name,
                isDone

            }).save();
            
            return newTask;

        }
    }
};