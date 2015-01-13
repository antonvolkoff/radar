var CES = require('ces');

var VelocityComponent = CES.Component.extend({
  name: 'velocity',
  init: function(x, y) {
    this.x = x;
    this.y = y;
  }
});

module.exports = VelocityComponent;