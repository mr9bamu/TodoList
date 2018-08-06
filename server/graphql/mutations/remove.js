var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var TodoType = require('../types/task');
var TodoModel = require('../../schema');

exports.remove = {
  type: TodoType.todoType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve(root, params) {
    const removedtask = TodoModel.findByIdAndRemove(params.id).exec();
    if (!removedtask) {
      throw new Error('Error')
    }
    return removedtask;
  }
}
