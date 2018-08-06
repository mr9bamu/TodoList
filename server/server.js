//const Hapi = require('hapi');
const express = require('express');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');

//initialize app
const app = express();

app.use('*', cors());

//create graphql schema
const todoSchema = require('./graphql/index').todoSchema;
app.use('/graphql', cors(), graphqlHTTP({
  schema: todoSchema,
  rootValue: global,
  graphiql: true
}));

//connect to db using mongoose
mongoose.connect('mongodb://localhost/todo');

//test db connection
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));

db.once('open', function(){
  //connected!
  console.log('DB connected')
});

// run app on port 4000 and check
const PORT = process.env.PORT || 4000;

app.listenerCount(PORT);

app.listen(PORT, () => {
  console.log('A GraphQL API running at port ' + PORT);
});
