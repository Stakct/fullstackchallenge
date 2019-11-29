'use strict';

const controllers = require('./controllers');

module.exports = function(app) {
   app.route('/results').get(controllers.list)
   app.route('/results').post(controllers.create)
   app.route('/results/:id').get(controllers.read)
}