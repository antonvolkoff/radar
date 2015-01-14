var fs = require('fs');
var toml = require('toml');
var Geo = require('./helpers/geo');
var CES = require('ces');
var PositionComponent = require('./components/position_component');
var VelocityComponent = require('./components/velocity_component');
var ShapeComponent = require('./components/shape_component');
var PhysicSystem = require('./systems/physic_system');
var RenderSystem = require('./systems/render_system');

var _stage, _world;

var setupCanvas = function() {
  // Get browser dimentions
  var screenWidth = window.innerWidth;
  var screenHeight = window.innerHeight;

  // Set width of canvas
  var stageElem = document.getElementById('stage');
  stageElem.setAttribute('width', screenWidth + 'px');
  stageElem.setAttribute('height',screenHeight + 'px');
};

var handleTick = function() {
  _world.update(_stage);
};

var loadSector = function(callback) {
  fs.readFile('example.toml', function(err, data) {
    if (err) {
      console.log(err);
      return;
    };

    var parsed = toml.parse(data);
    callback(parsed);
  });
};

var App = {
  start: function() {
    setupCanvas();

    _stage = new createjs.Stage('stage');
    
    _world = new CES.World();
    _world.addSystem(new PhysicSystem());
    _world.addSystem(new RenderSystem());

    loadSector(function(data) {
      data.vors.forEach(function(vor) {
        var lat = Geo.parseDMS(vor.latitude);
        var lng = Geo.parseDMS(vor.longitude);

        var point = Geo.fromLatLngToPoint(lat, lng, 2);

        var elem = new CES.Entity();
        elem.addComponent(new PositionComponent(point.x, point.y));
        elem.addComponent(new ShapeComponent({
          type: 'rect',
          width: 3,
          height: 3,
          fillColor: '#f00',
          strokeColor: '#f00'
        }, _stage));

        _world.addEntity(elem);
      });

      data.ndbs.forEach(function(ndb) {
        var lat = Geo.parseDMS(ndb.latitude);
        var lng = Geo.parseDMS(ndb.longitude);

        var point = Geo.fromLatLngToPoint(lat, lng, 1);

        var elem = new CES.Entity();
        elem.addComponent(new PositionComponent(point.x, point.y));
        elem.addComponent(new ShapeComponent({
          type: 'rect',
          width: 3,
          height: 3,
          fillColor: '#0f0',
          strokeColor: '#0f0'
        }, _stage));

        _world.addEntity(elem);
      });

      data.artccs.forEach(function(artcc) {
        var entity = new CES.Entity();
        _world.addEntity(entity);
      });
    });

    createjs.Ticker.addEventListener('tick', handleTick);
  }
};

module.exports = App;