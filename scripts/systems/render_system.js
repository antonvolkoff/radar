var CES = require('ces');
var Geo = require('../helpers/geo');

var RenderSystem = CES.System.extend({
  update: function(params) {
    var entities = this.world.getEntities('appearence');
    var canvas = document.getElementById('stage');
    var ctx = canvas.getContext('2d');
    var center = Geo.fromLatLngToPoint(params.center.lat, params.center.lng, params.zoom);
    var offset = { x: center.x - canvas.width / 2, y: center.y - canvas.height / 2 };

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(-offset.x, -offset.y);

    entities.forEach(function(entity) {
      var appearence = entity.getComponent('appearence');
      var coordinates = entity.getComponent('coordinates');

      if (appearence.type == 'artcc') {
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

    ctx.translate(offset.x, offset.y);
  }
});

module.exports = RenderSystem;