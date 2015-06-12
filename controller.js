var util = require('util');
var wintersmith = require('wintersmith');

var Parent = plugin('controllers/controller');
var config = plugin('config');
var log    = plugin('services/log')(module);

var base = process.cwd() + '/plugins/wintersmith/';
var env  = wintersmith(config.get('wintersmith.configPath'));

function Controller() {
    Parent.call(this);
    this.viewBase = base + 'views';
}

util.inherits(Controller, Parent);


Controller.prototype.preview = function() {
    env.preview(function(error, server) {
        if (error) {
            log.error('Error previewing wintersmith site', error);
        }
        else {
            log.info('Wintersmith preview started!');
        }
    });

    var data = {
        'wintersmith' : env.locals
    };
    this.send('preview', data);
};


Controller.prototype.publish = function() {
    env.build(function(error) {
        if (error) {
            log.error('Error building wintersmith site', error);
        }
        else {
            log.info('Wintersmith build complete!');
        }
    });
    this.send('publish');
};

module.exports = Controller;
