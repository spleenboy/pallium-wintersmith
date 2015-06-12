var Controller = plugin('controllers/controller');
var WintersmithController = require('./controller');

module.exports = function(event) {
    var router = new event.express.Router();
    router.get('/preview', Controller.handle('preview', WintersmithController));
    router.get('/publish', Controller.handle('publish', WintersmithController));
    return router;
};
