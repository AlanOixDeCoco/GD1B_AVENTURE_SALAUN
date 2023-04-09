// Debug mode
const DEBUG = false;

// Inputs
const INPUT_ZERO_TOLERANCE = 0.1;

// Dimensions
const GAME_WIDTH = 256;
const GAME_HEIGHT = 144;

const TILE_SIZE = 16;

const ROOM_H_OFFSET = 16;
const ROOM_V_OFFSET = 16;

// Durations
const CAMERA_ROOM_TRANSITION_SPEED = 256; // px/s
const CAMERA_ROOM_TRANSITION_H_FACTOR = 2;
const CAMERA_ROOM_TRANSITION_V_FACTOR = 1;
const CAMERA_FADE_OUT_DURATION = 1000; // ms
const CAMERA_FADE_IN_DURATION = 3000;

const CAMERA_UI_FADE_OUT_DURATION = 500;
const CAMERA_UI_FADE_IN_DURATION = 500;

const BULLET_LIFETIME = 3000; // milliseconds
const EMPTY_WEAPON_LIFETIME = 3000; // ms

const INVINCIBLE_DURATION_PLAYER = 1000; // ms
const INVINCIBLE_DURATION_ENEMY = 200; // ms
const INVINCIBLE_BLINK_INTERVAL = 100; // ms

const WEAPON_DEFAULT_RELOAD_DURATION = 1000; // ms
const WEAPON_RIFLE_RELOAD_DURATION = 2000; // ms
const WEAPON_REVOLVER_RELOAD_DURATION = 1000; // ms

const GRAPPLING_HOOK_LIFETIME = 300;

// Camera
const CAMERA_SHAKE_HIT_DURATION = 100; // ms
const CAMERA_SHAKE_HIT_INTENSITY = 0.02;

// Entities
const ENTITY_HEALTH = 1;

// Doors
const BREAKABLE_DOOR_HEALTH = 5;

// Player
const PLAYER_SPEED = 128; // px.s-1
const GRAPPLING_HOOK_SPEED = 256;
//const PLAYER_SPEED = 512; // px.s-1
const PLAYER_HEALTH = 3;

// Enemies
const ENEMY_SPEED = 56;
const ENEMIES_DRAG = 2000;
const ENEMY_RANGE_DETECTION_DELAY = 100; // ms
const ENEMY_DETECTED_RANGE_FACTOR = 1.4;
const ENEMY_HIT_DETECTION_DELAY = 2000;
const ENEMY_HEALTH = 2;
const ENEMY_ATTACK_DELAY = {min: 1000, max: 3000};
const ENEMY_DAMAGE_COLLIDE = 1;
const ENEMY_MINIMUM_AMMOS = 5;

// Obstacles
const SPIKES_DAMAGE = 1;

// Sprite layers depth
const LAYER_DEBUG = 100;

// UI layers
const LAYER_UI_TEXT = 210;
const LAYER_UI = 200;

const LAYER_FLOATING_UI = 150;

// Moving parts mayers
const LAYER_WEAPONS_TOP = 55;
const LAYER_ENTITIES = 45;
const LAYER_WEAPONS_BOTTOM = 44;
const LAYER_BULLETS = 90;

const LAYER_SHADOWS = 15;

// Map layers
const LAYER_WALLS_FRONT = 80;
const LAYER_DOORS = 70;
const LAYER_DECORATIONS = 68;
const LAYER_FENCES_FRONT = 65;
const LAYER_CONVEYORS_FRONT = 50;
const LAYER_CONVEYORS_BACK = 40;
const LAYER_FENCES_BACK = 30;
const LAYER_GRIPS = 25;
const LAYER_WALLS_BACK = 20;
const LAYER_OBSTACLES = 12;
const LAYER_GROUND = 10;
const LAYER_VOID = 0;

// Offsets
const OFFSET_FLOATING_UI_Y = -0;
const OFFSET_SHADOW_Y = -1;
const OFFSET_SHADOW_PICKUP_Y = 3;
const OFFSET_BULLET_SPAWN = 0;

// Gamepad buttons
const BUTTON_ATTACK = 0;
const BUTTON_INTERACT = 2;
const BUTTON_DROP = 3;
const BUTTON_SPECIAL = 1;
const BUTTON_LEFT = 14;
const BUTTON_RIGHT = 15;
const BUTTON_UP = 12;
const BUTTON_DOWN = 13;

// Gamepad Axis threshold
const AXIS_THRESHOLD_VERTICAL = 0.5;

// Sprites name
const SPRITE_PLAYER = "player";
const SPRITE_ENEMY = "enemy";
const SPRITE_BOSS = "boss";

const SPRITE_DOOR_COLLISION = "door_collision";
const SPRITE_HORIZONTAL_BREAKABLE_DOOR = "horizontal_breakableDoor";
const SPRITE_VERTICAL_BREAKABLE_DOOR_FRONT = "vertical_breakableDoor_front";
const SPRITE_VERTICAL_BREAKABLE_DOOR_BACK = "vertical_breakableDoor_back";
const SPRITE_HORIZONTAL_ACCESS_CARD_DOOR = "horizontal_accessCardDoor";
const SPRITE_VERTICAL_ACCESS_CARD_DOOR = "vertical_accessCardDoor";
const SPRITE_HORIZONTAL_BOSS_DOOR = "horizontal_bossDoor";

const SPRITE_ENEMY_DETECTION_RANGE = "enemy_detection_range";

const SPRITE_SHADOWS = "shadows"

const SPRITE_WEAPON_REVOLVER = "weapon_revolver";
const SPRITE_WEAPON_REVOLVER_PICKUP = "weapon_revolver_pickup";
const SPRITE_WEAPON_RIFLE = "weapon_rifle";
const SPRITE_WEAPON_RIFLE_PICKUP = "weapon_rifle_pickup";
const SPRITE_BULLET = "bullet";

const SPRITE_HALF_HEARTH_PICKUP = "half_hearth_pickup";
const SPRITE_HEARTH_PICKUP = "hearth_pickup";
const SPRITE_NEW_HEARTH_PICKUP = "new_hearth_pickup";

const SPRITE_ACCESS_CARD_PICKUP = "access_card_pickup";
const SPRITE_BOSS_CARD_PICKUP = "boss_card_pickup";

const SPRITE_GRAPPLE_PICKUP = "grapple_pickup";
const SPRITE_GRAPPLING_HOOK = "grappling_hook";

const SPRITE_GRIP = "grip";
const SPRITE_LEVER = "lever";

const SPRITE_SPIKES = "spikes";

// UI Sprites
const SPRITE_FLOATING_UI = "floating_ui";
const SPRITE_HEARTH_UI = "hearth_ui";
const SPRITE_AMMOS_BG_UI = "ammos_bg_ui";

// UI Positions
const POS_UI_PLAYER_ANIMATION = {x: -4, y: -5};

const POS_UI_HEARTHS = {x: 25, y: 8};
const SPACING_UI_HEARTHS = 13;

const POS_UI_AMMOS_BG = {x: 26, y: 22};

const POS_UI_AMMOS_CURRENT_TEXT = {x: 40, y: 20};
const POS_UI_AMMOS_MAX_TEXT = {x: 54, y: 20};

const POS_UI_GRAPPLING_HOOK = {x: 217, y: 6};
const POS_UI_CARDS = {x: 237, y: 7};

// Levels keys
const LEVEL_KEY_001 = "level_001";
const LEVEL_KEY_002 = "level_002";
const LEVEL_KEY_BOSS = "level_boss";
const LEVEL_KEY_UI = "level_ui";

const GAMEOVERSCENE_KEY = "gameover_scene";

// Levels name
const LEVEL_NAME_001 = "Usine d'ordinateurs";
const LEVEL_NAME_002 = "Open space";
const LEVEL_NAME_BOSS = "Bureau du boss";

// Fonts
const FONT_SIZE_X1 = 12;
const FONT_SIZE_X2 = 24;
const FONT_SIZE_X3 = 36;

const COLOR_AMMOS_MAX = 0xFFFFFF;
const COLOR_AMMOS_NORMAL_AMMOS = 0xffd800;
const COLOR_AMMOS_LOW_AMMOS = 0xFF8800;
const COLOR_AMMOS_NO_AMMO = 0xFF0000;

const LOW_AMMOS_AMOUNT = 4;