
const metronome_tick = new Audio('/public/assets/audio/metronome_sound.mp3');

function stop() {
    alert("stop button working!")
    clearTimeout(met)
}
function metronome() {
    alert("start button working!")
    var bpm = document.getElementById("bpm_val");
    var ticks_per_second = bpm/60;
    met = setTimeout(metronome_tick.play(), ticks_per_second*1000);
    met();
}

document.getElementById("start-button").addEventListener("click", metronome());
document.getElementById("stop-button").addEventListener("click", stop());