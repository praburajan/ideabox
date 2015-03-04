var mongoose = require('mongoose'),
    models = require('./models'),
    utils = require('./utils'),
    md5 = require('MD5');

var Idea = models.Idea,
    User = models.User,
    Product = models.Product;
    

module.exports = {
  
  //check function checks for empty collections User, Product and Idea and 
  //populates them with initial dummy data
  check: function() {
    //populate 3 users initially
    models.User.find({}, function(users, err) {
      if(users.length === 0) {

        var user1 = new User({
          email : "jcooper@oracle.com",
          firstName : "James",
          lastName : "Cooper"
        });
        
        var user2 = new User({
          email : "achrist@oracle.com",
          firstName : "Agatha",
          lastName : "Christie"
        });
        
        var user3 = new User({
          email : "jstein@oracle.com",
          firstName : "John",
          lastName : "Steinbeck"
        });
        
        //save users
        user1.save(function(err, user) {
          utils.printObject(err, user);
        });
        
        user2.save(function(err, user) {
          utils.printObject(err, user);
        });
        
        user3.save(function(err, user) {
          utils.printObject(err, user);
        });
      }      
    });
    
    //populate Products and features
    models.Product.find({}, function(products, err) {
      if(products.length === 0) {
        var prod1 = new Product({
          name : "BPM Workspace",
          description : "BPM Workspace",
          features : ["Home Page", "Tasks", "Process Tracking", "Dashboards", "Administration"]
        });
        var prod2 = new Product({
          name : "BPM Composer",
          description : "BPM Composer",
          features : ["Application Home", "Process Editor", "Data Association", "Task Editor", "Process Player"]
        });
        
        //save the products
        prod1.save(function(err, product) {
          utils.printObject(err, product);
        });
        prod2.save(function(err, product) {
          utils.printObject(err, product);
        });
      }
    });
    
    //populate 3 ideas
    models.Idea.find({}, function(ideas, err) {
      if(ideas.length === 0) {
        var ws = models.Product.find({name: "BPM Workspace"})[0];
        var idea1 = new Idea({
          title : "idea1",
          description : "idea1",
          _creator : models.User.find({email:"jcooper@oracle.com"})[0]._id,
          _product : ws._id,
          feature : ws.features[1],
          created : Date.now()
        });
        var idea2 = new Idea({
          title : "idea2",
          description : "idea2",
          _creator : models.User.find({email:"achrist@oracle.com"})[0]._id,
          _product : ws._id,
          feature : ws.features[1],
          created : Date.now()
        });
        var idea3 = new Idea({
          title : "idea3",
          description : "idea3",
          _creator : models.User.find({email:"jstein@oracle.com"})[0]._id,
          _product : ws._id,
          feature : ws.features[1],
          created : Date.now()
        });
      }
    });
  }
};