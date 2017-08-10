# DRM-MACH

A drum machine and synthesizer sequencer.

Live link: [DRM-MACH ](https://juliantreweeke.github.io/drum-machine/)

![](images/screenshot.png?raw=true)

## Features

__Record in:__
If you press one of the 'REC' channels you can record audio into the browser.
There will be a "1-2-3-GO!" countdown then recording starts.
To stop the recording press the button again.
Then you can add the recording into the browser.

__Multiple Sounds:__
If you press the name of the channel it will toggle through different sounds.
If you press on the synth and bass channel squares more then once, the squares will toggle through the key of A minor.

__FX:__

In the right hand corner there is a sound effects panel.

__Beat Jump:__

If you press the left or right arrows the sequence will skip beats.
Also 0-9 jumps to the 0-9th part of the loop.

__Visuals from audio frequency analysis:__

The visuals are controlled by the frequencies of the different audio parts.

__EXPERIMENTAL FEATURE---REC :__
You can record all the audio from the drum machine by pressing the 'REC' button in the top left hand part of the screen.
Unfortunately the audio is distorted.
This is something I have to fix and seek out another plugin to do this option.

### Libraries.

I used P5.js for all the visuals and P5.sound for all the audio.

Live link: [P5 Libraries](https://p5js.org/libraries/)

### Bugs.

If you record multiple channels at the same time sometimes the browser slows down and acts strangely.


### Future goals.

My next goals are to add multiplayer options and sound storage with google's firebase.
