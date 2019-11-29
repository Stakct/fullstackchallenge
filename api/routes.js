'use strict';

const controllers = require('./controllers');

module.exports = function(app) {
   app.route('/hi').get(controllers.hi)
}