var CES = require('ces');
var Geo = require('../helpers/geo');

var colors = {
  background: '#1d1f21',
  line: '#c5c8c6',
  navaid: '#b5bd68'
}

var RenderSystem = CES.System.extend({
  update: function(params) {
    var entities = this.world.getEntities('appearence');
    var canvas = document.getElementById('stage');
    var ctx = canvas.getContext('2d');
    var center = Geo.fromLatLngToPoint(params.center.lat, params.center.lng, params.zoom);
    var offset = { x: center.x - canvas.width / 2, y: center.y - canvas.height / 2 };

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    { // Set background
      ctx.save();
      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    }

    ctx.translate(-offset.x, -offset.y);

    entities.forEach(function(entity) {
      var appearence = entity.getComponent('appearence');
      var coordinates = entity.getComponent('coordinates');

      if (appearence.type == 'artcc') {
        var points = [];

        coordinates.points.forEach(function(point) {
          points.push(Geo.fromLatLngToPoint(point.lat, point.lng, params.zoom));
        });

        ctx.save();
        ctx.strokeStyle = colors.line;
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
        ctx.restore();
      };

      if (appearence.type == 'vor') {
        var point = Geo.fromLatLngToPoint(
          coordinates.points[0].lat, coordinates.points[0].lng, params.zoom);

        ctx.save();
        ctx.fillStyle = colors.navaid;
        ctx.fillRect(point.x, point.y, 5, 5);
        ctx.restore();
      };

      if (appearence.type == 'ndb') {
        var point = Geo.fromLatLngToPoint(
          coordinates.points[0].lat, coordinates.points[0].lng, params.zoom);

        ctx.save();
        ctx.fillStyle = colors.navaid;
        ctx.fillRect(point.x, point.y, 5, 5);
        ctx.restore();
      };
    });

    ctx.translate(offset.x, offset.y);
  }
});

module.exports = RenderSystem;