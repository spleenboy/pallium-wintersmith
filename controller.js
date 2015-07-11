var util = require('util');
var wintersmith = require('wintersmith');

var plugins = require(process.cwd() + '/app/services/plugins');
var Parent = plugins.require('controllers/controller');
var config = plugins.require('config');
var log    = plugins.require('services/log')(module);

var base = process.cwd() + '/plugins/wintersmith/';
var env  = wintersmith(config.get('wintersmith.configPath'));

function Controller() {
    Parent.call(this);
    this.viewBase = base + 'views';
}

util.inherits(Controller, Parent);


Controller.prototype.preview = function() {
    var data = {'wintersmith' : env.locals};
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
