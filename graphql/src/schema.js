/*
Every graph API is centered around its schema. You can think of a 
schema as a blueprint that describes all of your data's types and 
their relationships. A schema also defines what data we can fetch 
through queries and what data we can update through mutations. It 
is strongly typed, which unlocks powerful developer tooling.

Schemas are at their best when they are designed around the needs 
of the clients that are consuming them. Since a schema sits in 
between your clients and your underlying services, it serves as 
a perfect middle ground for frontend and backend teams to collaborate. 
*/
const { gql } = require('apollo-server');

// Define types
const typeDefs = gql`
type Query {
  books(
    """
    The number of results to show. Must be >= 1. Default = 20
    """
    pageSize: Int
    """
    If you add a cursor here, it will only return results _after_ this cursor
    """
    after: String
  ): BookConnection!
  book(id: ID!): Book
  customers: [Customer]
  api_customers: [Customer]
  comments: [Comment]
}

type Book {
  id: ID!
  title: String
  author: String
  isPublished: Boolean
  description: Description
}

"""
  Simple wrapper around our list of books that contains a cursor to the
  last item in the list. Pass this cursor to the books query to fetch results
  after these.
"""
type BookConnection {
  cursor: String!
  hasMore: Boolean!
  books: [Book]!
}

type Description {
  id: ID!
  content: String
  version: String
}

type Customer {
  id: ID!
  firstname: String
  lastname: String
  dob: String
  email: String
}

type Comment {
  title: String
  email: String
  description: String
  order_id: String
}

#The Mutation type is the entry point into our graph for modifying data. 
type Mutation {
  # if false, update description failed -- check errors
  writeDescription(descriptionId: ID!): DescriptionUpdateResponse!
}

type DescriptionUpdateResponse {
  success: Boolean!
  message: String
  description: Description
}
`;

module.exports = typeDefs;