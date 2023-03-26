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

const INVINCIBLE_DURATION = 1.5 * 1000;

// Player
const PLAYER_SPEED = 80; // px.s-1
const INITIAL_HEALTH = 3;

// Sprite layers depth
const LAYER_WEAPONS = 11;
const LAYER_ENTITIES = 10;
const LAYER_SHADOWS = 1;
const LAYER_GROUND = 0;

// Offsets
const OFFSET_SHADOW_Y = 1;

// Gamepad buttons
const BUTTON_ATTACK = 0;
const BUTTON_BOXING = 1;
const BUTTON_GRAPPLING = 2;
const BUTTON_LEFT = 14;
const BUTTON_RIGHT = 15;
const BUTTON_UP = 12;
const BUTTON_DOWN = 13;

// Gamepad Axis threshold
const AXIS_THRESHOLD_VERTICAL = 0.5;

// Sprites name
const SPRITE_PLAYER = "player";
const SPRITE_ENNEMY = "ennemy";
const SPRITE_BOSS = "boss";

const SPRITE_SHADOWS = "shadows"

const SPRITE_WEAPON_REVOLVER = "weapon_revolver";
const SPRITE_WEAPON_RIFLE = "weapon_rifle";

// Levels keys
const LEVEL_KEY_001 = "level_001";
const LEVEL_KEY_002 = "level_002";
const LEVEL_KEY_BOSS = "level_boss";

// Levels name
const LEVEL_NAME_001 = "Usine d'ordinateurs";
const LEVEL_NAME_002 = "Open space";
const LEVEL_NAME_BOSS = "Bureau du boss";