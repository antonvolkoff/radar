var fs = require('fs');
var toml = require('toml');
var Geo = require('./helpers/geo');
var CES = require('ces');

var CodeComponent = require('./components/code_component');
var LabelComponent = require('./components/label_component');
var FrequencyComponent = require('./components/frequency_component');
var CoordinatesComponent = require('./components/coordinates_component');
var AppearenceComponent = require('./components/appearence_component');

var RenderSystem = require('./systems/render_system');

var TARGET_FPS = 20;
var sector = null;
var center = { lat: 0, lng: 0};

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

var handleTick = function() {
  sector.update({
    zoom: 8,
    dt: 1000 / TARGET_FPS,
    center: center,
    render: true
  });
};

var App = {
  start: function() {
    setupCanvas();
    
    sector = new CES.World();
    sector.addSystem(new RenderSystem());
    window.sector = sector;

    loadSector(function(data) {
      { // Set center
        center.lat = Geo.parseDMS(data.info.center_latitude);
        center.lng = Geo.parseDMS(data.info.center_longitude);
      }

      if (data.vors != undefined && data.vors.length > 0) {
        data.vors.forEach(function(vor) {
          var entity = new CES.Entity();

          entity.addComponent(new CodeComponent(vor.code));
          entity.addComponent(new LabelComponent(vor.name));
          entity.addComponent(new FrequencyComponent(vor.frequency));
          entity.addComponent(new AppearenceComponent('vor'));
          
          var points = [{lat: vor.latitude, lng: vor.longitude}];
          entity.addComponent(new CoordinatesComponent(points));
          
          sector.addEntity(entity);
        });  
      };
      
      if (data.ndbs != undefined && data.ndbs.length > 0) {
        data.ndbs.forEach(function(ndb) {
          var entity = new CES.Entity();

          entity.addComponent(new CodeComponent(ndb.code));
          entity.addComponent(new LabelComponent(ndb.name));
          entity.addComponent(new FrequencyComponent(ndb.frequency));
          entity.addComponent(new AppearenceComponent('ndb'));
          
          var points = [{lat: ndb.latitude, lng: ndb.longitude}];
          entity.addComponent(new CoordinatesComponent(points));
          
          sector.addEntity(entity);
        });
      };

      if (data.artccs != undefined && data.artccs.length > 0) {
        data.artccs.forEach(function(artcc) {
          var entity = new CES.Entity();
          
          entity.addComponent(new LabelComponent(artcc.name));
          entity.addComponent(new AppearenceComponent('artcc'));

          var points = [];
          artcc.points.forEach(function(point) {
            points.push({lat: point[0], lng: point[1]});
          });
          entity.addComponent(new CoordinatesComponent(points));
          
          sector.addEntity(entity);
        });
      };

      if (data.artccs_low != undefined && data.artccs_low.length > 0) {
        data.artccs_low.forEach(function(artcc) {
          var entity = new CES.Entity();
          
          entity.addComponent(new LabelComponent(artcc.name));
          entity.addComponent(new AppearenceComponent('artcc'));

          var points = [];
          artcc.points.forEach(function(point) {
            points.push({lat: point[0], lng: point[1]});
          });
          entity.addComponent(new CoordinatesComponent(points));
          
          sector.addEntity(entity);
        });
      };
    });

    setInterval(handleTick, 1000 / TARGET_FPS);
  }
};

module.exports = App;