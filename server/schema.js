var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

//Schema for a todoList item
var todoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  isDone: {
    type: Boolean,
    required: true
  }
});

var Model = mongoose.model('Todo', todoSchema);
module.exports = Model;
