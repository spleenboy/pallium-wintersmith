# Pallium Wintersmith plugin

## Configuration

Wintersmith expects only one configuration key, `configPath`. This should be the path to your Wintersmith configuration file.

```javascript
module.exports = {
    'configPath' : function() {
        return __dirname + '/config.json';
    }
};
```
