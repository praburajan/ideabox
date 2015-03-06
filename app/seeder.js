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
    var idea1, idea2, idea3;
    Idea.find({}, function(err, ideas) {
      if (err) return console.error(err);
      if (ideas.length === 0) {
        initIdeas();
        //now we check users
        User.find({}, function(err, users) {
          if (err) return console.error(err);
          //we init and save users
          if (users.length === 0) {
            var user1 = new User({
              email: "jcooper@oracle.com",
              firstName: "James",
              lastName: "Cooper"
            });

            var user2 = new User({
              email: "achrist@oracle.com",
              firstName: "Agatha",
              lastName: "Christie"
            });

            var user3 = new User({
              email: "jstein@oracle.com",
              firstName: "John",
              lastName: "Steinbeck"
            });

            //save users
            user1.save(function(err, user) {
              utils.printObject(err, user);
              idea1._creator = user._id;
              idea1.votes = [{
                _creator: user._id,
                time: Date.now(),
                thumbsup: true
              }];
            });

            user2.save(function(err, user) {
              utils.printObject(err, user);
              idea2._creator = user._id;
              idea2.votes = [{
                _creator: user._id,
                time: Date.now(),
                thumbsup: true
              }];
            });

            user3.save(function(err, user) {
              utils.printObject(err, user);
              idea3._creator = user._id;
              idea3.votes = [{
                _creator: user._id,
                time: Date.now(),
                thumbsup: true
              }]
            });
          }
          Product.find({}, function(err, products) {
            if (err) return console.error(err);
            if (products.length === 0) {
              var prod1 = new Product({
                name: "BPM Workspace",
                description: "BPM Workspace",
                features: ["Home Page", "Tasks", "Process Tracking", "Dashboards", "Administration"]
              });
              var prod2 = new Product({
                name: "BPM Composer",
                description: "BPM Composer",
                features: ["Application Home", "Process Editor", "Data Association", "Task Editor", "Process Player"]
              });

              //save the products
              prod1.save(function(err, product) {
                utils.printObject(err, product);
                idea1._product = product._id;
                idea1.feature = product.features[1];
                idea2._product = product._id;
                idea2.feature = product.features[2];
                idea3._product = product._id;
                idea3.feature = product.features[0];

              });
              prod2.save(function(err, product) {
                utils.printObject(err, product);

                //save ideas since products and users are saved by now
                idea1.save(function(err, idea) {
                  if (err) return console.error(err);
                  utils.printObject(idea);
                });
                idea2.save(function(err, idea) {
                  if (err) return console.error(err);
                  utils.printObject(idea);
                });
                idea3.save(function(err, idea) {
                  if (err) return console.error(err);
                  utils.printObject(idea);
                });
              });
            }


          });

        });
      }

      function initIdeas() {
        idea1 = new Idea({
          title: "idea1",
          description: "idea1",
          //_creator : jcooper._id,
          //_product : ws._id,
          //feature : ws.features[1],
          created: Date.now()
        });
        idea2 = new Idea({
          title: "idea2",
          description: "idea2",
          // _creator : achrist._id,
          // _product : ws._id,
          // feature : ws.features[1],
          created: Date.now()
        });
        idea3 = new Idea({
          title: "idea3",
          description: "idea3",
          // _creator : jstein._id,
          // _product : ws._id,
          // feature : ws.features[1],
          created: Date.now()
        });
      }
    });
  }
};