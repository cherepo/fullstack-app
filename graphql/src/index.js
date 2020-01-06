const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const PgDatabase = require('./datasources/postgresql');
const BookAPI = require('./datasources/bookAPI');
const JavaAPI = require('./datasources/javaAPI');
const MongoDB = require('./datasources/mongodb');

const SERVER_PORT = 4001;

const dataSources = () => ({
  bookAPI: new BookAPI(),
  pgDatabase: new PgDatabase(),
  javaAPI: new JavaAPI(),
  mongodb: new MongoDB()
});

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  dataSources
});

server.listen(SERVER_PORT, () => {
  mongoose.connect('mongodb://localhost:27017/graphql', { useNewUrlParser: true, useUnifiedTopology: true });
}).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});