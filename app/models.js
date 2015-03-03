var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var user = Schema({
  email : { type : String },
  firstName : { type : String },
  lastName : { type : String }
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