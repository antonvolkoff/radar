var CES = require('ces');

var RenderSystem = CES.System.extend({
  update: function(stage) {
    var entities = this.world.getEntities('position', 'shape');

    entities.forEach(function(entity) {
      var position = entity.getComponent('position');
      var shape = entity.getComponent('shape');

      shape.graphics.x = position.x;
      shape.graphics.y = position.y;
    });

    stage.update();
  }
});

module.exports = RenderSystem;
