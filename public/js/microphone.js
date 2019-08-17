function Microphone(fft) {
    var FFT_SIZE = fft || 1024;
    this.spectrum = [];
    this.volume = this.vol = 0;
    this.peak_volume = 0;
    var self = this;

    var audioContext = new AudioContext();
    var SAMPLE_RATE = audioContext.sampleRate;

    // Browser checker
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
    window.addEventListener('load', init, false);
    
    function init() {
        try {
            startMic(new AudioContext());
        } catch (e) {
            console.error(e)
            alert('Web Audio API is not suported in this browser');
        }
    }

    function startMic(context) {
        alert("StartMic function active.")
        let constraintObj = {
            audio:true,
            video:false,
        }
        navigator.getUserMedia(constraintObj, processSound, error);
        function processSound(stream) {
            var analyser = context.createAnalyser();
            analyser.smoothingTimeConstant = 0.2;
            analyser.fftsize = FFT_SIZE;

            var node = context.createScriptProcessor(FFT_SIZE*2,1,1);
            node.onaudioprocess = function () {
                self.spectrum = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequency(self.spectrum);
                // 
            
            self.vol = self.getRMS(self.spectrum);
            if (self.vol > self.peak_volume){self.peak_volume = self.vol};
            self.volume = self.vol;
            };

            var input = context.createMediaStreamSource(stream);
            input.connect(analyser);
            analyser.connect(node);
            node.connect(context.destination);
        }
        function error () {
            console.log(arguments);
        }
    }

    return this;
};