const SQL = require('sequelize');
const { DataSource } = require('apollo-datasource');
const path = 'postgresql://docker:docker@localhost:5432/docker';

class PgSequelize extends DataSource {
  constructor(){
    super();
    this.store = createStore();
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context;
  }

  async findAddresses() {
    const addresses = await this.store.address.findAll()
    // const addresses = await this.store.address.findAll({where: clientid})
    return add
  }

  private createStore() {
    const Op = SQL.Op;
    const operatorsAliases = {
      $in: Op.in,
    };

    const db = new SQL('docker', 'docker', 'docker', {
      dialect: 'postgres',
      host: 'localhost',
      operatorsAliases,
      logging: false,
    });
    //const db = new Sequelize('postgres://user:pass@example.com:5432/dbname');

    const address = db.define('address', {
      id: {
        type: SQL.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      isbilling: SQL.BOOLEAN,
      createddate: SQL.DATE,
      prefix: SQL.STRING,
      streetnumber: SQL.STRING,
      streetname: SQL.STRING,
      suburb: SQL.STRING,
      city: SQL.STRING,
      country: SQL.STRING,
      postcode: SQL.TINYINT,
      clientid: SQL.INTEGER
    });

    return { address };
  }
}