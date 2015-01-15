var CES = require('ces');

var CodeComponent = CES.Component.extend({
  name: 'code',
  init: function(code) {
    this.code = code;
  }
});

module.exports = CodeComponent;