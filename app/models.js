var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var UserSchema = Schema({
  email : String,
  firstName : String,
  lastName : String
});

var ProductSchema = Schema({
  name : String,
  description : String,
  features : []
});

var IdeaSchema = Schema({
  title : String,
  description : String,
  created : Date,
  _creator : { type : ObjectId, ref : 'UserSchema' },
  _product : { type : ObjectId, ref : 'ProductSchema' },
  feature : String,
  votes : [{ _voter : { type : ObjectId, ref : 'User'}, time : Date, thumbsup : Boolean}]
});

// Creating models
module.exports = {
  User : mongoose.model('User', UserSchema),
  Product : mongoose.model('Product', ProductSchema),
  Idea : mongoose.model('Idea', IdeaSchema)
};