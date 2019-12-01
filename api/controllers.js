'use strict';

const Result = require('./db/sequelize').Result

let controllers = {
    list: function(req, res) {
        Result.findAll().then(results => res.json(results))
    },
    read: function(req, res) {
        Result.findOne({where: {"Id": req.params.id}}).then(results => {
            if(results === null) {
                res.status(404).send('Not found');
            } else {
                res.json(results)
            }
        })
    },
    create: function(req, res) {
        Result.create(req.body).then(results => {
            res.status(201).send("Result created.")
        })
    }
}

module.exports = controllers;
