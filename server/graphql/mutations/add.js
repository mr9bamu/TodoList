var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLBoolean = require('graphql').GraphQLBoolean;
var TodoType = require('../types/task');
var TodoModel = require('../../schema');

exports.add = {
  type: TodoType.todoType,
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    isDone: {
      type: new GraphQLNonNull(GraphQLBoolean),
    }
  },
  resolve(root, params) {
    const tModel = new TodoModel(params);
    const newTask = tModel.save();
    if (!newTask) {
      throw new Error('Error');
    }
    //assign id here maybe
    return newTask;
  }
}