const mongoose = require('mongoose');
const NoteSchema = new mongoose.Schema({  
  id: String,
  content: String
});
module.exports = mongoose.model('notes', NoteSchema);