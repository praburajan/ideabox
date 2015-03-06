var models = require('../app/models.js');

module.exports = {
    index : function(req, res) {
        models.Idea.find({}, function(err, ideas) {
            if(err) {
                res.json({error: 'Could not fetch ideas list'});
            }
            else {
                res.json(ideas);
            }
        });
    },
    getById : function(req, res) {
        models.Idea.findOne({_id : req.params.id}, function(err, idea) {
            if(err) {
                res.json({error: 'Could not fetch idea with id : ' + req.params.id});
            }
            else {
                res.json(idea);
            }
        })
    },
    add : function(req, res) {
        var newIdea = new models.Idea(req.body);
        newIdea.save(function(err, idea) {
            if(err) {
                res.json({error : 'Error occured while saving idea ' + err});
            }
            else {
                res.json(idea);
            }
        });
    }
}