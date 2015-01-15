var CES = require('ces');
var Geo = require('../helpers/geo');

var _zoom = 2;

var RenderSystem = CES.System.extend({
  update: function(params) {
    var entities = this.world.getEntities('appearence');

    entities.forEach(function(entity) {
      var appearence = entity.getComponent('appearence');
      var coordinates = entity.getComponent('coordinates');

      if (appearence.type == 'artcc') {
        var canvas = document.getElementById('stage');
        var ctx = canvas.getContext('2d');
        var points = [];

        coordinates.points.forEach(function(point) {
          points.push(Geo.fromLatLngToPoint(point.lat, point.lng, params.zoom));
        });

        ctx.beginPath();

        for (var i = 0; i < points.length; i++) {
          var point = points[i];

          if (i == 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          };
        };

        ctx.stroke();
      };
    });
  }
});

module.exports = RenderSystem;