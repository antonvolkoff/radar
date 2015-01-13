var CES = require('ces');

var PositionComponent = CES.Component.extend({
  name: 'position',
  init: function(x, y) {
    this.x = x;
    this.y = y;
  }
});

module.exports = PositionComponent;