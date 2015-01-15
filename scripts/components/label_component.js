var CES = require('ces');

var LabelComponent = CES.Component.extend({
  name: 'label',
  init: function(label) {
    this.label = label;
  }
});

module.exports = LabelComponent;