const mongoose = require('mongoose');
const { RESTDataSource } = require('apollo-datasource-rest');

// An example to consume REST API 
class MongoDB extends RESTDataSource {
  constructor() {
    super();
	}

	getAllComments() {
		const commentSchema = new mongoose.Schema({
			title: {
				type: String,
				required: true,
			},
			description: {
				type: String,
				required: true,
			},
			email: {
				type: String,
				required: true,
			},
			order_id: {
				type: Number,
				required: true,
			},
		});
		return mongoose.model('CustomerComments', commentSchema).findAll();
	}
}

module.exports = MongoDB;