'use strict';

require('dotenv').config({ path: './variables.env' });
const connectToDatabase = require('./db');
const Note = require('./models/note');
const check = 'WJ345S83T0c3PjQaRo4N';

module.exports.create = (event, context, callback) => {
  /*
    Note: context.callbackWaitsForEmptyEventLoop — By default, the 
    callback will wait until the Node.js runtime event loop is empty 
    before freezing the process and returning the results to the caller. 
    You can set this property to false to request AWS Lambda to freeze 
    the process soon after the callback is called, even if there are 
    events in the event loop. AWS Lambda will freeze the process, any 
    state data and the events in the Node.js event loop (any remaining 
      events in the event loop processed when the Lambda function is 
      called next and if AWS Lambda chooses to use the frozen process).
  */
  context.callbackWaitsForEmptyEventLoop = false;
  if(event.headers['app-token'] === check) {
    return connectToDatabase()
      .then(() =>
        Note.create(JSON.parse(event.body))
      )
      .then(note => callback(null, {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify(note)
      }))
      .catch(err => callback(null, {
        statusCode: err.statusCode || 500,
        headers: { 
          'Content-Type': 'text/plain',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: 'Could not create the note.'
      }));
  } else {
    return Promise.reject(new Error('Authentication Error'));
  }
}

module.exports.getOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  if(event.headers['app-token'] === check) {
    return connectToDatabase()
      .then(() =>
        Note.findById(event.pathParameters.id)
      )
      .then(note => callback(null, {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify(note)
      }))
      .catch(err => callback(null, {
        statusCode: err.statusCode || 500,
        headers: { 
          'Content-Type': 'text/plain',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: 'Could not fetch the note.'
      }));
  } else {
    return Promise.reject(new Error('Authentication Error'));
  }
};

module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  if(event.headers['app-token'] === check) {
    return connectToDatabase()
    .then(() =>
      Note.find()
    )
    .then(notes => callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify(notes)
    }))
    .catch(err => callback(null, {
      statusCode: err.statusCode || 500,
      headers: { 
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: 'Could not fetch the notes.'
    }));
  } else {
    return Promise.reject(new Error('Authentication Error'));
  }
};

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  if(event.headers['app-token'] === check) {
    return connectToDatabase()
      .then(() =>
        Note.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), { new: true })
      )
      .then(note => callback(null, {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify(note)
      }))
      .catch(err => callback(null, {
        statusCode: err.statusCode || 500,
        headers: { 
          'Content-Type': 'text/plain',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: 'Could not fetch the notes.'
      }));
  } else {
    return Promise.reject(new Error('Authentication Error'));
  }
};

module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  if(event.headers['app-token'] === check) {
    return connectToDatabase()
      .then(() =>
        Note.findByIdAndRemove(event.pathParameters.id)
      )
      .then(note => callback(null, {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({ message: 'Removed note with id: ' + note._id, note: note })
      }))
      .catch(err => callback(null, {
        statusCode: err.statusCode || 500,
        headers: { 
          'Content-Type': 'text/plain',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: 'Could not fetch the notes.'
      }));
  } else {
    return Promise.reject(new Error('Authentication Error'));
  }
};