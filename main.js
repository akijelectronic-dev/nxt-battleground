/* ═══════════════════════════════════════════════════════
   NXT BATTLEGROUND — Main Controller
   Author: AL-AMIN
   ═══════════════════════════════════════════════════════ */

'use strict';

/* ═══════════════════════════════════════════════════════
   GLOBAL STATE
   ═══════════════════════════════════════════════════════ */
var STATE = {
  currentScreen: 'mainMenu',
  selectedCharacter: 'default',
  playerData: {
    name: 'AL-AMIN',
    level: 1,
    xp: 0,
    xpToNext: 100,
    coins: 0,
    wins: 0,
    matches: 0,
    kills: 0,
    totalDamage: 0,
    playtime: 0,
    unlockedChars: ['default', 'soldier'],
    achievements: []
  },
  settings: {
    hud: JSON.parse(JSON.stringify(HUD_DEFAULTS)),
    joystickSize: 'medium',
    sensitivity: 5,
    btnOpacity: 100,
    leftHanded: false,
    masterVolume: 80,
    musicVolume: 50,
    effectsVolume: 80,
    voiceVolume: 70,
    graphicsQuality: 'medium',
    showFps: false,
    bloodEffects: true,
    particleEffects: true,
    screenShake: true
  },
  match: {
    active: false,
    players: [],
    player: null,
    bullets: [],
    loot: [],
    zone: null,
    startTime: 0,
    elapsed: 0
  }
};

/* ═══════════════════════════════════════════════════════
   BOOT SEQUENCE
   ═══════════════════════════════════════════════════════ */
(function init() {
  loadData();
  runSplash();
  bindKeyboard();
  console.log('%c⚔️ NXT BATTLEGROUND Loaded', 'color:#ff6b00;font-family:monospace;font-size:16px;font-weight:bold');
  console.log('%c>> Player: ' + STATE.playerData.name, 'color:#ffa500;font-family:monospace');
  console.log('%c>> Level: ' + STATE.playerData.level, 'color:#00d4ff;font-family:monospace');
})();

/* ═══════════════════════════════════════════════════════
   SPLASH
   ═══════════════════════════════════════════════════════ */
function runSplash() {
  var bar = document.getElementById('bootBar');
  var txt = document.getElementById('bootText');
  var msgs = ['LOADING ASSETS...', 'INITIALIZING MAP...', 'LOADING BOTS...', 'READY!'];
  var pct = 0, idx = 0;

  var interval = setInterval(function () {
    pct += 4;
    if (bar) bar.style.width = pct + '%';
    if (pct % 25 === 0 && idx < msgs.length) {
      if (txt) txt.textContent = msgs[idx];
      idx++;
    }
    if (pct >= 100) {
      clearInterval(interval);
      setTimeout(function () {
        var splash = document.getElementById('splash');
        if (splash) {
          splash.classList.add('hide');
          setTimeout(function () {
            splash.style.display = 'none';
            showScreen('mainMenu');
            updateMenuUI();
          }, 600);
        }
      }, 400);
    }
  }, 40);
}

/* ═══════════════════════════════════════════════════════
   SCREEN MANAGEMENT
   ═══════════════════════════════════════════════════════ */
function showScreen(id) {
  var screens = document.querySelectorAll('.screen');
  screens.forEach(function (s) { s.classList.remove('active'); });
  
  var target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
    STATE.currentScreen = id;
  }
}

function backToMenu() {
  if (STATE.match.active) {
    endMatch(false);
  }
  showScreen('mainMenu');
  updateMenuUI();
}

function hideRotatePrompt() {
  var rp = document.getElementById('rotatePrompt');
  if (rp) rp.style.display = 'none';
}

/* ═══════════════════════════════════════════════════════
   MENU UI UPDATE
   ═══════════════════════════════════════════════════════ */
function updateMenuUI() {
  var pd = STATE.playerData;
  
  var lvEl = document.getElementById('playerLevel');
  if (lvEl) lvEl.textContent = pd.level;
  
  var xpEl = document.getElementById('playerXpFill');
  if (xpEl) xpEl.style.width = ((pd.xp / pd.xpToNext) * 100) + '%';
  
  var coinsEl = document.getElementById('menuCoins');
  if (coinsEl) coinsEl.textContent = pd.coins;
  
  var winsEl = document.getElementById('menuWins');
  if (winsEl) winsEl.textContent = pd.wins;
}

/* ═══════════════════════════════════════════════════════
   CHARACTER SELECT
   ═══════════════════════════════════════════════════════ */
function openCharacterSelect() {
  showScreen('characterSelect');
  renderCharacterGrid();
}

function renderCharacterGrid() {
  var grid = document.getElementById('charGrid');
  if (!grid) return;
  grid.innerHTML = '';
  
  CHARACTERS.forEach(function (ch) {
    var isUnlocked = STATE.playerData.unlockedChars.indexOf(ch.id) !== -1;
    var isSelected = STATE.selectedCharacter === ch.id;
    
    var card = document.createElement('div');
    card.className = 'char-card' + (isSelected ? ' selected' : '');
    card.onclick = function () {
      if (isUnlocked) {
        selectCharacter(ch.id);
      } else {
        showToast('🔒 Character locked!', 'error');
      }
    };
    
    card.innerHTML =
      '<div class="char-icon">' + (isUnlocked ? ch.icon : '🔒') + '</div>' +
      '<div class="char-name">' + ch.name + '</div>' +
      '<div class="char-rarity ' + ch.rarity + '">' + ch.rarity + '</div>' +
      '<div style="font-size:10px;color:#7a7f8f;margin-top:4px">' +
        '❤️' + ch.hp + ' · 🏃' + (ch.speed * 100).toFixed(0) + '%' +
      '</div>';
    
    grid.appendChild(card);
  });
}

function selectCharacter(id) {
  STATE.selectedCharacter = id;
  showToast('✅ Selected: ' + CHARACTERS.find(function(c){return c.id===id;}).name, 'success');
  renderCharacterGrid();
  saveData();
}

/* ═══════════════════════════════════════════════════════
   INVENTORY
   ═══════════════════════════════════════════════════════ */
function openInventory() {
  showScreen('inventoryScreen');
  renderInventory();
}

function renderInventory() {
  var content = document.getElementById('inventoryContent');
  if (!content) return;
  content.innerHTML = '';
  
  // Show all weapons
  Object.keys(WEAPONS).forEach(function (wid) {
    var w = WEAPONS[wid];
    var card = document.createElement('div');
    card.className = 'char-card';
    card.innerHTML =
      '<div class="char-icon">' + w.icon + '</div>' +
      '<div class="char-name">' + w.name + '</div>' +
      '<div class="char-rarity rare">' + w.type + '</div>' +
      '<div style="font-size:10px;color:#7a7f8f;margin-top:4px">' +
        '💥' + w.damage + ' · 🎯' + w.range + 'm' +
      '</div>';
    content.appendChild(card);
  });
  
  // Show items
  Object.keys(ITEMS).forEach(function (iid) {
    var it = ITEMS[iid];
    var card = document.createElement('div');
    card.className = 'char-card';
    card.innerHTML =
      '<div class="char-icon">' + it.icon + '</div>' +
      '<div class="char-name">' + it.name + '</div>' +
      '<div class="char-rarity ' + (it.rarity || 'common') + '">' + (it.rarity || 'common') + '</div>';
    content.appendChild(card);
  });
}

/* ═══════════════════════════════════════════════════════
   LEADERBOARD
   ═══════════════════════════════════════════════════════ */
function openLeaderboard() {
  showScreen('leaderboardScreen');
  renderLeaderboard();
}

function renderLeaderboard() {
  var content = document.getElementById('leaderboardContent');
  if (!content) return;
  
  // Fake leaderboard data
  var players = [
    { name: 'AL-AMIN', kills: STATE.playerData.kills, wins: STATE.playerData.wins, isYou: true },
    { name: 'Shadow', kills: 245, wins: 32 },
    { name: 'Reaper', kills: 210, wins: 28 },
    { name: 'Viper', kills: 189, wins: 25 },
    { name: 'Ghost', kills: 156, wins: 20 },
    { name: 'Hunter', kills: 145, wins: 18 },
    { name: 'Sniper', kills: 132, wins: 15 },
    { name: 'Blaze', kills: 120, wins: 12 },
    { name: 'Storm', kills: 98, wins: 10 },
    { name: 'Fury', kills: 87, wins: 8 }
  ];
  
  players.sort(function (a, b) { return b.kills - a.kills; });
  
  content.innerHTML = '';
  
  var header = document.createElement('div');
  header.style.cssText = 'display:grid;grid-template-columns:50px 1fr 80px 80px;gap:10px;padding:12px 16px;background:rgba(255,107,0,.1);border-radius:10px;margin-bottom:12px;font-size:11px;color:#ffa500;font-weight:700;letter-spacing:1px';
  header.innerHTML = '<div>#</div><div>PLAYER</div><div>KILLS</div><div>WINS</div>';
  content.appendChild(header);
  
  players.forEach(function (p, i) {
    var item = document.createElement('div');
    item.style.cssText = 'display:grid;grid-template-columns:50px 1fr 80px 80px;gap:10px;padding:14px 16px;background:' + (p.isYou ? 'rgba(255,107,0,.15)' : 'rgba(26,31,46,.7)') + ';border:' + (p.isYou ? '1px solid #ff6b00' : '1px solid #2a3143') + ';border-radius:10px;margin-bottom:8px;align-items:center;font-size:13px';
    
    var rankIcon = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '#' + (i + 1);
    
    item.innerHTML =
      '<div style="font-weight:800;color:#ffa500;font-size:15px">' + rankIcon + '</div>' +
      '<div style="font-weight:700;color:' + (p.isYou ? '#ff6b00' : 'white') + '">' + p.name + (p.isYou ? ' (You)' : '') + '</div>' +
      '<div style="font-weight:800;color:#22c55e">' + p.kills + '</div>' +
      '<div style="font-weight:800;color:#00d4ff">' + p.wins + '</div>';
    
    content.appendChild(item);
  });
}

/* ═══════════════════════════════════════════════════════
   SETTINGS
   ═══════════════════════════════════════════════════════ */
function openSettings() {
  showScreen('settingsScreen');
}

function switchSettingsTab(tab) {
  document.querySelectorAll('.settings-tab').forEach(function (t) {
    t.classList.toggle('active', t.dataset.tab === tab);
  });
  document.querySelectorAll('.settings-panel').forEach(function (p) {
    p.classList.toggle('active', p.id === 'panel-' + tab);
  });
}

/* HUD Editor Drag */
function initHudEditor() {
  var els = document.querySelectorAll('.hud-element');
  els.forEach(function (el) {
    var isDragging = false;
    var offsetX = 0, offsetY = 0;
    
    el.addEventListener('mousedown', startDrag);
    el.addEventListener('touchstart', startDrag, { passive: false });
    
    function startDrag(e) {
      isDragging = true;
      var rect = el.getBoundingClientRect();
      var clientX = e.touches ? e.touches[0].clientX : e.clientX;
      var clientY = e.touches ? e.touches[0].clientY : e.clientY;
      offsetX = clientX - rect.left;
      offsetY = clientY - rect.top;
      e.preventDefault();
    }
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag, { passive: false });
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchend', stopDrag);
    
    function drag(e) {
      if (!isDragging) return;
      var parent = el.parentElement;
      var parentRect = parent.getBoundingClientRect();
      var clientX = e.touches ? e.touches[0].clientX : e.clientX;
      var clientY = e.touches ? e.touches[0].clientY : e.clientY;
      
      var x = clientX - parentRect.left - offsetX;
      var y = clientY - parentRect.top - offsetY;
      
      x = Math.max(0, Math.min(x, parentRect.width - el.offsetWidth));
      y = Math.max(0, Math.min(y, parentRect.height - el.offsetHeight));
      
      el.style.left = x + 'px';
      el.style.top = y + 'px';
      el.style.right = 'auto';
      
      e.preventDefault();
    }
    
    function stopDrag() { isDragging = false; }
  });
}

function updateHudScale(val) {
  STATE.settings.hudScale = parseInt(val);
  document.querySelectorAll('.hud-element').forEach(function (el) {
    var elName = el.dataset.el;
    var scale = val / 100;
    el.style.transform = 'scale(' + scale + ')';
    el.style.transformOrigin = 'top left';
  });
}

function updateHudOpacity(val) {
  var opacity = val / 100;
  document.querySelectorAll('.hud-element').forEach(function (el) {
    el.style.opacity = opacity;
  });
}

function saveHudLayout() {
  var layout = {};
  document.querySelectorAll('.hud-element').forEach(function (el) {
    layout[el.dataset.el] = {
      left: el.style.left,
      top: el.style.top,
      right: el.style.right
    };
  });
  STATE.settings.hudLayout = layout;
  saveData();
  showToast('✅ HUD layout saved', 'success');
}

function resetHudLayout() {
  document.querySelectorAll('.hud-element').forEach(function (el) {
    el.style.transform = '';
    el.style.opacity = 1;
    var name = el.dataset.el;
    if (name === 'health') { el.style.left = '20px'; el.style.top = '20px'; el.style.right = 'auto'; }
    if (name === 'shield') { el.style.left = '20px'; el.style.top = '60px'; el.style.right = 'auto'; }
    if (name === 'kills') { el.style.right = '20px'; el.style.top = '20px'; el.style.left = 'auto'; }
    if (name === 'alive') { el.style.left = '50%'; el.style.top = '20px'; el.style.right = 'auto'; }
    if (name === 'minimap') { el.style.right = '20px'; el.style.top = '80px'; el.style.left = 'auto'; }
  });
  showToast('↩️ HUD reset');
}

function updateJoystickSize(val) {
  STATE.settings.joystickSize = val;
  saveData();
}

function updateSensitivity(val) {
  STATE.settings.sensitivity = parseInt(val);
  var el = document.getElementById('sensValue');
  if (el) el.textContent = val;
  saveData();
}

function updateBtnOpacity(val) {
  STATE.settings.btnOpacity = parseInt(val);
  saveData();
}

function toggleLeftHanded(checked) {
  STATE.settings.leftHanded = checked;
  saveData();
}

function resetControls() {
  showToast('↩️ Controls reset');
}

function updateMasterVolume(val) {
  STATE.settings.masterVolume = parseInt(val);
  var el = document.getElementById('masterVolValue');
  if (el) el.textContent = val + '%';
  saveData();
}

function updateMusicVolume(val) {
  STATE.settings.musicVolume = parseInt(val);
  var el = document.getElementById('musicVolValue');
  if (el) el.textContent = val + '%';
  saveData();
}

function updateEffectsVolume(val) {
  STATE.settings.effectsVolume = parseInt(val);
  var el = document.getElementById('effectsVolValue');
  if (el) el.textContent = val + '%';
  saveData();
}

function updateVoiceVolume(val) {
  STATE.settings.voiceVolume = parseInt(val);
  var el = document.getElementById('voiceVolValue');
  if (el) el.textContent = val + '%';
  saveData();
}

function updateGraphicsQuality(val) {
  STATE.settings.graphicsQuality = val;
  saveData();
  showToast('Graphics: ' + val.toUpperCase());
}

function toggleFps(checked) {
  STATE.settings.showFps = checked;
  var el = document.getElementById('fpsCounter');
  if (el) el.classList.toggle('show', checked);
  saveData();
}

function toggleBlood(checked) {
  STATE.settings.bloodEffects = checked;
  saveData();
}

function toggleParticles(checked) {
  STATE.settings.particleEffects = checked;
  saveData();
}

function toggleScreenShake(checked) {
  STATE.settings.screenShake = checked;
  saveData();
}

/* ═══════════════════════════════════════════════════════
   MATCH START
   ═══════════════════════════════════════════════════════ */
function startMatch() {
  showScreen('matchLoading');
  runMatchLoading();
}

function runMatchLoading() {
  var countEl = document.getElementById('loadingCountdown');
  var tipEl = document.getElementById('loadingTip');
  var playerCountEl = document.getElementById('loadingPlayerCount');
  
  if (playerCountEl) playerCountEl.textContent = GAME_CONFIG.TOTAL_PLAYERS;
  
  var tips = [
    'Dropping in...',
    'Stay inside the safe zone!',
    'Loot weapons and armor!',
    'Watch out for enemies!',
    'Last one standing wins!'
  ];
  
  var count = 3;
  if (countEl) countEl.textContent = count;
  if (tipEl) tipEl.textContent = tips[0];
  
  var interval = setInterval(function () {
    count--;
    if (count > 0) {
      if (countEl) countEl.textContent = count;
      if (tipEl) tipEl.textContent = tips[3 - count] || tips[0];
    } else {
      clearInterval(interval);
      if (countEl) countEl.textContent = 'GO!';
      setTimeout(beginGameplay, 800);
    }
  }, 1000);
}

function beginGameplay() {
  STATE.match.active = true;
  STATE.match.startTime = Date.now();
  STATE.match.elapsed = 0;
  
  showScreen('gameScreen');
  
  // Initialize game if function exists (Part 5+)
  if (typeof initGameplay === 'function') {
    initGameplay();
  } else {
    showToast('⚠️ Gameplay coming in Part 5', 'error');
    
    // Placeholder - show canvas
    var canvas = document.getElementById('gameCanvas');
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      var ctx = canvas.getContext('2d');
      ctx.fillStyle = '#0a0e1a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#ff6b00';
      ctx.font = 'bold 30px Orbitron, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('GAMEPLAY COMING', canvas.width/2, canvas.height/2 - 20);
      ctx.fillText('IN PART 5', canvas.width/2, canvas.height/2 + 30);
    }
  }
}

function endMatch(isVictory) {
  STATE.match.active = false;
  
  // Update stats
  STATE.playerData.matches++;
  STATE.playerData.playtime += STATE.match.elapsed;
  
  if (isVictory) {
    STATE.playerData.wins++;
    STATE.playerData.coins += 100;
    STATE.playerData.xp += 250;
    showVictoryScreen();
  } else {
    STATE.playerData.coins += 20;
    STATE.playerData.xp += 50;
    showDeathScreen();
  }
  
  // Level up check
  checkLevelUp();
  
  saveData();
}

function checkLevelUp() {
  while (STATE.playerData.xp >= STATE.playerData.xpToNext) {
    STATE.playerData.xp -= STATE.playerData.xpToNext;
    STATE.playerData.level++;
    STATE.playerData.xpToNext = Math.floor(STATE.playerData.xpToNext * 1.5);
    showToast('🎉 Level Up! Level ' + STATE.playerData.level, 'success');
  }
}

function showVictoryScreen() {
  var kills = STATE.match.kills || 10;
  var damage = STATE.match.totalDamage || 1850;
  var time = formatTime(STATE.match.elapsed);
  
  var kel = document.getElementById('victoryKills');
  var del = document.getElementById('victoryDamage');
  var tel = document.getElementById('victoryTime');
  
  if (kel) kel.textContent = kills;
  if (del) del.textContent = damage;
  if (tel) tel.textContent = time;
  
  showScreen('victoryScreen');
}

function showDeathScreen() {
  var killer = STATE.match.killer || 'Bot_01';
  var rank = STATE.match.rank || '#15';
  var kills = STATE.match.kills || 3;
  var damage = STATE.match.totalDamage || 450;
  var time = formatTime(STATE.match.elapsed);
  
  var kEl = document.getElementById('killerName');
  var rEl = document.getElementById('deathRank');
  var kiEl = document.getElementById('deathKills');
  var dEl = document.getElementById('deathDamage');
  var sEl = document.getElementById('deathSurvived');
  
  if (kEl) kEl.textContent = killer;
  if (rEl) rEl.textContent = rank;
  if (kiEl) kiEl.textContent = kills;
  if (dEl) dEl.textContent = damage;
  if (sEl) sEl.textContent = time;
  
  showScreen('deathScreen');
}

/* ═══════════════════════════════════════════════════════
   HUD TOGGLES
   ═══════════════════════════════════════════════════════ */
function toggleMap() {
  var map = document.getElementById('fullMap');
  if (map) map.classList.toggle('show');
}

function toggleInventory() {
  var inv = document.getElementById('inventoryOverlay');
  if (inv) inv.classList.toggle('show');
}

function toggleCrouch() {
  if (typeof playerToggleCrouch === 'function') playerToggleCrouch();
  showToast('🧎 Crouch');
}

function toggleSprint() {
  if (typeof playerToggleSprint === 'function') playerToggleSprint();
  showToast('🏃 Sprint');
}

/* ═══════════════════════════════════════════════════════
   TOAST
   ═══════════════════════════════════════════════════════ */
var TOAST_TIMER = null;
function showToast(msg, type) {
  var t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className = 'toast';
  if (type) t.classList.add(type);
  setTimeout(function () { t.classList.add('show'); }, 10);
  clearTimeout(TOAST_TIMER);
  TOAST_TIMER = setTimeout(function () { t.classList.remove('show'); }, 2500);
}

/* ═══════════════════════════════════════════════════════
   STORAGE
   ═══════════════════════════════════════════════════════ */
function saveData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      playerData: STATE.playerData,
      settings: STATE.settings,
      selectedCharacter: STATE.selectedCharacter
    }));
  } catch (e) {}
}

function loadData() {
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      var d = JSON.parse(raw);
      if (d.playerData) Object.assign(STATE.playerData, d.playerData);
      if (d.settings) Object.assign(STATE.settings, d.settings);
      if (d.selectedCharacter) STATE.selectedCharacter = d.selectedCharacter;
    }
  } catch (e) {}
}

/* ═══════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════ */
function formatTime(ms) {
  var s = Math.floor(ms / 1000);
  var m = Math.floor(s / 60);
  var ss = s % 60;
  return m + ':' + (ss < 10 ? '0' : '') + ss;
}

/* ═══════════════════════════════════════════════════════
   KEYBOARD
   ═══════════════════════════════════════════════════════ */
function bindKeyboard() {
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (STATE.currentScreen === 'gameScreen') {
        if (confirm('Quit match?')) endMatch(false);
      } else if (STATE.currentScreen !== 'mainMenu') {
        backToMenu();
      }
    }
    
    if (e.key === 'm' || e.key === 'M') {
      if (STATE.currentScreen === 'gameScreen') toggleMap();
    }
    
    if (e.key === 'Tab') {
      e.preventDefault();
      if (STATE.currentScreen === 'gameScreen') toggleInventory();
    }
  });
}

/* ═══════════════════════════════════════════════════════
   RESIZE
   ═══════════════════════════════════════════════════════ */
window.addEventListener('resize', function () {
  var canvas = document.getElementById('gameCanvas');
  if (canvas && STATE.currentScreen === 'gameScreen') {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});

/* ═══════════════════════════════════════════════════════
   INIT HUD EDITOR ON SETTINGS OPEN
   ═══════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {
  setTimeout(initHudEditor, 500);
});

/* ═══════════════════════════════════════════════════════
   END
   ═══════════════════════════════════════════════════════ */
