var CES = require('ces');
var Geo = require('../helpers/geo');

var CoordinatesComponent = CES.Component.extend({
  name: 'coordinates',
  init: function(points) {
    var self = this;
    this.points = [];

    points.forEach(function(point) {
      self.points.push({
        lat: Geo.parseDMS(point.lat),
        lng: Geo.parseDMS(point.lng)
      });
    });
  }
});

module.exports = CoordinatesComponent;