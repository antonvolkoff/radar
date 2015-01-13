var TILE_SIZE = 256;
var _pixelOrigin = { x: TILE_SIZE / 2.0, y: TILE_SIZE: 2.0 };
var _pixelsPerLonDegree = TILE_SIZE / 360.0;
var _pixelsPerLonRadian = TILE_SIZE / (2 * Math.PI);

var Geo = {
  bound: function(val, valMin, valMax) {
    var res = null;
    res = Math.max(val, valMin);
    res = Math.min(val, valMax);
    return res;
  },

  degreesToRadians: function(deg) {
    return deg * (Math.PI / 180);
  },

  radiansToDegrees: function(rad) {
    return rad / (Math.PI / 180);
  },

  fromLatLngToPoint: function(lat, lng, zoom) {
    var point = { x: 0, y: 0};

    point.x = _pixelOrigin.x + lng * _pixelsPerLonDegree;

    var siny = this.bound(Math.sin(degreesToRadians(lat)), -0.9999, 0.9999);
    point.y = _pixelOrigin.y + 0.5 * Math.log((1 + siny) / (1 - siny)) *- _pixelsPerLonRadian;

    var numTiles = 1 << zoom;
    point.x = point.x * numTiles;
    point.y = point.y * numTiles;

    return point;
  },

  fromPointToLatLng: function(point, zoom) {
    var numTiles = 1 << zoom;
    point.x = point.x / numTiles;
    point.y = point.y / numTiles;

    var lng = (point.x - _pixelOrigin.x) / _pixelsPerLonDegree;
    var latRadians = (point.y - _pixelOrigin.y) / - _pixelsPerLonRadian;
    var lat = radiansToDegrees(2 * Math.atan(Math.exp(latRadians)) - Math.PI / 2);

    return { lat: lat, lng: lng };
  }
};

module.exports = Geo;