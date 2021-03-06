////////////////////////////////////////////////////////////////
////     KODAM AUDIO - SYNTHESISED MUSIC AND SOUND FX       ////
//// ------------------------------------------------------ ////
/// a Little Sketches experiment with interactive webAudio  ////
/// messing for the KODAM modelling project                  ////
///                                                         ////
//// ------------------------------------------------------ ////
/// This one uses tone.js for web audio and d3 for visuals. ////
///  MIT license etc.                                       ////
////////////////////////////////////////////////////////////////


    // Audio play 'state', ToneJS Audio components and methods for composing music and phrase selection
    const audio = {
        context:            typeof(window.AudioContext) !== 'undefined'  ? new AudioContext() :  new webkitAudioContext(),
        fx:  {
            masterGain:         new Tone.Gain(0.10).toDestination(),  
            leadGain:           new Tone.Gain(0.12).toDestination(),  
            rhythmGain:         new Tone.Gain(0.08).toDestination(),
            panner:             new Tone.AutoPanner("2m").toDestination().start(),
            oscillator:         new Tone.Oscillator(100),
            phaser:             new Tone.Phaser({
                                    "frequency" : 0.8,
                                    "octaves" : 5,
                                    "baseFrequency" : 1000
                                })
        },
        state: {
            performance: {
                song:                      'blisterInTheSun',      
                prevSong:                   null,      
                playingPhrase:              'none',
                next:                      'start',
                prev:                       '',
                timeSignature:              '',
                transitionPending:          false,
                songChangePending:          false
            }, 
            time:       {},
            audioClock:            new Tone.Clock(time => { console.log(time) }, 1),
        },
        instruments: {
            synth_marimba:      new Tone.PolySynth({
                oscillator: {
                    type:           "fmsquare5",
                    partials:       [1, 0, 2, 0, 3]
                },
                envelope: {
                    attack:         0.001,
                    decay:          1.2,
                    sustain:        0,
                    release:        1.2
                }
            }),
            synth_kalimba:          new Tone.PolySynth({
                harmonicity:        8,
                modulationIndex:    2,
                oscillator: {
                    type:         "sine"
                },
                envelope: {
                    attack:         0.001,
                    decay:          2,
                    sustain:        0.1,
                    release:        2
                },
                modulation: {
                    type:           "square"
                },
                modulationEnvelope : {
                    attack:         0.002,
                    decay:          0.2,
                    sustain:        0,
                    release:        0.2
                }
            }),
            synth_bass:             new Tone.PolySynth({
                oscillator: {
                    type:           "fmsquare5",
                    modulationType: "triangle",
                    modulationIndex: 2,
                    harmonicity:    0.501
                },
                filter: {
                    Q:              1,
                    type:           "lowpass",
                    rolloff:        -24
                },
                envelope: {
                    attack:         0.01,
                    decay:          0.1,
                    sustain:        0.4,
                    release:        2
                },
                filterEnvelope: {
                    attack:         0.01,
                    decay:          0.1,
                    sustain:        0.8,
                    release:        1.5,
                    baseFrequency:  50,
                    octaves:        4.4
                }
            }),
            synth_bell:             new Tone.MetalSynth({
                harmonicity:        12,
                resonance:          800,
                modulationIndex:    20,
                envelope: {
                    decay:          0.4,
                },
                volume:             -15
            }),
            synth_conga:            new Tone.MembraneSynth({
                pitchDecay:         0.008,
                octaves:            2,
                envelope: {
                    attack:         0.0006,
                    decay:          0.5,
                    sustain:        0
                }
            }),
            synth_sawtooth:         new Tone.PolySynth(Tone.Synth, {
                oscillator: {
                    type:           "fatsawtooth",
                    count:          3,
                    spread:         30
                },
                envelope: {
                    attack:         0.01,
                    decay:          0.1,
                    sustain:        0.5,
                    release:        0.4,
                    attackCurve:    "exponential"
                },
            }),
            synth_coolGuy:          new Tone.PolySynth(Tone.Synth, {
                oscillator : {
                    type:                   "pwm",
                    modulationFrequency:    1
                },
                filter : {
                    Q:              6,
                    rolloff:        -24 
                },
                envelope : {
                    attack:         0.025,
                    decay:          0.3,
                    sustain:        0.9,
                    release:        2
                },
                filterEnvelope : {
                    attack:         0.245,
                    decay:          0.131,
                    sustain:        0.5,
                    release:        2,
                    baseFrequency:  20,
                    octaves:        7.2,
                    exponent:       2
                }
            }),
            synth_electricCello:    new Tone.PolySynth(Tone.Synth, {
                harmonicity:        3.01,
                modulationIndex:    14,
                oscillator: {
                    type:           "triangle"
                },
                envelope: {
                    attac:          0.2,
                    decay:          0.3,
                    sustain:        0.1,
                    release:        1.2
                },
                modulation : {
                    type:           "square"
                },
                modulationEnvelope : {
                    attack:         0.01,
                    decay:          0.5,
                    sustain:        0.2,
                    release:        0.1
                }
            }),
            synth_gravel:           new Tone.PolySynth(Tone.Synth, {
                noise: {
                    type:           "pink",
                    playbackRate :  0.1
                },
                envelope: {
                    attack:     0.5,
                    decay:      2,
                    sustain:    0.5,
                    release:    3
                }
            }),
            synth_delicateWind:           new Tone.PolySynth(Tone.Synth, {
                portamento :        0.0,
                oscillator: {
                    type:           "square4"
                },
                envelope: {
                    attack:         2,
                    decay:          1,
                    sustain:        0.2,
                    release:        2
                }
            }),
            synth_pianetta:           new Tone.PolySynth(Tone.MonoSynth, {
                oscillator: {
                    type: "square"
                },
                filter: {
                    "Q": 2,
                    "type": "lowpass",
                    "rolloff": -12
                },
                envelope: {
                    "attack": 0.005,
                    "decay": 3,
                    "sustain": 0,
                    "release": 0.45
                },
                filterEnvelope: {
                    "attack": 0.001,
                    "decay": 0.32,
                    "sustain": 0.9,
                    "release": 3,
                    "baseFrequency": 700,
                    "octaves": 2.3
                }
            })

        },
        methods:        {
            composeAudio:   function(){         // 1. BUILD WEB AUDIO PHRASES
                // A. FOR EACH SONG
                Object.keys(music).forEach( song => {
                    // B. AND LOOP THROUGH EACH INSTRUMENT / PERFORMER...
                    audio.performers.forEach((performerObj, i) => {    
                        music[song].song.parts_pm[performerObj.name] = {}            // Create data object for for each instruments phrase parts  
                        // C. LOOP THROUGH ARRANGEMENT
                        music[song].arrangement.order.forEach(phrase => {
                            // D. CREATE EACH INSTRUMENT PHRASE ONLY WHERE SPECIFIED IN THE ARRANGEMENT
                            if(music[song].arrangement.phrases[phrase].play &&  Object.keys(music[song].arrangement.phrases[phrase].play).indexOf(performerObj.name) > -1){
                                Object.keys(music[song].song.patterns_pm).forEach((pattern, j) => {  
                                    const phraseNo = j + 1               
                                    // 1. Create a Part in ToneJS 
                                    music[song].song.parts_pm[performerObj.name][pattern] = new Tone.Part( (time, pattern) => {          
                                        if(typeof(pattern.note) === 'string'){   // For single note
                                            audio.instruments[performerObj.instrument].triggerAttackRelease(pattern.note, pattern.dur, time, pattern.vel ? pattern.vel : 0.75)   
                                        } else {                                   // For Chords written as array of notes
                                            pattern.note.forEach((note, i) => {
                                                const noteDuration = (typeof(pattern.dur) === 'string') ? pattern.dur : pattern.dur[i], 
                                                    noteVelocity = pattern.vel ? typeof(pattern.vel === 'string') ? pattern.vel : pattern.vel[i] : 0.7     
                                                audio.instruments[performerObj.instrument].triggerAttackRelease(note, noteDuration, time,  noteVelocity)   
                                            })                                    
                                        }
                                    }, music[song].song.patterns_pm[pattern]['notes']) 
                                        // 2. Configure pattern settings 
                                    music[song].song.parts_pm[performerObj.name][pattern].loopEnd = music[song].song.patterns_pm[pattern]['length']
                                    music[song].song.parts_pm[performerObj.name][pattern].loop = music[song].song.patterns_pm[pattern]['loop']    
                                    music[song].song.parts_pm[performerObj.name][pattern].humanize = 0.01           
                                })
                            }
                        })  // end arrangement loop
                    })  // end performers loop
                }) // end song loop
            }, // end composeAudio()

            updateMusic: function (song = audio.state.performance.song, phraseName = null, direction = 'next'){  
                // 1. Set audio state: where current phrase is the playingPhrase
                phraseName = phraseName ? phraseName : audio.state.performance[direction]       // Direction is ether prev or next
                audio.state.performance.playingPhrase   = phraseName
                audio.state.time.scheduledPhraseName    = phraseName
                audio.state.time.scheduledPhraseObj     = music[song].arrangement.phrases[audio.state.time.scheduledPhraseName]
                audio.state.time.scheduledPhraseIndex   = music[song].arrangement.order.indexOf(audio.state.time.scheduledPhraseName)
                audio.state.time.scheduledPhraseLength  = audio.methods.helpers.getPhraseLength(audio.state.time.scheduledPhraseName)

                if(Tone.Transport.state !== 'started'){       // On initiation where there is no currently playing phrase: Start transport and schedule immediate start               
                    Tone.Transport.start(+0.1)         
                    audio.state.time.scheduledPhraseStart = Tone.Time(Tone.Transport.position).toSeconds()   
                    audio.state.time.playingPhraseName    = music[song].arrangement.order[0]
                    audio.state.time.playingPhraseStart   = Tone.Time(Tone.Transport.position).toSeconds()           
                } else {
                    audio.state.time.scheduledPhraseStart = audio.methods.helpers.getNextStartTime()
                    audio.state.time.playingPhraseName    = music[song].arrangement.order[audio.state.time.scheduledPhraseIndex === 0 ? (music[song].arrangement.order.length - 1) : audio.state.time.scheduledPhraseIndex]
                }
                audio.state.time.playingPhraseObj       = music[song].arrangement.phrases[audio.state.time.playingPhraseName]              
                audio.state.time.playingPhraseLength    = audio.methods.helpers.getPhraseLength(audio.state.time.playingPhraseName)                

                // 2A. FOR A MUSICAL PHRASE TRANSITION
                if(!audio.state.songChangePending){
                    audio.state.performance.prevSong     = audio.state.performance.song.slice()      // Copy the previous song name 
                    // i. CALL THE PHRASE IF NO OTHER MUSICAL TRANSITIONS ARE PENDING 
                    if(!audio.state.transitionPending){
                        audio.state.transitionPending = true
                        audio.methods.helpers.updatePerformers(phraseName)
                    // ii. OR CANCEL SCHEDULED PHRASE AND CALL THE PHRASE
                    } else {
                        // Clear transport after current phrase then schedule new performers from next phrase start
                        console.log(`*** CANCELLING currently queued phrase after ${audio.state.time.scheduledPhraseStart } ***`)
                        Tone.Transport.cancel(audio.state.time.scheduledPhraseStart)
                        audio.methods.helpers.updatePerformers(phraseName)  
                    }
                    // 3. AUTOCUE NEXT PHRASE (IF NECESSARY) AND SCHEDULE STATE UPDATE
                    if(audio.state.time.scheduledPhraseObj.autocue){
                        audio.state.transitionPending = false
                        audio.methods.updateMusic(song, null, 'next')
                    } else {
                        //  Cancel pending state upon transition
                        Tone.Transport.schedule(function(time){
                            Tone.Draw.schedule( () => {
                                console.log("No pending phrase transitions")
                                audio.state.transitionPending = false
                            }, time)
                        }, audio.state.time.scheduledPhraseStart )
                    }      

                // 2B. FOR A SONG CHANGE 
                } else {
                    console.log(`*** CHANGING SONG from ${audio.state.performance.prevSong} to ${audio.state.performance.song } at ${audio.state.time.scheduledPhraseStart } with the "${phraseName}" phrase at tempo ${music[audio.state.performance.song].tempo} ****`)
                    const timeToChange = audio.state.time.scheduledPhraseStart - Tone.Transport.now()
                    Tone.Transport.bpm.rampTo(music[audio.state.performance.song].tempo, timeToChange)
               
                    audio.methods.helpers.stopSong(audio.state.performance.prevSong)
                    audio.methods.helpers.updatePerformers(phraseName)    
                    audio.state.songChangePending = false
                    if(audio.state.time.scheduledPhraseObj.autocue){
                        audio.state.transitionPending = false
                        audio.methods.updateMusic(song, null, 'next')
                    } 
                }
            }, // end updateMusic()


            // X. Helper methods
            helpers: {
                // Update performers
                updatePerformers: function(phraseName) {
                    console.log(`*** SCHEDULING the ${phraseName} phrase of ${audio.state.performance.song} to start at ${audio.state.time.scheduledPhraseStart } ***`)
                    audio.performers.forEach(performerObj => {
                        const performer = performerObj.name
                        // 2. Stop all patterns for performers patterns that are not specified to play
                        if(Object.keys(audio.state.time.scheduledPhraseObj.play).indexOf(performer) < 0){
                            Object.entries(music[audio.state.performance.song].song.parts_pm[performer]).forEach(([pattern, obj]) => {
                                if(obj.state !== 'stopped'){
                                    obj.stop(audio.state.time.scheduledPhraseStart)
                                    console.log(`- Stopping ${performer} ${pattern} at ${Math.round(audio.state.time.scheduledPhraseStart *10)/10} seconds`)
                                }
                            })
                        // 3. Schedule start (or continuation) of any parts scheduled to play
                        } else {
                            const patternToPlay = audio.state.time.scheduledPhraseObj.play[performer].name
                            if(music[audio.state.performance.song].song.parts_pm[performer][patternToPlay].state === 'stopped'){
                                music[audio.state.performance.song].song.parts_pm[performer][patternToPlay].start(audio.state.time.scheduledPhraseStart)
                                console.log(`+ Starting ${performer} ${patternToPlay} at ${(Math.round(Tone.Time(audio.state.time.scheduledPhraseStart).toSeconds()*10)/10)}` )
                            } else {
                                console.log(`o Continuing ${performer} ${patternToPlay}` )
                            }
                            // Schedule stop of all other patterns 
                            Object.entries(music[audio.state.performance.song].song.parts_pm[performer]).forEach(([pattern, obj]) => {
                                if(pattern !== patternToPlay && obj.state !== 'stopped'){
                                    obj.stop(audio.state.time.scheduledPhraseStart)
                                    console.log(`- Stopping ${performer} ${pattern} at ${Math.round(audio.state.time.scheduledPhraseStart *10)/10} seconds`)
                                }
                            })
                        } 
                    })
                    // 4. Update next phrase state and autocue next phrase where specified
                    audio.state.performance.next = music[audio.state.performance.song].arrangement.order[audio.state.time.scheduledPhraseIndex + 1]
                    audio.state.performance.prev = music[audio.state.performance.song].arrangement.order[audio.state.time.scheduledPhraseIndex === 0 ? music[audio.state.performance.song].arrangement.order.length - 1 : audio.state.time.scheduledPhraseIndex - 1]
                    audio.state.time.playingPhraseStart = audio.state.time.scheduledPhraseStart 
                },
                // Return time when the current phrase (i.e. already started) is next scheduled to finish 
                getNextStartTime: function(){
                    const currentTime = Tone.Time(Tone.Transport.position).toSeconds(), 
                        currentStartTime = audio.state.time.playingPhraseStart,                 
                        currentPlayTime = (currentTime - currentStartTime) < 0 ? 0 : currentTime - currentStartTime,
                        phrasePlays =  currentPlayTime / audio.state.time.playingPhraseLength,
                        nextStartTime = currentStartTime + Math.ceil(phrasePlays) * audio.state.time.playingPhraseLength
                    console.log(`The ${audio.state.time.playingPhraseName} phrase with length of ${Math.round(audio.state.time.playingPhraseLength*10)/10}s started playing at ${Math.round(currentStartTime*10)/10} has played ${Math.round(phrasePlays*10)/10} times. It will next finish at ${Math.round(nextStartTime *10)/10}` )
                    return nextStartTime
                },
                // Return the phrase length (longest of any included patterns)
                getPhraseLength: function(phraseName){
                    const startPhrases = music[audio.state.performance.song].arrangement.phrases[phraseName].play
                    let phraseLength = 0
                    Object.values(startPhrases).forEach(phrase => {
                        if(Tone.Time(music[audio.state.performance.song].song.patterns_pm[phrase.name].length).toSeconds()  > phraseLength){
                            phraseLength = Tone.Time(music[audio.state.performance.song].song.patterns_pm[phrase.name].length).toSeconds()
                        }
                    })
                    return phraseLength
                },
                stopSong:   function(song){
                    audio.performers.forEach(performerObj => {
                        Object.entries(music[song].song.parts_pm[performerObj.name]).forEach(([pattern, obj]) => {
                            if(obj.state !== 'stopped'){
                                obj.stop(audio.state.time.scheduledPhraseStart)
                                console.log(`- Stopping ${performerObj.name} ${pattern} at ${Math.round(audio.state.time.scheduledPhraseStart *10)/10} seconds`)
                            }
                        })
                    })
                }

            }

        },
        // Instrument performers
        performers: [
            { name: 'rhythmGuitar_1a',  instrument: 'synth_marimba'},
            { name: 'rhythmGuitar_1b',  instrument: 'synth_marimba'},
            { name: 'mainGuitar_1a',    instrument: 'synth_pianetta'},
            { name: 'mainGuitar_1b',    instrument: 'synth_pianetta'},
            { name: 'piano_1a',         instrument: 'synth_kalimba'},
            { name: 'piano_1b',         instrument: 'synth_kalimba'},
            { name: 'bass_1a',          instrument: 'synth_bass'},
            { name: 'bass_1b',          instrument: 'synth_bass'},
        ]
    }

    // Song composition and arrangement objects
    const music =  {
        commonPeople: {
            tempo: 140,
            // Phrase combinations and ordering
            arrangement: {
                phrases: {
                    start:  {              // 1 bar intro slide 
                        autocue:           true,   
                        play: {
                            rhythmGuitar_1a:      {name: 'intro_slide' },        // Half bar slide
                        }
                    }, 
                    intro:  {               // 1 bar of repeated rhythm (lead and bass) | MIDI plays from start to 0:5:0
                        play: {
                            bass_1a: {       // 1 bar matched bassline 
                                name:       'intro_bassline',
                            },
                            rhythmGuitar_1a:{       // 1 bar rhythm 
                                name:       'intro_rhythm'
                            }     
                        }
                    },                  
                    verse1_part_I: {         // 8 bars of verse rhythm (lead and bass) | MIDI plays from 0:5:0 to
                        play: {
                            bass_1a: {       // 8 bar rhythm 
                                name:       'verseX_bassline_main',  
                                fx:         audio.fx.gain      
                            },
                            bass_1b: {       // Alternate first bar
                                name:       'verse1_bassline_alt_I',  
                                fx:         audio.fx.gain      
                            },
                            rhythmGuitar_1a: {      // 1 bar rhythm 
                                name:       'verse1_rhythm_I',
                                chain:      audio.fx.gain
                            },  
                            mainGuitar_1:{       // 8 Bar lead voicing riff
                                name:       'verse1_lead_I',
                                fx:         audio.fx.gain
                            },    
                            piano_1a: {       // 8 bar riff (6 + final 2 in xx_end_A)
                                name:       'verse1_melody_main',  
                                fx:         audio.fx.gain   
                            },
                            piano_1b: {       // Final 2 bars of riff
                                name:       'verse1_melody_alt_I',  
                                fx:         audio.fx.gain   
                            },   
                        }
                    },                  
                    verse1_part_II: {
                        play: {
                            bass_1a: {       // 8 bar rhythm 
                                name:       'verseX_bassline_main',  
                                fx:         audio.fx.gain      
                            },
                            bass_1b: {       // Alternate first bar
                                name:       'verseX_bassline_alt_II',  
                                fx:         audio.fx.gain      
                            },
                            rhythmGuitar_1a: {      // 1 bar rhythm 
                                name:       'verse1_rhythm_II',
                                chain:      audio.fx.gain
                            },  
                            mainGuitar_1:{       // 8 Bar lead voicing riff
                                name:       'verse1_lead_II',
                                fx:         audio.fx.gain
                            },    
                            piano_1a: {       // 8 bar riff (6 + final 2 in xx_end_A)
                                name:       'verse1_melody_main',  
                                fx:         audio.fx.gain   
                            },
                            piano_1b: {       // Final 2 bars of riff
                                name:       'verse1_melody_alt_II',  
                                fx:         audio.fx.gain   
                            },   
                        }
                    },
                    chorus1: {
                        play: {
                            bass_1a: {       // 12 bar rhythm 
                                name:       'chorus_bassline',  
                                fx:         audio.fx.gain      
                            },  
                            rhythmGuitar_1a: {      // 12 bar rhythm 
                                name:       'chorus1_rhythm',  
                                fx:         audio.fx.gain 
                            }, 
                            mainGuitar_1: {     // 12 bar rhythm 
                                name:       'chorus1_lead',  
                                fx:         audio.fx.gain 
                            },
                            piano_1a: {       
                                name:       'chorus_melody',  
                                fx:         audio.fx.gain   
                            },
                        }
                    },
                    return1: {      // 2 bar return to verse
                        play: {
                            bass_1a: {       // 2 bar rhythm 
                                name:       'return_bassline',  
                                fx:         audio.fx.gain      
                            },  
                            rhythmGuitar_1a: {      // 2 bar rhythm 
                                name:       'return1_rhythm',  
                                fx:         audio.fx.gain 
                            }, 
                            piano_1a: {     // 2 bar rhythm 
                                name:       'return1_lead',  
                                fx:         audio.fx.gain 
                            },
                            piano_1a: {    // 2 bar rhythm   
                                name:       'return1_melody',  
                                fx:         audio.fx.gain   
                            },     
                        }
                    },
                    verse2_part_I: {         // 8 bars of verse rhythm (lead and bass) | MIDI plays from 0:5:0 to
                        play: {
                            bass_1a: {       // 8 bar rhythm 
                                name:       'verseX_bassline_main',  
                                fx:         audio.fx.gain      
                            },
                            bass_1b: {       // Alternate first bar
                                name:       'verse2_bassline_alt_I',  
                                fx:         audio.fx.gain      
                            },
                            mainGuitar_1: {      // 8 bar rhythm 
                                name:       'verse2_lead_I',
                                chain:      audio.fx.gain
                            }, 
                            rhythmGuitar_1a:{       // 8 Bar lead voicing riff
                                name:       'verse2_rhythm_main',
                                fx:         audio.fx.gain
                            },  
                            rhythmGuitar_1b: {      // Alternate rhythm start transition
                                name:       'verse2_rhythm_alt_I',
                                chain:      audio.fx.gain
                            },  
                            piano_1a: {       // 8 bar riff (6 + final 2 in xx_end_A)
                                name:       'verse2_melody_main',  
                                fx:         audio.fx.gain   
                            },
                            piano_1b: {       // Final 2 bars of riff
                                name:       'verse1_melody_alt_I',  
                                fx:         audio.fx.gain   
                            },   
                        }
                    },                  
                    verse2_part_II: {
                        play: {
                            bass_1a: {       // 8 bar rhythm 
                                name:       'verseX_bassline_main',  
                                fx:         audio.fx.gain      
                            },
                            bass_1b: {       // Alternate first bar
                                name:       'verseX_bassline_alt_II',  
                                fx:         audio.fx.gain      
                            },
                            mainGuitar_1: {       // 8 bar rhythm 
                                name:       'verse2_lead_II',
                                chain:      audio.fx.gain
                            }, 
                            rhythmGuitar_1a:{       // 8 Bar lead voicing riff
                                name:       'verse2_rhythm_main',
                                fx:         audio.fx.gain
                            }, 
                            rhythmGuitar_1b: {      // Alternate rhythm start transition
                                name:       'verse2_rhythm_alt_II',
                                chain:      audio.fx.gain
                            },     
                            piano_1a: {       // 8 bar riff (6 + final 2 in xx_end_A)
                                name:       'verse2_melody_main',  
                                fx:         audio.fx.gain   
                            },
                            piano_1b: {       // Final 2 bars of riff
                                name:       'verse1_melody_alt_II',  
                                fx:         audio.fx.gain   
                            },   
                        }
                    },
                    chorus2: {
                        play: {
                            bass_1a: {       // 12 bar rhythm 
                                name:       'chorus_bassline',  
                                fx:         audio.fx.gain      
                            },  
                            rhythmGuitar_1a: {      // 12 bar rhythm 
                                name:       'chorus2_rhythm',  
                                fx:         audio.fx.gain 
                            }, 
                            mainGuitar_1: {     // 12 bar rhythm 
                                name:       'chorus2_lead',  
                                fx:         audio.fx.gain 
                            },
                            piano_1a: {       
                                name:       'chorus_chords',  
                                fx:         audio.fx.gain   
                            },
                        }
                    },
                    return2: {      // 2 bar return to verse
                        play: {
                            bass_1a: {       // 2 bar rhythm 
                                name:       'return_bassline',  
                                fx:         audio.fx.gain      
                            },  
                            rhythmGuitar_1a: {      // 2 bar rhythm 
                                name:       'return2_rhythm',  
                                fx:         audio.fx.gain 
                            }, 
                            mainGuitar_1: {     // 2 bar rhythm 
                                name:       'return2_lead',  
                                fx:         audio.fx.gain 
                            },
                            piano_1a: {    // 2 bar rhythm   
                                name:       'return2_chords',  
                                fx:         audio.fx.gain   
                            },     
                        }
                    },
                    interlude_partI: {      //
                        play: {
                            mainGuitar_1: {     // 2 bar rhythm 
                                name:       'interlude_lead_I',  
                                fx:         audio.fx.gain 
                            },
                            // bass_1a: {       // 2 bar rhythm 
                            //     name:       'return_bassline',  
                            //     fx:         audio.fx.gain      
                            // },  
                            // rhythmGuitar_1a: {      // 2 bar rhythm 
                            //     name:       'return_rhythm',  
                            //     fx:         audio.fx.gain 
                            // }, 
                            // piano_1a: {     // 2 bar rhythm 
                            //     name:       'return_lead',  
                            //     fx:         audio.fx.gain 
                            // },
                            // piano_1a: {    // 2 bar rhythm   
                            //     name:       'return_melody',  
                            //     fx:         audio.fx.gain   
                            // },     
                        }
                    },
                    interlude_partII: {      //
                        play: {
                            // bass_1a: {       // 2 bar rhythm 
                            //     name:       'return_bassline',  
                            //     fx:         audio.fx.gain      
                            // },  
                            // rhythmGuitar_1a: {      // 2 bar rhythm 
                            //     name:       'return_rhythm',  
                            //     fx:         audio.fx.gain 
                            // }, 
                            mainGuitar_1: {     // 2 bar rhythm 
                                name:       'interlude_lead_II',  
                                fx:         audio.fx.gain 
                            },
                            // piano_1a: {     // 2 bar rhythm 
                            //     name:       'return_lead',  
                            //     fx:         audio.fx.gain 
                            // },
                            // piano_1a: {    // 2 bar rhythm   
                            //     name:       'return_melody',  
                            //     fx:         audio.fx.gain   
                            // },     
                        }
                    },
                    chorus3: {
                        play: {
                            bass_1a: {       // 12 bar rhythm 
                                name:       'chorus_bassline',  
                                fx:         audio.fx.gain      
                            },  
                            rhythmGuitar_1a: {      // 12 bar rhythm 
                                name:       'chorus2_rhythm',  
                                fx:         audio.fx.gain 
                            }, 
                            mainGuitar_1: {     // 12 bar rhythm 
                                name:       'chorus2_lead',  
                                fx:         audio.fx.gain 
                            },
                            piano_1a: {       
                                name:       'chorus_chords',  
                                fx:         audio.fx.gain   
                            },
                        }
                    },
                },
                order: [
                    'start',
                    'intro',
                    'verse1_part_I',
                    'verse1_part_II',
                    'chorus1',
                    'return1',
                    'verse2_part_I',
                    'verse2_part_II',
                    'chorus2',
                    'return2',
                    'interlude_partI',
                    'interlude_partII',
                    'chorus3',
                    'intro'
                ],
            },
            // Song phrases
            song: {
                parts_pm:           {},
                patterns_pm: {
                    // INTRO SECTION | Bar 0 to 5
                    intro_slide: {     // Intro slide
                        length:             '0:4:0', 
                        bpm:                140,                                        
                        timeSignature:      [4, 4],    
                        loop:               false,                                                               
                        notes: [ // Starts 5 bars in
                            // BAR 1 
                            { time : '0:2:0',   note : 'C5',    dur : '16n'},
                            { time : '0:2:1',   note : 'B4',    dur : '16n'},
                            { time : '0:2:2',   note : 'A4',    dur : '16n'},
                            { time : '0:2:3',   note : 'G4',    dur : '16n'},
                            { time : '0:3:0',   note : 'F4',    dur : '16n'},
                            { time : '0:3:1',   note : 'E4',    dur : '16n'},
                            { time : '0:3:2',   note : 'D4',    dur : '8n'},   
                        ]
                    },
                    intro_bassline: {  // Intro bass
                        length:             '1:0:0', 
                        bpm:                140,                                        
                        timeSignature:      [4, 4],    
                        loop:               true,                                  
                        notes: [ 
                            { time : '0:0:0',   note : ['C1', 'C2'],    dur : '8n'},
                            { time : '0:0:2',   note : ['C1', 'C2'],    dur : '8n'},
                            { time : '0:1:0',   note : ['C1', 'C2'],    dur : '8n'},
                            { time : '0:1:2',   note : ['C1', 'C2'],    dur : '8n'},
                            { time : '0:2:0',   note : ['C1', 'C2'],    dur : '8n'},
                            { time : '0:2:2',   note : ['C1', 'C2'],    dur : '8n'},
                            { time : '0:3:0',   note : ['C1', 'C2'],    dur : '8n'},
                            { time : '0:3:2',   note : ['C1', 'C2'],    dur : '8n'},
                        ]
                    },
                    intro_rhythm: {    // Rhythm guitar intro 
                        length:             '1:0:0', 
                        bpm:                140,                                        
                        timeSignature:      [4, 4],    
                        loop:               true,                                  
                        notes: [ // Starts after intro and repeats throughout verse
                            // BAR 1 
                            { time : '0:0:0',   note : ['C3', 'G3', 'C4'],    dur : '8n'},
                            { time : '0:0:2',   note : ['C3', 'G3', 'C4'],    dur : '8n'},
                            { time : '0:2:0',   note : ['C3', 'G3', 'C4'],    dur : '8n'},
                            { time : '0:2:2',   note : ['C3', 'G3', 'C4'],    dur : '8n'},  
                        ]
                    },

                    // VERSE - 2 x 8 bar sections | Verse 1: Bar 5 to 21 | Verse 2: Bar 35 to 51
                        verseX_bassline_main: {    // 8 bar Verse Pt A and B bass (Starts 5 bars in)
                            length:             '8:0:0', 
                            bpm:                140,                                        
                            timeSignature:      [4, 4],    
                            loop:               true,                                  
                            notes: [            
                                // Bar 1
                                { time : '0:1:0',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '0:1:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '0:2:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '0:3:0',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '0:3:2',   note : ['C1', 'C2'],    dur : '8n'},
                                // Bar 2
                                { time : '1:0:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '1:1:0',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '1:1:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '1:2:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '1:3:0',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '1:3:2',   note : ['C1', 'C2'],    dur : '8n'},
                                // Bar 3
                                { time : '2:0:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '2:1:0',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '2:1:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '2:2:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '2:3:0',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '2:3:2',   note : ['C1', 'C2'],    dur : '8n'},
                                // Bar 4
                                { time : '3:0:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '3:1:0',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '3:1:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '3:2:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '3:3:0',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '3:3:2',   note : ['C1', 'C2'],    dur : '8n'},
                                // Bar 5
                                { time : '4:0:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '4:1:0',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '4:1:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '4:2:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '4:3:0',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '4:3:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                // Bar 6
                                { time : '5:0:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '5:1:0',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '5:1:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '5:2:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '5:3:0',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '5:3:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                // Bar 7
                                { time : '6:0:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '6:1:0',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '6:1:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '6:2:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '6:3:0',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '6:3:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                // Bar 8
                                { time : '7:0:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '7:1:0',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '7:1:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '7:2:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '7:3:0',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '7:3:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                            ]
                        },
                        verse1_bassline_alt_I: {    // Alternate first bar for verse bassline
                            length:             '8:0:0', 
                            bpm:                140,                                        
                            timeSignature:      [4, 4],    
                            loop:               true,                                  
                            notes: [            
                                // Bar 1
                                { time : '0:0:0',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '0:0:2',   note : ['C1', 'C2'],    dur : '8n'},
                            ]
                        },
                        verse2_bassline_alt_I: {    // Alternate first bar for verse bassline
                            length:             '8:0:0', 
                            bpm:                140,                                        
                            timeSignature:      [4, 4],    
                            loop:               true,                                  
                            notes: [            
                                // Bar 1
                                { time : '0:0:2',   note : ['C1', 'C2'],    dur : '8n'},
                            ]
                        },
                        verseX_bassline_alt_II: {    /// Alternate first bar for verse bassline
                            length:             '8:0:0', 
                            bpm:                140,                                        
                            timeSignature:      [4, 4],    
                            loop:               true,                                  
                            notes: [            
                                // Bar 1
                                { time : '0:0:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                            ]
                        },
                        // a. Rhythm guitar
                        verse1_rhythm_I: {    // 8 bar Rhythm guitar verse 1 rhythm part I
                            length:             '8:0:0', 
                            bpm:                140,                                        
                            timeSignature:      [4, 4],    
                            loop:               true,                                  
                            notes: [ // Starts after intro and repeats throughout verse
                                // BAR 1 
                                { time : '0:0:0',   note : ['C3', 'G3', 'C4'],    dur : '8n'},
                                { time : '0:0:2',   note : ['C3', 'G3', 'C4'],    dur : '8n'},
                                { time : '0:2:0',   note : ['C3', 'G3', 'C4'],    dur : '8n'},
                                { time : '0:2:2',   note : ['C3', 'G3', 'C4'],    dur : '8n'},   
                                // BAR 2
                                { time : '1:0:0',   note : ['C3', 'G3', 'C4'],    dur : '8n'},
                                { time : '1:0:2',   note : ['C3', 'G3', 'C4'],    dur : '8n'},
                                { time : '1:2:0',   note : ['C3', 'G3', 'C4'],    dur : '8n'},
                                { time : '1:2:2',   note : ['C3', 'G3', 'C4'],    dur : '8n'},
                                // BAR 3
                                { time : '2:0:0',   note : ['C3', 'G3', 'C4'],    dur : '8n'},
                                { time : '2:0:2',   note : ['C3', 'G3', 'C4'],    dur : '8n'},
                                { time : '2:2:0',   note : ['C3', 'G3', 'C4'],    dur : '8n'},
                                { time : '2:2:2',   note : ['C3', 'G3', 'C4'],    dur : '8n'},
                                // BAR 4
                                { time : '3:0:0',   note : ['C3', 'G3', 'C4'],    dur : '8n'},
                                { time : '3:0:2',   note : ['C3', 'G3', 'C4'],    dur : '8n'},
                                { time : '3:2:0',   note : ['C3', 'G3', 'C4'],    dur : '8n'},
                                { time : '3:2:2',   note : ['C3', 'G3', 'C4'],    dur : '8n'},
                                // BAR 5
                                { time : '4:0:0',   note : ['C3', 'G3', 'C4'],    dur : '8n'},
                                { time : '4:0:2',   note : ['C3', 'G3', 'C4'],    dur : '8n'},
                                { time : '4:2:0',   note : ['D3', 'F3', 'B3'],    dur : '8n'},
                                { time : '4:2:2',   note : ['D3', 'F3', 'B3'],    dur : '8n'},
                                // BAR 6
                                { time : '5:0:0',   note : ['D3', 'F3', 'B3'],    dur : '8n'},
                                { time : '5:0:2',   note : ['D3', 'F3', 'B3'],    dur : '8n'},
                                { time : '5:2:0',   note : ['D3', 'F3', 'B3'],    dur : '8n'},
                                { time : '5:2:2',   note : ['D3', 'F3', 'B3'],    dur : '8n'},
                                // BAR 7
                                { time : '6:0:0',   note : ['D3', 'F3', 'B3'],    dur : '8n'},
                                { time : '6:0:2',   note : ['D3', 'F3', 'B3'],    dur : '8n'},
                                { time : '6:2:0',   note : ['D3', 'F3', 'B3'],    dur : '8n'},
                                { time : '6:2:2',   note : ['D3', 'F3', 'B3'],    dur : '8n'},
                                // BAR 8
                                { time : '7:0:0',   note : ['D3', 'F3', 'B3'],    dur : '8n'},
                                { time : '7:0:2',   note : ['D3', 'F3', 'B3'],    dur : '8n'},
                                { time : '7:2:0',   note : ['D3', 'F3', 'B3'],    dur : '8n'},
                                { time : '7:2:2',   note : ['D3', 'F3', 'B3'],    dur : '8n'},
                            ]
                        },
                        verse1_rhythm_II: {    // 8 bar Rhythm guitar verse 1 rhythm part II
                            length:             '8:0:0', 
                            bpm:                140,                                        
                            timeSignature:      [4, 4],    
                            loop:               true,                                  
                            notes: [ // Starts after intro and repeats throughout verse
                                // BAR 1 
                                { time : '0:0:0',   note : ['D3', 'F3', 'B3'],    dur : '8n'},
                                { time : '0:0:2',   note : ['D3', 'F3', 'B3'],    dur : '8n'},
                                { time : '0:2:0',   note : ['C3', 'G3', 'C4'],    dur : '8n'},
                                { time : '0:2:2',   note : ['C3', 'G3', 'C4'],    dur : '8n'},    
                                // BAR 2
                                { time : '1:0:0',   note : ['C3', 'G3', 'C4'],    dur : '8n'},    
                                { time : '1:0:2',   note : ['C3', 'G3', 'C4'],    dur : '8n'},    
                                { time : '1:2:0',   note : ['C3', 'G3', 'C4'],    dur : '8n'},    
                                { time : '1:2:2',   note : ['C3', 'G3', 'C4'],    dur : '8n'},     
                                // BAR 3
                                { time : '2:0:0',   note : ['C3', 'G3', 'C4'],    dur : '8n'}, 
                                { time : '2:0:2',   note : ['C3', 'G3', 'C4'],    dur : '8n'}, 
                                { time : '2:2:0',   note : ['C3', 'G3', 'C4'],    dur : '8n'}, 
                                { time : '2:2:2',   note : ['C3', 'G3', 'C4'],    dur : '8n'}, 
                                // BAR 4
                                { time : '3:0:0',   note : ['C3', 'G3', 'C4'],    dur : '8n'}, 
                                { time : '3:0:2',   note : ['C3', 'G3', 'C4'],    dur : '8n'}, 
                                { time : '3:2:0',   note : ['C3', 'G3', 'C4'],    dur : '8n'}, 
                                { time : '3:2:2',   note : ['C3', 'G3', 'C4'],    dur : '8n'},  
                                // BAR 5
                                { time : '4:0:0',   note : ['C3', 'G3', 'C4'],    dur : '8n'}, 
                                { time : '4:0:2',   note : ['C3', 'G3', 'C4'],    dur : '8n'}, 
                                { time : '4:2:0',   note : ['D3', 'F3', 'B3'],    dur : '8n'}, 
                                { time : '4:2:2',   note : ['D3', 'F3', 'B3'],    dur : '8n'}, 
                                // BAR 6
                                { time : '5:0:0',   note : ['D3', 'F3', 'B3'],    dur : '8n'}, 
                                { time : '5:0:2',   note : ['D3', 'F3', 'B3'],    dur : '8n'}, 
                                { time : '5:2:0',   note : ['D3', 'F3', 'B3'],    dur : '8n'}, 
                                { time : '5:2:2',   note : ['D3', 'F3', 'B3'],    dur : '8n'}, 
                                // BAR 7
                                { time : '6:0:0',   note : ['D3', 'F3', 'B3'],    dur : '8n'}, 
                                { time : '6:0:2',   note : ['D3', 'F3', 'B3'],    dur : '8n'}, 
                                { time : '6:2:0',   note : ['D3', 'F3', 'B3'],    dur : '8n'}, 
                                { time : '6:2:2',   note : ['D3', 'F3', 'B3'],    dur : '8n'}, 
                                // BAR 8
                                { time : '7:0:0',   note : ['D3', 'F3', 'B3'],    dur : '8n'}, 
                                { time : '7:0:2',   note : ['D3', 'F3', 'B3'],    dur : '8n'}, 
                                { time : '7:2:0',   note : ['D3', 'F3', 'B3'],    dur : '8n'}, 
                                { time : '7:2:2',   note : ['D3', 'F3', 'B3'],    dur : '8n'}, 
                            ]
                        },
                        verse2_rhythm_main: {    // 8 bar main Rhythm guitar part (with first half bar alternating as part A and B)
                            length:             '8:0:0', 
                            bpm:                140,                                        
                            timeSignature:      [4, 4],    
                            loop:               true,                                  
                            notes: [ 
                                // BAR 1 
                                { time : '0:1:0',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '0:1:2',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '0:2:0',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '0:2:2',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '0:3:0',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '0:3:2',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                // BAR 2
                                { time : '1:0:0',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '1:0:2',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '1:1:0',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '1:1:2',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '1:2:0',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '1:2:2',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '1:3:0',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '1:3:2',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                // BAR 3
                                { time : '2:0:0',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '2:0:2',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '2:1:0',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '2:1:2',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '2:2:0',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '2:2:2',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '2:3:0',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '2:3:2',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                // BAR 4
                                { time : '3:0:0',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '3:0:2',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '3:1:0',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '3:1:2',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '3:2:0',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '3:2:2',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '3:3:0',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '3:3:2',   note : ['C3', 'G3', 'C4'],    dur : '16n'}, 
                                // BAR 5
                                { time : '4:0:0',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '4:0:2',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '4:1:0',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '4:1:2',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '4:2:0',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '4:2:2',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '4:3:0',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '4:3:2',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                // BAR 6
                                { time : '5:0:0',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '5:0:2',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '5:1:0',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '5:1:2',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '5:2:0',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '5:2:2',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '5:3:0',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '5:3:2',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                // BAR 7
                                { time : '6:0:0',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '6:0:2',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '6:1:0',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '6:1:2',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '6:2:0',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '6:2:2',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '6:3:0',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '6:3:2',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                // BAR 8
                                { time : '7:0:0',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '7:0:2',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '7:1:0',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '7:1:2',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '7:2:0',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '7:2:2',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '7:3:0',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '7:3:2',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                            ]
                        },
                        verse2_rhythm_alt_I: {    // 8 bar Rhythm guitar verse 1 rhythm part A
                            length:             '8:0:0', 
                            bpm:                140,                                        
                            timeSignature:      [4, 4],    
                            loop:               true,                                  
                            notes: [ // Starts after intro and repeats throughout verse
                                // BAR 1 
                                { time : '0:0:0',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '0:0:2',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                            ]
                        },
                        verse2_rhythm_alt_II: {    // 8 bar Rhythm guitar verse 1 rhythm part A
                            length:             '8:0:0', 
                            bpm:                140,                                        
                            timeSignature:      [4, 4],    
                            loop:               true,                                  
                            notes: [ // Starts after intro and repeats throughout verse
                                // BAR 1 
                                { time : '0:0:0',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '0:0:2',   note : ['D3', 'F3', 'B3'],    dur : '16n'},

                            ]
                        },
                        // b. Main guitar / song voicing
                        verse1_lead_I: {    // 8 bar verse Pt I
                            length:             '8:0:0', 
                            bpm:                140,                                        
                            timeSignature:      [4, 4],    
                            loop:               true,                                  
                            notes: [ // Starts 5 bars in
                                // BAR 1 
                                { time : '0:1:0',   note : ['G2', 'C3'],    dur : '8n'},
                                { time : '0:1:2',   note : 'E3',    dur : '8n'},
                                { time : '0:2:0',   note : 'E3',    dur : '8n'},
                                { time : '0:2:2',   note : 'E3',    dur : '8n'},
                                { time : '0:3:0',   note : 'E3',    dur : '8n'},
                                { time : '0:3:2',   note : 'E3',    dur : '8n'},
                                // BAR 2
                                { time : '1:0:0',   note : 'E3',    dur : '8n'},
                                { time : '1:0:2',   note : 'E3',    dur : '8n'},                       
                                { time : '1:1:0',   note : 'F3',    dur : '0:0:3.5'},
                                { time : '1:2:0',   note : 'E3',    dur : '8n'},
                                { time : '1:2:2',   note : 'F3',    dur : '4n'},
                                { time : '1:3:2',   note : 'E3',    dur : '0:0:3.5'},
                                // BAR 3
                                { time : '2:0:2',   note : ['G2', 'C3'],    dur : '8n'},
                                { time : '2:1:0',   note : 'E3',    dur : '8n'},
                                { time : '2:1:2',   note : 'E3',    dur : '8n'},
                                { time : '2:2:0',   note : 'E3',    dur : '8n'},
                                { time : '2:2:2',   note : 'E3',    dur : '8n'},
                                { time : '2:3:0',   note : 'E3',    dur : '8n'},
                                { time : '2:3:2',   note : 'E3',    dur : '8n'},
                                // BAR 4
                                { time : '3:0:0',   note : 'E3',    dur : '8n'},
                                { time : '3:0:2',   note : 'E3',    dur : '8n'},
                                { time : '3:1:0',   note : 'F3',    dur : '8n'},
                                { time : '3:1:2',   note : 'E3',    dur : '0:0:3.5'},
                                { time : '3:2:2',   note : 'F3',    dur : '8n'},
                                { time : '3:3:0',   note : 'E3',    dur : '8n'},
                                { time : '3:3:2',   note : 'D3',    dur : '8n'},
                                // BAR 5 
                                { time : '4:0:0',   note : 'C3',    dur : '8n'},
                                { time : '4:0:2',   note : 'D3',    dur : '0:1:1.75'},
                                // BAR 6    
                                { time : '5:3:2',   note : 'D3',    dur : '8n'},   
                                // BAR 7                           
                                { time : '6:0:0',   note : 'D3',    dur : '8n'},                              
                                { time : '6:0:2',   note : 'D3',    dur : '0:1:1.75'},        
                                // BAR 8                    
                            ]
                        },
                        verse1_lead_II: {    // 8 bar verse Pt II
                            length:             '8:0:0',  
                            bpm:                140,     
                            timeSignature:      [4, 4],                                                                    
                            performer:          'Piano',  
                            loop:               true,             
                            notes: [ 
                                // BAR 1 
                                { time : '0:1:0',   note : ['G2', 'C3'],    dur : '4n.'},
                                { time : '0:2:2',   note : 'E3',    dur : '8n'},
                                { time : '0:3:0',   note : 'E3',    dur : '8n'},
                                { time : '0:3:2',   note : 'E3',    dur : '8n'},
                                // BAR 2
                                { time : '1:0:0',   note : 'E3',    dur : '8n'},
                                { time : '1:0:2',   note : 'E3',    dur : '8n'},
                                { time : '1:1:0',   note : 'F3',    dur : '0:0:3.5'},
                                { time : '1:2:0',   note : 'G3',    dur : '8n'},
                                { time : '1:2:2',   note : 'F3',    dur : '4n'},                       
                                { time : '1:3:2',   note : 'E3',    dur : '0:1:1.75'},
                                // BAR 3
                                { time : '2:1:0',   note : ['G2', 'C3'],    dur : '8n'},
                                { time : '2:1:2',   note : 'E3',    dur : '8n'},
                                { time : '2:2:0',   note : 'E3',    dur : '16n'},
                                { time : '2:2:1',   note : 'E3',    dur : '16n'},
                                { time : '2:2:2',   note : 'E3',    dur : '8n'},
                                { time : '2:3:0',   note : 'E3',    dur : '16n'},
                                { time : '2:3:1',   note : 'E3',    dur : '16n'},
                                { time : '2:3:2',   note : 'E3',    dur : '8n'},
                                // BAR 4
                                { time : '3:0:0',   note : 'E3',    dur : '8n'},
                                { time : '3:0:2',   note : 'E3',    dur : '8n'},
                                { time : '3:1:2',   note : 'F3',    dur : '8n'},
                                { time : '3:2:0',   note : 'G3',    dur : '8n'},
                                { time : '3:2:2',   note : 'F3',    dur : '8n'},
                                { time : '3:3:0',   note : 'E3',    dur : '8n'},
                                { time : '3:3:2',   note : 'E3',    dur : '8n'},
                                // BAR 5 
                                { time : '4:0:0',   note : 'C3',    dur : '8n'},
                                { time : '4:0:2',   note : 'D3',    dur : '0:1:1.75'},
                                // BAR 6                           
                                { time : '5:3:2',   note : 'D3',    dur : '8n'},      
                                // BAR 7                          
                                { time : '6:0:0',   note : 'D3',    dur : '8n'},                            
                                { time : '6:0:2',   note : 'D3',    dur : '8n'},                            
                                { time : '6:1:0',   note : 'D3',    dur : '8n'},                            
                                { time : '6:1:2',   note : 'D3',    dur : '8n'},                            
                                { time : '6:3:0',   note : 'D3',    dur : '8n'},                            
                                { time : '6:3:2',   note : 'F3',    dur : '0:0:3.5'},      
                                // BAR 8   
                                { time : '7:0:2',   note : 'D3',   dur : '0:1:1.75'},   
                                { time : '7:3:0',   note : 'D3',   dur : '8n'},   
                                { time : '7:3:2',   note : 'D3',   dur : '8n'},   
                            ]
                        },  
                        verse2_lead_I: {    // 8 bar verse Pt I (Bars 35 to 42)
                            length:             '8:0:0', 
                            bpm:                140,                                        
                            timeSignature:      [4, 4],    
                            loop:               true,                                  
                            notes: [ // Starts 5 bars in
                                // BAR 1 
                                { time : '0:1:0',   note : ['G2', 'C3'],    dur : '4n.'},
                                { time : '0:2:2',   note : 'E3',    dur : '8n'},
                                { time : '0:3:0',   note : 'E3',    dur : '8n'},
                                { time : '0:3:2',   note : 'E3',    dur : '8n'},
                                // BAR 2
                                { time : '1:0:0',   note : 'E3',    dur : '8n'},
                                { time : '1:0:2',   note : 'E3',    dur : '8n'},                       
                                { time : '1:1:0',   note : 'F3',    dur : '0:0:3.5'},
                                { time : '1:2:0',   note : 'E3',    dur : '8n'},
                                { time : '1:2:2',   note : 'F3',    dur : '4n'},
                                { time : '1:3:2',   note : 'E3',    dur : '0:0:3.5'},
                                // BAR 3
                                { time : '2:0:2',   note : ['G2', 'C3'],    dur : '8n'},
                                { time : '2:1:0',   note : 'E2',    dur : '8n'},
                                { time : '2:1:2',   note : 'E3',    dur : '8n'},
                                { time : '2:2:0',   note : 'E3',    dur : '8n'},
                                { time : '2:2:2',   note : 'E3',    dur : '8n'},
                                { time : '2:3:0',   note : 'E3',    dur : '0:0:3.5'},
                                // BAR 4
                                { time : '3:0:0',   note : 'E3',    dur : '8n'},
                                { time : '3:0:2',   note : 'E3',    dur : '8n'},
                                { time : '3:1:0',   note : 'F3',    dur : '8n'},
                                { time : '3:1:2',   note : 'E3',    dur : '0:0:3.5'},
                                { time : '3:2:2',   note : 'F3',    dur : '0:0:3.5'},
                                { time : '3:3:2',   note : 'E3',    dur : '8n'},
                                // BAR 5 
                                { time : '4:0:0',   note : 'C3',    dur : '8n'},
                                { time : '4:0:2',   note : 'D3',    dur : '0:1:1.75'},
                                // BAR 6    
                                { time : '5:3:2',   note : 'D3',    dur : '8n'},   
                                // BAR 7                           
                                { time : '6:0:0',   note : 'D3',    dur : '8n'},                              
                                { time : '6:0:2',   note : 'D3',    dur : '8n'},        
                                { time : '6:1:0',   note : 'D3',    dur : '8n'},        
                                // BAR 8                    
                                { time : '7:0:0',   note : 'D2',    dur : '0:0:3.5'},                             
                                { time : '7:0:0',   note : 'D3',    dur : '0:0:3.5'}, 
                            ]
                        },
                        verse2_lead_II: {    // 8 bar verse Pt II (Bars 43 to 51)
                            length:             '8:0:0',  
                            bpm:                140,     
                            timeSignature:      [4, 4],                                                                    
                            performer:          'Piano',  
                            loop:               true,             
                            notes: [ 
                                // BAR 1 
                                { time : '0:1:0',   note : ['G2', 'C3'],    dur : '4n.'},
                                { time : '0:2:2',   note : 'E3',    dur : '8n'},
                                { time : '0:3:0',   note : 'E3',    dur : '8n'},
                                { time : '0:3:2',   note : 'E3',    dur : '8n'},
                                // BAR 2
                                { time : '1:0:0',   note : 'E3',    dur : '8n'},
                                { time : '1:0:2',   note : 'E3',    dur : '8n'},
                                { time : '1:1:0',   note : 'F3',    dur : '0:0:3.5'},
                                { time : '1:2:0',   note : 'G3',    dur : '8n'},
                                { time : '1:2:2',   note : 'F3',    dur : '4n'},                       
                                { time : '1:3:2',   note : 'E3',    dur : '0:1:1.75'},
                                // BAR 3
                                { time : '2:1:0',   note : ['G2', 'C3'],    dur : '8n'},
                                { time : '2:1:2',   note : 'E3',    dur : '8n'},
                                { time : '2:2:0',   note : 'E3',    dur : '8n'},
                                { time : '2:2:2',   note : 'E3',    dur : '8n'},
                                { time : '2:3:0',   note : 'E3',    dur : '8n'},
                                { time : '2:3:2',   note : 'E3',    dur : '8n'},
                                // BAR 4
                                { time : '3:0:2',   note : 'E3',    dur : '8n'},
                                { time : '3:1:2',   note : 'F3',    dur : '8n'},
                                { time : '3:2:0',   note : 'G3',    dur : '8n'},
                                { time : '3:2:2',   note : 'F3',    dur : '8n'},
                                { time : '3:3:0',   note : 'E3',    dur : '8n'},
                                { time : '3:3:2',   note : 'E3',    dur : '8n'},
                                // BAR 5 
                                { time : '4:0:0',   note : 'C3',    dur : '8n'},
                                { time : '4:0:2',   note : 'D3',    dur : '0:1:1.75'},
                                // BAR 6                              
                                // BAR 7                          
                                { time : '6:3:2',   note : 'D3',    dur : '8n'},                                
                                // BAR 8   
                                { time : '7:0:0',   note : 'D3',    dur : '8n'},     
                                { time : '7:0:2',   note : 'D3',    dur : '8n'},    
                            ]
                        },  
                        // c. Piano lead riff line (verse 1) and chords (verse 2)
                        verse1_melody_main: {    // 8 bar verse repeated twice where last two bars have alternates (A and B)
                            length:             '8:0:0', 
                            bpm:                140,                                        
                            timeSignature:      [4, 4],    
                            loop:               true,                                  
                            notes: [ // Piano lead line Starts 5 bars in
                                // BAR 1 
                                { time : '0:2:0',   note : 'E3',    dur : '8n'},
                                { time : '0:2:2',   note : 'E3',    dur : '8n'},
                                { time : '0:3:0',   note : 'E3',    dur : '8n'},
                                { time : '0:3:2',   note : 'E3',    dur : '8n'},
                                // BAR 2
                                { time : '1:0:0',   note : 'E3',    dur : '8n'},
                                { time : '1:0:2',   note : 'E3',    dur : '8n'},                       
                                { time : '1:1:0',   note : 'F3',    dur : '8n'},
                                { time : '1:1:2',   note : 'E3',    dur : '0:0:3.5'}, 
                                { time : '1:2:2',   note : 'F3',    dur : '0:0:3.5'}, 
                                { time : '1:3:2',   note : 'E3',    dur : '8n'},
                                // BAR 3
                                { time : '2:2:0',   note : 'E3',    dur : '8n'},
                                { time : '2:2:2',   note : 'E3',    dur : '8n'},
                                { time : '2:3:0',   note : 'E3',    dur : '8n'},
                                { time : '2:3:2',   note : 'E3',    dur : '8n'},
                                // BAR 4
                                { time : '3:0:0',   note : 'E3',    dur : '8n'},
                                { time : '3:0:2',   note : 'E3',    dur : '8n'},
                                { time : '3:1:0',   note : 'F3',    dur : '8n'},
                                { time : '3:1:2',   note : 'E3',    dur : '0:0:3.5'}, 
                                { time : '3:2:2',   note : 'F3',    dur : '0:0:3.5'}, 
                                { time : '3:3:2',   note : 'E3',    dur : '0:0:3.5'}, 
                                // BAR 5 
                                { time : '4:0:2',   note : 'D3',    dur : '8n'},
                                { time : '4:2:0',   note : 'F3',    dur : '8n'},
                                { time : '4:2:2',   note : 'F3',    dur : '8n'},
                                { time : '4:3:0',   note : 'F3',    dur : '8n'},
                                { time : '4:3:2',   note : 'F3',    dur : '8n'},
                                // BAR 6    
                                { time : '5:0:0',   note : 'F3',    dur : '8n'},   
                                { time : '5:0:2',   note : 'F3',    dur : '8n'},   
                                { time : '5:1:0',   note : 'G3',    dur : '8n'},   
                                { time : '5:1:2',   note : 'F3',    dur : '0:0:3.5'},   
                                { time : '5:2:2',   note : 'G3',    dur : '0:0:3.5'},  
                                { time : '5:3:2',   note : 'F3',    dur : '0:0:3.5'},               
                            ]
                        },
                        verse1_melody_alt_I: {   // Alternate final 2 bar hook of 8 bar verse riff 
                            length:             '8:0:0', 
                            bpm:                140,                                        
                            timeSignature:      [4, 4],    
                            loop:               true,                                  
                            notes: [ // Piano lead line Starts 5 bars in
                                // BAR 7                           
                                { time : '6:2:0',   note : 'E3',    dur : '8n'},      
                                { time : '6:2:2',   note : 'E3',    dur : '8n'},      
                                { time : '6:3:0',   note : 'E3',    dur : '8n'},      
                                { time : '6:3:2',   note : 'E3',    dur : '8n'},            
                                // BAR 8     
                                { time : '7:0:0',   note : 'E3',    dur : '8n'},                
                                { time : '7:0:2',   note : 'E3',    dur : '8n'},                
                                { time : '7:1:0',   note : 'F3',    dur : '8n'},                
                                { time : '7:1:2',   note : 'E3',    dur : '0:0:3.5'},                 
                                { time : '7:2:2',   note : 'F3',    dur : '0:0:3.5'},                 
                                { time : '7:3:2',   note : 'E3',    dur : '8n'},   
                            ]
                        },
                        verse1_melody_alt_II: {  // Alternate final 2 bar hook of 8 bar verse riff 
                            length:             '8:0:0', 
                            bpm:                140,                                        
                            timeSignature:      [4, 4],    
                            loop:               true,                                  
                            notes: [ // Piano lead line Starts 5 bars in
                                // BAR 7                           
                                { time : '6:2:0',   note : 'F3',    dur : '8n'},      
                                { time : '6:2:2',   note : 'F3',    dur : '8n'},      
                                { time : '6:3:0',   note : 'F3',    dur : '8n'},      
                                { time : '6:3:2',   note : 'F3',    dur : '8n'},            
                                // BAR 8     
                                { time : '7:0:0',   note : 'F3',    dur : '8n'},                
                                { time : '7:0:2',   note : 'F3',    dur : '8n'},                
                                { time : '7:1:0',   note : 'G3',    dur : '8n'},                
                                { time : '7:1:2',   note : 'F3',    dur : '0:0:3.5'},                 
                                { time : '7:2:2',   note : 'G3',    dur : '0:0:3.5'},                 
                                { time : '7:3:2',   note : 'F3',    dur : '0:0:3.5'},    
                            ]
                        },
                        verse2_melody_main: {    // 8 bar verse repeated twice 
                            length:             '8:0:0', 
                            bpm:                140,                                        
                            timeSignature:      [4, 4],    
                            loop:               true,                                  
                            notes: [ 
                                // BAR 1 
                                { time : '0:1:0',   note : ['G2', 'C3', 'E3'],    dur : '0:3:3'}, 
                                // BAR 2
                                { time : '1:1:0',   note : ['G2', 'C3', 'E3'],    dur : '0:3:3'}, 
                                // BAR 3
                                { time : '2:1:0',   note : ['G2', 'C3', 'E3'],    dur : '0:3:3'}, 
                                // BAR 4
                                { time : '3:1:0',   note : ['G2', 'C3', 'F3'],    dur : '0:3:3'}, 
                                // BAR 5 
                                { time : '4:1:0',   note : ['D3', 'F3', 'B3'],    dur : '0:3:3'}, 
                                // BAR 6    
                                { time : '5:1:0',   note : ['D3', 'F3', 'B3'],    dur : '0:3:3'}, 
                                // BAR 7    
                                { time : '6:1:0',   note : ['D3', 'F3', 'B3'],    dur : '0:3:3'}, 
                                 // BAR 8
                                { time : '7:1:0',   note :  ['D3', 'F3', 'B3'],    dur : '0:3:3'},              
                            ]
                        },
                        verse2_chords: {    // Piano chords: for verse 2 Pt I (Bars 35 to 42) and Pt II (43 to p 51)
                            length:             '8:0:0', 
                            bpm:                140,                                        
                            timeSignature:      [4, 4],    
                            loop:               true,                                  
                            notes: [ 
                                // BAR 1 
                                { time : '0:1:0',   note : ['G2', 'C3', 'E3'],    dur : '0:3:3.75'}, 
                                // BAR 2
                                { time : '1:1:0',   note : ['G2', 'C3', 'E3'],    dur : '0:3:3.75'}, 
                                // BAR 3
                                { time : '2:1:0',   note : ['G2', 'C3', 'E3'],    dur : '0:3:3.75'}, 
                                // BAR 4
                                { time : '3:1:0',   note : ['G2', 'C3', 'F3'],    dur : '0:3:3.75'}, 
                                // BAR 5 
                                { time : '4:1:0',   note : ['D3', 'F3', 'B3'],    dur : '0:3:3.75'}, 
                                // BAR 6    
                                { time : '5:1:0',   note : ['D3', 'F3', 'B3'],    dur : '0:3:3.75'},   
                                // BAR 7    
                                { time : '6:1:0',   note : ['D3', 'F3', 'B3'],    dur : '0:3:3.75'}, 
                                // BAR 8
                                { time : '7:1:0',   note : ['D3', 'F3', 'B3'],    dur : '0:3:3.75'},              
                            ]
                        },

                    // CHORUS:  | Chorus 1 Bar 21 to 33 | Chorus 2 Bar 51 to 63
                        chorus_bassline: {   // 12 bar Chorus bassline
                            length:             '12:0:0', 
                            bpm:                140,                                        
                            timeSignature:      [4, 4],    
                            loop:               true,                                  
                            notes: [            
                                // Bar 1
                                { time : '0:0:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '0:1:0',   note : ['F0', 'F1', 'F2'],    dur : '8n'},
                                { time : '0:1:2',   note : ['F0', 'F1', 'F2'],    dur : '8n'},
                                { time : '0:2:2',   note : ['F0', 'F1', 'F2'],    dur : '8n'},
                                { time : '0:3:0',   note : ['F0', 'F1', 'F2'],    dur : '8n'},
                                { time : '0:3:2',   note : ['F0', 'F1', 'F2'],    dur : '8n'},
                                // Bar 2
                                { time : '1:0:2',   note : ['F0', 'F1', 'F2'],    dur : '8n'},
                                { time : '1:1:0',   note : ['F0', 'F1', 'F2'],    dur : '8n'},
                                { time : '1:1:2',   note : ['F0', 'F1', 'F2'],    dur : '8n'},
                                { time : '1:2:2',   note : ['F0', 'F1', 'F2'],    dur : '8n'},
                                { time : '1:3:0',   note : ['F0', 'F1', 'F2'],    dur : '8n'},
                                { time : '1:3:2',   note : ['F0', 'F1', 'F2'],    dur : '8n'}, 
                                // Bar 3
                                { time : '2:0:2',   note : ['F0', 'F1', 'F2'],    dur : '8n'},
                                { time : '2:1:0',   note : ['F0', 'F1', 'F2'],    dur : '8n'},
                                { time : '2:1:2',   note : ['F0', 'F1', 'F2'],    dur : '8n'},
                                { time : '2:2:2',   note : ['F0', 'F1', 'F2'],    dur : '8n'},
                                { time : '2:3:0',   note : ['F0', 'F1', 'F2'],    dur : '8n'},
                                { time : '2:3:2',   note : ['F0', 'F1', 'F2'],    dur : '8n'},  
                                // Bar 4
                                { time : '3:0:2',   note : ['F0', 'F1', 'F2'],    dur : '8n'},
                                { time : '3:1:0',   note : ['F0', 'F1', 'F2'],    dur : '8n'},
                                { time : '3:1:2',   note : ['F0', 'F1', 'F2'],    dur : '8n'},
                                { time : '3:2:2',   note : ['F0', 'F1', 'F2'],    dur : '8n'},
                                { time : '3:3:0',   note : ['F0', 'F1', 'F2'],    dur : '8n'},
                                { time : '3:3:2',   note : ['F0', 'F1', 'F2'],    dur : '8n'},   
                                // Bar 5
                                { time : '4:0:2',   note : ['F0', 'F1', 'F2'],    dur : '8n'},
                                { time : '4:1:0',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '4:1:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '4:2:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '4:3:0',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '4:3:2',   note : ['C1', 'C2'],    dur : '8n'},
                                // Bar 6
                                { time : '5:0:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '5:1:0',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '5:1:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '5:2:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '5:3:0',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '5:3:2',   note : ['C1', 'C2'],    dur : '8n'},
                                // Bar 7
                                { time : '6:0:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '6:1:0',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '6:1:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '6:2:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '6:3:0',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '6:3:2',   note : ['C1', 'C2'],    dur : '8n'},
                                // Bar 8
                                { time : '7:0:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '7:1:0',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '7:1:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '7:2:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '7:3:0',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '7:3:2',   note : ['C1', 'C2'],    dur : '8n'},
                                // Bar 9
                                { time : '8:0:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '8:1:0',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '8:1:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '8:2:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '8:3:0',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '8:3:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                // Bar 10
                                { time : '9:0:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '9:1:0',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '9:1:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '9:2:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '9:3:0',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '9:3:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                // Bar 11
                                { time : '10:0:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '10:1:0',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '10:1:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '10:2:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '10:3:0',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '10:3:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                // Bar 12
                                { time : '11:0:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '11:1:0',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '11:1:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '11:2:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '11:3:0',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '11:3:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                            ]
                        },
                        chorus1_rhythm: {     // 12 bar Rhythm guitar chorus
                            length:             '12:0:0', 
                            bpm:                140,                                        
                            timeSignature:      [4, 4],    
                            loop:               true,                                  
                            notes: [ // Starts after intro and repeats throughout verse
                                // BAR 1 
                                { time : '0:0:0',   note : ['D3', 'F3', 'B3'],    dur : '8n'},
                                { time : '0:0:2',   note : ['D3', 'F3', 'B3'],    dur : '8n'},
                                { time : '0:2:0',   note : ['A2', 'C3', 'F3'],    dur : '8n'},
                                { time : '0:2:2',   note : ['A2', 'C3', 'F3'],    dur : '8n'},   
                                // BAR 2
                                { time : '1:0:0',   note : ['A2', 'C3', 'F3'],    dur : '8n'},
                                { time : '1:0:2',   note : ['A2', 'C3', 'F3'],    dur : '8n'},
                                { time : '1:2:0',   note : ['A2', 'C3', 'F3'],    dur : '8n'},
                                { time : '1:2:2',   note : ['A2', 'C3', 'F3'],    dur : '8n'},
                                // BAR 3
                                { time : '2:0:0',   note : ['A2', 'C3', 'F3'],    dur : '8n'},
                                { time : '2:0:2',   note : ['A2', 'C3', 'F3'],    dur : '8n'},
                                { time : '2:2:0',   note : ['A2', 'C3', 'F3'],    dur : '8n'},
                                { time : '2:2:2',   note : ['A2', 'C3', 'F3'],    dur : '8n'},    
                                // BAR 4
                                { time : '3:0:0',   note : ['A2', 'C3', 'F3'],    dur : '8n'},
                                { time : '3:0:2',   note : ['A2', 'C3', 'F3'],    dur : '8n'},
                                { time : '3:2:0',   note : ['A2', 'C3', 'F3'],    dur : '8n'},
                                { time : '3:2:2',   note : ['A2', 'C3', 'F3'],    dur : '8n'},  
                                // BAR 5
                                { time : '4:0:0',   note : ['A2', 'C3', 'F3'],    dur : '8n'},
                                { time : '4:0:2',   note : ['A2', 'C3', 'F3'],    dur : '8n'},
                                { time : '4:2:0',   note : ['C3', 'G3', 'C4'],    dur : '8n'},
                                { time : '4:2:2',   note : ['C3', 'G3', 'C4'],    dur : '8n'},
                                // BAR 6
                                { time : '5:0:0',   note : ['C3', 'G3', 'C4'],    dur : '8n'},
                                { time : '5:0:2',   note : ['C3', 'G3', 'C4'],    dur : '8n'},
                                { time : '5:2:0',   note : ['C3', 'G3', 'C4'],    dur : '8n'},
                                { time : '5:2:2',   note : ['C3', 'G3', 'C4'],    dur : '8n'},
                                // BAR 7
                                { time : '6:0:0',   note : ['C3', 'G3', 'C4'],    dur : '8n'},
                                { time : '6:0:2',   note : ['C3', 'G3', 'C4'],    dur : '8n'},
                                { time : '6:2:0',   note : ['C3', 'G3', 'C4'],    dur : '8n'},
                                { time : '6:2:2',   note : ['C3', 'G3', 'C4'],    dur : '8n'},
                                // BAR 8
                                { time : '7:0:0',   note : ['C3', 'G3', 'C4'],    dur : '8n'},
                                { time : '7:0:2',   note : ['C3', 'G3', 'C4'],    dur : '8n'},
                                { time : '7:2:0',   note : ['C3', 'G3', 'C4'],    dur : '8n'},
                                { time : '7:2:2',   note : ['C3', 'G3', 'C4'],    dur : '8n'},
                                // BAR 9
                                { time : '8:0:0',   note : ['C3', 'G3', 'C4'],    dur : '8n'},
                                { time : '8:0:2',   note : ['C3', 'G3', 'C4'],    dur : '8n'},
                                { time : '8:2:0',   note : ['D3', 'F3', 'B3'],    dur : '8n'},
                                { time : '8:2:2',   note : ['D3', 'F3', 'B3'],    dur : '8n'},
                                // BAR 10
                                { time : '9:0:0',   note : ['D3', 'F3', 'B3'],    dur : '8n'},
                                { time : '9:0:2',   note : ['D3', 'F3', 'B3'],    dur : '8n'},
                                { time : '9:2:0',   note : ['D3', 'F3', 'B3'],    dur : '8n'},
                                { time : '9:2:2',   note : ['D3', 'F3', 'B3'],    dur : '8n'},
                                // BAR 11
                                { time : '10:0:0',   note : ['D3', 'F3', 'B3'],    dur : '8n'},
                                { time : '10:0:2',   note : ['D3', 'F3', 'B3'],    dur : '8n'},
                                { time : '10:2:0',   note : ['D3', 'F3', 'B3'],    dur : '8n'},
                                { time : '10:2:2',   note : ['D3', 'F3', 'B3'],    dur : '8n'},
                                // BAR 12
                                { time : '11:0:0',   note : ['D3', 'F3', 'B3'],    dur : '8n'},
                                { time : '11:0:2',   note : ['D3', 'F3', 'B3'],    dur : '8n'},
                                { time : '11:2:0',   note : ['D3', 'F3', 'B3'],    dur : '8n'},
                                { time : '11:2:2',   note : ['D3', 'F3', 'B3'],    dur : '8n'},
                            ]
                        },
                        chorus2_rhythm: {     // 12 bar Rhythm guitar chorus
                            length:             '12:0:0', 
                            bpm:                140,                                        
                            timeSignature:      [4, 4],    
                            loop:               true,                                  
                            notes: [ // Starts after intro and repeats throughout verse
                                // BAR 1 
                                { time : '0:0:0',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '0:0:2',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '0:1:0',   note : ['A2', 'C3', 'F3'],    dur : '16n'},
                                { time : '0:1:2',   note : ['A2', 'C3', 'F3'],    dur : '16n'},
                                { time : '0:2:0',   note : ['A2', 'C3', 'F3'],    dur : '16n'},
                                { time : '0:2:2',   note : ['A2', 'C3', 'F3'],    dur : '16n'},
                                { time : '0:3:0',   note : ['A2', 'C3', 'F3'],    dur : '16n'},
                                { time : '0:3:2',   note : ['A2', 'C3', 'F3'],    dur : '16n'},
                                // BAR 2
                                { time : '1:0:0',   note : ['A2', 'C3', 'F3'],    dur : '16n'},
                                { time : '1:0:2',   note : ['A2', 'C3', 'F3'],    dur : '16n'},
                                { time : '1:1:0',   note : ['A2', 'C3', 'F3'],    dur : '16n'},
                                { time : '1:1:2',   note : ['A2', 'C3', 'F3'],    dur : '16n'},
                                { time : '1:2:0',   note : ['A2', 'C3', 'F3'],    dur : '16n'},
                                { time : '1:2:2',   note : ['A2', 'C3', 'F3'],    dur : '16n'},
                                { time : '1:3:0',   note : ['A2', 'C3', 'F3'],    dur : '16n'},
                                { time : '1:3:2',   note : ['A2', 'C3', 'F3'],    dur : '16n'},
                                // BAR 3
                                { time : '2:0:0',   note : ['A2', 'C3', 'F3'],    dur : '16n'},
                                { time : '2:0:2',   note : ['A2', 'C3', 'F3'],    dur : '16n'},
                                { time : '2:1:0',   note : ['A2', 'C3', 'F3'],    dur : '16n'},
                                { time : '2:1:2',   note : ['A2', 'C3', 'F3'],    dur : '16n'},
                                { time : '2:2:0',   note : ['A2', 'C3', 'F3'],    dur : '16n'},
                                { time : '2:2:2',   note : ['A2', 'C3', 'F3'],    dur : '16n'},
                                { time : '2:3:0',   note : ['A2', 'C3', 'F3'],    dur : '16n'},
                                { time : '2:3:2',   note : ['A2', 'C3', 'F3'],    dur : '16n'},
                                // BAR 4
                                { time : '3:0:0',   note : ['A2', 'C3', 'F3'],    dur : '16n'},
                                { time : '3:0:2',   note : ['A2', 'C3', 'F3'],    dur : '16n'},
                                { time : '3:1:0',   note : ['A2', 'C3', 'F3'],    dur : '16n'},
                                { time : '3:1:2',   note : ['A2', 'C3', 'F3'],    dur : '16n'},
                                { time : '3:2:0',   note : ['A2', 'C3', 'F3'],    dur : '16n'},
                                { time : '3:2:2',   note : ['A2', 'C3', 'F3'],    dur : '16n'},
                                { time : '3:3:0',   note : ['A2', 'C3', 'F3'],    dur : '16n'},
                                { time : '3:3:2',   note : ['A2', 'C3', 'F3'],    dur : '16n'},
                                // BAR 5
                                { time : '4:0:0',   note : ['A2', 'C3', 'F3'],    dur : '16n'},
                                { time : '4:0:2',   note : ['A2', 'C3', 'F3'],    dur : '16n'},
                                { time : '4:1:0',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '4:1:2',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '4:2:0',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '4:2:2',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '4:3:0',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '4:3:2',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                // BAR 6
                                { time : '5:0:0',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '5:0:2',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '5:1:0',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '5:1:2',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '5:2:0',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '5:2:2',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '5:3:0',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '5:3:2',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                // BAR 7
                                { time : '6:0:0',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '6:0:2',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '6:1:0',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '6:1:2',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '6:2:0',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '6:2:2',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '6:3:0',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '6:3:2',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                // BAR 8
                                { time : '7:0:0',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '7:0:2',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '7:1:0',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '7:1:2',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '7:2:0',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '7:2:2',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '7:3:0',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '7:3:2',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                // BAR 9
                                { time : '8:0:0',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '8:0:2',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '8:1:0',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '8:1:2',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '8:2:0',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '8:2:2',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '8:3:0',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '8:3:2',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                // BAR 10
                                { time : '9:0:0',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '9:0:2',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '9:1:0',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '9:1:2',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '9:2:0',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '9:2:2',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '9:3:0',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '9:3:2',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                // BAR 11
                                { time : '10:0:0',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '10:0:2',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '10:1:0',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '10:1:2',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '10:2:0',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '10:2:2',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '10:3:0',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '10:3:2',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                // BAR 12
                                { time : '11:0:0',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '11:0:2',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '11:1:0',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '11:1:2',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '11:2:0',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '11:2:2',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '11:3:0',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '11:3:2',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                            ]
                        },
                        chorus1_lead: {       // 12 bar Chorus riff 
                            length:             '12:0:0',  
                            bpm:                140,     
                            timeSignature:      [4, 4],                                                                    
                            performer:          'Piano',  
                            loop:               true,             
                            notes: [ //  Starts at bar 21 to 32
                                // BAR 1 
                                { time : '0:1:0',   note : ['A2', 'C3'],    dur : '8n'},
                                { time : '0:1:2',   note : 'E3',    dur : '8n'},
                                { time : '0:2:0',   note : 'E3',    dur : '8n'},
                                { time : '0:2:2',   note : 'E3',    dur : '8n'},
                                { time : '0:3:0',   note : ['A2', 'C3', 'F3'],    dur : '0:0:3.75'},
                                // BAR 2
                                { time : '1:0:0',   note : ['A2', 'C3', 'F3'],    dur : '0:0:3.75'},
                                { time : '1:1:0',   note : ['A2', 'C3', 'F3'],    dur : '8n'},
                                { time : '1:1:2',   note : 'F3',    dur : '0:0:3.75'},
                                { time : '1:2:2',   note : ['A2', 'C3', 'G3'],    dur : '4n'},
                                { time : '1:3:2',   note : 'F3',    dur : '0:1:1.75'},
                                // BAR 3                    
                                { time : '2:1:0',   note : ['A2', 'C3'],    dur : '8n'},                     
                                { time : '2:1:2',   note : 'F3',    dur : '8n'},
                                { time : '2:2:0',   note : 'F3',    dur : '8n'},
                                { time : '2:2:2',   note : 'F3',    dur : '8n'},
                                { time : '2:3:0',   note : ['A2', 'C3', 'F3'],    dur : '0:0:3.75'},
                                // BAR 4
                                { time : '3:0:0',   note : ['A2', 'C3', 'F3'],    dur : '0:0:3.75'},
                                { time : '3:1:0',   note : ['A2', 'C3', 'G3'],    dur : '8n'},
                                { time : '3:1:2',   note : 'F3',    dur : '0:0:3.75'},
                                { time : '3:2:2',   note : ['A2', 'C3', 'G3'],    dur : '4n'},
                                { time : '3:3:2',   note : 'F3',    dur : '8n'},
                                // BAR 5
                                { time : '4:0:0',   note : 'F3',    dur : '8n'},
                                { time : '4:0:2',   note : 'F3',    dur : '8n'},
                                { time : '4:1:0',   note : ['G2', 'C3', 'E3'],    dur : '4n'},
                                { time : '4:2:0',   note : 'E3',    dur : '8n'},
                                { time : '4:2:2',   note : 'E3',    dur : '8n'},
                                { time : '4:3:0',   note : ['G2', 'C3', 'E3'],    dur : '0:0:3.75'},
                                // BAR 6
                                { time : '5:0:0',   note : ['G2', 'C3', 'E3'],    dur : '0:0:3.75'},
                                { time : '5:1:0',   note : ['G2', 'C3', 'F3'],    dur : '8n'},
                                { time : '5:1:2',   note : 'G3',    dur : '0:0:3.75'},
                                { time : '5:2:2',   note : ['G2', 'C3', 'F3'],    dur : '4n'},
                                { time : '5:3:2',   note : 'E3',    dur : '0:1:1.75'},
                                // BAR 7
                                { time : '6:1:0',   note : ['G2', 'C3'],    dur : '8n'},                      
                                { time : '6:1:2',   note : 'E3',    dur : '8n'},                         
                                { time : '6:2:0',   note : 'E3',    dur : '8n'},                         
                                { time : '6:2:2',   note : 'E3',    dur : '8n'},                         
                                { time : '6:3:0',   note : ['G2', 'C3', 'E3'],    dur : '8n'},                                              
                                { time : '6:3:2',   note : 'E3',    dur : '0:1:1.75'},          
                                // BAR 8
                                { time : '7:1:0',   note : ['G2', 'C3'],    dur : '8n'},                            
                                { time : '7:1:2',   note : 'E3',    dur : '8n'},    
                                { time : '7:2:0',   note : 'E3',    dur : '8n'},    
                                { time : '7:2:2',   note : 'F3',    dur : '8n'},  
                                { time : '7:3:0',   note : ['G2', 'C3', 'E3'],    dur : '0:0:3.75'},   
                                // BAR 9
                                { time : '8:0:0',   note : 'C3',    dur : '8n'},    
                                { time : '8:0:2',   note : 'D3',    dur : '0:1:1.75'},  
                                { time : '8:3:2',   note : 'B2',    dur : '8n'},    
                                // BAR 10
                                { time : '9:0:0',   note : 'C3',    dur : '8n'},    
                                { time : '9:0:2',   note : 'D3',    dur : '0:1:1.75'},  
                                { time : '9:3:2',   note : 'C3',    dur : '8n'},    
                                // BAR 11
                                { time : '10:0:0',   note : 'B2',    dur : '8n'},   
                                { time : '10:0:2',   note : 'D3',    dur : '0:1:1.75'},  
                                { time : '10:3:2',   note : 'D3',    dur : '8n'},  
                                // BAR 12
                                { time : '11:0:0',   note : 'D3',    dur : '8n'},   
                                { time : '11:0:2',   note : 'D3',    dur : '8n'},   
                                { time : '11:2:2',   note : 'D3',    dur : '8n'},   
                                { time : '11:3:0',   note : 'D3',    dur : '8n'},   
                                { time : '11:3:2',   note : 'D3',    dur : '8n'},  
                            ]
                        },  
                        chorus2_lead: {       // 12 bar Chorus riff 
                            length:             '12:0:0',  
                            bpm:                140,     
                            timeSignature:      [4, 4],                                                                    
                            performer:          'Piano',  
                            loop:               true,             
                            notes: [ //  Starts at bar 51 to 62
                                // BAR 1 
                                { time : '0:1:0',   note : ['A2', 'C3'],    dur : '8n'},
                                { time : '0:1:2',   note : 'F3',    dur : '8n'},
                                { time : '0:2:0',   note : 'F3',    dur : '8n'},
                                { time : '0:2:2',   note : 'F3',    dur : '8n'},
                                { time : '0:3:0',   note : ['A2', 'C3', 'F3'],    dur : '0:0:3.75'},
                                // BAR 2
                                { time : '1:0:0',   note : ['A2', 'C3', 'F3'],    dur : '0:0:3.75'},
                                { time : '1:1:0',   note : ['A2', 'C3', 'G3'],    dur : '8n'},
                                { time : '1:1:2',   note : 'F3',    dur : '0:0:3.75'},
                                { time : '1:2:2',   note : ['A2', 'C3', 'G3'],    dur : '4n'},
                                { time : '1:3:2',   note : 'F3',    dur : '0:1:1.75'},
                                // BAR 3                    
                                { time : '2:1:0',   note : ['A2', 'C3'],    dur : '8n'},                      
                                { time : '2:1:2',   note : 'F3',    dur : '8n'},
                                { time : '2:2:0',   note : 'F3',    dur : '8n'},
                                { time : '2:2:2',   note : 'F3',    dur : '8n'},
                                { time : '2:3:0',   note : ['A2', 'C3', 'F3'],    dur : '0:0:3.75'},
                                // BAR 4
                                { time : '3:0:0',   note : ['A2', 'C3', 'F3'],    dur : '0:0:3.75'},
                                { time : '3:1:0',   note : ['A2', 'C3', 'G3'],    dur : '8n'},
                                { time : '3:1:2',   note : 'F3',    dur : '0:0:3.75'},
                                { time : '3:2:2',   note : ['A2', 'C3', 'G3'],    dur : '4n'},
                                { time : '3:3:2',   note : 'F3',    dur : '8n'},
                                // BAR 5
                                { time : '4:0:0',   note : 'F3',    dur : '8n'},
                                { time : '4:0:2',   note : 'F3',    dur : '8n'},
                                { time : '4:1:0',   note : ['G2', 'C3', 'E3'],    dur : '4n'},
                                { time : '4:2:0',   note : 'E3',    dur : '8n'},
                                { time : '4:2:2',   note : 'E3',    dur : '8n'},
                                { time : '4:3:0',   note : ['G2', 'C3', 'E3'],    dur : '0:0:3.75'},
                                // BAR 6
                                { time : '5:0:0',   note : ['G2', 'C3', 'E3'],    dur : '0:0:3.75'},
                                { time : '5:1:0',   note : ['G2', 'C3', 'E3'],    dur : '8n'},
                                { time : '5:1:2',   note : 'G3',    dur : '0:0:3.75'},
                                { time : '5:2:2',   note : ['G2', 'C3', 'E3'],    dur : '4n'},
                                { time : '5:3:2',   note : 'E3',    dur : '0:1:1.75'},
                                // BAR 7
                                { time : '6:1:0',   note : ['G2', 'C3'],    dur : '8n'},                      
                                { time : '6:1:2',   note : 'E3',    dur : '8n'},                         
                                { time : '6:2:0',   note : 'E3',    dur : '8n'},                         
                                { time : '6:2:2',   note : 'E3',    dur : '8n'},                         
                                { time : '6:3:0',   note : ['G2', 'C3', 'E3'],    dur : '8n'},                                              
                                { time : '6:3:2',   note : 'E3',    dur : '0:1:1.75'},          
                                // BAR 8
                                { time : '7:1:0',   note : 'G2',    dur : '8n'},                         
                                { time : '7:1:0',   note : 'C3',    dur : '8n'},     
                                { time : '7:1:2',   note : 'E3',    dur : '8n'},    
                                { time : '7:2:0',   note : 'E3',    dur : '8n'},  
                                // { time : '7:2:2',   note : 'E3',    dur : '8n'},  
                                { time : '7:2:2',   note : 'F3',    dur : '8n'},  
                                { time : '7:3:0',   note : ['G2', 'C3', 'E3'],    dur : '0:0:3.75'},  
                                // BAR 9
                                { time : '8:0:0',   note : 'C3',    dur : '8n'},    
                                { time : '8:0:2',   note : 'D3',    dur : '0:1:1.75'},  
                                { time : '8:3:2',   note : 'B2',    dur : '8n'},    
                                // BAR 10
                                { time : '9:0:0',   note : 'C3',    dur : '8n'},    
                                { time : '9:0:2',   note : 'D3',    dur : '0:1:1.75'},  
                                // { time : '9:3:2',   note : 'C3',    dur : '8n'},    
                                { time : '9:3:2',   note : 'C3',    dur : '8n'},    
                                // BAR 11
                                { time : '10:0:0',   note : 'B2',    dur : '8n'},     
                                { time : '10:0:2',   note : 'D3',    dur : '0:1:1.75'},  
                                { time : '10:3:0',   note : 'D3',    dur : '8n'},  
                                // BAR 12
                                { time : '11:0:0',   note : 'D3',    dur : '8n'},   
                                { time : '11:0:2',   note : 'D3',    dur : '8n'},     
                                { time : '11:1:0',   note : 'D3',    dur : '0:0:3.75'},  
                                { time : '11:2:2',   note : 'D3',    dur : '8n'}, 
                                { time : '11:3:0',   note : 'E3',    dur : '0:0:3.75'},  
                            ]
                        },  
                        chorus_melody: {       // 12 bar Piano riff 
                            length:             '12:0:0',  
                            bpm:                140,     
                            timeSignature:      [4, 4],                                                                    
                            performer:          'Piano',  
                            loop:               true,             
                            notes: [ //  Starts at bar 21 to 33
                                // BAR 1 
                                { time : '0:2:0',   note : 'F3',    dur : '8n'},
                                { time : '0:2:2',   note : 'F3',    dur : '8n'},
                                { time : '0:3:0',   note : 'F3',    dur : '8n'},
                                { time : '0:3:2',   note : 'F3',    dur : '8n'},
                                // BAR 2
                                { time : '1:0:0',   note : 'F3',    dur : '8n'},
                                { time : '1:0:2',   note : 'F3',    dur : '8n'},
                                { time : '1:1:0',   note : 'G3',    dur : '8n'},
                                { time : '1:1:2',   note : 'F3',    dur : '0:0:3.75'},
                                { time : '1:2:2',   note : 'G3',    dur : '0:0:3.75'},
                                { time : '1:3:2',   note : 'F3',    dur : '0:0:3.75'},
                                // BAR 3                    
                                { time : '2:2:0',   note : 'F3',    dur : '8n'},
                                { time : '2:2:2',   note : 'F3',    dur : '8n'},
                                { time : '2:3:0',   note : 'F3',    dur : '8n'},
                                { time : '2:3:2',   note : 'F3',    dur : '8n'},
                                // BAR 4
                                { time : '3:0:0',   note : 'F3',    dur : '8n'},
                                { time : '3:0:2',   note : 'F3',    dur : '8n'},
                                { time : '3:1:0',   note : 'G3',    dur : '8n'},
                                { time : '3:1:2',   note : 'F3',    dur : '0:0:3.75'},
                                { time : '3:2:2',   note : 'G3',    dur : '0:0:3.75'},
                                { time : '3:3:2',   note : 'F3',    dur : '0:0:3.75'},
                                // BAR 5
                                { time : '4:0:2',   note : 'E3',    dur : '8n'},
                                { time : '4:2:0',   note : 'E3',    dur : '8n'},
                                { time : '4:2:2',   note : 'E3',    dur : '8n'},
                                { time : '4:3:0',   note : 'E3',    dur : '8n'},
                                { time : '4:3:2',   note : 'E3',    dur : '8n'},
                                // BAR 6
                                { time : '5:0:0',   note : 'E3',    dur : '8n'},
                                { time : '5:0:2',   note : 'E3',    dur : '8n'},
                                { time : '5:1:0',   note : 'F3',    dur : '8n'},
                                { time : '5:1:2',   note : 'E3',    dur : '0:0:3.75'},
                                { time : '5:2:2',   note : 'F3',    dur : '0:0:3.75'},
                                { time : '5:3:2',   note : 'E3',    dur : '8n'},
                                // BAR 7                                          
                                { time : '6:2:0',   note : 'E3',    dur : '8n'},                         
                                { time : '6:2:2',   note : 'E3',    dur : '8n'},                                              
                                { time : '6:3:0',   note : 'E3',    dur : '8n'},                               
                                { time : '6:3:2',   note : 'E3',    dur : '8n'},                               
                                // BAR 8
                                { time : '7:0:0',   note : 'E3',    dur : '8n'},                         
                                { time : '7:0:2',   note : 'E3',    dur : '8n'},   
                                { time : '7:1:0',   note : 'F3',    dur : '8n'},   
                                { time : '7:1:2',   note : 'E3',    dur : '0:0:3.75'},  
                                { time : '7:2:2',   note : 'F3',    dur : '0:0:3.75'},  
                                { time : '7:3:2',   note : 'E3',    dur : '0:0:3.75'},   
                                // BAR 9 
                                { time : '8:0:2',   note : 'D3',    dur : '8n'},     
                                // BAR 10  
                                // BAR 11
                                { time : '10:3:0',   note : 'D3',    dur : '8n'},
                                { time : '10:3:2',   note : 'D3',    dur : '8n'},  
                                // BAR 12
                                { time : '11:0:0',   note : 'D3',    dur : '0:0:3.75'},   
                                { time : '11:1:0',   note : 'E3',    dur : '0:1:1.75'},  
                                { time : '11:2:2',   note : 'E3',    dur : '0:0:3.75'},      
                                { time : '11:3:2',   note : 'D3',    dur : '8n'},  
                            ]
                        },  
                        chorus_chords: {       // 12 bar Piano chords 
                            length:             '12:0:0',  
                            bpm:                140,     
                            timeSignature:      [4, 4],                                                                    
                            performer:          'Piano',  
                            loop:               true,             
                            notes: [ //  Starts at bar 21 to 33
                                // BAR 1 
                                { time : '0:2:0',   note : 'F3',    dur : '8n'},
                                { time : '0:2:2',   note : 'F3',    dur : '8n'},
                                { time : '0:3:0',   note : 'F3',    dur : '8n'},
                                { time : '0:3:2',   note : 'F3',    dur : '8n'},
                                // BAR 2
                                { time : '1:0:0',   note : 'F3',    dur : '8n'},
                                { time : '1:0:2',   note : 'F3',    dur : '8n'},
                                { time : '1:1:0',   note : 'G3',    dur : '8n'},
                                { time : '1:1:2',   note : 'F3',    dur : '0:0:3.75'},
                                { time : '1:2:2',   note : 'G3',    dur : '0:0:3.75'},
                                { time : '1:3:2',   note : 'F3',    dur : '0:0:3.75'},
                                // BAR 3                    
                                { time : '2:2:0',   note : 'F3',    dur : '8n'},
                                { time : '2:2:2',   note : 'F3',    dur : '8n'},
                                { time : '2:3:0',   note : 'F3',    dur : '8n'},
                                { time : '2:3:2',   note : 'F3',    dur : '8n'},
                                // BAR 4
                                { time : '3:0:0',   note : 'F3',    dur : '8n'},
                                { time : '3:0:2',   note : 'F3',    dur : '8n'},
                                { time : '3:1:0',   note : 'G3',    dur : '8n'},
                                { time : '3:1:2',   note : 'F3',    dur : '0:0:3.75'},
                                { time : '3:2:2',   note : 'G3',    dur : '0:0:3.75'},
                                { time : '3:3:2',   note : 'F3',    dur : '0:0:3.75'},
                                // BAR 5
                                { time : '4:0:2',   note : 'E3',    dur : '8n'},
                                { time : '4:2:0',   note : 'E3',    dur : '8n'},
                                { time : '4:2:2',   note : 'E3',    dur : '8n'},
                                { time : '4:3:0',   note : 'E3',    dur : '8n'},
                                { time : '4:3:2',   note : 'E3',    dur : '8n'},
                                // BAR 6
                                { time : '5:0:0',   note : 'E3',    dur : '8n'},
                                { time : '5:0:2',   note : 'E3',    dur : '8n'},
                                { time : '5:1:0',   note : 'F3',    dur : '8n'},
                                { time : '5:1:2',   note : 'E3',    dur : '0:0:3.75'},
                                { time : '5:2:2',   note : 'F3',    dur : '0:0:3.75'},
                                { time : '5:3:2',   note : 'E3',    dur : '8n'},
                                // BAR 7                                          
                                { time : '6:2:0',   note : 'E3',    dur : '8n'},                         
                                { time : '6:2:2',   note : 'E3',    dur : '8n'},                                              
                                { time : '6:3:0',   note : 'E3',    dur : '8n'},                               
                                { time : '6:3:2',   note : 'E3',    dur : '8n'},                               
                                // BAR 8
                                { time : '7:0:0',   note : 'E3',    dur : '8n'},                         
                                { time : '7:0:2',   note : 'E3',    dur : '8n'},   
                                { time : '7:1:0',   note : 'F3',    dur : '8n'},   
                                { time : '7:1:2',   note : 'E3',    dur : '0:0:3.75'},  
                                { time : '7:2:2',   note : 'F3',    dur : '0:0:3.75'},  
                                { time : '7:3:2',   note : 'E3',    dur : '0:0:3.75'},   
                                // BAR 9 
                                { time : '8:0:2',   note : 'D3',    dur : '8n'},     
                                // BAR 10  
                                // BAR 11
                                { time : '10:3:0',   note : 'D3',    dur : '8n'},
                                { time : '10:3:2',   note : 'D3',    dur : '8n'},  
                                // BAR 12
                                { time : '11:0:0',   note : 'D3',    dur : '0:0:3.75'},   
                                { time : '11:1:0',   note : 'E3',    dur : '0:1:1.75'},  
                                { time : '11:2:2',   note : 'E3',    dur : '0:0:3.75'},      
                                { time : '11:3:2',   note : 'D3',    dur : '8n'},  
                            ]
                        },  
                    // RETURN:  | Return 1: Bar 33 to 34 |  Return 2: Bar 63 to 64
                        return_bassline: {   // Return section to verse
                            length:             '2:0:0', 
                            bpm:                140,                                        
                            timeSignature:      [4, 4],    
                            loop:               true,                                  
                            notes: [
                                // Bar 1
                                { time : '0:0:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '0:1:0',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '0:1:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '0:2:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '0:3:0',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '0:3:2',   note : ['C1', 'C2'],    dur : '8n'},
                                // Bar 2
                                { time : '1:0:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '1:1:0',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '1:1:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '1:2:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '1:3:0',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '1:3:2',   note : ['C1', 'C2'],    dur : '8n'},
                            ]
                        },
                        return1_rhythm: {     // Return section rhythm
                            length:             '2:0:0', 
                            bpm:                140,                                        
                            timeSignature:      [4, 4],    
                            loop:               true,                                  
                            notes: [
                                // BAR 1
                                { time : '0:0:0',   note : ['D3', 'F3', 'B3'],    dur : '8n'},
                                { time : '0:0:2',   note : ['D3', 'F3', 'B3'],    dur : '8n'},
                                { time : '0:2:0',   note : ['C3', 'G3', 'C4'],    dur : '8n'},
                                { time : '0:2:2',   note : ['C3', 'G3', 'C4'],    dur : '8n'},
                                // BAR 2
                                { time : '1:0:0',   note : ['C3', 'G3', 'C4'],    dur : '0:0:3.75'},
                                { time : '1:1:0',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '1:1:2',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '1:2:0',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '1:2:2',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '1:3:0',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '1:3:2',   note : ['C3', 'G3', 'C4'],    dur : '16n'}, 
                            ]
                        },
                        return2_rhythm: {     // Return section rhythm
                            length:             '2:0:0', 
                            bpm:                140,                                        
                            timeSignature:      [4, 4],    
                            loop:               true,                                  
                            notes: [ 
                                // BAR 1
                                { time : '0:0:0',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '0:0:2',   note : ['D3', 'F3', 'B3'],    dur : '16n'},
                                { time : '0:1:0',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '0:1:2',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '0:2:0',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '0:2:2',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '0:3:0',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '0:3:2',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                // BAR 2
                                { time : '1:0:0',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '1:0:2',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '1:1:0',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '1:1:2',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '1:2:0',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '1:2:2',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '1:3:0',   note : ['C3', 'G3', 'C4'],    dur : '16n'},
                                { time : '1:3:2',   note : ['C3', 'G3', 'C4'],    dur : '16n'},  
                            ]
                        },
                        return1_lead: {      // Return section lead 
                            length:             '2:0:0', 
                            bpm:                140,                                        
                            timeSignature:      [4, 4],    
                            loop:               true,                                  
                            notes: [ // Starts after intro and repeats throughout verse
                                // BAR 1  
                                { time : '0:0:0',   note : 'D3',    dur : '8n'},   
                                { time : '0:0:2',   note : 'D3',    dur : '8n'},  
                                { time : '0:1:0',   note : ['G2', 'C2', 'E3'],    dur : '0:1:1.75'},                       
                                // BAR 2      
                            ]
                        },
                        return2_lead: {      // Return section lead 
                            length:             '2:0:0', 
                            bpm:                140,                                        
                            timeSignature:      [4, 4],    
                            loop:               true,                                  
                            notes: [ //
                                // BAR 1  
                                { time : '0:0:0',   note : 'F3',    dur : '0:0:1.75'},       
                                { time : '0:1:0',   note : 'E3',    dur : '0:0:1.75'},      
                                // BAR 2      
                                { time : '1:3:0',   note : 'D4',    dur : '8n'},
                                { time : '1:3:2',   note : 'E4',    dur : '0:0:1.75'},   
                            ]
                        },
                        return1_melody: {      // Return section melody 
                            length:             '2:0:0', 
                            bpm:                140,                                        
                            timeSignature:      [4, 4],    
                            loop:               true,                                  
                            notes: [ // Starts after intro and repeats throughout verse
                            // BAR 1  
                                { time : '0:0:0',   note : 'C3',    dur : '8n'},   
                                { time : '0:0:2',   note : 'D3',    dur : '8n'},  
                                { time : '0:1:0',   note : 'C3',    dur : '0:1:1.75'},                        
                                // BAR 2      
                            ]
                        },
                        return2_chords: {     // Return section rhythm
                            length:             '2:0:0', 
                            bpm:                140,                                        
                            timeSignature:      [4, 4],    
                            loop:               true,                                  
                            notes: [ // Starts after intro and repeats throughout verse
                                // BAR 1
                                { time : '0:0:0',   note : ['C3', 'E3', 'C4'],    dur : '0:3:3'},
                                // BAR 2
                            ]
                        },
                    // INTERLUDE :  | Bar 65 to 80
                        interlude_bassline: {   // Return section to verse  >> verseX_bassline_main
                            length:             '8:0:0', 
                            bpm:                140,                                        
                            timeSignature:      [4, 4],    
                            loop:               true,                                  
                            notes: [
                                // Bar 1
                                { time : '0:0:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '0:1:0',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '0:1:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '0:2:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '0:3:0',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '0:3:2',   note : ['C1', 'C2'],    dur : '8n'},
                                // Bar 2
                                { time : '1:0:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '1:1:0',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '1:1:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '1:2:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '1:3:0',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '1:3:2',   note : ['C1', 'C2'],    dur : '8n'},
                                // Bar 3
                                { time : '2:0:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '2:1:0',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '2:1:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '2:2:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '2:3:0',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '2:3:2',   note : ['C1', 'C2'],    dur : '8n'},
                                // Bar 4
                                { time : '3:0:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '3:1:0',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '3:1:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '3:2:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '3:3:0',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '3:3:2',   note : ['C1', 'C2'],    dur : '8n'},
                                // Bar 5
                                { time : '4:0:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '4:1:0',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '4:1:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '4:2:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '4:3:0',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '4:3:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                // Bar 6
                                { time : '5:0:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '5:1:0',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '5:1:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '5:2:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '5:3:0',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '5:3:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                // Bar 7
                                { time : '6:0:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '6:1:0',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '6:1:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '6:2:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '6:3:0',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '6:3:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                // Bar 8
                                { time : '7:0:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '7:1:0',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '7:1:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '7:2:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '7:3:0',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '7:3:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                            ]
                        },
                        interlude_rhythm: {   // Interlude
                            length:             '8:0:0', 
                            bpm:                140,                                        
                            timeSignature:      [4, 4],    
                            loop:               true,                                  
                            notes: [
                                // Bar 1
                                { time : '0:0:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '0:1:0',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '0:1:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '0:2:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '0:3:0',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '0:3:2',   note : ['C1', 'C2'],    dur : '8n'},
                                // Bar 2
                                { time : '1:0:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '1:1:0',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '1:1:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '1:2:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '1:3:0',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '1:3:2',   note : ['C1', 'C2'],    dur : '8n'},
                                // Bar 3
                                { time : '2:0:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '2:1:0',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '2:1:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '2:2:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '2:3:0',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '2:3:2',   note : ['C1', 'C2'],    dur : '8n'},
                                // Bar 4
                                { time : '3:0:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '3:1:0',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '3:1:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '3:2:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '3:3:0',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '3:3:2',   note : ['C1', 'C2'],    dur : '8n'},
                                // Bar 5
                                { time : '4:0:2',   note : ['C1', 'C2'],    dur : '8n'},
                                { time : '4:1:0',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '4:1:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '4:2:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '4:3:0',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '4:3:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                // Bar 6
                                { time : '5:0:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '5:1:0',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '5:1:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '5:2:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '5:3:0',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '5:3:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                // Bar 7
                                { time : '6:0:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '6:1:0',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '6:1:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '6:2:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '6:3:0',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '6:3:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                // Bar 8
                                { time : '7:0:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '7:1:0',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '7:1:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '7:2:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '7:3:0',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                                { time : '7:3:2',   note : ['G0', 'G1', 'G2'],    dur : '8n'},
                            ]
                        },
                        interlude_lead_I: {   // Bar 66 to 73: Rent a...
                            length:             '8:0:0', 
                            bpm:                140,                                        
                            timeSignature:      [4, 4],    
                            loop:               true,                                  
                            notes: [
                                // Bar 1
                                { time : '0:0:2',   note : ['G3', 'C4', 'E4'],    dur : '4n.'}, 
                                { time : '0:2:0',   note : 'E4',    dur : '8n'}, 
                                { time : '0:2:2',   note : 'D4',    dur : '4n'}, 
                                { time : '0:3:2',   note : 'D4',    dur : '0:0:1.75'},  
                                // Bar 2
                                { time : '1:0:2',   note : 'E4',    dur : '0:2:1'},  
                                { time : '1:3:0',   note : 'D4',    dur : '8n'},  
                                { time : '1:3:2',   note : 'E4',    dur : '0:0:1.75'}, 
                                // Bar 3
                                { time : '2:0:2',   note : ['G3', 'C4', 'E4'],    dur : '4n.'}, 
                                { time : '2:2:0',   note : 'E4',    dur : '8n'}, 
                                { time : '2:2:2',   note : 'D4',    dur : '4n'}, 
                                { time : '2:3:2',   note : 'D4',    dur : '0:0:1.75'}, 
                                // Bar 4
                                { time : '3:0:2',   note : 'E4',    dur : '0:2:1'},  
                                { time : '3:3:0',   note : 'D4',    dur : '8n'},  
                                { time : '3:3:2',   note : 'E4',    dur : '0:0:1.75'}, 
                                // Bar 5
                                { time : '4:0:2',   note : ['G3', 'B3', 'G4'],    dur : '4n'}, 
                                { time : '4:1:2',   note : 'F4',    dur : '0:0:1.75'}, 
                                { time : '4:2:2',   note : 'F4',    dur : '4n'}, 
                                { time : '4:3:2',   note : 'E4',    dur : '0:0:1.75'}, 
                                // Bar 6
                                { time : '5:0:2',   note : 'B3',    dur : '8n'}, 
                                { time : '5:1:0',   note : 'G3',    dur : '4n.'}, 
                                { time : '5:2:2',   note : 'B3',    dur : '8n'}, 
                                { time : '5:3:0',   note : 'C4',    dur : '8n'}, 
                                { time : '5:3:2',   note : 'D4',    dur : '0:0:1.75'}, 
                                // Bar 7
                                { time : '6:0:2',   note : ['G3', 'B3', 'G4'],    dur : '4n'}, 
                                { time : '6:1:2',   note : 'F4',    dur : '0:0:1.75'}, 
                                { time : '6:2:2',   note : 'F4',    dur : '0:0:2.25'}, 
                                // Bar 8
                                { time : '7:0:0',   note : 'E4',    dur : '8n'}, 
                                { time : '7:0:2',   note : 'B3',    dur : '8n'}, 
                                { time : '7:1:0',   note : 'G3',    dur : '4n.'}, 
                                { time : '7:2:2',   note : 'E4',    dur : '8n'}, 
                                { time : '7:3:0',   note : 'F4',    dur : '8n'}, 
                                { time : '7:3:2',   note : 'G4',    dur : '0:0:1.75'}, 
                            ]


                        },
                        interlude_lead_II: {   //Bar 74 to 80
                            length:             '8:0:0', 
                            bpm:                140,                                        
                            timeSignature:      [4, 4],    
                            loop:               true,                                  
                            notes: [
                                // Bar 1
                                { time : '0:0:2',   note : ['G3', 'C4', 'E4'],    dur : '4n.'}, 
                                { time : '0:2:0',   note : 'E4',    dur : '8n'},
                                { time : '0:2:2',   note : 'E4',    dur : '0:0:2.25'}, 
                                // Bar 2
                                { time : '1:0:0',   note : 'D4',    dur : '8n'}, 
                                { time : '1:0:2',   note : 'E4',    dur : '0:0:2.25'}, 
                                { time : '1:2:2',   note : 'E4',    dur : '8n'}, 
                                { time : '1:3:0',   note : 'D4',    dur : '8n'}, 
                                { time : '1:3:2',   note : 'E4',    dur : '0:0:1.75'}, 
                                // Bar 3
                                { time : '2:0:2',   note : ['G3', 'C4', 'F4'],    dur : '4n'}, 
                                { time : '2:1:2',   note : 'E4',    dur : '8n'}, 
                                { time : '2:2:0',   note : 'E4',    dur : '8n'}, 
                                { time : '2:2:2',   note : 'E4',    dur : '4n'}, 
                                { time : '2:3:2',   note : 'D4',    dur : '0:0:1.75'},
                                // Bar 4
                                { time : '3:0:2',   note : 'E4',   dur : '0:0:2.25'}, 
                                { time : '3:3:0',   note : 'D4',   dur : '8n'}, 
                                { time : '3:3:2',   note : 'E4',   dur : '0:0:1.75'},
                                // Bar 5
                                { time : '4:0:2',   note : ['G3', 'B3', 'G4'],    dur : '4n'}, 
                                { time : '4:1:2',   note : 'F4',    dur : '0:0:1.75'},
                                { time : '4:2:2',   note : 'F4',    dur : '0:1:0.25'},
                                // // Bar 6
                                { time : '5:0:0',   note : 'E4',    dur : '8n'}, 
                                { time : '5:0:2',   note : 'B3',    dur : '8n'}, 
                                { time : '5:1:0',   note : 'G3',    dur : '0:1:3'},
                                { time : '5:3:0',   note : 'D4',    dur : '8n'},
                                { time : '5:3:2',   note : 'E4',    dur : '0:0:1.75'},
                                // // Bar 7
                                { time : '6:0:2',   note : ['G3', 'B3', 'G4'],    dur : '4n'}, 
                                { time : '6:0:2',   note : 'B3',    dur : '4n'}, 
                                { time : '6:1:2',   note : 'F4',    dur : '0:0:1.75'},
                                { time : '6:2:2',   note : 'F4',    dur : '4n'},
                                { time : '6:3:2',   note : 'E4',    dur : '8n'},
                                // // Bar 8
                                { time : '7:0:0',   note : 'C4',    dur : '8n'}, 
                                { time : '7:0:2',   note : 'B3',    dur : '8n'}, 
                                { time : '7:1:0',   note : 'G3',    dur : '8n'}, 
                                { time : '7:1:2',   note : 'B3',    dur : '0:0:1.75'}, 
                                { time : '7:2:2',   note : 'C4',    dur : '4n'}, 
                                { time : '7:3:2',   note : 'D4',    dur : '0:1:0.25'}, 
                            ]
                        }
                }
            },
        }, 
        naiveMelody: {
            // Phrase combinations and ordering
            tempo:  114,
            arrangement: {
                phrases: {
                    intro:  {              // 1 bar intro slide 
                        autocue:           true,   
                        play: {
                            rhythmGuitar_1a:      {
                                name:      'intro' 
                            },     
                        }
                    }, 
                    solo_riff:  {         // 2 bar of repeated rhythm (lead and bass)
                        play: {
                            bass_1a: {       // 2 bar bassline riff
                                name:       'riff_bassline',
                            },
                            rhythmGuitar_1a:{   // 2 bar riff 
                                name:       'riff_lead',
                            }     
                        }
                    },      
                    verse_riff_I:  {               // 1 bar of repeated rhythm (lead and bass) | MIDI plays from start to 0:5:0
                        play: {
                            bass_1a: {       // 2 bar bassline riff
                                name:       'riff_bassline',
                            },
                            rhythmGuitar_1a:{   // 2 bar riff 
                                name:       'riff_lead',
                            },     
                            mainGuitar_1:{       //
                                name:       'verse_melody_I',
                            }     
                        }
                    },      
                    verse_riff_II:  {               // 1 bar of repeated rhythm (lead and bass) | MIDI plays from start to 0:5:0
                        play: {
                            bass_1a: {       // 2 bar bassline riff
                                name:       'riff_bassline',
                            },
                            rhythmGuitar_1a:{   // 2 bar riff 
                                name:       'riff_lead',
                            },     
                            mainGuitar_1:{       //
                                name:       'verse_melody_II',
                            }     
                        }
                    },   
                    verse_riff_III:  {               // 1 bar of repeated rhythm (lead and bass) | MIDI plays from start to 0:5:0
                        play: {
                            bass_1a: {       // 2 bar bassline riff
                                name:       'riff_bassline',
                            },
                            rhythmGuitar_1a:{   // 2 bar riff 
                                name:       'riff_lead',
                            },     
                            mainGuitar_1:{       //
                                name:       'verse_melody_III',
                            }     
                        }
                    },   
                },
                order: [
                    'intro',
                    'solo_riff',
                    'verse_riff_I',
                    'verse_riff_II',
                    'verse_riff_III',
                ],
            },
            // Song phrases
            song: {
                parts_pm:           {},
                patterns_pm: {
                    // START
                        intro: {     // One bar intro
                            length:             '1:0:0', 
                            bpm:                114,                                        
                            timeSignature:      [4, 4],    
                            loop:               false,                                                               
                            notes: [
                                // BAR 1 
 
                            ]
                        },
                    // MAIN RIFF
                        riff_lead: {     // Main guitar riff
                            length:             '2:0:0', 
                            bpm:                114,                                        
                            timeSignature:      [4, 4],    
                            loop:               true,                                                               
                            notes: [
                                // BAR 1 
                                { time : '0:0:0',   note : 'G5',    dur : '8n'},
                                { time : '0:0:2',   note : 'G5',    dur : '8n'},
                                { time : '0:1:2',   note : 'G5',    dur : '8n'},
                                { time : '0:2:0',   note : 'A5',    dur : '8n'},
                                { time : '0:2:2',   note : 'A5',    dur : '8n'},
                                { time : '0:3:2',   note : 'A5',    dur : '8n'},   
                                // BAR 2
                                { time : '1:0:0',   note : 'B5',    dur : '8n'},
                                { time : '1:0:2',   note : 'B5',    dur : '8n'},
                                { time : '1:1:2',   note : 'B5',    dur : '8n'},
                                { time : '1:2:0',   note : 'A5',    dur : '8n'},
                                { time : '1:2:2',   note : 'A5',    dur : '8n'},
                                { time : '1:3:2',   note : 'B5',    dur : '8n'},   
                            ]
                        },
                        riff_bassline: {     // Main bass riff
                            length:             '2:0:0', 
                            bpm:                114,                                        
                            timeSignature:      [4, 4],    
                            loop:               true,                                                               
                            notes: [
                                // BAR 1 
                                { time : '0:0:0',   note : 'D2',    dur : '8n'},
                                { time : '0:0:2',   note : 'D2',    dur : '8n'},
                                { time : '0:1:0',   note : 'D3',    dur : '8n'},
                                { time : '0:1:2',   note : 'D2',    dur : '8n'},
                                { time : '0:2:0',   note : 'E2',    dur : '8n'},
                                { time : '0:2:2',   note : 'E2',    dur : '8n'},
                                { time : '0:3:0',   note : 'G2',    dur : '8n'},   
                                { time : '0:3:2',   note : 'A2',    dur : '8n'},   
                                // BAR 2
                                { time : '1:0:0',   note : 'C2',    dur : '8n'},
                                { time : '1:0:2',   note : 'C2',    dur : '8n'},
                                { time : '1:1:0',   note : 'C3',    dur : '8n'},
                                { time : '1:1:2',   note : 'C2',    dur : '8n'},
                                { time : '1:2:0',   note : 'E2',    dur : '8n'},
                                { time : '1:2:2',   note : 'E2',    dur : '8n'},
                                { time : '1:3:0',   note : 'G2',    dur : '8n'},
                                { time : '1:3:2',   note : 'A2',    dur : '8n'},   
                            ]
                        },
                    // VERSE RIFFS
                        verse_melody_I: {    
                            length:             '2:0:0', 
                            bpm:                114,                                        
                            timeSignature:      [4, 4],    
                            loop:               true,                                                               
                            notes: [
                                // BAR 1 
                                { time : '0:0:2',   note : 'D4',    dur : '8n'},
                                { time : '0:1:0',   note : 'D4',    dur : '8n'},
                                { time : '0:1:2',   note : 'D4',    dur : '8n'},
                                { time : '0:2:0',   note : 'D4',    dur : '8n'},
                                { time : '0:2:2',   note : 'D4',    dur : '16n'},
                                { time : '0:2:3',   note : 'E4',    dur : '16n'},   
                                { time : '0:3:0',   note : 'D4',    dur : '16n'},   
                                { time : '0:3:1',   note : 'E4',    dur : '16n'},   
                                { time : '0:3:2',   note : 'D4',    dur : '16n'},   
                                { time : '0:3:3',   note : 'E4',    dur : '16n'},   
                                // BAR 2
                                { time : '1:0:0',   note : 'D4',    dur : '8n'},
                                { time : '1:1:0',   note : 'C4',    dur : '16n'},
                                { time : '1:1:2',   note : 'C4',    dur : '8n'},
                                // { time : '1:2:2',   note : 'B3',    dur : '8n'},
                                // { time : '1:3:0',   note : 'C4',    dur : '8n'},   
                                // BAR 3 
                                { time : '2:0:2',   note : 'D4',    dur : '8n'},
                                { time : '2:1:0',   note : 'D4',    dur : '8n'},
                                { time : '2:1:2',   note : 'D4',    dur : '8n'},
                                { time : '2:2:0',   note : 'D4',    dur : '8n'},
                                { time : '2:2:2',   note : 'D4',    dur : '16n'},
                                { time : '2:2:3',   note : 'E4',    dur : '16n'},   
                                { time : '2:3:0',   note : 'D4',    dur : '16n'},   
                                { time : '2:3:1',   note : 'E4',    dur : '16n'},   
                                { time : '2:3:2',   note : 'D4',    dur : '16n'},   
                                { time : '2:3:3',   note : 'E4',    dur : '16n'},   
                                // BAR 4
                                { time : '3:0:0',   note : 'D4',    dur : '8n'},
                                { time : '3:1:0',   note : 'C4',    dur : '16n'},
                                { time : '3:1:2',   note : 'C4',    dur : '8n'},
                                // { time : '3:2:2',   note : 'B3',    dur : '8n'},
                                // { time : '3:3:0',   note : 'C4',    dur : '8n'},  
                            ]
                        },
                        verse_melody_II: {    
                            length:             '2:0:0', 
                            bpm:                114,                                        
                            timeSignature:      [4, 4],    
                            loop:               true,                                                               
                            notes: [
                                // BAR 1 
                                { time : '0:0:2',   note : 'C4',    dur : '8n'},
                                { time : '0:1:0',   note : 'C4',    dur : '8n'},
                                { time : '0:1:2',   note : 'C4',    dur : '8n'},
                                { time : '0:2:0',   note : 'C4',    dur : '8n'},
                                { time : '0:2:2',   note : 'B3',    dur : '8n'},
                                { time : '0:3:0',   note : 'B3',    dur : '8n'},
                                { time : '0:3:2',   note : 'B3',    dur : '8n'},
                                // BAR 2
                                { time : '1:0:0',   note : 'B3',    dur : '8n'},
                                { time : '1:1:0',   note : 'G3',    dur : '16n'},
                                { time : '1:1:2',   note : 'G3',    dur : '8n'},
                                { time : '1:2:2',   note : 'B3',    dur : '8n'},
                                { time : '1:3:0',   note : 'A3',    dur : '8n'},   
                                // BAR 3 
                                { time : '2:0:2',   note : 'C4',    dur : '8n'},
                                { time : '2:1:0',   note : 'C4',    dur : '8n'},
                                { time : '2:1:2',   note : 'C4',    dur : '8n'},
                                { time : '2:2:0',   note : 'C4',    dur : '8n'},
                                { time : '2:2:2',   note : 'B3',    dur : '8n'},
                                { time : '2:3:0',   note : 'B3',    dur : '8n'},
                                { time : '2:3:2',   note : 'B3',    dur : '8n'},
                                // BAR 2
                                { time : '3:0:0',   note : 'B3',    dur : '8n'},
                                { time : '3:1:0',   note : 'G3',    dur : '16n'},
                                { time : '3:1:2',   note : 'G3',    dur : '8n'},
                                { time : '3:2:2',   note : 'B3',    dur : '8n'},
                                { time : '3:3:0',   note : 'A3',    dur : '8n'},   
                            ]
                        },
                        verse_melody_III: {    
                            length:             '4:0:0', 
                            bpm:                114,                                        
                            timeSignature:      [4, 4],    
                            loop:               true,                                                               
                            notes: [
                                // BAR 1 
                                { time : '0:0:2',   note : 'B3',    dur : '8n'},
                                { time : '0:1:0',   note : 'B3',    dur : '8n'},
                                { time : '0:1:2',   note : 'B3',    dur : '8n'},
                                { time : '0:2:0',   note : 'B3',    dur : '8n'},
                                { time : '0:2:2',   note : 'C4',    dur : '8n'},
                                // BAR 2
                                { time : '1:0:2',   note : 'C4',    dur : '8n'},
                                { time : '1:1:0',   note : 'C4',    dur : '8n'},
                                { time : '1:1:2',   note : 'C4',    dur : '8n'},
                                { time : '1:2:0',   note : 'C4',    dur : '8n'},
                                { time : '1:2:2',   note : 'B3',    dur : '8n'},   
                                { time : '1:3:0',   note : 'A3',    dur : '8n'},  
                                // BAR 3
                                { time : '2:0:2',   note : 'B3',    dur : '8n'},
                                { time : '2:1:0',   note : 'B3',    dur : '8n'},
                                { time : '2:1:2',   note : 'B3',    dur : '8n'},
                                { time : '2:2:0',   note : 'B3',    dur : '8n'},
                                { time : '2:2:2',   note : 'C4',    dur : '8n'},
                                // BAR 4
                                { time : '3:0:2',   note : 'C4',    dur : '8n'},
                                { time : '3:1:0',   note : 'B3',    dur : '8n'},
                                { time : '3:1:2',   note : 'G3',    dur : '8n'},
                                { time : '3:2:0',   note : 'G3',    dur : '4n.'}, 
                                { time : '3:3:0',   note : 'A3',    dur : '8n'},   
                            ]
                        },
                }
            },
        },
        floatOn: {
            // Phrase combinations and ordering
            tempo:  103,
            arrangement: {
                phrases: {
                    start:  {              // 1 bar intro slide 
                        autocue:           true,   
                        play: {
                            rhythmGuitar_1a:      {
                                name:      'start' 
                            },     
                        }
                    }, 
                    intro:  {         // 4 bar rhythm guitar part
                        play: {
                            rhythmGuitar_1a:{   // 4 bar chord progression
                                name:       'verse_rhythm',
                            }     
                        }
                    },      
                    verse1_riff:  {        // 8 bar rhythm with lead line
                        play: {
                            bass_1a: {       // 4 bar bassline riff
                                name:       'verse_bassline',
                            },
                            rhythmGuitar_1a:{   // 4 bar chord progression
                                name:       'verse_rhythm',
                            },
                            mainGuitar_1a:{   // 8 bar melody
                                name:       'verse_lead',
                            }  
                        }
                    },   
                    verse1_vocal:  {       // 8 bar of repeated rhythm (lead and bass)
                        play: {
                            bass_1a: {       // 4 bar bassline riff
                                name:       'verse_bassline',
                            },
                            rhythmGuitar_1a:{  // 4 bar chord progression
                                name:       'verse_rhythm',
                            },
                            mainGuitar_1a:{   // 8 bar vocal line
                                name:       'verse_vocal_I',
                            }  
                        }
                    },   
                    verse1_riffReturn:  {  // 8 bar rhythm with lead line | Same as verse riff II
                        play: {
                            bass_1a: {       // 4 bar bassline riff
                                name:       'verse_bassline',
                            },
                            rhythmGuitar_1a:{   // 4 bar chord progression
                                name:       'verse_rhythm',
                            },
                            mainGuitar_1a:{   // 8 bar melody
                                name:       'verse_lead',
                            }  
                        }
                    },    
                    prechorus1:  {         // 8 bar pre chorus section
                        play: {
                            bass_1a: {       /// 4 bar bassline riff
                                name:       'prechorus_bassline',
                            },
                            rhythmGuitar_1a:{   // 4 bar chord progression
                                name:       'prechorus_riff',
                            },
                            mainGuitar_1a:{   // 8 bar vocal line
                                name:       'prechorus_vocal_main',
                            },  
                            mainGuitar_1b:{   // 8 bar vocal line
                                name:       'prechorus_vocal_I',
                            }  
                        }
                    },    
                    verse2_riff:  {        // 8 bar rhythm with lead line
                        play: {
                            bass_1a: {       // 4 bar bassline riff
                                name:       'verse_bassline',
                            },
                            rhythmGuitar_1a:{   // 4 bar chord progression
                                name:       'verse_rhythm',
                            },
                            mainGuitar_1a:{   // 8 bar melody
                                name:       'verse_lead',
                            }  
                        }
                    },   
                    verse2_vocal:  {       // 8 bar of repeated rhythm (lead and bass)
                        play: {
                            bass_1a: {       // 4 bar bassline riff
                                name:       'verse_bassline',
                            },
                            rhythmGuitar_1a:{  // 4 bar chord progression
                                name:       'verse_rhythm',
                            },
                            mainGuitar_1a:{   // 8 bar vocal line
                                name:       'verse_vocal_I',
                            }  
                        }
                    },   
                    verse2_riffReturn: {  // 8 bar rhythm with lead line | Same as verse riff II
                        play: {
                            bass_1a: {       // 4 bar bassline riff
                                name:       'verse_bassline',
                            },
                            rhythmGuitar_1a:{   // 4 bar chord progression
                                name:       'verse_rhythm',
                            },
                            mainGuitar_1a:{   // 8 bar melody
                                name:       'verse_lead',
                            }  
                        }
                    },   
                    prechorus2:  {         // 8 bar pre chorus section
                        play: {
                            bass_1a: {       /// 4 bar bassline riff
                                name:       'prechorus_bassline',
                            },
                            rhythmGuitar_1a:{   // 4 bar chord progression
                                name:       'prechorus_riff',
                            },
                            mainGuitar_1a:{   // 8 bar vocal line
                                name:       'prechorus_vocal_main',
                            },  
                            mainGuitar_1b:{   // 8 bar vocal line
                                name:       'prechorus_vocal_II',
                            }  
                        }
                    },  
                    interlude:  {         // 8 bar pre chorus section 
                        play: {
                            bass_1a: {       /// 4 bar bassline riff
                                name:       'prechorus_bassline',
                            },
                            rhythmGuitar_1a:{   // 4 bar chord progression
                                name:       'prechorus_riff',
                            },
                             mainGuitar_1a:{   // 8 bar vocal line
                                name:       'interlude_vocal_main',
                            },  
                             mainGuitar_1b:{   // 8 bar vocal line ending
                                name:       'interlude_vocal_I',
                            },  
                        }
                    },  
                    verse3:  {         // 8 bar of repeated rhythm (lead and bass)
                        play: {
                            bass_1a: {       // 4 bar bassline riff
                                name:       'verse_bassline',
                            },
                            rhythmGuitar_1a:{  // 4 bar chord progression
                                name:       'verse_rhythm',
                            },
                            mainGuitar_1a:{   // 8 bar vocal line
                                name:       'verse_lead',
                            },
                            mainGuitar_1b:{   // 8 bar vocal line
                                name:       'verse_vocal_II',
                            }    
                        }
                    },   
                    verse3_riffReturn:  {        // 8 bar rhythm with lead line | Same as verse riff II
                        play: {
                            bass_1a: {       // 4 bar bassline riff
                                name:       'verse_bassline',
                            },
                            rhythmGuitar_1a:{   // 4 bar chord progression
                                name:       'verse_rhythm',
                            },
                            mainGuitar_1a:{   // 8 bar melody
                                name:       'verse_lead',
                            }  
                        }
                    },  
                    outro_I:  {         // 8 bar pre chorus section 
                        play: {
                            bass_1a: {       /// 4 bar bassline riff
                                name:       'verse_bassline',
                            },
                             mainGuitar_1a:{   // 8 bar vocal line
                                name:       'interlude_vocal_main',
                            },  
                             mainGuitar_1b:{   // 8 bar vocal line ending
                                name:       'interlude_vocal_I',
                            },  
                        }
                    },  
                    outro_II:  {         // 8 bar pre chorus section 
                        play: {
                            bass_1a: {       /// 4 bar bassline riff
                                name:       'verse_bassline',
                            },
                             mainGuitar_1a:{   // 8 bar vocal line
                                name:       'interlude_vocal_main',
                            },  
                             mainGuitar_1b:{   // 8 bar vocal line ending
                                name:       'interlude_vocal_II',
                            },  
                        }
                    },  
                    outro_III:  {         // 8 bar pre chorus section 
                        play: {
                            bass_1a: {       /// 4 bar bassline riff
                                name:       'verse_bassline',
                            },
                             mainGuitar_1a:{   // 8 bar vocal line
                                name:       'interlude_vocal_main',
                            },  
                             mainGuitar_1b:{   // 8 bar vocal line ending
                                name:       'interlude_vocal_III',
                            },  
                        }
                    }, 
                    outro_IV:  {         // 8 bar pre chorus section 
                        play: {
                            bass_1a: {       /// 4 bar bassline riff
                                name:       'verse_bassline',
                            },
                             mainGuitar_1a:{   // 8 bar vocal line
                                name:       'interlude_vocal_main',
                            },  
                             mainGuitar_1b:{   // 8 bar vocal line ending
                                name:       'interlude_vocal_I',
                            },  
                        }
                    },
                },
                order: [
                    'start',
                    'intro',    // Rhythm
                    'verse1_riff',    //  Vocal verse
                    'verse1_vocal',
                    'verse1_riffReturn',    // Same as II
                    'prechorus1',        // Vocal prechorus '..and we'll
                    'verse2_riff',
                    'verse2_vocal',
                    'verse2_riffReturn',    // Same as II
                    'prechorus2',
                    'interlude',
                    'verse3',
                    'verse3_riffReturn',
                    'outro_I',
                    'outro_II',
                    'outro_III',
                    'outro_IV',
                ],
            },
            // Song phrases
            song: {
                parts_pm:           {},
                patterns_pm: {
                    // START
                    start: {     // One bar intro
                        length:             '0:4:0', 
                        bpm:                103,                                        
                        timeSignature:      [4, 4],    
                        loop:               false,                                                               
                        notes: [
                            // BAR 1 
                        ]
                    },
                    // MAIN RIFF
                    verse_rhythm: {       // Rhythm guitar riff
                        length:             '4:0:0', 
                        bpm:                103,                                        
                        timeSignature:      [4, 4],    
                        loop:               true,                                                               
                        notes: [
                            // BAR 1 
                            { time : '0:0:0',   note : ['C#3', 'A#3'] ,    dur : '4n'},
                            { time : '0:0:0',   note : 'F3',    dur : '16n'},
                            { time : '0:0:1',   note : 'F#3',   dur : '8n.',  vel: '0.55'},
                            { time : '0:1:0',   note : ['C#3', 'A#3', 'F#3'],    dur : '16n.'},
                            { time : '0:1:3',   note : ['C#3', 'A#3', 'F#3'],    dur : '8n'},
                            { time : '0:2:1',   note : ['C#3', 'A#3', 'F#3'],    dur : '8n'},
                            { time : '0:2:3',   note : ['C#3', 'A#3', 'F#3'],    dur : '16n'},
                            { time : '0:3:0',   note : ['C#3', 'A#3', 'F#3'],    dur : '8n'},
                            { time : '0:3:2',   note : ['C#3', 'A#3', 'F#3'],    dur : '16n'},
                            { time : '0:3:3',   note : ['C#3', 'A#3', 'F#3'],    dur : '16n'},
                            //BAR 2
                            { time : '1:0:0',   note : ['C#3', 'A#3'] ,    dur : '4n'},
                            { time : '1:0:0',   note : 'F3#',   dur : '16n'},
                            { time : '1:0:1',   note : 'F3',    dur : '8n.',  vel: '0.55'},
                            { time : '1:1:0',   note : ['C#3', 'A#3', 'F#3'],    dur : '16n.'},
                            { time : '1:1:3',   note : ['C#3', 'A#3', 'F#3'],    dur : '8n'},
                            { time : '1:2:1',   note : ['C#3', 'A#3', 'F#3'],    dur : '8n'},
                            { time : '1:2:3',   note : ['C#3', 'A#3', 'F#3'],    dur : '16n'},
                            { time : '1:3:0',   note : ['C#3', 'A#3', 'F#3'],    dur : '8n'},
                            { time : '1:3:2',   note : ['C#3', 'A#3', 'F#3'],    dur : '16n'},
                            { time : '1:3:3',   note : ['C#3', 'A#3', 'F#3'],    dur : '16n'},
                            // BAR 3
                            { time : '2:0:0',   note : ['C#3', 'F3'],    dur : '16n'},
                            { time : '2:0:0',   note : 'A#3',   dur : '4n'},
                            { time : '2:0:1',   note : ['D#3', 'F#3'],    dur : '8n.', vel: '0.55'},
                            { time : '2:1:0',   note : ['D#3', 'F#3', 'A#3'],   dur : '16n.'},
                            { time : '2:1:3',   note : ['D#3', 'F#3', 'A#3'],   dur : '8n'},
                            { time : '2:2:1',   note : ['D#3', 'F#3', 'A#3'],   dur : '8n'},
                            { time : '2:2:3',   note : ['D#3', 'F#3', 'A#3'],   dur : '16n'},
                            { time : '2:3:0',   note : ['D#3', 'F#3', 'A#3'],   dur : '8n'},
                            { time : '2:3:2',   note : ['D#3', 'F#3', 'A#3'],   dur : '16n'},
                            { time : '2:3:3',   note : ['D#3', 'F#3', 'A#3'],   dur : '16n'},
                            // BAR 4
                            { time : '3:0:0',   note : ['A#2', 'C#3', 'F3', 'A#3'],    dur : '8n'},
                            { time : '3:0:2',   note : ['A#2', 'C#3', 'F3', 'A#3'],    dur : '8n'},
                            { time : '3:1:0',   note : ['A#2', 'C#3', 'F3', 'A#3'],    dur : '8n'},
                            { time : '3:1:2',   note : ['A#2', 'C#3', 'F3', 'A#3'],    dur : '16n'},
                            { time : '3:1:3',   note : ['A#2', 'C#3', 'F3', 'A#3'],    dur : '8n'},
                            { time : '3:2:1',   note : ['A#2', 'C#3', 'F3', 'A#3'],    dur : '16n'},
                            { time : '3:2:2',   note : ['A#2', 'C#3', 'F3', 'A#3'],    dur : '16n'},
                            { time : '3:2:3',   note : ['A#2', 'C#3', 'F3', 'A#3'],    dur : '8n'},
                            { time : '3:3:1',   note : ['A#2', 'C#3', 'F3', 'A#3'],    dur : '16n'},
                            { time : '3:3:2',   note : ['A#2', 'C#3', 'F3', 'A#3'],    dur : '16n'},
                            { time : '3:3:3',   note : ['A#2', 'C#3', 'F3', 'A#3'],    dur : '16n'},
                        ]
                    },
                    verse_bassline: {     // Main bass riff
                        length:             '4:0:0', 
                        bpm:                103,                                        
                        timeSignature:      [4, 4],    
                        loop:               true,                                                               
                        notes: [
                            // BAR 1 
                            { time : '0:0:0',   note : 'F#1',    dur : '8n'},
                            { time : '0:1:0',   note : 'F#1',    dur : '8n'},
                            { time : '0:2:0',   note : 'F#1',    dur : '8n'},
                            { time : '0:3:0',   note : 'F#1',    dur : '8n'},
                            { time : '0:3:2',   note : 'G#1',    dur : '8n'},
                            // BAR 2
                            { time : '1:0:0',   note : 'F#1',    dur : '8n'},
                            { time : '1:1:0',   note : 'F#1',    dur : '8n'},
                            { time : '1:2:0',   note : 'F#1',    dur : '8n'},
                            { time : '1:3:0',   note : 'F#1',    dur : '4n'},
                            // BAR 3
                            { time : '2:0:0',   note : 'B0',    dur : '8n'},
                            { time : '2:1:0',   note : 'B0',    dur : '8n'},
                            { time : '2:2:0',   note : 'B0',    dur : '8n'},
                            { time : '2:3:0',   note : 'B0',    dur : '8n'},
                            { time : '2:3:2',   note : 'C#1',   dur : '8n'},
                            // BAR 4
                            { time : '3:0:0',   note : 'A#0',    dur : '8n'},
                            { time : '3:1:0',   note : 'A#0',    dur : '8n'},
                            { time : '3:2:0',   note : 'A#0',    dur : '8n'},
                            { time : '3:3:0',   note : 'A#0',    dur : '4n'},
                        ]
                    },
                    verse_lead: {        // Lead guitar eiff
                        length:             '4:0:0', 
                        bpm:                103,                                        
                        timeSignature:      [4, 4],    
                        loop:               true,                                                               
                        notes: [
                            // BAR 1 
                            { time : '0:0:0',   note : 'F#3',    dur : '8n'},
                            { time : '0:0:2',   note : 'A#3',    dur : '8n'},
                            { time : '0:1:0',   note : 'C#4',    dur : '8n'},
                            { time : '0:1:2',   note : 'A#3',    dur : '8n'},
                            { time : '0:2:0',   note : 'G#3',    dur : '8n'},
                            { time : '0:2:2',   note : 'G#3',    dur : '16n'},
                            { time : '0:2:3',   note : 'A#3',    dur : '8n'},
                            { time : '0:3:1',   note : 'A#3',    dur : '16n'},
                            { time : '0:3:2',   note : 'A#3',    dur : '8n'},
                            // BAR 2
                            { time : '1:0:0',   note : 'F3',    dur : '8n'},
                            { time : '1:0:2',   note : 'A#3',    dur : '8n'},
                            { time : '1:1:0',   note : 'C#4',    dur : '8n'},
                            { time : '1:1:2',   note : 'A#3',    dur : '8n'},
                            { time : '1:2:0',   note : 'G#3',    dur : '8n'},
                            { time : '1:2:2',   note : 'A#3',    dur : '16n'},
                            { time : '1:2:3',   note : 'A#3',    dur : '8n'},
                            { time : '1:3:1',   note : 'A#3',    dur : '16n'},
                            { time : '1:3:2',   note : 'A#3',    dur : '8n'},
                            // BAR 3
                            { time : '2:0:0',   note : 'F#3',    dur : '8n'},
                            { time : '2:0:2',   note : 'A#3',    dur : '8n'},
                            { time : '2:1:0',   note : 'C#4',    dur : '8n'},
                            { time : '2:1:2',   note : 'A#3',    dur : '8n'},
                            { time : '2:2:0',   note : 'G#3',    dur : '8n'},
                            { time : '2:2:2',   note : 'G#3',    dur : '16n'},
                            { time : '2:2:3',   note : 'A#3',    dur : '8n'},
                            { time : '2:3:1',   note : 'A#3',    dur : '16n'},
                            { time : '2:3:2',   note : 'A#3',    dur : '8n'},
                            // BAR 4
                            { time : '3:0:0',   note : 'G#3',    dur : '8n'},
                            { time : '3:0:2',   note : 'G#3',    dur : '8n'},
                            { time : '3:1:0',   note : 'G#3',    dur : '8n'},
                            { time : '3:1:2',   note : 'G#3',    dur : '8n'},
                            { time : '3:2:0',   note : 'G#3',    dur : '8n'},
                            { time : '3:2:2',   note : 'A#3',    dur : '8n'},
                            { time : '3:3:0',   note : 'G#3',    dur : '8n'},
                            { time : '3:3:2',   note : 'F#3',    dur : '1:0:2'},
                            // BAR 5
                        ]
                    },
                    verse_vocal_I: {       // Vocal line verse 1 and 2 
                        length:             '8:0:0', 
                        bpm:                103,                                        
                        timeSignature:      [4, 4],    
                        loop:               true,                                                               
                        notes: [
                            // BAR 1 
                            { time : '0:0:2',   note : 'F#3',    dur : '8n'},
                            { time : '0:1:0',   note : 'F#3',    dur : '8n'},
                            { time : '0:1:2',   note : 'F#3',    dur : '8n'},
                            { time : '0:2:0',   note : 'F#3',    dur : '8n'},
                            { time : '0:2:2',   note : 'F#3',    dur : '8n'},
                            { time : '0:3:0',   note : 'F#3',    dur : '8n'},
                            { time : '0:3:2',   note : 'F#3',    dur : '8n'},
                            // BAR 2
                            { time : '1:0:0',   note : 'C#4',    dur : '8n'},
                            { time : '1:0:2',   note : 'F3',     dur : '8n'},
                            { time : '1:1:2',   note : 'F3',     dur : '8n'},
                            { time : '1:2:0',   note : 'F3',     dur : '8n'},
                            { time : '1:2:2',   note : 'F3',     dur : '4n'},
                            { time : '1:3:2',   note : 'D#3',    dur : '4n'},
                            // BAR 3
                            { time : '2:3:2',   note : 'B2',    dur : '8n'},
                            // BAR 4
                            { time : '3:0:0',   note : 'A#2',    dur : '8n'},
                            { time : '3:0:2',   note : 'A#2',    dur : '8n'},
                            { time : '3:1:0',   note : 'A#2',    dur : '8n'},
                            { time : '3:1:2',   note : 'A#2',    dur : '8n'},
                            { time : '3:2:0',   note : 'A#2',    dur : '8n'},
                            { time : '3:2:2',   note : 'A#2',    dur : '8n'},
                            { time : '3:3:0',   note : 'G#2',    dur : '8n'},
                            { time : '3:3:2',   note : 'F#2',    dur : '16n'},
                            { time : '3:3:3',   note : 'F#2',    dur : '16n'},
                            // BAR 5
                            { time : '4:0:2',   note : 'F#3',    dur : '8n'},
                            { time : '4:1:0',   note : 'F#3',    dur : '8n'},
                            { time : '4:1:2',   note : 'F#3',    dur : '8n'},
                            { time : '4:2:0',   note : 'F#3',    dur : '8n'},
                            { time : '4:2:2',   note : 'F#3',    dur : '8n'},
                            { time : '4:3:0',   note : 'F#3',    dur : '8n'},
                            { time : '4:3:2',   note : 'C#4',    dur : '4n'},
                            // BAR 6
                            { time : '5:0:2',   note : 'F3',     dur : '8n'},
                            { time : '5:1:0',   note : 'F3',     dur : '8n'},
                            { time : '5:1:2',   note : 'F3',     dur : '8n'},
                            { time : '5:2:0',   note : 'F3',     dur : '8n'},
                            { time : '5:2:2',   note : 'F3',     dur : '8n'},
                            { time : '5:3:0',   note : 'F3',     dur : '8n'},
                            { time : '5:3:2',   note : 'D#3',    dur : '8n'},
                            // BAR 7
                            { time : '6:3:2',   note : 'B2',    dur : '8n'},
                            // BAR 8
                            { time : '7:0:0',   note : 'A#2',    dur : '8n'},
                            { time : '7:0:2',   note : 'A#2',    dur : '8n'},
                            { time : '7:1:0',   note : 'A#2',    dur : '8n'},
                            { time : '7:1:2',   note : 'A#2',    dur : '16n'},
                            { time : '7:1:3',   note : 'A#2',    dur : '8n'},
                            { time : '7:2:1',   note : 'A#2',    dur : '16n'},
                            { time : '7:2:2',   note : 'A#2',    dur : '8n'},
                            { time : '7:3:0',   note : 'G#2',    dur : '8n'},
                            { time : '7:3:2',   note : 'F#2',    dur : '8n'},
                            // BAR 9 (not played)
                            { time : '8:0:0',   note : 'F#2',    dur : '8n'},
                        ]
                    },
                    verse_vocal_II: {       // Vocal line verse 3
                        length:             '8:0:0', 
                        bpm:                103,                                        
                        timeSignature:      [4, 4],    
                        loop:               true,                                                               
                        notes: [
                            // BAR 1 
                            { time : '0:0:0',   note : 'F#2',    dur : '4n'},
                            { time : '0:1:0',   note : 'G#2',    dur : '4n'},
                            { time : '0:2:0',   note : 'A#2',    dur : '8n'},
                            { time : '0:2:2',   note : 'G#2',    dur : '8n'},
                            { time : '0:3:0',   note : 'F#2',    dur : '8n'},
                            { time : '0:3:2',   note : 'C#3',    dur : '4n.'},
                            // BAR 2
                            { time : '1:1:0',   note : 'D#3',    dur : '4n'},
                            { time : '1:2:0',   note : 'A#2',    dur : '4n'},
                            { time : '1:3:0',   note : 'G#2',    dur : '4n'},
                            // BAR 3
                            { time : '2:0:0',   note : 'F#2',    dur : '8n'},
                            { time : '2:1:0',   note : 'G#2',    dur : '8n'},
                            { time : '2:2:0',   note : 'A#2',    dur : '8n'},
                            { time : '2:2:2',   note : 'G#2',    dur : '8n'},
                            { time : '2:3:0',   note : 'F#2',    dur : '8n'},
                            { time : '2:3:2',   note : 'C#3',    dur : '4n.'},
                            // BAR 4
                            { time : '3:1:0',   note : 'D#3',    dur : '4n'},
                            { time : '3:2:0',   note : 'A#2',    dur : '4n'},
                            { time : '3:3:0',   note : 'G#2',    dur : '4n'},
                            // BAR 5
                            { time : '4:0:0',   note : 'F#2',    dur : '4n'},
                            { time : '4:1:0',   note : 'G#2',    dur : '4n'},
                            { time : '4:2:0',   note : 'A#2',    dur : '8n'},
                            { time : '4:2:2',   note : 'G#2',    dur : '8n'},
                            { time : '4:3:0',   note : 'F#2',    dur : '8n'},
                            { time : '4:3:2',   note : 'C#3',    dur : '4n.'},
                            // BAR 6
                            { time : '5:1:0',   note : 'D#3',    dur : '4n'},
                            { time : '5:2:0',   note : 'A#2',    dur : '4n'},
                            { time : '5:3:0',   note : 'G#2',    dur : '4n'},
                            // BAR 7
                            { time : '6:0:0',   note : 'F#2',    dur : '4n'},
                            { time : '6:1:0',   note : 'G#2',    dur : '4n'},
                            { time : '6:2:0',   note : 'A#2',    dur : '8n'},
                            { time : '6:2:2',   note : 'G#2',    dur : '8n'},
                            { time : '6:3:0',   note : 'F#2',    dur : '8n'},
                            // BAR 6
                            { time : '6:0:0',   note : 'C#3',    dur : '4n'},
                            { time : '6:1:0',   note : 'D#3',    dur : '4n'},
                            { time : '6:2:0',   note : 'G#2',    dur : '1m'},
                        ]
                    },
                    prechorus_bassline: {     // Main bass riff
                        length:             '8:0:0', 
                        bpm:                103,                                        
                        timeSignature:      [4, 4],    
                        loop:               true,                                                               
                        notes: [
                            // BAR 1 
                            { time : '0:0:0',   note : 'F#1',   dur : '2n.'},
                            { time : '0:3:0',   note : 'F#1',   dur : '8n'},
                            { time : '0:3:2',   note : 'G#1',   dur : '8n'},
                            // BAR 2
                            { time : '1:0:0',   note : 'F1',    dur : '2n.'},
                            { time : '1:3:0',   note : 'F1',    dur : '4n'},
                            // BAR 3
                            { time : '2:0:0',   note : 'B0',    dur : '2n.'},
                            { time : '2:3:0',   note : 'B0',    dur : '8n'},
                            { time : '2:3:2',   note : 'C#1',   dur : '8n'},
                            // BAR 4
                            { time : '3:0:0',   note : 'A#0',   dur : '2n.'},
                            { time : '3:3:0',   note : 'A#0',   dur : '4n'},
                            // BAR 5 
                            { time : '0:0:0',   note : 'F#1',   dur : '2n.'},
                            { time : '0:3:0',   note : 'F#1',   dur : '8n'},
                            { time : '0:3:2',   note : 'G#1',   dur : '8n'},
                            // BAR 6
                            { time : '1:0:0',   note : 'F1',    dur : '2n.'},
                            { time : '1:3:0',   note : 'F1',    dur : '4n'},
                            // BAR 7
                            { time : '2:0:0',   note : 'B0',    dur : '2n.'},
                            { time : '2:3:0',   note : 'B0',    dur : '8n'},
                            { time : '2:3:2',   note : 'C#1',   dur : '8n'},
                            // BAR 8
                            { time : '3:0:0',   note : 'A#0',   dur : '2n.'},
                            { time : '3:1:0',   note : 'C#1',   dur : '4n'},
                            { time : '3:2:0',   note : 'D#1',   dur : '4n'},
                            { time : '3:3:0',   note : 'F1',    dur : '4n'},
                        ]
                    },
                    prechorus_riff: {     // prechorus 'riff' 
                        length:             '4:0:0', 
                        bpm:                103,                                        
                        timeSignature:      [4, 4],    
                        loop:               true,                                                               
                        notes: [
                            // BAR 1 
                            { time : '0:0:0',   note : 'C#3',    dur : '8n'},
                            { time : '0:0:2',   note : 'F#3',    dur : '8n'},
                            { time : '0:1:0',   note : 'A#3',    dur : '8n'},
                            { time : '0:1:2',   note : 'F#3',    dur : '8n'},
                            { time : '0:2:0',   note : 'C#3',    dur : '8n'},
                            { time : '0:2:2',   note : 'F#3',    dur : '8n'},
                            { time : '0:3:0',   note : 'A#3',    dur : '8n'},
                            { time : '0:3:2',   note : 'F#3',    dur : '8n'},
                            // BAR 2
                            { time : '1:0:0',   note : 'C#3',    dur : '8n'},
                            { time : '1:0:2',   note : 'F#3',    dur : '8n'},
                            { time : '1:1:0',   note : 'A#3',    dur : '8n'},
                            { time : '1:1:2',   note : 'F#3',    dur : '8n'},
                            { time : '1:2:0',   note : 'C#3',    dur : '8n'},
                            { time : '1:2:2',   note : 'F#3',    dur : '8n'},
                            { time : '1:3:0',   note : 'A#3',    dur : '8n'},
                            { time : '1:3:2',   note : 'F#3',    dur : '8n'},
                            // BAR 3
                            { time : '2:0:0',   note : 'D#3',    dur : '8n'},
                            { time : '2:0:2',   note : 'F#3',    dur : '8n'},
                            { time : '2:1:0',   note : 'A#3',    dur : '8n'},
                            { time : '2:1:2',   note : 'F#3',    dur : '8n'},
                            { time : '2:2:0',   note : 'D#3',    dur : '8n'},
                            { time : '2:2:2',   note : 'F#3',    dur : '8n'},
                            { time : '2:3:0',   note : 'A#3',    dur : '8n'},
                            { time : '2:3:2',   note : 'F#3',    dur : '8n'},
                            // BAR 4
                            { time : '3:0:0',   note : 'A#2',    dur : '8n'},
                            { time : '3:0:2',   note : 'C#3',    dur : '8n'},
                            { time : '3:1:0',   note : 'F3',     dur : '8n'},
                            { time : '3:1:2',   note : 'C#3',    dur : '8n'},
                            { time : '3:2:0',   note : 'A#3',    dur : '8n'},
                            { time : '3:2:2',   note : 'F3',     dur : '8n'},
                            { time : '3:3:0',   note : 'C#3',    dur : '8n'},
                            { time : '3:3:2',   note : 'F3',     dur : '8n'},
                        ]
                    },
                    prechorus_vocal_main: {     // prechorus line 
                        length:             '8:0:0', 
                        bpm:                103,                                        
                        timeSignature:      [4, 4],    
                        loop:               true,                                                               
                        notes: [
                            // BAR 1 
                            { time : '0:2:2',   note : 'A#2',    dur : '8n'},
                            { time : '0:3:0',   note : 'A#2',    dur : '8n'},
                            { time : '0:3:2',   note : 'A#2',    dur : '4n.'},
                            // BAR 2
                            { time : '1:1:0',   note : 'A#2',    dur : '4n'},
                            { time : '1:2:0',   note : 'A#2',    dur : '4n'},
                            { time : '1:3:0',   note : 'C#3',    dur : '8n'},
                            { time : '1:3:2',   note : 'G#2',    dur : '4n'},
                            // BAR 3
                            { time : '2:0:2',   note : 'F#2',    dur : '4n'},
                            { time : '2:2:2',   note : 'A#2',    dur : '8n'},
                            { time : '2:3:0',   note : 'A#2',    dur : '8n'},
                            { time : '2:3:2',   note : 'A#2',    dur : '4n.'},
                            // BAR 4
                            { time : '3:1:0',   note : 'A#2',    dur : '4n'},
                            { time : '3:2:0',   note : 'A#2',    dur : '4n'},
                            { time : '3:3:0',   note : 'C#3',    dur : '8n'},
                            { time : '3:3:2',   note : 'A#2',    dur : '8n'},
                            // BAR 5 
                            { time : '4:2:2',   note : 'A#2',    dur : '8n'},
                            { time : '4:3:0',   note : 'A#2',    dur : '8n'},
                            { time : '4:3:2',   note : 'A#2',    dur : '4n.'},
                            // BAR 6
                            { time : '5:1:0',   note : 'A#2',    dur : '4n'},
                            { time : '5:2:0',   note : 'A#2',    dur : '4n'},
                            { time : '5:3:0',   note : 'C#3',    dur : '8n'},
                            { time : '5:3:2',   note : 'G#2',    dur : '4n'},
                        ]
                    },
                    prechorus_vocal_I: {     // prechorus last 2 bar 
                        length:             '8:0:0', 
                        bpm:                103,                                        
                        timeSignature:      [4, 4],    
                        loop:               true,                                                               
                        notes: [
                            // BAR 7
                            { time : '6:0:2',   note : 'F#2',    dur : '4n'},
                            { time : '6:2:2',   note : 'A#2',    dur : '8n'},
                            { time : '6:3:0',   note : 'A#2',    dur : '8n'},
                            { time : '6:3:2',   note : 'A#2',    dur : '4n'},
                            // BAR 8
                            { time : '7:0:2',   note : 'A#2',    dur : '8n'},
                            { time : '7:1:0',   note : 'A#2',    dur : '4n'},
                            { time : '7:2:0',   note : 'A#2',    dur : '16n'},
                            { time : '7:2:1',   note : 'G#2',    dur : '8n'},
                            { time : '7:2:3',   note : 'F#2',    dur : '8n.'},
                            { time : '7:3:2',   note : 'F#2',    dur : '8n'},
                        ]
                    },
                    prechorus_vocal_II: {     // prechorus last 2 bar alternate
                        length:             '8:0:0', 
                        bpm:                103,                                        
                        timeSignature:      [4, 4],    
                        loop:               true,                                                               
                        notes: [
                            // BAR 7
                            { time : '6:0:2',   note : 'F#2',    dur : '4n'},
                            { time : '6:2:2',   note : 'G#2',    dur : '8n'},
                            { time : '6:3:0',   note : 'F#2',    dur : '8n'},
                            { time : '6:3:2',   note : 'C#3',    dur : '4n.'},
                            // BAR 8
                            { time : '7:1:0',   note : 'D#3',    dur : '4n'},
                            { time : '7:2:0',   note : 'A#2',    dur : '4n'},
                            { time : '7:3:0',   note : 'G#2',    dur : '4n'},
                        ]
                    },
                    interlude_vocal_main: {       // Vocal line 
                        length:             '8:0:0', 
                        bpm:                103,                                        
                        timeSignature:      [4, 4],    
                        loop:               true,                                                               
                        notes: [
                            // BAR 1 
                            { time : '0:0:0',   note : 'F#2',    dur : '4n'},
                            { time : '0:1:0',   note : 'G#2',    dur : '4n'},
                            { time : '0:2:0',   note : 'A#2',    dur : '8n'},
                            { time : '0:2:2',   note : 'G#2',    dur : '8n'},
                            { time : '0:3:0',   note : 'F#2',    dur : '8n'},
                            { time : '0:3:2',   note : 'C#3',    dur : '4n.'},
                            // BAR 2
                            { time : '1:1:0',   note : 'D#3',    dur : '4n'},
                            { time : '1:2:0',   note : 'A#2',    dur : '4n'},
                            { time : '1:3:0',   note : 'G#2',    dur : '4n'},
                            // BAR 3
                            { time : '2:0:0',   note : 'F#2',    dur : '4n'},
                            { time : '2:1:0',   note : 'G#2',    dur : '4n'},
                            { time : '2:2:0',   note : 'A#2',    dur : '8n'},
                            { time : '2:2:2',   note : 'G#2',    dur : '8n'},
                            { time : '2:3:0',   note : 'F#2',    dur : '8n'},
                            { time : '2:3:2',   note : 'C#3',    dur : '4n.'},
                            // BAR 4
                            { time : '3:1:0',   note : 'D#3',    dur : '4n'},
                            { time : '3:2:0',   note : 'A#2',    dur : '4n'},
                            { time : '3:3:0',   note : 'G#2',    dur : '4n'},
                            // BAR 5
                            { time : '4:0:0',   note : 'F#2',    dur : '4n'},
                            { time : '4:1:0',   note : 'G#2',    dur : '4n'},
                            { time : '4:2:0',   note : 'A#2',    dur : '8n'},
                            { time : '4:2:2',   note : 'G#2',    dur : '8n'},
                            { time : '4:3:0',   note : 'F#2',    dur : '8n'},
                            { time : '4:3:2',   note : 'C#3',    dur : '4n.'},
                            // BAR 6
                            { time : '5:1:0',   note : 'D#3',    dur : '4n'},
                            { time : '5:2:0',   note : 'A#2',    dur : '4n'},
                            { time : '5:3:0',   note : 'G#2',    dur : '4n'},
                            // BAR 7
                            { time : '6:0:0',   note : 'F#2',    dur : '8n'},
                            { time : '6:1:0',   note : 'G#2',    dur : '8n'},
                            { time : '6:2:0',   note : 'A#2',    dur : '8n'},
                            { time : '6:2:2',   note : 'G#2',    dur : '8n'},
                            { time : '6:3:0',   note : 'F#2',    dur : '8n'},
                        ]
                    },
                    interlude_vocal_I: {       // Vocal line alternate 
                        length:             '8:0:0', 
                        bpm:                103,                                        
                        timeSignature:      [4, 4],    
                        loop:               true,                                                               
                        notes: [
                            // BAR 8
                            { time : '7:0:0',   note : 'C#3',    dur : '4n'},
                            { time : '7:1:0',   note : 'D#3',    dur : '4n'},
                            { time : '7:2:0',   note : 'G#2',    dur : '1m'},
                        ]
                    },
                    interlude_vocal_II: {       // Vocal line alternate
                        length:             '8:0:0', 
                        bpm:                103,                                        
                        timeSignature:      [4, 4],    
                        loop:               true,                                                               
                        notes: [
                            // BAR 7
                            { time : '6:3:2',   note : 'F#2',    dur : '8n'},
                            // BAR 8
                            { time : '7:0:0',   note : 'C#3',    dur : '8n'},
                            { time : '7:1:0',   note : 'A#2',    dur : '8n'},
                            { time : '7:2:0',   note : 'A#2',    dur : '8n'},
                            { time : '7:3:0',   note : 'G#2',    dur : '8n'},
                            { time : '7:3:2',   note : 'G#2',    dur : '8n'},
                        ]
                    },
                    interlude_vocal_III: {       // Vocal line alternate 
                        length:             '8:0:0', 
                        bpm:                103,                                        
                        timeSignature:      [4, 4],    
                        loop:               true,                                                               
                        notes: [
                            // BAR 7
                            { time : '6:3:2',   note : 'C#3',    dur : '4n.'},
                            // BAR 8
                            { time : '7:1:0',   note : 'D#3',    dur : '4n'},
                            { time : '7:2:0',   note : 'A#2',    dur : '4n'},
                            { time : '7:3:0',   note : 'G#2',    dur : '8n'},
                            { time : '7:3:2',   note : 'G#2',    dur : '8n'},
                        ]
                    },

                }    
            },
        },
        blueSkyMine: {
            // Phrase combinations and ordering
            tempo:  136,
            arrangement: {
                phrases: {
                    intro:  {              // 1 bar intro slide 
                        autocue:           true,   
                        play: {
                            rhythmGuitar_1a:      {
                                name:      'intro' 
                            },     
                        }
                    }, 
                    verse_riff_I:  {         // 2 bar of repeated rhythm (lead and bass)
                        play: {
                            rhythmGuitar_1a:{   // 2 bar riff 
                                name:       'verse_riff_main',
                            }     
                        }
                    }, 
                    verse_riff_II:  {         // 2 bar of repeated rhythm (lead and bass)
                        play: {
                            rhythmGuitar_1a:{   // 2 bar riff 
                                name:       'verse_riff_main',
                            },     
                            piano_1a:{   // 4 bar riff 
                                name:       'verse_riff_melody',
                            }     
                        }
                    }, 
                    verse_riff_III:  {         // 2 bar of repeated rhythm (lead and bass)
                        play: {
                            rhythmGuitar_1a:{   // 2 bar riff 
                                name:       'verse_riff_main',
                            },     
                            piano_1a:{   // 4 bar riff 
                                name:       'verse_riff_melody',
                            },     
                            rhythmGuitar_1b:{   // 4 bar riff 
                                name:       'verse_riff_rhythm',
                            }      
                        }
                    }, 
                },
                order: [
                    'intro',
                    'verse_riff_I',
                    'verse_riff_II',
                    'verse_riff_III',
                ],
            },
            // Song phrases
            song: {
                parts_pm:           {},
                patterns_pm: {
                // START
                    intro: {     // One bar intro
                        length:             '0:2:0', 
                        bpm:                114,                                        
                        timeSignature:      [4, 4],    
                        loop:               false,                                                               
                        notes: [
                            // BAR 1 
                        ]
                    },
                    // MAIN RIFF
                    verse_riff_main: {     // Main guitar riff
                        length:             '2:0:0', 
                        bpm:                114,                                        
                        timeSignature:      [4, 4],    
                        loop:               true,                                                               
                        notes: [
                            // BAR 1 
                            { time : '0:0:0',   note : ['D3', 'F3'],    dur : '4n'},
                            { time : '0:1:0',   note : ['D3', 'F3'],    dur : '4n'},
                            { time : '0:2:0',   note : ['D3', 'F3'],    dur : '4n'},
                            { time : '0:2:2',   note : ['C3', 'E3'],    dur : '4n'},
                            { time : '0:3:0',   note : ['C3', 'E3'],    dur : '4n'},
                            { time : '0:3:2',   note : ['D3', 'F3'],    dur : '4n'},
                            //BAR 2
                            { time : '1:0:2',   note : ['D3', 'F3'],    dur : '8n'},
                            { time : '1:1:2',   note : ['C3', 'E3'],    dur : '8n'},
                            { time : '1:2:0',   note : ['C3', 'E3'],    dur : '8n'},
                            { time : '1:2:2',   note : ['C3', 'G3'],    dur : '8n'},
                            { time : '1:3:0',   note : ['C3', 'G3'],    dur : '8n'},
                            { time : '1:3:2',   note : ['C3', 'E3'],    dur : '8n'},
                        ]
                    },
                    verse_riff_melody: {     // Melody bass riff
                        length:             '4:0:0', 
                        bpm:                114,                                        
                        timeSignature:      [4, 4],    
                        loop:               true,                                                               
                        notes: [
                            // BAR 1 
                            { time : '0:0:0',   note : 'D4',    dur : '4n'},
                            { time : '0:1:0',   note : 'D4',    dur : '4n'},
                            { time : '0:2:0',   note : 'C4',    dur : '8n'},
                            { time : '0:2:2',   note : 'D4',    dur : '8n'},
                            { time : '0:3:0',   note : 'C4',    dur : '8n'},
                            { time : '0:3:2',   note : 'D4',    dur : '8n'},
                            // BAR 2
                            { time : '1:0:2',   note : 'D4',    dur : '8n'},
                            { time : '1:1:2',   note : 'C4',    dur : '8n'},
                            { time : '1:2:0',   note : 'C4',    dur : '8n'},
                            { time : '1:2:2',   note : 'D4',    dur : '8n'},
                            { time : '1:3:0',   note : 'D4',    dur : '8n'},
                            { time : '1:3:2',   note : 'C4',    dur : '8n'},
                            { time : '1:3:2',   note : 'D4',    dur : '8n'},
                            // BAR 3
                            { time : '2:0:0',   note : 'D4',    dur : '4n'},
                            { time : '2:1:0',   note : 'D4',    dur : '4n'},
                            { time : '2:2:0',   note : 'F4',    dur : '8n'},
                            { time : '2:2:2',   note : 'D4',    dur : '8n'},
                            { time : '2:3:0',   note : 'C4',    dur : '8n'},
                            { time : '2:3:2',   note : 'D4',    dur : '8n'},
                            // BAR 4
                            { time : '3:0:2',   note : 'D4',    dur : '8n'},
                            { time : '3:1:2',   note : 'G4',    dur : '8n'},
                            { time : '3:2:0',   note : 'G4',    dur : '8n'},
                            { time : '3:2:2',   note : 'D4',    dur : '8n'},
                            { time : '3:3:0',   note : 'D4',    dur : '8n'},
                            { time : '3:3:2',   note : 'C4',    dur : '8n'},
                        ]
                    },
                    verse_riff_rhythm: {     //  Rhythm chords
                        length:             '4:0:0', 
                        bpm:                114,                                        
                        timeSignature:      [4, 4],    
                        loop:               true,                                                               
                        notes: [
                            // BAR 1 
                            { time : '0:0:0',   note : ['D2', 'A2', 'D3', 'F3'],    dur : '8n'},
                            { time : '0:0:2',   note : ['D2', 'A2', 'D3', 'F3'],    dur : '8n'},
                            { time : '0:1:0',   note : ['D2', 'A2', 'D3', 'F3'],    dur : '8n'},
                            { time : '0:1:2',   note : ['D2', 'A2', 'D3', 'F3'],    dur : '8n'},
                            { time : '0:2:0',   note : ['F1', 'A1', 'F2', 'C3', 'F3'],    dur : '8n'},
                            { time : '0:2:2',   note : ['F1', 'A1', 'F2', 'C3', 'F3'],    dur : '8n'},
                            { time : '0:3:0',   note : ['F1', 'A1', 'F2', 'C3', 'F3'],    dur : '8n'},
                            { time : '0:3:2',   note : ['F1', 'A1', 'F2', 'C3', 'F3'],    dur : '8n'},
                            // BAR 2
                            { time : '1:0:0',   note : ['D2', 'A2', 'D3', 'F3'],    dur : '8n'},
                            { time : '1:0:2',   note : ['D2', 'A2', 'D3', 'F3'],    dur : '8n'},
                            { time : '1:1:0',   note : ['D2', 'A2', 'D3', 'F3'],    dur : '8n'},
                            { time : '1:1:2',   note : ['D2', 'A2', 'D3', 'F3'],    dur : '8n'},
                            { time : '1:2:0',   note : ['G1', 'B1', 'D2', 'G2', 'D3', 'G3'],    dur : '8n'},
                            { time : '1:2:2',   note : ['G1', 'B1', 'D2', 'G2', 'D3', 'G3'],    dur : '8n'},
                            { time : '1:3:0',   note : ['G1', 'B1', 'D2', 'G2', 'D3', 'G3'],    dur : '8n'},
                            { time : '1:3:2',   note : ['G1', 'B1', 'D2', 'G2', 'D3', 'G3'],    dur : '8n'},
                            // BAR 3
                            { time : '2:0:0',   note : ['D2', 'A2', 'D3', 'F3'],    dur : '8n'},
                            { time : '2:0:2',   note : ['D2', 'A2', 'D3', 'F3'],    dur : '8n'},
                            { time : '2:1:0',   note : ['D2', 'A2', 'D3', 'F3'],    dur : '8n'},
                            { time : '2:1:2',   note : ['D2', 'A2', 'D3', 'F3'],    dur : '8n'},
                            { time : '2:2:0',   note : ['A1', 'E2', 'A2', 'C3', 'E3'],    dur : '8n'},
                            { time : '2:2:2',   note : ['A1', 'E2', 'A2', 'C3', 'E3'],    dur : '8n'},
                            { time : '2:3:0',   note : ['A1', 'E2', 'A2', 'C3', 'E3'],    dur : '8n'},
                            { time : '2:3:2',   note : ['A1', 'E2', 'A2', 'C3', 'E3'],    dur : '8n'},
                            // BAR 4
                            { time : '3:0:0',   note : ['F1', 'A1', 'F2', 'A2', 'C3', 'F3'],    dur : '8n'},
                            { time : '3:0:2',   note : ['F1', 'A1', 'F2', 'A2', 'C3', 'F3'],    dur : '8n'},
                            { time : '3:1:0',   note : ['F1', 'A1', 'F2', 'A2', 'C3', 'F3'],    dur : '8n'},
                            { time : '3:1:2',   note : ['F1', 'A1', 'F2', 'A2', 'C3', 'F3'],    dur : '8n'},
                            { time : '3:2:0',   note : ['C2', 'E2', 'G2', 'C3', 'E3'],    dur : '8n'},
                            { time : '3:2:2',   note : ['C2', 'E2', 'G2', 'C3', 'E3'],    dur : '8n'},
                            { time : '3:3:0',   note : ['C2', 'E2', 'G2', 'C3', 'E3'],    dur : '8n'},
                            { time : '3:3:2',   note : ['C2', 'E2', 'G2', 'C3', 'E3'],    dur : '8n'},
                        ]
                    },
                
                }
            },
        },
        blisterInTheSun: {
            // Phrase combinations and ordering
            tempo:  195,
            arrangement: {
                phrases: {
                    start:  {              // 1 bar intro slide 
                        autocue:           true,   
                        play: {
                            rhythmGuitar_1a:      {
                                name:      'start' 
                            },     
                        }
                    }, 
                    verse_riff_I:  {         // 2 bar of repeated rhythm (lead and bass)
                        play: {
                            rhythmGuitar_1a:{   // 2 bar riff 
                                name:       'verse_riff_main',
                            }     
                        }
                    }, 
                    verse_riff_II:  {         // 2 bar of repeated rhythm (lead and bass)
                        play: {
                            rhythmGuitar_1a:{   // 2 bar riff 
                                name:       'verse_riff_main',
                            },     
                            piano_1a:{   // 4 bar riff 
                                name:       'verse_riff_rhythm',
                            }     
                        }
                    }, 
                },
                order: [
                    'start',
                    'verse_riff_I',
                    'verse_riff_II',
                ],
            },
            // Song phrases
            song: {
                parts_pm:           {},
                patterns_pm: {
                // START
                    start: {     // One bar intro
                        length:             '0:2:0', 
                        bpm:                195,                                        
                        timeSignature:      [4, 4],    
                        loop:               false,                                                               
                        notes: [
                            // BAR 1 
                        ]
                    },
                    // MAIN RIFF
                    verse_riff_main: {     // Main guitar riff
                        length:             '4:0:0', 
                        bpm:                195,                                        
                        timeSignature:      [4, 4],    
                        loop:               true,                                                               
                        notes: [
                            // BAR 1 
                            { time : '0:0:0',   note : 'G1',    dur : '4n'},
                            { time : '0:1:0',   note : 'B1',    dur : '8n'},
                            { time : '0:1:2',   note : 'G1',    dur : '8n'},
                            { time : '0:2:0',   note : 'C2',    dur : '4n'},
                            { time : '0:3:0',   note : 'B1',    dur : '8n'},
                            { time : '0:3:2',   note : 'G1',    dur : '4n'},
                            // BAR 2
                            { time : '1:0:2',   note : 'B1',    dur : '4n'},
                            { time : '1:1:2',   note : 'G1',    dur : '8n'},
                            { time : '1:2:0',   note : 'C2',    dur : '4n'},
                            { time : '1:3:0',   note : 'B1',    dur : '8n'},
                            // BAR 3
                            { time : '2:0:0',   note : 'G1',    dur : '4n'},
                            { time : '2:1:0',   note : 'B1',    dur : '8n'},
                            { time : '2:1:2',   note : 'G1',    dur : '8n'},
                            { time : '2:2:0',   note : 'C2',    dur : '4n'},
                            { time : '2:3:0',   note : 'B1',    dur : '8n'},
                            { time : '2:3:2',   note : 'G1',    dur : '8n'},
                        ]
                    },
                    verse_riff_rhythm: {     //  Rhythm chords
                        length:             '4:0:0', 
                        bpm:                195,                                        
                        timeSignature:      [4, 4],    
                        loop:               true,                                                               
                        notes: [
                            // BAR 1 
                            { time : '0:0:0',   note : ['G1', 'D2', 'G2'],   dur : '4n'},
                            { time : '0:1:0',   note : ['B1', 'F#2'],   dur : '8n'},
                            { time : '0:1:0',   note : 'B2',            dur : '4n'},
                            { time : '0:1:2',   note : ['G1', 'D2'],    dur : '8n'},
                            { time : '0:2:0',   note : ['C2', 'G2', 'C3'],   dur : '4n'},
                            { time : '0:3:0',   note : ['B1', 'F#2', 'B2'],  dur : '8n'},
                            { time : '0:3:2',   note : ['G1', 'D2', 'G2'],   dur : '4n'},
                            // BAR 2
                            { time : '1:0:2',   note : ['B1', 'F#2', 'B2'],  dur : '4n'},
                            { time : '1:1:2',   note : ['G1', 'D2', 'G2'],   dur : '8n'},
                            { time : '1:2:0',   note : ['C2', 'G2', 'C3'],   dur : '4n'},
                            { time : '1:3:0',   note : ['B1', 'F#2', 'B2'],  dur : '8n'},
                            // BAR 3
                            { time : '2:0:0',   note : ['G1', 'D2', 'G2'],    dur : '4n'},
                            { time : '2:1:0',   note : ['B1', 'F#2'],    dur : '8n'},
                            { time : '2:1:0',   note : 'B2',   dur : '4n'},
                            { time : '2:1:2',   note : ['G1', 'D2'],   dur : '8n'},
                            { time : '2:2:0',   note : ['C2', 'G2', 'C3'],   dur : '4n'},
                            { time : '2:3:0',   note : ['B1', 'F#2', 'B2'],   dur : '8n'},
                            { time : '2:3:2',   note : 'G1',    dur : '2n'},
                            { time : '2:3:2',   note : 'D2',    dur : '4n.'},
                            { time : '2:3:2',   note : 'G2',    dur : '4n'},

                        ]
                    },
                
                }
            },
        },
        noRain: {
            // Phrase combinations and ordering
            tempo:  149,
            arrangement: {
                phrases: {
                    intro:  {              // 1 bar intro slide 
                        autocue:           true,   
                        play: {
                            rhythmGuitar_1a:      {
                                name:      'intro' 
                            },     
                        }
                    }, 
                    verse_riff_I:  {         // 2 bar of repeated rhythm (lead and bass)
                        play: {
                            rhythmGuitar_1a:{   // 2 bar riff 
                                name:       'verse_lead_I',
                            },     
                        }
                    }, 
                    verse_riff_II:  {         // 2 bar of repeated rhythm (lead and bass)
                        play: {
                            rhythmGuitar_1a:{   // 2 bar riff 
                                name:       'verse_lead_II',
                            },     
                        }
                    }, 
                },
                order: [
                    'intro',
                    'verse_riff_I',
                    'verse_riff_II',
                    'verse_riff_I',
                ],
            },
            // Song phrases
            song: {
                parts_pm:           {},
                patterns_pm: {
                // START
                    intro: {     // One bar intro
                        length:             '1:0:0', 
                        bpm:                149,                                        
                        timeSignature:      [4, 4],    
                        loop:               false,                                                               
                        notes: [
                            { time : '0:1:3',   note : 'A3',    dur : '0:0:0.95'},
                            { time : '0:2:2.5',  note : 'A3',   dur : '8t'},
                            { time : '0:3:0',   note : 'B3',   dur : '4n'},
                        ]
                    },
                    // MAIN RIFF
                    verse_lead_I: {     // Main guitar riff
                        length:             '4:0:0', 
                        bpm:                149,                                        
                        timeSignature:      [4, 4],    
                        loop:               true,                                                               
                        notes: [
                            // BAR 1
                            { time : '0:0:0',   note : 'E3',   dur : '4n'},
                            { time : '0:1:0',   note : 'G#3',  dur : '4n'},
                            { time : '0:2:0',   note : 'A3',   dur : '8n.'},
                            { time : '0:2:3',   note : 'G#3',  dur : '16n'},
                            { time : '0:3:0',   note : 'A3',   dur : '8n.'},
                            { time : '0:3:3',   note : 'F#3',  dur : '8n.'},
                            // BAR 2
                            { time : '1:0:3',   note : 'F#3',  dur : '16n'},
                            { time : '1:1:0',   note : 'E3',   dur : '4n'},
                            { time : '1:2:0',   note : 'D3',   dur : '8n.'},
                            { time : '1:2:3',   note : 'D3',   dur : '16n'},
                            { time : '1:3:0',   note : 'E3',   dur : '8n.'},
                            { time : '1:3:3',   note : 'D3',   dur : '16n'},
                            // BAR 3
                            { time : '2:0:0',   note : 'E3',   dur : '4n'},
                            { time : '2:1:0',   note : 'G#3',  dur : '4n'},
                            { time : '2:2:0',   note : 'A3',   dur : '8n.'},
                            { time : '2:2:3',   note : 'G#3',  dur : '16n'},
                            { time : '2:3:0',   note : 'A3',   dur : '8n'},
                            { time : '2:3:2',   note : 'F#3',  dur : '4n'},
                            // BAR 4
                            { time : '3:0:3',   note : 'F#3',  dur : '16n'},
                            { time : '3:1:0',   note : 'E3',   dur : '8n.'},
                            { time : '3:2:0',   note : 'D3',   dur : '8n.'},
                            { time : '3:2:3',   note : 'D3',   dur : '16n'},
                            { time : '3:3:0',   note : 'E3',   dur : '8n'},
                            { time : '3:3:3',   note : 'D3',   dur : '16n'},
                        ]
                    },
                    verse_lead_II: {     //  Rhythm chords
                        length:             '2:0:0', 
                        bpm:                149,                                        
                        timeSignature:      [4, 4],    
                        loop:               true,                                                               
                        notes: [
                            // BAR 1
                            { time : '0:0:0',   note : 'E3',   dur : '4n'},
                            { time : '0:1:0',   note : 'G#3',  dur : '4n'},
                            { time : '0:2:0',   note : 'A3',   dur : '8n.'},
                            { time : '0:2:3',   note : 'G#3',  dur : '16n'},
                            { time : '0:3:0',   note : 'A3',   dur : '8n'},
                            { time : '0:3:3',   note : 'F#3',  dur : '8n'},
                            // BAR 2
                            { time : '1:0:2.5',   note : 'E3',  dur : '16n.'},
                            { time : '1:1:2.5',   note : 'D3',  dur : '16n.'},
                            { time : '1:2:2.5',   note : 'D3',  dur : '16n.'},
                            { time : '1:3:0',     note : 'E3',  dur : '8n'},
                            { time : '1:3:2.5',   note : 'D3',  dur : '16n.'},
                        ]
                    },
                
                }
            },
        }



    }


//////////////////////////////////////////////
//// SOUND RIG : SETUP TONE.JS COMPONENTS ////
//////////////////////////////////////////////
   
    // 1. TRANSPORT SETUP
        Tone.Transport.bpm.value        = music[audio.state.performance.song].tempo
        Tone.Transport.timeSignature    = [4,  4]

    // 2. AUDIO CHAIN: Processing and effects Gain control
        //    CURRENT Sampler -> Gain => MasterAudio        
        //    --------------------------------------
        //    UNUSED: Compressor, distortion       

        audio.instruments['synth_marimba'].chain(audio.fx.rhythmGain, audio.fx.masterGain)    
        audio.instruments['synth_kalimba'].chain(audio.fx.rhythmGain, audio.fx.masterGain)       
        audio.instruments['synth_electricCello'].chain(audio.fx.rhythmGain, audio.fx.masterGain)       
        audio.instruments['synth_pianetta'].chain(audio.fx.rhythmGain, audio.fx.masterGain)       
        audio.instruments['synth_bell'].chain(audio.fx.rhythmGain, audio.fx.masterGain)    
        audio.instruments['synth_sawtooth'].chain(audio.fx.rhythmGain, audio.fx.masterGain)    
        audio.instruments['synth_bass'].chain(audio.fx.rhythmGain, audio.fx.masterGain)    

    // 3. COMPOSE AUDIO 
        audio.methods.composeAudio()


//////////////////////////////////////////////
//////   USER INTERFACE FUNCTIONALITY   //////
//////////////////////////////////////////////

    document.addEventListener('visibilitychange', function(ev) {
        if(document.visibilityState === 'hidden'){
            Tone.Transport.pause()
        } else {
            Tone.Transport.start()
        }
    });
