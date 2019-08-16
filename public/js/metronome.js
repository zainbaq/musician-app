var tick = document.getElementById("met-tick");
met = setTimeout();

function stop() {
    clearTimeout(met);
};
function metronome() {
    alert("!")
    var bpm = document.getElementById("bpm_val").value;
    var ticks_per_second = bpm/60;
    met(tick.play(), ticks_per_second*1000);
};

document.getElementById("start-button").onclick = metronome();
document.getElementById("stop-button").onclick = stop();