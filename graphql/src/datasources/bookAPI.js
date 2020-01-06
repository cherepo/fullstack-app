//RESTDataSource class that is responsible for fetching data from a REST API
const { RESTDataSource } = require('apollo-datasource-rest');

// An example to consume REST API 
class BookAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:2345/api/';
  }

  // Reducer can translate the incoming data into graphql schema
  bookReducer(book) {
    return {
      id: book.id || 0,
      cursor: book.uuid,
      author: book.author,
      title: book.title,
    };
  }

  /*
    To query books use
    {
      books(pageSize:10, after:"10-uuid"){
        hasMore
        cursor
        books{
          id
          title
          author
        }
      }
    }
  */
  async getAllBooks() {
    /*
    The Apollo REST data sources have helper methods that correspond to HTTP 
    verbs like GET and POST. In the code above, this.get('book'), makes a GET 
    request to http://localhost:2345/api/book
    */
    const response = await this.get('book');
    // The bookReducer method is for transforming our book data into the shape our schema expects
    return Array.isArray(response)
      ? response.map(book => this.bookReducer(book))
      : [];
  }

  async getBookById({ bookId }) {
    const response = await this.get('book', { id: bookId });
    return this.bookReducer(response);
  }
}

module.exports = BookAPI;