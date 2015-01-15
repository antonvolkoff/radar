var fs = require('fs');
var toml = require('toml');
var Geo = require('./helpers/geo');
var CES = require('ces');

var CodeComponent = require('./components/code_component');
var LabelComponent = require('./components/label_component');
var FrequencyComponent = require('./components/frequency_component');
var CoordinatesComponent = require('./components/coordinates_component');

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

    loadSector(function(data) {
      data.vors.forEach(function(vor) {
        var entity = new CES.Entity();

        entity.addComponent(new CodeComponent(vor.code));
        entity.addComponent(new LabelComponent(vor.name));
        entity.addComponent(new FrequencyComponent(vor.frequency));
        
        var points = [{lat: vor.latitude, lng: vor.longitude}];
        entity.addComponent(new CoordinatesComponent(points));
        
        sector.addEntity(entity);
      });

      data.ndbs.forEach(function(ndb) {
        var entity = new CES.Entity();

        entity.addComponent(new CodeComponent(ndb.code));
        entity.addComponent(new LabelComponent(ndb.name));
        entity.addComponent(new FrequencyComponent(ndb.frequency));
        
        var points = [{lat: ndb.latitude, lng: ndb.longitude}];
        entity.addComponent(new CoordinatesComponent(points));
        
        sector.addEntity(entity);
      });

      data.artccs.forEach(function(artcc) {
        var entity = new CES.Entity();
        
        entity.addComponent(new LabelComponent(artcc.name));

        var points = [];
        artcc.points.forEach(function(point) {
          points.push({lat: point[0], lng: point[1]});
        });
        entity.addComponent(new CoordinatesComponent(points));
        
        sector.addEntity(entity);
      });
    });
  }
};

module.exports = App;