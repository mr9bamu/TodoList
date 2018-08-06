// use resolvers instead ...?
var addTask = require('./add').add;
var removeTask = require('./remove').remove;
var updateTask = require('./update').update;
var completeTask = require('./complete').complete;

module.exports = {
  addTask,
  removeTask,
  updateTask,
  completeTask
}