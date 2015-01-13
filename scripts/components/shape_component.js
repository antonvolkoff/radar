var CES = require('ces');

var ShapeComponent = CES.Component.extend({
  name: 'shape',
  init: function(opts, stage) {
    var shape = new createjs.Shape();
    var g     = shape.graphics;

    g.setStrokeStyle(opts['stroke'] || 1);
    g.beginFill(opts['fillColor'] || '#000');
    g.beginStroke(opts['strokeColor'] || '#000');
    g.drawRect(0, 0, opts['width'], opts['height']);

    stage.addChild(shape);

    this.graphics = shape;
  }
});

module.exports = ShapeComponent;