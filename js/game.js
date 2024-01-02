
let canvas;
let world;
let keyboard = new Keyboard();
let contentLoaded = false;
allSounds;
isFullscreen = false;

winner_Music.volume = 0.15;
game_music.volume = 0.15;
start_screen_music.volume = 0.20;

/**
 * function starts on load ,and plays the startscreen-music
 * also checks if sound has been muted
 */
function playStartMusic() {
  setTimeout(() => {
    start_screen_music.play();
  }, 1500);
  checkSoundMuted();
}

/** the init function starts running
 *  startscreen music gets muted
 *  startscreen images disappears
 *  toggleFullscreen checks if mobie device and starts fullscreen 
 */
function startGame() {
  init();
  document.getElementById('exitfull-icon').style.display = 'none';
  document.getElementById('start-screen').style.display = 'none';
  document.getElementById('start-btn').style.display = 'none';
  document.getElementById('restart-btn').style.display = 'flex';
  startMobileButtonTouch();
  stopMobileButtonTouch();
  toggleFullscreen();
}

/** function starts the game music
 *  loads the level
 *  sets the world and canvas
 */
function init() {
  start_screen_music.volume = 0;
  game_music.play();
  initLevel();
  setTimeout(() => {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
  }, 10);
}

/** restarts the game 
 *  winner or game-over overlays get hidden
 *  startscreen appears 
 */
function restartGame() {
  location.reload();
  document.getElementById('restart-btn').style.display = 'none';
  document.getElementById('game-over').style.display = 'none';
  document.getElementById('winner').style.display = 'none';
  document.getElementById('start-screen').style.display = 'flex';
}

// hides control - overlay
function hideControlOverlay() {
  document.getElementById('control-info').style.display = 'none';
}

// hides information - overlay
function hideInformationOverlay() {
  document.getElementById('information-text').style.display = 'none';
}

// shows controls
function showControls() {
  document.getElementById('control-info').style.display = 'flex';
  document.getElementById('information-text').style.display = 'none';
}

// shows information
function showInformation() {
  document.getElementById('control-info').style.display = 'none';
  document.getElementById('information-text').style.display = 'flex';
}

// switches to fullscreen onclick to the fullscreen icon
function fullScreen() {
  let fullscreen = document.getElementById('canvas-container');
  isFullscreen = true;
  enterFullscreen(fullscreen);
  styleFullScreen();
}

// exits  fullscreen onclick to the minimize fullscreen icon
function minimizeFullscreen() {
  document.getElementById('fullscreen-icon').style.display = 'flex';
  let fullScreen = document.getElementById('canvas-container');
  isFullscreen = false;
  exitFullscreen(fullScreen);
  styleMinimizedScreen();
}

/**
 *  sets height and width to the HTML elements,
 *  if switches to fullscreen
 */
function styleFullScreen() {
  document.getElementById('fullscreen-icon').style.display = 'none';
  document.getElementById('canvas').style.height = '100%';
  document.getElementById('canvas').style.width = '100%';
  document.getElementById('start-screen').style.width = '100%';
  document.getElementById('start-screen').style.height = '100%';
  document.getElementById('start-img').style.width = '100%';
  document.getElementById('start-img').style.height = '100%';
  document.getElementById('winner').style.width = '100%';
  document.getElementById('winner').style.height = '100%';
  document.getElementById('game-over').style.width = '100%';
  document.getElementById('game-over').style.height = '100%';
  document.getElementById('game-over-img').style.width = '100%';
  document.getElementById('game-over-img').style.height = '100%';
}

/**
 *  sets height and width to the HTML elements,
 *  if minimize to normal screen
 */
function styleMinimizedScreen() {
  document.getElementById('exitfull-icon').style.display = 'none';
  document.getElementById('canvas').style.height = '480px';
  document.getElementById('canvas').style.width = '720px';
  document.getElementById('start-screen').style.width = '720px';
  document.getElementById('start-screen').style.height = '480px';
  document.getElementById('start-img').style.height = '480px';
  document.getElementById('start-img').style.width = '720px';
  document.getElementById('winner').style.width = '720px';
  document.getElementById('winner').style.height = '480px';
  document.getElementById('game-over').style.width = '720px';
  document.getElementById('game-over').style.height = '480px';
  document.getElementById('game-over-img').style.width = '720px';
  document.getElementById('game-over-img').style.height = '480px';
}

/**
 * Enters fullscreen mode for the specified element.
 * @param {HTMLElement} element - The element for which fullscreen mode will be requested.
 */
function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {  // iOS Safari
    element.webkitRequestFullscreen();
  }
}

/**
 * Exits fullscreen mode if currently in fullscreen.
 */
function exitFullscreen() {
  if (document.exitFullscreen && isFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

// checks , if device is a mobile phone 
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// function checks if mobile device , and switches to fullscreen
function toggleFullscreen() {
  let fullscreenElement = document.getElementById('canvas-container');

  if (isMobileDevice()) {
    if (!document.fullscreenElement) {
      enterFullscreen(fullscreenElement);
      styleFullScreen();
    }
  }
}

// function exits fullscreen by pressing escape-key
function exitFullscreenOnEscape(event) {
  if (event.key === "Escape") {
    minimizeFullscreen();
    document.getElementById('fullscreen-icon').style.display = 'flex';
  }
}

// choosed element to go to fullscreen
const fullscreenElement = document.getElementById("canvas-container");
// event-listener which runs by pressing escape
document.addEventListener("keyup", exitFullscreenOnEscape);

/**
 * checks if sound is muted by restarting the game ,
 * or refreshing the website and stays at this status
 */
function checkSoundMuted() {
  const isMuted = getMuteState();
  if (isMuted) {
    muteAllSounds();
  } else {
    unmuteAllSounds();
  }
};


window.addEventListener("keydown", (e) => {
  if (e.keyCode == 27) {
    keyboard.Escape = true;
  }
  if (e.keyCode == 37) {
    keyboard.Left = true;
  }
  if (e.keyCode == 38) {
    keyboard.Up = true;
  }
  if (e.keyCode == 39) {
    keyboard.Right = true;
  }
  if (e.keyCode == 40) {
    keyboard.Down = true;
  }
  if (e.keyCode == 32) {
    keyboard.Space = true;
  }
  if (e.keyCode == 68) {
    keyboard.D = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode == 27) {
    keyboard.Escape = false;
  }
  if (e.keyCode == 37) {
    keyboard.Left = false;
  }
  if (e.keyCode == 38) {
    keyboard.Up = false;
  }
  if (e.keyCode == 39) {
    keyboard.Right = false;
  }
  if (e.keyCode == 40) {
    keyboard.Down = false;
  }
  if (e.keyCode == 32) {
    keyboard.Space = false;
  }
  if (e.keyCode == 68) {
    keyboard.D = false;
  }
});

function startMobileButtonTouch() {
  document.getElementById("left").addEventListener("touchstart", (ev) => {
    keyboard.Left = true;
    ev.preventDefault();
  });
  document.getElementById("right").addEventListener("touchstart", (ev) => {
    keyboard.Right = true;
    ev.preventDefault();
  });
  document.getElementById("jump").addEventListener("touchstart", (ev) => {
    keyboard.Space = true;
    ev.preventDefault();
  });
  document.getElementById("throw").addEventListener("touchstart", (ev) => {
    keyboard.D = true;
    ev.preventDefault();
  });
}

function stopMobileButtonTouch() {
  document.getElementById("left").addEventListener("touchend", (ev) => {
    keyboard.Left = false;
    ev.preventDefault();
  });
  document.getElementById("right").addEventListener("touchend", (ev) => {
    keyboard.Right = false;
    ev.preventDefault();
  });
  document.getElementById("jump").addEventListener("touchend", (ev) => {
    keyboard.Space = false;
    ev.preventDefault();
  });
  document.getElementById("throw").addEventListener("touchend", (ev) => {
    keyboard.D = false;
    ev.preventDefault();
  });
}

function moveRight() {
  const button = document.getElementById("right");

  button.addEventListener("mousedown", () => {
    keyboard.Right = true;
  });
  button.addEventListener("mouseup", () => {
    keyboard.Right = false;
  });
}

function moveLeft() {
  const button = document.getElementById("left");

  button.addEventListener("mousedown", () => {
    keyboard.Left = true;
  });
  button.addEventListener("mouseup", () => {
    keyboard.Left = false;
  });
}

function jump() {
  const button = document.getElementById("jump");

  button.addEventListener("mousedown", () => {
    keyboard.Space = true;
  });
  button.addEventListener("mouseup", () => {
    keyboard.Space = false;
  });
}

function throwBottle() {
  const button = document.getElementById("throw");

  button.addEventListener("mousedown", () => {
    keyboard.D = true;
  });
  button.addEventListener("mouseup", () => {
    keyboard.D = false;
  });
}


