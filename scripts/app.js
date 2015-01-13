var CES = require('ces');
var PositionComponent = require('./components/position_component');
var VelocityComponent = require('./components/velocity_component');
var PhysicSystem = require('./systems/physic_system');

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
  _world.update(0.2);
  _stage.update();
};

var App = {
  start: function() {
    setupCanvas();

    _stage = new createjs.Stage('stage');

    var plane = new CES.Entity();
    plane.addComponent(new PositionComponent(0, 0));
    plane.addComponent(new VelocityComponent(10, 10));

    _world = new CES.World();
    _world.addEntity(plane);
    _world.addSystem(new PhysicSystem());

    createjs.Ticker.addEventListener('tick', handleTick);
      
    // Create plane object
    // var plane = new createjs.Shape();
    // var g = plane.graphics;
    // g.setStrokeStyle(1);
    // g.beginFill('#fff');
    // g.beginStroke('#000');
    // g.drawRect(10, 10, 5, 5);
    
    // stage.addChild(plane);

    // stage.update();

    // createjs.Ticker.addEventListener('tick', handleTick);

    // var velocityX = 10;
    // var velocityY = 10;

    // function handleTick() {
    //   plane.x += velocityX;
    //   plane.y += velocityY;

    //   if (plane.x > stage.canvas.width || plane.x == 0) {
    //     velocityX = velocityX * -1;
    //   };

    //   if (plane.y > stage.canvas.height || plane.y == 0) {
    //     velocityY = velocityY * -1;
    //   };

    //   stage.update();
    // };
  }
};

module.exports = App;