var CES = require('ces');

var PhysicSystem = CES.System.extend({
  update: function() {
    var entities = this.world.getEntities('position', 'velocity');

    entities.forEach(function(entity) {
      var position = entity.getComponent('position');
      var velocity = entity.getComponent('velocity');

      position.x += velocity.x;
      position.y += velocity.y;
    });
  }
});

module.exports = PhysicSystem;