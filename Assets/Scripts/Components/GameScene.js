export default class GameScene extends Phaser.Scene{
    constructor(gameManager, key, name){
        super(key); // set the scene key to interact with the sceneManager
        this._name = name;
        this._gameManager = gameManager;
        this._gameManager._sceneStats.currentScene.key = key;
        this._gameManager._sceneStats.currentScene.name = name;

        this._currentRoom = {x: 0, y: 0};

        this._playerSpawn = {x: 0, y: 0};
    };

    preload(){
        this.load.image('window_vignette', "./Assets/Images/window_vignette.png");

        this.load.image('tileset', "./Assets/Maps/tileset.png");

        this.load.spritesheet(SPRITE_PLAYER, "./Assets/Sprites/playerSpritesheetV2.png", {frameWidth: 40, frameHeight: 40});
        this.load.spritesheet(SPRITE_SHADOWS, "./Assets/Sprites/shadows.png", {frameWidth: 32, frameHeight: 8});

        this.load.image(SPRITE_DOOR_COLLISION, "./Assets/Sprites/door_collision.png");
        this.load.spritesheet(SPRITE_HORIZONTAL_BREAKABLE_DOOR, "./Assets/Sprites/horizontal_breakableDoor_spritesheet.png", {frameWidth: 32, frameHeight: 64});
        this.load.spritesheet(SPRITE_VERTICAL_BREAKABLE_DOOR_BACK, "./Assets/Sprites/vertical_breakableDoor_spritesheet.png", {frameWidth: 32, frameHeight: 32});
        this.load.image(SPRITE_VERTICAL_BREAKABLE_DOOR_FRONT, "./Assets/Sprites/vertical_breakableDoor_front.png");
        this.load.spritesheet(SPRITE_HORIZONTAL_ACCESS_CARD_DOOR, "./Assets/Sprites/horizontal_accessCardDoor_spritesheet.png", {frameWidth: 32, frameHeight: 34});
        this.load.spritesheet(SPRITE_VERTICAL_ACCESS_CARD_DOOR, "./Assets/Sprites/vertical_accessCardDoor_spritesheet.png", {frameWidth: 4, frameHeight: 48});
        this.load.spritesheet(SPRITE_HORIZONTAL_BOSS_DOOR, "./Assets/Sprites/horizontal_bossDoor_spritesheet.png", {frameWidth: 32, frameHeight: 34});

        this.load.spritesheet(SPRITE_HORIZONTAL_BOSS_DOOR, "./Assets/Sprites/horizontal_bossDoor_spritesheet.png", {frameWidth: 32, frameHeight: 34});

        this.load.spritesheet(SPRITE_SPIKES, "./Assets/Sprites/spikes_spritesheet.png", {frameWidth: 16, frameHeight: 16});

        this.load.image(SPRITE_GRIP, "./Assets/Sprites/grip.png");
        this.load.spritesheet(SPRITE_LEVER, "./Assets/Sprites/lever_spritesheet.png", {frameWidth: 32, frameHeight: 16});
        this.load.image(SPRITE_GRAPPLING_HOOK, "./Assets/Sprites/grappling_hook.png");

        this.load.image(SPRITE_ENEMY_DETECTION_RANGE, "./Assets/Sprites/Enemies/enemyDetectionRange.png");

        this.load.image(SPRITE_WEAPON_REVOLVER, "./Assets/Sprites/weapon_revolver.png");
        this.load.image(SPRITE_WEAPON_REVOLVER_PICKUP, "./Assets/Sprites/weapon_revolver_pickup.png");

        this.load.image(SPRITE_WEAPON_RIFLE, "./Assets/Sprites/weapon_rifle.png");
        this.load.image(SPRITE_WEAPON_RIFLE_PICKUP, "./Assets/Sprites/weapon_rifle_pickup.png");

        this.load.image(SPRITE_BULLET, "./Assets/Sprites/bullet.png");

        this.load.spritesheet(SPRITE_ENEMY, "./Assets/Sprites/Enemies/enemySpritesheetV2.png", {frameWidth: 40, frameHeight: 40});

        this.load.image(SPRITE_HALF_HEARTH_PICKUP, "./Assets/Sprites/halfHearth_pickup.png");
        this.load.image(SPRITE_HEARTH_PICKUP, "./Assets/Sprites/hearth_pickup.png");
        this.load.image(SPRITE_NEW_HEARTH_PICKUP, "./Assets/Sprites/newHearth_pickup.png");

        this.load.image(SPRITE_ACCESS_CARD_PICKUP, "./Assets/Sprites/accessCard_pickup.png");
        this.load.image(SPRITE_BOSS_CARD_PICKUP, "./Assets/Sprites/bossCard_pickup.png");

        this.load.image(SPRITE_GRAPPLE_PICKUP, "./Assets/Sprites/grapple_pickup.png");

        this.load.spritesheet(SPRITE_FLOATING_UI, "./Assets/Sprites/UI/floatingUI.png", {frameWidth: 18, frameHeight: 18});
        this.load.spritesheet(SPRITE_HEARTH_UI, "./Assets/Sprites/UI/ui_hearth_spritesheet.png", {frameWidth: 13, frameHeight: 12});
        this.load.image(SPRITE_AMMOS_BG_UI, "./Assets/Sprites/UI/ui_ammos_background.png");

        // importing custom fonts
        this.load.bitmapFont('CursedScript', 'Assets/Fonts/CursedScript.png', 'Assets/Fonts/CursedScript.fnt');
    };

    create() {
        this._windowVignette = this.add.image(0, 0, "window_vignette").setOrigin(0, 0).setDepth(1000).setScrollFactor(0);

        this._enemies = this.add.group();

        this._pickups = this.add.group();

        this._breakableDoors = this.add.group();
        this._accessCardDoors = this.add.group();
        this._bossDoors = this.add.group();

        this._spikes = this.add.group();

        this._grips = this.add.group();

        // Create scene camera
        this._camera = this.cameras.add(0, 0, GAME_WIDTH, GAME_HEIGHT, true);
        this._camera.setBackgroundColor(0x333333);
        this._camera.setRoundPixels(true);
        this._camera.fadeIn(CAMERA_FADE_IN_DURATION);
    };

    SwitchScene(nextScene, data){
        this.scene.switch(nextScene, data);
    };

    // Stops the game loop and move the camera
    SwitchScreen(player, camera, direction){
        this.scene.pause();
        player.ResetInputs();
        
        let timeInterval = (1/CAMERA_ROOM_TRANSITION_SPEED) * 1000;
        let targetX, targetY;

        let movement;
        switch(direction){
            case "left":
                targetX = camera.scrollX - (GAME_WIDTH + ROOM_H_OFFSET);

                movement = setInterval(() => {
                    camera.scrollX -= CAMERA_ROOM_TRANSITION_H_FACTOR;
                    if(camera.scrollX <= targetX){
                        camera.scrollX = targetX;
                        this.scene.resume();
                        clearInterval(movement);
                    }
                }, timeInterval, camera, targetX, movement);

                player.setPosition(player.x - ROOM_H_OFFSET, player.y);

                this._currentRoom.x--;
                break;
            case "right":
                targetX = camera.scrollX + (GAME_WIDTH + ROOM_H_OFFSET);

                movement = setInterval(() => {
                    camera.scrollX += CAMERA_ROOM_TRANSITION_H_FACTOR;
                    if(camera.scrollX >= targetX){
                        camera.scrollX = targetX;
                        this.scene.resume();
                        clearInterval(movement);
                    }
                }, timeInterval, camera, targetX, movement);

                player.setPosition(player.x + ROOM_H_OFFSET, player.y);

                this._currentRoom.x++;
                break;
            case "up":
                targetY = camera.scrollY - (GAME_HEIGHT + ROOM_V_OFFSET);

                movement = setInterval(() => {
                    camera.scrollY -= CAMERA_ROOM_TRANSITION_V_FACTOR;
                    if(camera.scrollY <= targetY){
                        camera.scrollY = targetY;
                        this.scene.resume();
                        clearInterval(movement);
                    }
                }, timeInterval, camera, targetY, movement);

                player.setPosition(player.x, player.y - ROOM_V_OFFSET);

                this._currentRoom.y--;
                break;
            case "down":
                targetY = camera.scrollY + (GAME_HEIGHT + ROOM_V_OFFSET);

                movement = setInterval(() => {
                    camera.scrollY += CAMERA_ROOM_TRANSITION_V_FACTOR;
                    if(camera.scrollY >= targetY){
                        camera.scrollY = targetY;
                        this.scene.resume();
                        clearInterval(movement);
                    }
                }, timeInterval, camera, targetY, movement);

                player.setPosition(player.x, player.y + ROOM_V_OFFSET);

                this._currentRoom.y++;
                break;
        }

        player._weapon?.update();
        player.update();
    };

    update(){
        this._player?.update();

        this._enemies?.getChildren().forEach(enemy => {
            enemy.update();
        });

        this._pickups?.getChildren().forEach(pickup => {
            pickup.update();
        });

        //if(this._player){
        //    if(this._player.x < this._camera.scrollX){
        //        this.SwitchScreen(this._player, this._camera, "left");
        //    }
        //    else if(this._player.x > this._camera.scrollX + GAME_WIDTH){
        //        this.SwitchScreen(this._player, this._camera, "right");
        //    }
        //    if(this._player.y < this._camera.scrollY){
        //        this.SwitchScreen(this._player, this._camera, "up");
        //    }
        //    else if(this._player.y > this._camera.scrollY + GAME_HEIGHT){
        //        this.SwitchScreen(this._player, this._camera, "down");
        //    }
        //}
    };
}