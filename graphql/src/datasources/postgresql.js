const Knex = require("knex");
const { SQLDataSource } = require("datasource-sql");

/*
  ORM solutions help facilitate data-driven API development. They 
  function as a high-level API to execute CRUD, and to initialize 
  data through code. Sequelize is an Object Relation Mapping or 
  ORM for Node.js which is easy to learn and has lots of cool 
  features such as synchronization, association, validation and so 
  on. With support for PostgreSQL, MySQL, MariaDB, SQLite, and MSSQL. 
  It is available via NPM. Knex.js is an SQL query builder for JavaScript 
  used for relational databases including PostgreSQL, MySQL, SQLite2 
  and Oracle. It supports transactions, connection pooling, streaming 
  queries, a thorough test suite, and the ability to run in the browser. 
  Knex can be used in both Node.Js and the browser, limited only by 
  WebSQL’s constraints.
*/

const MINUTE = 60;

const knex = Knex({
  client: "pg",
  connection: {
    host : '127.0.0.1',
    user : 'docker',
    password : 'docker',
    database : 'docker'
  }
});

// const knex = Knex({
//   dialect: 'sqlite3',
//   connection: {
//     filename: './data.db',
//   },
// });

class PgDatabase extends SQLDataSource {
  constructor() {
    super();
    // Add your instance of Knex to the DataSource
    this.db = knex;
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
    // This can be any valid Knex query
    const query = this.db.select().from("customer");

    // A promise without any caching or batching
    // return query;

    // Batch the query with DataLoader - RETURNS A RAW RESPONSE
    // return this.getBatched(query);

    // Cache the result for 1 minute
    const response = await this.getCached(query, MINUTE);

    // Batch the query and cache the result for 1 minute - RETURNS A RAW RESPONSE
    // return this.getBatchedAndCached(query, MINUTE);

    return Array.isArray(response)
      ? response.map(customer => this.customerReducer(customer))
      : [];
  }
}

module.exports = PgDatabase
