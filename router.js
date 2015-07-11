var plugins = require(process.cwd() + '/app/services/plugins');
var Controller = plugins.require('controllers/controller');
var WintersmithController = require('./controller');

module.exports = function(event) {
    var router  = new event.express.Router();
    var factory = new Controller.Factory(WintersmithController, event.app);
    router.get('/preview', factory.handle('preview'));
    router.get('/publish', factory.handle('publish'));
    return router;
};
