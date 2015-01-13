var CES = require('ces');

var PhysicSystem = CES.System.extend({
  update: function(dt) {
    var entities = this.world.getEntities('position', 'velocity');

    entities.forEach(function(entity) {
      var position = entity.getComponent('position');
      var velocity = entity.getComponent('velocity');

      position.x += velocity.x * dt;
      position.y += velocity.y * dt;
    });
  }
});

module.exports = PhysicSystem;