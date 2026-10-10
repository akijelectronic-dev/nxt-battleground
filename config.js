/* ═══════════════════════════════════════════════════════
   NXT BATTLEGROUND — Configuration
   Author: AL-AMIN
   ═══════════════════════════════════════════════════════ */

'use strict';

/* ═══════════════════════════════════════════════════════
   GAME CONFIG
   ═══════════════════════════════════════════════════════ */
var GAME_CONFIG = {
  // Map
  MAP_WIDTH: 1500,
  MAP_HEIGHT: 1500,
  TILE_SIZE: 50,
  
  // Players
  TOTAL_PLAYERS: 20,
  BOT_COUNT: 19,
  
  // Player stats
  PLAYER_HP: 100,
  PLAYER_SHIELD: 0,
  PLAYER_SPEED: 3.2,
  PLAYER_SPRINT_MULT: 1.6,
  PLAYER_CROUCH_MULT: 0.5,
  PLAYER_RADIUS: 15,
  
  // Bullets
  BULLET_SPEED: 12,
  BULLET_LIFETIME: 2000,
  
  // Zone
  ZONE_START_RADIUS: 700,
  ZONE_END_RADIUS: 80,
  ZONE_SHRINK_TIME: 60,
  ZONE_DAMAGE: 2,
  
  // Vision
  VISION_RADIUS: 350,
  VIEW_ANGLE: 90,
  
  // Graphics
  FPS: 60,
  DEFAULT_QUALITY: 'medium'
};

/* ═══════════════════════════════════════════════════════
   WEAPONS (12 weapons)
   ═══════════════════════════════════════════════════════ */
var WEAPONS = {
  m500: {
    id: 'm500',
    name: 'M500',
    icon: '🔫',
    type: 'pistol',
    damage: 20,
    range: 300,
    fireRate: 300,
    magSize: 7,
    reloadTime: 1200,
    bulletSpeed: 14,
    spread: 0.02,
    color: '#e0e0e0'
  },
  usp: {
    id: 'usp',
    name: 'USP',
    icon: '🔫',
    type: 'pistol',
    damage: 25,
    range: 350,
    fireRate: 250,
    magSize: 12,
    reloadTime: 1400,
    bulletSpeed: 14,
    spread: 0.02,
    color: '#c0c0c0'
  },
  mp40: {
    id: 'mp40',
    name: 'MP40',
    icon: '🔫',
    type: 'smg',
    damage: 12,
    range: 400,
    fireRate: 80,
    magSize: 30,
    reloadTime: 1800,
    bulletSpeed: 15,
    spread: 0.06,
    color: '#8b7355'
  },
  ump: {
    id: 'ump',
    name: 'UMP',
    icon: '🔫',
    type: 'smg',
    damage: 18,
    range: 450,
    fireRate: 100,
    magSize: 30,
    reloadTime: 2000,
    bulletSpeed: 15,
    spread: 0.04,
    color: '#606060'
  },
  ak47: {
    id: 'ak47',
    name: 'AK47',
    icon: '🔫',
    type: 'rifle',
    damage: 30,
    range: 600,
    fireRate: 120,
    magSize: 30,
    reloadTime: 2400,
    bulletSpeed: 16,
    spread: 0.05,
    color: '#8b4513'
  },
  m4a1: {
    id: 'm4a1',
    name: 'M4A1',
    icon: '🔫',
    type: 'rifle',
    damage: 25,
    range: 600,
    fireRate: 100,
    magSize: 30,
    reloadTime: 2200,
    bulletSpeed: 16,
    spread: 0.03,
    color: '#4a4a4a'
  },
  scar: {
    id: 'scar',
    name: 'SCAR',
    icon: '🔫',
    type: 'rifle',
    damage: 28,
    range: 650,
    fireRate: 110,
    magSize: 30,
    reloadTime: 2300,
    bulletSpeed: 16,
    spread: 0.04,
    color: '#2f4f4f'
  },
  m1014: {
    id: 'm1014',
    name: 'M1014',
    icon: '🔫',
    type: 'shotgun',
    damage: 65,
    range: 200,
    fireRate: 600,
    magSize: 6,
    reloadTime: 2500,
    bulletSpeed: 13,
    spread: 0.15,
    pellets: 8,
    color: '#4a2c0a'
  },
  m1887: {
    id: 'm1887',
    name: 'M1887',
    icon: '🔫',
    type: 'shotgun',
    damage: 80,
    range: 180,
    fireRate: 800,
    magSize: 5,
    reloadTime: 2800,
    bulletSpeed: 12,
    spread: 0.18,
    pellets: 10,
    color: '#5c3a1a'
  },
  awm: {
    id: 'awm',
    name: 'AWM',
    icon: '🎯',
    type: 'sniper',
    damage: 95,
    range: 1200,
    fireRate: 1500,
    magSize: 5,
    reloadTime: 3500,
    bulletSpeed: 25,
    spread: 0.005,
    color: '#2c3e50'
  },
  kar98k: {
    id: 'kar98k',
    name: 'Kar98k',
    icon: '🎯',
    type: 'sniper',
    damage: 85,
    range: 1000,
    fireRate: 1200,
    magSize: 5,
    reloadTime: 3200,
    bulletSpeed: 24,
    spread: 0.008,
    color: '#3e2723'
  },
  pan: {
    id: 'pan',
    name: 'Pan',
    icon: '🍳',
    type: 'melee',
    damage: 40,
    range: 60,
    fireRate: 800,
    magSize: Infinity,
    reloadTime: 0,
    bulletSpeed: 0,
    spread: 0,
    color: '#1a1a1a'
  }
};

/* ═══════════════════════════════════════════════════════
   ITEMS / LOOT
   ═══════════════════════════════════════════════════════ */
var ITEMS = {
  // Helmets
  helmet1: { id:'helmet1', name:'Helmet Lv1', icon:'🪖', type:'helmet', level:1, shield:30, rarity:'common' },
  helmet2: { id:'helmet2', name:'Helmet Lv2', icon:'🪖', type:'helmet', level:2, shield:45, rarity:'rare' },
  helmet3: { id:'helmet3', name:'Helmet Lv3', icon:'🪖', type:'helmet', level:3, shield:60, rarity:'epic' },
  
  // Vests
  vest1: { id:'vest1', name:'Vest Lv1', icon:'🦺', type:'vest', level:1, shield:40, rarity:'common' },
  vest2: { id:'vest2', name:'Vest Lv2', icon:'🦺', type:'vest', level:2, shield:60, rarity:'rare' },
  vest3: { id:'vest3', name:'Vest Lv3', icon:'🦺', type:'vest', level:3, shield:80, rarity:'epic' },
  
  // Backpacks
  backpack1: { id:'backpack1', name:'Backpack Lv1', icon:'🎒', type:'backpack', level:1, slots:10, rarity:'common' },
  backpack2: { id:'backpack2', name:'Backpack Lv2', icon:'🎒', type:'backpack', level:2, slots:15, rarity:'rare' },
  backpack3: { id:'backpack3', name:'Backpack Lv3', icon:'🎒', type:'backpack', level:3, slots:20, rarity:'epic' },
  
  // Healing
  medkit: { id:'medkit', name:'Medkit', icon:'💊', type:'heal', heal:75, useTime:4000, rarity:'rare' },
  firstaid: { id:'firstaid', name:'First Aid', icon:'🩹', type:'heal', heal:50, useTime:2500, rarity:'common' },
  injection: { id:'injection', name:'Injection', icon:'💉', type:'heal', heal:100, useTime:1000, rarity:'epic' },
  food: { id:'food', name:'Food', icon:'🍖', type:'heal', heal:25, useTime:1500, rarity:'common' },
  
  // Throwables
  grenade: { id:'grenade', name:'Grenade', icon:'💣', type:'throwable', damage:80, radius:120, rarity:'common' },
  smoke: { id:'smoke', name:'Smoke Grenade', icon:'💨', type:'throwable', radius:150, duration:8000, rarity:'common' },
  molotov: { id:'molotov', name:'Molotov', icon:'🔥', type:'throwable', damage:10, radius:100, duration:5000, rarity:'rare' },
  
  // Ammo
  ammo_light: { id:'ammo_light', name:'Light Ammo', icon:'🟡', type:'ammo', ammoType:'light', count:30, rarity:'common' },
  ammo_medium: { id:'ammo_medium', name:'Medium Ammo', icon:'🟠', type:'ammo', ammoType:'medium', count:30, rarity:'common' },
  ammo_heavy: { id:'ammo_heavy', name:'Heavy Ammo', icon:'🔴', type:'ammo', ammoType:'heavy', count:10, rarity:'common' }
};

/* ═══════════════════════════════════════════════════════
   CHARACTERS / OUTFITS
   ═══════════════════════════════════════════════════════ */
var CHARACTERS = [
  { id:'default', name:'Recruit', icon:'🧑', color:'#00d4ff', rarity:'common', unlocked:true, hp:100, speed:1.0 },
  { id:'soldier', name:'Soldier', icon:'💂', color:'#22c55e', rarity:'common', unlocked:true, hp:105, speed:0.95 },
  { id:'ninja', name:'Ninja', icon:'🥷', color:'#1a1a1a', rarity:'rare', unlocked:false, hp:95, speed:1.15 },
  { id:'medic', name:'Medic', icon:'👨‍⚕️', color:'#ef4444', rarity:'rare', unlocked:false, hp:110, speed:1.0 },
  { id:'sniper', name:'Sniper', icon:'🎯', color:'#8b5cf6', rarity:'epic', unlocked:false, hp:90, speed:1.05 },
  { id:'commando', name:'Commando', icon:'🪖', color:'#f59e0b', rarity:'epic', unlocked:false, hp:120, speed:0.9 },
  { id:'ghost', name:'Ghost', icon:'👻', color:'#e0e0e0', rarity:'legendary', unlocked:false, hp:100, speed:1.2 },
  { id:'dragon', name:'Dragon', icon:'🐉', color:'#dc2626', rarity:'legendary', unlocked:false, hp:130, speed:1.0 }
];

/* ═══════════════════════════════════════════════════════
   MAP OBJECTS
   ═══════════════════════════════════════════════════════ */
var MAP_OBJECTS = {
  tree: { icon:'🌳', color:'#15803d', size:40, solid:true, blocksBullet:false },
  rock: { icon:'🪨', color:'#475569', size:35, solid:true, blocksBullet:true },
  bush: { icon:'🌿', color:'#166534', size:35, solid:false, blocksBullet:false, hides:true },
  water: { icon:'💧', color:'#0369a1', size:60, solid:false, blocksBullet:false, slows:true }
};

/* ═══════════════════════════════════════════════════════
   BUILDINGS (Free Fire style)
   ═══════════════════════════════════════════════════════ */
var BUILDINGS = [
  { type:'house_small', name:'Small House', color:'#78350f', roof:'#5c2a0a', loot:'low' },
  { type:'house_medium', name:'Medium House', color:'#78350f', roof:'#5c2a0a', loot:'medium' },
  { type:'house_large', name:'Large House', color:'#92400e', roof:'#78350f', loot:'high' },
  { type:'school', name:'School', color:'#1e40af', roof:'#1e3a8a', loot:'high' },
  { type:'hospital', name:'Hospital', color:'#dc2626', roof:'#991b1b', loot:'high' },
  { type:'factory', name:'Factory', color:'#525252', roof:'#404040', loot:'high' },
  { type:'warehouse', name:'Warehouse', color:'#7c2d12', roof:'#5c2a0a', loot:'medium' },
  { type:'shed', name:'Shed', color:'#a16207', roof:'#78350f', loot:'low' }
];

/* ═══════════════════════════════════════════════════════
   BOT NAMES
   ═══════════════════════════════════════════════════════ */
var BOT_NAMES = [
  'Shadow', 'Ghost', 'Reaper', 'Viper', 'Hunter',
  'Sniper', 'Blaze', 'Storm', 'Fury', 'Thunder',
  'Raven', 'Wolf', 'Falcon', 'Panther', 'Titan',
  'Phoenix', 'Cyclone', 'Vortex', 'Nova', 'Eclipse',
  'Ninja', 'Assassin', 'Rogue', 'Bandit', 'Outlaw',
  'Warrior', 'Gladiator', 'Spartan', 'Knight', 'Samurai'
];

/* ═══════════════════════════════════════════════════════
   HUD DEFAULTS
   ═══════════════════════════════════════════════════════ */
var HUD_DEFAULTS = {
  health: { x:20, y:20, size:100, opacity:100, visible:true },
  shield: { x:20, y:60, size:100, opacity:100, visible:true },
  kills: { x:'right', y:20, size:100, opacity:100, visible:true },
  alive: { x:'center', y:20, size:100, opacity:100, visible:true },
  zone: { x:'center', y:60, size:100, opacity:100, visible:true },
  minimap: { x:'right', y:80, size:100, opacity:100, visible:true },
  weapon: { x:'center', y:'bottom', size:100, opacity:100, visible:true },
  items: { x:'center', y:'bottom', size:100, opacity:100, visible:true }
};

/* ═══════════════════════════════════════════════════════
   DIFFICULTY SETTINGS
   ═══════════════════════════════════════════════════════ */
var DIFFICULTY = {
  easy: { botAccuracy:0.3, botReaction:800, botDamage:0.7, botSpeed:0.85, botCount:10 },
  normal: { botAccuracy:0.5, botReaction:500, botDamage:1.0, botSpeed:1.0, botCount:19 },
  hard: { botAccuracy:0.7, botReaction:300, botDamage:1.2, botSpeed:1.15, botCount:29 },
  insane: { botAccuracy:0.9, botReaction:150, botDamage:1.5, botSpeed:1.3, botCount:39 }
};

/* ═══════════════════════════════════════════════════════
   COLORS
   ═══════════════════════════════════════════════════════ */
var COLORS = {
  grass: '#166534',
  grassDark: '#14532d',
  road: '#52525b',
  building: '#78350f',
  buildingRoof: '#5c2a0a',
  water: '#0369a1',
  player: '#00d4ff',
  enemy: '#ef4444',
  bot: '#ef4444',
  bullet: '#fbbf24',
  zone: '#3b82f6',
  zoneDanger: '#dc2626',
  loot: '#fbbf24'
};

/* ═══════════════════════════════════════════════════════
   ACHIEVEMENTS
   ═══════════════════════════════════════════════════════ */
var ACHIEVEMENTS = [
  { id:'first_blood', name:'First Blood', desc:'Get your first kill', icon:'🩸' },
  { id:'sharpshooter', name:'Sharpshooter', desc:'Get 10 kills in one match', icon:'🎯' },
  { id:'survivor', name:'Survivor', desc:'Survive 5 minutes', icon:'⏱️' },
  { id:'winner', name:'Winner Winner', desc:'Win your first match', icon:'🏆' },
  { id:'champion', name:'Champion', desc:'Win 10 matches', icon:'👑' },
  { id:'collector', name:'Collector', desc:'Collect 100 items', icon:'📦' },
  { id:'sniper_king', name:'Sniper King', desc:'20 kills with sniper', icon:'🔭' },
  { id:'rampage', name:'Rampage', desc:'Kill 5 enemies in 30 seconds', icon:'💥' },
  { id:'untouchable', name:'Untouchable', desc:'Win without taking damage', icon:'✨' },
  { id:'lone_wolf', name:'Lone Wolf', desc:'Win a match solo with 0 items', icon:'🐺' }
];

/* ═══════════════════════════════════════════════════════
   AUDIO SOURCES (Free CDN URLs)
   ═══════════════════════════════════════════════════════ */
var AUDIO_SOURCES = {
  bgMenu: '',
  bgGame: '',
  pistol: '',
  rifle: '',
  shotgun: '',
  sniper: '',
  reload: '',
  footstep: '',
  heal: '',
  explosion: '',
  pickup: '',
  victory: '',
  death: '',
  hitmarker: '',
  zoneWarning: ''
};

/* ═══════════════════════════════════════════════════════
   STORAGE KEY
   ═══════════════════════════════════════════════════════ */
var STORAGE_KEY = 'nxt_battleground_v1';

/* ═══════════════════════════════════════════════════════
   END OF CONFIG
   ═══════════════════════════════════════════════════════ */
console.log('%c⚔️ NXT BATTLEGROUND Config Loaded', 'color:#ff6b00;font-family:monospace;font-size:14px;font-weight:bold');
console.log('Weapons: ' + Object.keys(WEAPONS).length);
console.log('Items: ' + Object.keys(ITEMS).length);
console.log('Characters: ' + CHARACTERS.length);
console.log('Bot Names: ' + BOT_NAMES.length);
