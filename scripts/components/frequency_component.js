var CES = require('ces');

var FrequencyComponent = CES.Component.extend({
  name: 'frequency',
  init: function(frequency) {
    this.frequency = frequency;
  }
});

module.exports = FrequencyComponent;