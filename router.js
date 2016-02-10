var plugins = require(process.cwd() + '/app/services/plugins');
var Controller = plugins.require('controllers/controller');
var WintersmithController = require('./controller');

module.exports = function(router, app) {
    var factory = new Controller.Factory(WintersmithController, app);
    router.get('/preview', factory.handle('preview'));
    router.get('/publish', factory.handle('publish'));
};
