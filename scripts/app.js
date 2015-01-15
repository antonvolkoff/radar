var fs = require('fs');
var toml = require('toml');
var Geo = require('./helpers/geo');
var CES = require('ces');

// var PositionComponent = require('./components/position_component');
// var VelocityComponent = require('./components/velocity_component');
// var ShapeComponent = require('./components/shape_component');
// var PhysicSystem = require('./systems/physic_system');
// var RenderSystem = require('./systems/render_system');
var CodeComponent = require('./components/code_component');

var sector = null;

var setupCanvas = function() {
  // Get browser dimentions
  var screenWidth = window.innerWidth;
  var screenHeight = window.innerHeight;

  // Set width of canvas
  var stageElem = document.getElementById('stage');
  stageElem.setAttribute('width', screenWidth + 'px');
  stageElem.setAttribute('height',screenHeight + 'px');
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
    
    sector = new CES.World();
    window.sector = sector;
    // sector.addSystem(new PhysicSystem());
    // sector.addSystem(new RenderSystem());

    loadSector(function(data) {
      data.vors.forEach(function(vor) {
        var entity = new CES.Entity();
        entity.addComponent(new CodeComponent(vor.code));
        sector.addEntity(entity);
        // var lat = Geo.parseDMS(vor.latitude);
        // var lng = Geo.parseDMS(vor.longitude);

        // var point = Geo.fromLatLngToPoint(lat, lng, 2);

        // var elem = new CES.Entity();
        // elem.addComponent(new PositionComponent(point.x, point.y));
        // elem.addComponent(new ShapeComponent('vor'));

        // sector.addEntity(elem);
      });

      data.ndbs.forEach(function(ndb) {
        var entity = new CES.Entity();
        entity.addComponent(new CodeComponent(ndb.code));
        sector.addEntity(entity);
        // var lat = Geo.parseDMS(ndb.latitude);
        // var lng = Geo.parseDMS(ndb.longitude);

        // var point = Geo.fromLatLngToPoint(lat, lng, 1);

        // var elem = new CES.Entity();
        // elem.addComponent(new PositionComponent(point.x, point.y));
        // elem.addComponent(new ShapeComponent('ndb'));

        // sector.addEntity(elem);
      });

      data.artccs.forEach(function(artcc) {
        var entity = new CES.Entity();
        sector.addEntity(entity);
        // var points = [];

        // artcc.points.forEach(function(point) {
        //   var lat = Geo.parseDMS(point[0]);
        //   var lng = Geo.parseDMS(point[1]);

        //   var point = Geo.fromLatLngToPoint(lat, lng, 1);

        //   points.push(point);
        // });

        // var entity = new CES.Entity();

        // // entity.addComponent(new MultiPositionComponent(points));
        // entity.addComponent(new ShapeComponent('artcc'));

        // sector.addEntity(entity);
      });
    });

    // while (true) {
    //   sector.update(0.2);
    // }
  }
};

module.exports = App;