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

var App = {
  start: function() {
    setupCanvas();

    _stage = new createjs.Stage('stage');
    window._stage = _stage;

    var plane = new CES.Entity();
    plane.addComponent(new PositionComponent(0, 0));
    plane.addComponent(new VelocityComponent(1, 1));
    plane.addComponent(new ShapeComponent({
      type: 'rect',
      width: 5,
      height: 5,
      fillColor: '#fff',
      strokeColor: '#000'
    }, _stage));

    var plane2 = new CES.Entity();
    plane2.addComponent(new PositionComponent(50, 50));
    plane2.addComponent(new VelocityComponent(1, 2));
    plane2.addComponent(new ShapeComponent({
      type: 'rect',
      width: 5,
      height: 5,
      fillColor: '#fff',
      strokeColor: '#000'
    }, _stage));

    _world = new CES.World();
    _world.addEntity(plane);
    _world.addEntity(plane2);
    _world.addSystem(new PhysicSystem());
    _world.addSystem(new RenderSystem());

    _stage.update();

    createjs.Ticker.addEventListener('tick', handleTick);
  }
};

module.exports = App;