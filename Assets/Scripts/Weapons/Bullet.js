export default class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, direction, speed, damage){
        super(scene, x + (direction.x * OFFSET_BULLET_SPAWN), y + (direction.y * OFFSET_BULLET_SPAWN), SPRITE_BULLET);
        
        scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.setDepth(LAYER_BULLETS);

        scene.physics.add.collider(this, scene._layers.walls, () => { this.destroy(); });

        scene.physics.add.collider(this, scene._enemies, (bullet, entity) => { 
            console.log("Collides with entity!"); 
            bullet.destroy();
            entity.TakeDamage(damage);
        });

        this.setVelocity(direction.x * speed, direction.y * speed);

        setTimeout(() => {
            this.destroy();
        }, BULLET_LIFETIME);
    }
}