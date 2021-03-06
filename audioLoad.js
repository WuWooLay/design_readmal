var audioFiles = [
    "http://www.teanglann.ie/CanC/nua.mp3",
    "http://www.teanglann.ie/CanC/ag.mp3",
    "http://www.teanglann.ie/CanC/dul.mp3",
    "http://www.teanglann.ie/CanC/freisin.mp3"
];
    
function preloadAudio(url) {
    var audio = new Audio();
    // once this file loads, it will call loadedAudio()
    // the file will be kept by the browser as cache
    audio.addEventListener('canplaythrough', loadedAudio, false);
    audio.src = url;
}
    
var loaded = 0;
function loadedAudio() {
    // this will be called every time an audio file is loaded
    // we keep track of the loaded files vs the requested files
    loaded++;
    if (loaded == audioFiles.length){
    	// all have loaded
    	init();
    }
}
    
var player = document.getElementById('player');
function play(index) {
    player.src = audioFiles[index];
    player.play();
}
    
function init() {
    // do your stuff here, audio has been loaded
    // for example, play all files one after the other
    var i = 0;
    // once the player ends, play the next one
    player.onended = function() {
    	i++;
        if (i >= audioFiles.length) {
            // end 
            return;
        }
    	play(i);
    };
    // play the first file
    play(i);
}
    
// we start preloading all the audio files
for (var i in audioFiles) {
    preloadAudio(audioFiles[i]);
}