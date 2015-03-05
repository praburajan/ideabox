var home = require('../controllers/home'),
    ideas = require('../controllers/ideas');

module.exports.initialize = function(app) {
  app.get('/',home.index);
  app.get('/api/ideas',ideas.index);
  app.get('/api/ideas/:id',ideas.getById);
  app.post('/api/ideas',ideas.add);
  app.put('/api/ideas/',ideas.update);
  app.delete('api/ideas/:id',ideas.delete);
};