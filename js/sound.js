// sound - elements
const game_music = new Audio('audio/game-music.mp3');
const gameOverMusic = new Audio('audio/game-over-music.wav');
const start_screen_music = new Audio('audio/start-screen-music.mp3');
const winner_Music = new Audio('audio/winner_music.mp3');
const walkingSound = new Audio('audio/walking.mp3');
const jumpingSound = new Audio('audio/jump.mp3');
const deadSound = new Audio('audio/death.mp3');
const hurtSound = new Audio('audio/hurt.mp3');
const gameOverVoice = new Audio('audio/game-over.mp3');
const chicken_dead_sound = new Audio('audio/chicken-dead.mp3');
const endboss_Sound = new Audio('audio/chicken-boss-death.mp3');
const bottle_splash_sound = new Audio('audio/bottle-broken.mp3');
const collect_coin_sound = new Audio('audio/collect-coin.mp3');
const collect_bottle_sound = new Audio('audio/collect-bottle.mp3');
const endboss_music = new Audio('audio/endboss-music.mp3');
const snoringSound = new Audio('audio/snoring-sound.mp3');


// Array with all sound elements
const allSounds = [
  game_music,
  gameOverMusic,
  start_screen_music,
  winner_Music,
  walkingSound,
  jumpingSound,
  deadSound,
  hurtSound,
  gameOverVoice,
  chicken_dead_sound,
  endboss_Sound,
  bottle_splash_sound,
  collect_coin_sound,
  collect_bottle_sound,
  endboss_music,
  snoringSound,
];

// function which saves to local storage
function saveMuteState(muted) {
  localStorage.setItem('soundMuted', muted);
}

//Function to query the muted state from the Local Storage
function getMuteState() {
  const muted = localStorage.getItem('soundMuted');
  return muted === 'true'; // The Local Storage stores strings, so we compare with 'true'.
}

// function tomutes sound and saves it to local storage
function muteAllSounds() {
  allSounds.forEach(sound => {
    sound.muted = true;
  });
  saveMuteState(true);
  document.getElementById('sound-mute').style.display = 'none';
  document.getElementById('sound-on').style.display = 'flex';
}

//function unmutes sound and saves it to the local storage
function unmuteAllSounds() {
  allSounds.forEach(sound => {
    sound.muted = false;
  });
  saveMuteState(false);
  document.getElementById('sound-mute').style.display = 'flex';
  document.getElementById('sound-on').style.display = 'none';
}

// function , which checks if sound is muted , stays muted by refresh or restart
function checkSoundMuted() {
  const isMuted = getMuteState();
  if (isMuted) {
    muteAllSounds();
  } else {
    unmuteAllSounds();
  }
};

