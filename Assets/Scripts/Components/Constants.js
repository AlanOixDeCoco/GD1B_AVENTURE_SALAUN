// Debug mode
const DEBUG = true;

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

const BULLET_LIFETIME = 3000; // milliseconds
const EMPTY_WEAPON_LIFETIME = 3000; // ms

const INVINCIBLE_DURATION_PLAYER = 1000; // ms
const INVINCIBLE_DURATION_ENEMY = 200; // ms
const INVINCIBLE_BLINK_INTERVAL = 100; // ms

// Camera
const CAMERA_SHAKE_HIT_DURATION = 100; // ms
const CAMERA_SHAKE_HIT_INTENSITY = 0.02;

// Entities
const ENTITY_HEALTH = 1;

// Player
const PLAYER_SPEED = 128; // px.s-1
const PLAYER_HEALTH = 5;

// Enemies
const ENEMY_SPEED = 64;
const ENEMIES_DRAG = 2000;
const ENEMY_RANGE_DETECTION_DELAY = 1000; // ms
const ENEMY_HIT_DETECTION_DELAY = 2000;
const ENEMY_HEALTH = 3;
const ENEMY_ATTACK_DELAY = {min: 1000, max: 3000};
const ENEMY_DAMAGE_COLLIDE = 1;

// Sprite layers depth
const LAYER_DEBUG = 100;

const LAYER_WEAPONS_TOP = 11;
const LAYER_ENTITIES = 10;
const LAYER_WEAPONS_BOTTOM = 9;
const LAYER_BULLETS = 8;

const LAYER_OBSTACLES = 5;
const LAYER_WALLS = 2;

const LAYER_SHADOWS = 1;
const LAYER_GROUND = 0;

// Offsets
const OFFSET_SHADOW_Y = 0;
const OFFSET_SHADOW_PICKUP_Y = 4;
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

const SPRITE_ENEMY_DETECTION_RANGE = "enemy_detection_range";

const SPRITE_SHADOWS = "shadows"

const SPRITE_WEAPON_REVOLVER = "weapon_revolver";
const SPRITE_WEAPON_RIFLE = "weapon_rifle";
const SPRITE_BULLET = "bullet";

// Levels keys
const LEVEL_KEY_001 = "level_001";
const LEVEL_KEY_002 = "level_002";
const LEVEL_KEY_BOSS = "level_boss";

// Levels name
const LEVEL_NAME_001 = "Usine d'ordinateurs";
const LEVEL_NAME_002 = "Open space";
const LEVEL_NAME_BOSS = "Bureau du boss";