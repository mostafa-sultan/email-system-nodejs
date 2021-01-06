const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema({
  senderemail: {
    type: String,
    required: true
  },
  reseveremail: {
    type: String,
    required: true
  },
  titel: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  file: {
    type: String, 
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Email = mongoose.model('Email',  EmailSchema);

module.exports = Email;

 
module.exports.getEmails = function (callback) {
  Email.find(callback);
}


module.exports.getEmailById = function (id, callback) { 
  Email.findById(id, callback);

}

module.exports.addEmail = function (email, callback) {
  Email.create(email, callback);
}
 

