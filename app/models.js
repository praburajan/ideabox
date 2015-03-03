var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var user = Schema({
  email : String,
  firstName : String,
  lastName : String
});

var product = Schema({
  
});

var idea = Schema({
  product : { type : String },
  feature : { type : String },
  creator : [ user.schema ],
  title : { type : String },
  description : { type : String }
});