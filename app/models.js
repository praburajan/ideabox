var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var UserSchema = Schema({
  email : {type : String, unique : true},
  firstName : String,
  lastName : String
});

var ProductSchema = Schema({
  name : {type : String, unique : true},
  description : String,
  features : Array
});

var IdeaSchema = Schema({
  title : String,
  description : String,
  created : Date,
  _creator : { type : ObjectId, ref : 'UserSchema' },
  _product : { type : ObjectId, ref : 'ProductSchema' },
  feature : String,
  votes : [{ _voter : { type : ObjectId, ref : 'UserSchema'}, time : Date, thumbsup : Boolean}],
  comments : [{_commentedBy : {type : ObjectId, ref : 'UserSchema'}, time : Date, body : String}]
});

// Creating models
module.exports = {
  User : mongoose.model('User', UserSchema),
  Product : mongoose.model('Product', ProductSchema),
  Idea : mongoose.model('Idea', IdeaSchema)
};