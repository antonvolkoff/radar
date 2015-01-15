var CES = require('ces');

var AppearenceComponent = CES.Component.extend({
  name: 'appearence',
  init: function(type) {
    this.type = type;
  }
});

module.exports = AppearenceComponent;