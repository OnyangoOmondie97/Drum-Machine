document.addEventListener("DOMContentLoaded", function() {

    // Variables for power state and bank state
    let powerOn = true;
    let currentBank = 'Heater';

    // Define the Heater and Piano sound banks
    const heaterSounds = {
        'Q': 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
        'W': 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
        'E': 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
        'A': 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
        'S': 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
        'D': 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
        'Z': 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
        'X': 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
        'C': 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    };

    const pianoSounds = {
        //URLs for the Piano sound kit
        'Q': 'URL_FOR_PIANO_SOUND_FOR_Q',
        'W': 'URL_FOR_PIANO_SOUND_FOR_W',
        'E': 'URL_FOR_PIANO_SOUND_FOR_E',
        'A': 'URL_FOR_PIANO_SOUND_FOR_A',
        'S': 'URL_FOR_PIANO_SOUND_FOR_S',
        'D': 'URL_FOR_PIANO_SOUND_FOR_D',
        'Z': 'URL_FOR_PIANO_SOUND_FOR_Z',
        'X': 'URL_FOR_PIANO_SOUND_FOR_X',
        'C': 'URL_FOR_PIANO_SOUND_FOR_C',
        
    };

    // Function to play the audio clip and display its name
    function playAudioAndDisplay(pad) {
        // Check if power is on
        if (!powerOn) return;

        // Fetch the audio element and play the sound
        let audio = pad.querySelector('audio');
        audio.currentTime = 0;
        audio.play();

        // Display the sound name on the display
        let display = document.getElementById('display');
        display.innerText = pad.id;
    }

    // Function to update audio sources based on the chosen sound bank
    function updateBank() {
        let pads = document.querySelectorAll('.drum-pad');
        pads.forEach(pad => {
            let audio = pad.querySelector('audio');
            // Set the audio source based on the current bank
            audio.src = currentBank === 'Heater' ? heaterSounds[audio.id] : pianoSounds[audio.id];
        });
    }

    // Event listener for each drum pad when clicked
    let pads = document.querySelectorAll('.drum-pad');
    pads.forEach(pad => {
        pad.addEventListener('click', function() {
            playAudioAndDisplay(this);
        });
    });

    // Event listener to trigger drum sounds when corresponding key is pressed
    document.addEventListener('keypress', function(e) {
        let key = e.key.toUpperCase();
        let audioElement = document.getElementById(key);
        if (audioElement) {
            let pad = audioElement.parentElement;
            playAudioAndDisplay(pad);
        }
    });

    // Event listener to handle volume changes
    let volumeSlider = document.querySelector('.volume-slider input[type="range"]');
    volumeSlider.addEventListener('change', function() {
        let volume = this.value;
        let clips = document.querySelectorAll('audio');
        clips.forEach(clip => {
            clip.volume = volume;
        });
    });

    // Event listener for the power control toggle
    let powerControl = document.querySelector('.control .select');
    powerControl.addEventListener('click', function() {
        // Toggle power state
        powerOn = !powerOn;

        // Move the inner div to show toggle effect
        let innerDiv = this.querySelector('.inner');
        innerDiv.style.left = powerOn ? '26px' : '2px'; 

        // Optional: Provide feedback in the display
        let display = document.getElementById('display');
        display.innerText = powerOn ? "Power ON" : "Power OFF";
    });

    // Event listener for switching between Heater and Piano sound banks
    let bankControl = document.querySelectorAll('.control .select')[1];
    bankControl.addEventListener('click', function() {
        // Switch between Heater and Piano banks
        currentBank = currentBank === 'Heater' ? 'Piano' : 'Heater';
        updateBank();

        // Move the inner div to show toggle effect
        let innerDiv = this.querySelector('.inner');
        innerDiv.style.left = currentBank === 'Heater' ? '26px' : '2px';

        // Optional: Provide feedback in the display
        let display = document.getElementById('display');
        display.innerText = currentBank;
    });
});

    