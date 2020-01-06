const { paginateResults } = require('./utils');

/*
Resolvers provide the instructions for turning a GraphQL operation (a query, mutation, 
or subscription) into data. They either return the same type of data we specify in our 
schema or a promise for that data. A resolver accept 4 params

  fieldName: (parent, args, context, info) => data;

Which are
  - parent: An object that contains the result returned from the resolver on the parent type
  - args: An object that contains the arguments passed to the field
  - context: An object shared by all resolvers in a GraphQL operation. We use the context to contain per-request state such as authentication information and access our data sources.
  - info: Information about the execution state of the operation which should only be used in advanced cases

  Pagination is a solution to this problem that ensures that the server only sends data 
  in small chunks. Cursor-based pagination is our recommended approach over numbered pages, 
  because it eliminates the possibility of skipping items and displaying the same item 
  more than once
*/
module.exports = {
  Query: {
    books: async (_, { pageSize = 20, after }, { dataSources }) => {
      const allBooks = await dataSources.bookAPI.getAllBooks();

      const books = paginateResults({
        after,
        pageSize,
        results: allBooks,
      });

      return {
        books,
        cursor: books.length ? books[books.length - 1].cursor : null,
        // if the cursor of the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
        hasMore: books.length
          ? books[books.length - 1].cursor !==
            allBooks[allBooks.length - 1].cursor
          : false,
      };
    },
    book: (_, { id }, { dataSources }) =>
      dataSources.bookAPI.getBookById({ bookId: id }),
    customers: (_, __, { dataSources }) => 
      dataSources.pgDatabase.getCustomers(),
    api_customers: (_, __, { dataSources }) =>
      dataSources.javaAPI.getCustomers(),
    comments: (_, __, { dataSources }) =>
      dataSources.mongodb.findAll()
  }
}