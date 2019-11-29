'use strict';

let controllers = {
    hi: function(req, res) {
        res.json({"status": "ok"});
    }
}

module.exports = controllers;
