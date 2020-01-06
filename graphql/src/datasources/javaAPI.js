const { RESTDataSource } = require('apollo-datasource-rest');

class JavaAPI extends RESTDataSource {
	constructor() {
    super();
    this.baseURL = 'http://localhost:8081/';
	}

	customerReducer(cutomer) {
    return {
      id: cutomer.id || 0,
      firstname: cutomer.firstname,
      lastname: cutomer.lastname,
      dob: cutomer.dob,
      email: cutomer.email,
    };
	}

	async getCustomers() {
    /*
    The Apollo REST data sources have helper methods that correspond to HTTP 
    verbs like GET and POST. In the code above, this.get('book'), makes a GET 
    request to http://localhost:2345/api/book
    */
    const response = await this.get('customer');
    // The bookReducer method is for transforming our book data into the shape our schema expects
    return Array.isArray(response)
      ? response.map(customer => this.customerReducer(customer))
      : [];
  }
}

module.exports = JavaAPI;