var CES = require('ces');

var ShapeComponent = CES.Component.extend({
  name: 'shape',
  init: function(type, opts) {
    this.type = type;
    this.opts = opts;
  }
});

module.exports = ShapeComponent;