var path = require('path');
var wintersmith = require('wintersmith');

var View   = plugin('views/view');
var log    = plugin('services/log')(module);
var config = plugin('config');

var router = require('./router');
var id = 'wintersmith';

module.exports = function(hooks, app) {
    var env  = wintersmith(config.get('wintersmith.configPath'));
    var base = process.cwd() + '/plugins/wintersmith/';
    var cast = app.io.broadcast.bind(app.io, 'flash');

    // Start up the preview site
    process.nextTick(function() {
        env.preview(function(error, server) {
            if (error) {
                log.error('Error previewing wintersmith site', error);
                cast('Error previewing wintersmith site');
            }
            else {
                cast('Wintersmith preview started!');
            }
        });
    });

    // Register routes
    hooks.on('app/bootstrap/routes/registering', function(event) {
        event.routers[id] = router(event);
    });

    // Add menu items
    hooks.on('app/controllers/controller/populating', function(event) {
        var data = {'wintersmith' : env.locals};
        var view = new View('menu', data);
        view.base = path.join(__dirname, 'views');
        var content = view.render();

        event.data.sidebar[id] = content;
    });
};
