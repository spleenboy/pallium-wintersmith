var path = require('path');
var View = plugin('views/view');

var router = require('./router');
var id = 'wintersmith';

module.exports = function(hooks) {
    hooks.on('app/controllers/controller/populating', function(event) {
        var view = new View('menu');
        view.base = path.join(__dirname, 'views');
        var content = view.render();
        event.data.sidebar[id] = content;
    });

    hooks.on('app/bootstrap/routes/registering', function(event) {
        event.routers[id] = router(event);
    });
};
