export default class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, direction, speed, damage, target){
        super(scene, x + (direction.x * OFFSET_BULLET_SPAWN), y + (direction.y * OFFSET_BULLET_SPAWN), SPRITE_BULLET);
        
        scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.setDepth(LAYER_BULLETS);

        scene.physics.add.collider(this, scene._layers.collider, () => { this.destroy(); });

        scene.physics.add.collider(this, scene._layers.decorations, () => { this.destroy(); });

        scene.physics.add.overlap(this, target, (bullet, entity) => {
            bullet.destroy();
            entity.TakeDamage(damage);
        });

        this.setVelocity(direction.x * speed, direction.y * speed);

        setTimeout(() => {
            this.destroy();
        }, BULLET_LIFETIME);
    }
}